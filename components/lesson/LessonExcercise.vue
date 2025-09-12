<template>
  <div class="lesson-practice ml-0 md:ml-[10%] p-3 md:p-[64px]">
    <h2 class="text-[#26993C] text-xl font-bold mb-6 text-center flex justify-center">{{ lesson.title }}</h2>
    <form @submit.prevent="onCheckResult">
      <div v-for="(question, idx) in lesson.questions" :key="question.id" class="mb-8">
        <div class="flex font-semibold mb-2 text-[18px]">
          Câu {{ idx + 1 }} :&nbsp;<span v-html="question.content"></span>
        </div>
        <!-- Một lựa chọn (radio) -->
        <div v-if="question.question_type === TYPE_ANSWER.ONE_CHOICE" class="grid grid-cols-2 gap-2 mb-2">
          <label v-for="a in question.answers" :key="a.id"
            class="flex items-center p-2 rounded cursor-pointer transition gap-2" :class="answerClass(question, a)">
            <input type="radio" :name="'q_' + question.id" :value="a.id" v-model="userAnswers[question.id]"
              class="mr-2 accent-primary scale-[1.6]" :disabled="showAnswer" />
            <span v-html="a.content"></span>
          </label>
        </div>
        <!-- Nhiều lựa chọn (checkbox) -->
        <div v-else-if="question.question_type === TYPE_ANSWER.MULTIPLE_CHOICE" class="grid grid-cols-2 gap-2 mb-2">
          <label v-for="a in question.answers" :key="a.id"
            class="flex items-center p-2 rounded cursor-pointer transition gap-2" :class="answerClass(question, a)">
            <input type="checkbox" :value="a.id" v-model="userAnswers[question.id]"
              class="mr-2 accent-primary scale-[1.6]" :disabled="showAnswer" />
            <span v-html="a.content"></span>
          </label>
        </div>
        <!-- Đúng/Sai (radio) với 4 đáp án -->
        <div v-else-if="question.question_type === TYPE_ANSWER.RIGHT_OR_WRONG" class="flex flex-col gap-2 mb-2">
          <div v-for="a in question.answers" :key="a.id" class="flex items-center gap-4 p-2 rounded border"
            :class="rightOrWrongClass(question, a)">
            <span v-html="a.content" class="flex-1"></span>
            <label class="flex items-center gap-2">
              <input type="radio" :name="'q_' + question.id + '_' + a.id" value="true"
                v-model="userAnswers[question.id][a.id]" :disabled="showAnswer" class="accent-primary scale-[1.6]" />
              Đúng
            </label>
            <label class="flex items-center gap-2">
              <input type="radio" :name="'q_' + question.id + '_' + a.id" value="false"
                v-model="userAnswers[question.id][a.id]" :disabled="showAnswer" class="accent-primary scale-[1.6]" />
              Sai
            </label>
          </div>
        </div>
        <!-- Kéo thả sắp xếp -->
        <div v-else-if="question.question_type === TYPE_ANSWER.ARRANGE" class="mb-2">
          <VueDraggableNext :list="userAnswers[question.id]" item-key="id" dragClass="sortable-drag"
            :disabled="showAnswer">
            <template v-for="(element, index) in userAnswers[question.id]" :key="`answer_${index}`">
              <div class="p-2 m-2 rounded border flex items-center gap-2"
                :class="arrangeAnswerClass(question, element, index)">
                <span class="font-bold">{{ index + 1 }}.</span>
                <span v-html="element.content"></span>
              </div>
            </template>
          </VueDraggableNext>
        </div>
        <!-- Điền đáp án (input/textarea) -->
        <div v-else-if="question.question_type === TYPE_ANSWER.ESSAY" class="mb-2">
          <textarea v-model="userAnswers[question.id]" class="w-full border rounded p-2 focus:outline-[#397494]"
            rows="1" :disabled="showAnswer"></textarea>
        </div>
        <!-- Đánh dấu đúng/sai -->
        <div v-if="showAnswer && question.score_or_not !== 0" class="mt-2">
          <span v-if="isCorrect(question)" class="text-green-600 font-semibold">✔ Đúng</span>
          <span v-else class="text-red-600 font-semibold">✘ Sai</span>
        </div>
        <!-- Hiển thị đáp án đúng nếu đạt >= 80% -->
        <div v-if="showAnswer && showSolution && !isCorrect(question)" class="mt-2">
          <div class="text-gray-700 text-sm">
            <span class="font-semibold">Đáp án đúng:</span>
            <span v-if="question.question_type === TYPE_ANSWER.ESSAY">{{ question.essay_answer }}</span>
            <span v-else>
              <span v-for="a in correctAnswers(question)" :key="a.id" class="ml-2">{{ a.content }}</span>
            </span>
          </div>
        </div>
      </div>
      <div class="flex justify-center mt-8">
        <button v-if="!showAnswer" type="submit" class="check-answer-btn text-white transition">Kiểm tra kết
          quả</button>
        <button v-if="showAnswer" type="button" @click="resetPractice"
          class="bg-green-600 text-white px-6 py-2 rounded-[10px] hover:bg-green-700 transition">Làm lại</button>
      </div>
      <div v-if="showAnswer" class="text-center mt-4 text-lg font-bold">
        Kết quả: {{ correctCount }}/{{ totalScoredQuestions }} ({{ percent }}%)
        <span v-if="showSolution" class="text-green-600 ml-2">Bạn đã đạt yêu cầu!</span>
        <span v-else class="text-red-600 ml-2">Bạn cần đúng ít nhất 80% để xem đáp án.</span>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import { TYPE_ANSWER } from '@/common/Constant'
