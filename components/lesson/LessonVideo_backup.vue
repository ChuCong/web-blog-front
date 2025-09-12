<template>
  <div class="lesson-video">
    <div class="w-full">
      <div id="preview1" class="text-center"
        v-if="lesson.medias && lesson.medias.length > 0 && !isEmpty(lesson.medias[0].s3_url)">
        <DashVideoPlayer ref="dashPlayer" :src="lesson.medias[0].s3_url" @timeupdate="onTimeUpdate($event)"
          @play="onVideoPlay" @seeked="onVideoSeeked" />
      </div>
      <div id="preview" class="text-center"
        v-if="lesson.medias && lesson.medias.length > 0 && isEmpty(lesson.medias[0].s3_url) && !isEmpty(lesson.medias[0].src)">
        <video ref="video_player" class="w-full rounded shadow" autoplay
          :controls="lesson.allow_video_rewind ? true : false" @timeupdate="onTimeUpdate($event)"
          @play="onVideoPlay" @seeked="onVideoSeeked">
          <source :src="lesson.medias[0].src + '#t=0.5'" type="video/mp4" />
          Your browser does not support HTML video.
        </video>
        <div v-if="!lesson.allow_video_rewind" class="flex justify-center mt-2">
          <button class="bg-primary text-white px-4 py-2 rounded" @click="togglePlayPause">
            {{ isPlaying ? 'Pause' : 'Play' }}
          </button>
        </div>
    </div>
    <div class="p-8">
      <h2 class="text-green-700 text-xl font-bold mb-4">{{ lesson.title }}</h2>
      <div v-if="contentVideo" class="lesson-content lesson-learning" v-html="contentVideo"></div>
    </div>
  </div>

  <div v-if="showQuestionDialog && currentGroup"
    class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50]">
    <div class="relative bg-white rounded-lg p-6 w-full max-w-[800px] shadow-lg overflow-visible">
      <!-- Ảnh trang trí đầu dialog -->
      <img src="@/assets/images/decor-top.png"
        class="absolute left-1/2 -top-[125px] -translate-x-1/2 w-[250px] z-10 pointer-events-none" alt="decor" />
      <div class="w-full">
        <h3 class="text-lg font-bold mb-4 mt-[120px] text-center"></h3>
        <div class="mb-4 font-[18px] text-center text-[#2E2B2B]">{{ currentGroup.title }}</div>
        <template v-if="currentQuestion">
          <div class="mb-8 text-base font-medium text-center" v-html="currentQuestion.content"></div>
          <!-- Đáp án 2 cột -->
          <!-- Một lựa chọn (radio) -->
          <div v-if="currentQuestion.question_type === TYPE_ANSWER.ONE_CHOICE" class="grid grid-cols-2 gap-2 mb-2">
            <label v-for="a in currentQuestion.answers" :key="a.id"
              class="flex items-center p-2 rounded cursor-pointer bg-green-50  transition"
              :class="userAnswers[currentQuestion.id] === a.id ? 'border-primary bg-primary/10 text-primary' : 'border-gray-200'">
              <input type="radio" :name="'q_' + currentQuestion.id" :value="a.id"
                v-model="userAnswers[currentQuestion.id]" class="mr-2 accent-primary" />
              <span v-html="a.content"></span>
            </label>
          </div>
          <!-- Nhiều lựa chọn (checkbox) -->
          <div v-else-if="currentQuestion.question_type === TYPE_ANSWER.MULTIPLE_CHOICE"
            class="grid grid-cols-2 gap-2 mb-2">
            <label v-for="a in currentQuestion.answers" :key="a.id"
              class="flex items-center p-2 rounded cursor-pointer bg-green-50 transition"
              :class="userAnswers[currentQuestion.id]?.includes(a.id) ? 'border-primary bg-primary/10 text-primary' : 'border-gray-200'">
              <input type="checkbox" :value="a.id" v-model="userAnswers[currentQuestion.id]"
                class="mr-2 accent-primary" />
              <span v-html="a.content"></span>
            </label>
          </div>
          <!-- Đúng/Sai (radio) với 4 đáp án -->
          <div v-else-if="currentQuestion.question_type === TYPE_ANSWER.RIGHT_OR_WRONG"
            class="grid grid-cols-2 gap-2 mb-2">
            <label v-for="a in currentQuestion.answers" :key="a.id"
              class="flex justify-between items-center p-2 rounded cursor-pointer bg-green-50 transition">
              <span v-html="a.content"></span>
              <div class="flex items-center gap-2">
                <input type="radio" :name="'a_' + a.id" :value="a.id" v-model="userAnswers[a.id]"
                  class="mr-2 accent-primary" />
                <span>Đúng</span>
                <input type="radio" :name="'a_' + a.id" :value="a.id" v-model="userAnswers[a.id]"
                  class="mr-2 accent-primary" />
                <span>Sai</span>
              </div>

            </label>
          </div>
          <!-- Điền đáp án (input/textarea) -->
          <div v-else-if="currentQuestion.question_type === TYPE_ANSWER.ESSAY" class="mb-2">
            <textarea v-model="userAnswers[currentQuestion.id]" class="w-full border rounded p-2" rows="1"></textarea>
          </div>
          <!-- Hiển thị số câu -->
          <div class="text-[18px] font-bold text-[#F27619] text-center mt-8">
            Câu {{ currentQuestionIndex + 1 }}/{{ currentGroup.questions.length }}
          </div>
          <!-- Ảnh trang trí giữa dialog -->
          <!-- <img src="/assets/images/decor-mid.png"
            class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-10 object-contain z-0 pointer-events-none opacity-40"
            alt="decor" /> -->
          <div class="flex justify-center mt-8 z-10 relative">
            <button @click="onSubmitCurrentQuestion"
              class="flex items-center gap-2 bg-[#26993C] text-white px-4 py-2 rounded-3xl hover:bg-primary-dark transition">
              <span>{{ isLastQuestion ? 'Hoàn thành' : 'Tiếp theo' }}</span>
              <!-- Icon mũi tên phải -->
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </template>
      </div>
    </div>
  </div>

  <Transition name="fade">
    <div>
      <div class="flex gap-4 justify-center text-center">
        <button class="text-white bg-primary p-4 rounded-lg" @click="nextLesson">Hoàn thành</button>
        <button class="text-white bg-gray-104 p-4 rounded-lg" @click="nextLesson">Bài học tiếp theo</button>
      </div>
    </div>
  </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import DashVideoPlayer from '@/components/lesson/DashVideoPlayer.vue'