import type { Lesson, Question } from '@/models'

const props = defineProps<{ lesson: Lesson }>()
const route = useRoute()
const lessonComp = useLesson()

const userAnswers = ref<Record<number, any>>({})
props.lesson.questions.forEach(q => {
  if (q.question_type === TYPE_ANSWER.MULTIPLE_CHOICE) userAnswers.value[q.id] = []
  else if (q.question_type === TYPE_ANSWER.ARRANGE) userAnswers.value[q.id] = [...q.answers]
  else if (q.question_type === TYPE_ANSWER.RIGHT_OR_WRONG) {
    userAnswers.value[q.id] = {}
    q.answers.forEach((a: any) => { userAnswers.value[q.id][a.id] = undefined })
  }
  else userAnswers.value[q.id] = ''
})

const showAnswer = ref(false)
const showSolution = ref(false)

const correctCount = computed(() =>
  props.lesson.questions.filter(q => q.score_or_not !== 0 && isCorrect(q)).length
)
const totalScoredQuestions = computed(() =>
  props.lesson.questions.filter(q => q.score_or_not !== 0).length
)
const percent = computed(() =>
  totalScoredQuestions.value === 0
    ? 0
    : Math.round((correctCount.value / totalScoredQuestions.value) * 100)
)

watch(showAnswer, (val) => {
  if (val && percent.value >= 80) {
    showSolution.value = true
    lessonComp.completeLesson({ lesson: props.lesson.slug, course: route.params.course })
  } else showSolution.value = false
})

function isCorrect(q: Question) {
  if (q.score_or_not === 0) return null // Không tính đúng/sai

  if (q.question_type === TYPE_ANSWER.ONE_CHOICE) {
    const correct = q.answers.find(a => a.is_correct)
    return userAnswers.value[q.id] == correct?.id
  }
  if (q.question_type === TYPE_ANSWER.MULTIPLE_CHOICE) {
    const correctIds = q.answers.filter(a => a.is_correct).map(a => a.id)
    const userIds = userAnswers.value[q.id] || []
    return (
      correctIds.length === userIds.length &&
      correctIds.every(id => userIds.includes(id))
    )
  }
  if (q.question_type === TYPE_ANSWER.RIGHT_OR_WRONG) {
    return q.answers.every(a => {
      const val = userAnswers.value[q.id][a.id]
      return (a.is_correct && val === 'true') || (!a.is_correct && val === 'false')
    })
  }
  if (q.question_type === TYPE_ANSWER.ARRANGE) {
    return userAnswers.value[q.id].every((a: any, idx: number) => a.index_correct === idx + 1)
  }
  if (q.question_type === TYPE_ANSWER.ESSAY) {
    const userAns = (userAnswers.value[q.id] || '').trim().toLowerCase()
    const correctAnsArr = (q.essay_answer || '')
      .split(',')
      .map((ans: string) => ans.trim().toLowerCase())
      .filter(Boolean)
    return correctAnsArr.includes(userAns)
  }
  return false
}

function answerClass(question: any, answer: any) {
  if (!showAnswer.value) {
    if (question.question_type === TYPE_ANSWER.ONE_CHOICE || question.question_type === TYPE_ANSWER.RIGHT_OR_WRONG) {
      return userAnswers.value[question.id] === answer.id ? 'bg-primary/10 text-primary' : ''
    }
    if (question.question_type === TYPE_ANSWER.MULTIPLE_CHOICE) {
      return userAnswers.value[question.id]?.includes(answer.id) ? 'bg-primary/10 text-primary' : ''
    }
    return ''
  } else {
    if (isCorrect(question) && answer.is_correct) {
      return 'bg-green-50 text-green-700'
    }
    if (
      (question.question_type === TYPE_ANSWER.ONE_CHOICE && userAnswers.value[question.id] === answer.id && !answer.is_correct) ||
      (question.question_type === TYPE_ANSWER.MULTIPLE_CHOICE && userAnswers.value[question.id]?.includes(answer.id) && !answer.is_correct)
    ) {
      return 'bg-red-50 text-red-700'
    }
    return ''
  }
}

function arrangeAnswerClass(question: any, answer: any, idx: number) {
  if (!showAnswer.value) return ''
  const correctIdx = answer.index_correct
  if ((idx + 1) === correctIdx) return 'bg-green-50 text-green-700'
  if (userAnswers.value[question.id][idx]?.id === answer.id && (idx + 1) !== correctIdx) return 'bg-red-50 text-red-700'
  return ''
}
function rightOrWrongClass(question: any, answer: any) {
  if (!showAnswer.value) {
    return userAnswers.value[question.id]?.[answer.id] !== undefined
      ? 'bg-primary/10 text-primary'
      : ''
  } else {
    const userVal = userAnswers.value[question.id]?.[answer.id]
    const correctVal = answer.is_correct ? 'true' : 'false'
    if (userVal === correctVal) {
      return 'bg-green-50 text-green-700'
    }
    if (userVal !== undefined && userVal !== correctVal) {
      return 'bg-red-50 text-red-700'
    }
    return ''
  }
}

function correctAnswers(question: any) {
  return question.answers.filter((a: any) => a.is_correct)
}

function onCheckResult() {
  showAnswer.value = true
}

function resetPractice() {
  showAnswer.value = false
  showSolution.value = false
  props.lesson.questions.forEach(q => {
    if (q.question_type === TYPE_ANSWER.MULTIPLE_CHOICE) userAnswers.value[q.id] = []
    else if (q.question_type === TYPE_ANSWER.ARRANGE) userAnswers.value[q.id] = [...q.answers]
    else if (q.question_type === TYPE_ANSWER.RIGHT_OR_WRONG) {
      userAnswers.value[q.id] = {}
      q.answers.forEach((a: any) => { userAnswers.value[q.id][a.id] = undefined })
    }
    else userAnswers.value[q.id] = ''
  })
}
</script>

<style lang="scss" scoped>
.lesson-practice {
  opacity: 1;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-right-width: 1px;
  border-bottom-width: 1px;
  border-left-width: 1px;
  border-width: 0px, 1px, 1px, 1px;
  border-style: solid;
  border-color: #ABADAF;
  padding-bottom: 48px;
}

.check-answer-btn {
  gap: 10px;
  border-radius: 10px;
  padding-top: 8px;
  padding-right: 27px;
  padding-bottom: 8px;
  padding-left: 27px;
  background: linear-gradient(180deg, #FFB37B 0%, #F27619 82.21%);
}
</style>