import type { Lesson, GroupQuestion } from "@/models"
import { TYPE_ANSWER } from "@/common/Constant"
import { VueDraggableNext } from 'vue-draggable-next';

const props = defineProps<{
  lesson: Lesson,
  isNextLesson: boolean
}>()

const emit = defineEmits(['submitProcess', 'nextLesson'])

const disabled = ref(false)
const video_player = ref<HTMLVideoElement | null>(null)
const dashPlayer = ref<any>(null)

const isEmpty = (str: string) => !str || str.length === 0

const regexVideoContent = (content: string) => {
  if (!content) return ''
  let c = content.replace(
    /<oembed/g, '<div class="flex justify-center items-center video-container"><iframe allowfullscreen class="video" '
  )
  c = c.replace(/oembed>/g, 'iframe></div>')
  c = c.replace(/url/g, 'src')
  c = c.replace(/<iframe allowfullscreen class="video" ([\w\W]+?)>/gi, (match) => {
    return match.replace(/src="([\w\W]+?)"/gi, (m1) => m1.split('&')[0] + '"')
  })
  c = c.replace(/watch+[?]+v=/g, 'embed/')
  c = c.replace(/youtu+[.]+be/g, 'www.youtube.com/embed')
  c = c.replace(/open+[.]+spotify+[.]+com/g, 'open.spotify.com/embed')
  c = c.replace(/dailymotion+[.]+com/g, 'dailymotion.com/embed')
  c = c.replace(/[/]+vimeo+[.]+com/, '/player.vimeo.com/video')
  return c
}

const contentVideo = computed(() => {
  if (!props.lesson.content) return ''
  return regexVideoContent(props.lesson.content)
})

const showQuestionDialog = ref(false)
const currentGroup = ref<GroupQuestion | null>(null)
const userAnswers = ref<Record<number, any>>({})
const triggeredGroups = ref<number[]>([])
const currentQuestionIndex = ref(0)

const currentQuestion = computed(() =>
  currentGroup.value ? currentGroup.value.questions[currentQuestionIndex.value] : null
)
const isLastQuestion = computed(() =>
  currentGroup.value
    ? currentQuestionIndex.value === currentGroup.value.questions.length - 1
    : true
)

function onTimeUpdate(eventOrTime: any) {
  const currentTime = typeof eventOrTime === 'object' && eventOrTime.target
    ? eventOrTime.target.currentTime
    : eventOrTime
  if (!props.lesson.group_questions) return
  const group = props.lesson.group_questions.find(
    g => !triggeredGroups.value.includes(g.id ?? -1) && Math.floor(currentTime) === Math.floor(g.time)
  )
  if (group) {
    showQuestionDialog.value = true
    currentGroup.value = group
    triggeredGroups.value.push(group.id ?? -1)
    pauseVideo()
    currentQuestionIndex.value = 0
    group.questions.forEach(q => {
      if (q.question_type === TYPE_ANSWER.MULTIPLE_CHOICE) userAnswers.value[q.id] = []
      else userAnswers.value[q.id] = ''
    })
  }
}

function onSubmitCurrentQuestion() {
  if (!isLastQuestion.value) {
    currentQuestionIndex.value++
  } else {
    showQuestionDialog.value = false
    currentGroup.value = null
    userAnswers.value = {}
    nextTick(() => {
      playVideo()
    })
  }
}

function pauseVideo() {
  if (dashPlayer.value && dashPlayer.value.player) {
    dashPlayer.value.player.pause()
  }
  if (video_player.value) {
    video_player.value.pause()
  }
}

function playVideo() {
  if (dashPlayer.value && dashPlayer.value.player) {
    dashPlayer.value.player.play()
  }
  if (video_player.value) {
    video_player.value.play()
  }
}

function onVideoPlay(event: Event) {
  const video = event.target as HTMLVideoElement
  if (video.currentTime < 1) {
    triggeredGroups.value = []
  }
}

function onVideoSeeked(event: Event) {
  const video = event.target as HTMLVideoElement
  if (video.currentTime < 1) {
    triggeredGroups.value = []
  }
}

const completeLesson = () => {
  disabled.value = true
  emit('submitProcess')
}

const nextLesson = () => {
  emit('nextLesson')
}

const isPlaying = ref(false)
function togglePlayPause() {
  if (!video_player.value) return
  if (isPlaying.value) {
    video_player.value.pause()
    isPlaying.value = false
  } else {
    video_player.value.play()
    isPlaying.value = true
  }
}

onMounted(() => {
  nextTick(() => {
    if (video_player.value) {
      video_player.value.load()
      // playVideo()
    }
  })
})
</script>

<style scoped>
.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
}

.video-container .video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.lesson-content {
  margin-bottom: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* .lesson-video {
  margin-top: 20px;
} */

.lesson-video video {
  width: 100%;
  height: 600px;
}

@media (max-width: 768px) {
  .next-lesson {
    display: block !important;
  }
}

@media (min-width: 769px) {
  .next-lesson {
    display: none !important;
  }
}
</style>