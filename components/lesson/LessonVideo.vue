<template>
  <div class="lesson-video">
    <div class="w-full">
      <div id="preview" class="text-center" v-if="lesson.medias && lesson.medias.length > 0">
        <VideoPlayer v-if="isStreamMedia(lesson.medias[0])" class="w-full rounded shadow" crossorigin="anonymous"
          playsinline controls liveui :sources="[{ src: getVideoUrl(lesson.medias[0]),
            type: 'application/x-mpegURL'
          }]" :tracks="getTracks(lesson.medias[0])" :volume="0.6" :height="500" :html5="{
            vhs: {
              // https://github.com/videojs/http-streaming#options
              // overrideNative: !isSafari,
              maxPlaylistRetries: Infinity
            },
            nativeAudioTracks: false,
            nativeVideoTracks: false
          }" :playbackRates="[1, 2, 3]" :isFullscreen="true" @mounted="" @ready="onPlayerReady" @play="" @pause=""
          @ended="" @timeupdate="onTimeUpdate($event)">
        </VideoPlayer>
        <VideoPlayer v-else class="w-full rounded shadow" :src="getVideoUrl(lesson.medias[0])" controls :loop="true"
          :volume="0.6" :height="500" :isPip="true" :playbackRates="[1, 2, 3]" :isFullscreen="true" @mounted=""
          @ready="onPlayerReady" @play="" @pause="" @ended="" @timeupdate="onTimeUpdate($event)"
          :tracks="getTracks(lesson.medias[0])">
        </VideoPlayer>
      </div>
      <div class="p-8">
        <h2 class="text-green-700 text-xl font-bold mb-4">{{ lesson.title }}</h2>
        <div v-if="contentVideo" class="lesson-content lesson-learning" v-html="contentVideo"></div>
      </div>
    </div>

    <div v-if="showQuestionDialog && currentGroup"
      class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div class="relative bg-white rounded-lg p-6 w-full max-w-[800px] shadow-lg overflow-visible">
        <!-- Ảnh trang trí đầu dialog -->
        <img src="@/assets/images/mascot.svg"
          class="absolute left-1/2 -top-[125px] -translate-x-1/2 w-[250px] z-10 pointer-events-none" alt="decor" />
        <div class="w-full">
          <h3 class="text-lg font-bold mb-4 mt-[120px] text-center"></h3>
          <div class="mb-4 font-[18px] text-center text-[#2E2B2B]">{{ currentGroup.title }}</div>
          <template v-if="currentQuestion">
            <div class="mb-8 text-base font-medium text-center" v-html="currentQuestion.content"></div>
            <!-- Một lựa chọn (radio) -->
            <div v-if="currentQuestion.question_type === TYPE_ANSWER.ONE_CHOICE" class="grid grid-cols-2 gap-2 mb-2">
              <label v-for="a in currentQuestion.answers" :key="a.id"
                class="flex items-center p-2 rounded cursor-pointer transition"
                :class="answerClass(currentQuestion, a)">
                <input type="radio" :name="'q_' + currentQuestion.id" :value="a.id"
                  v-model="userAnswers[currentQuestion.id]" class="mr-2 accent-primary" :disabled="showAnswer" />
                <span v-html="a.content"></span>
              </label>
            </div>
            <!-- Nhiều lựa chọn (checkbox) -->
            <div v-else-if="currentQuestion.question_type === TYPE_ANSWER.MULTIPLE_CHOICE"
              class="grid grid-cols-2 gap-2 mb-2">
              <label v-for="a in currentQuestion.answers" :key="a.id"
                class="flex items-center p-2 rounded cursor-pointer transition"
                :class="answerClass(currentQuestion, a)">
                <input type="checkbox" :value="a.id" v-model="userAnswers[currentQuestion.id]"
                  class="mr-2 accent-primary" :disabled="showAnswer" />
                <span v-html="a.content"></span>
              </label>
            </div>
            <!-- Đúng/Sai (radio) với 4 đáp án -->
            <div v-else-if="currentQuestion.question_type === TYPE_ANSWER.RIGHT_OR_WRONG"
              class="flex flex-col gap-2 mb-2">
              <div v-for="a in currentQuestion.answers" :key="a.id" class="flex items-center gap-4 p-2 rounded border"
                :class="rightOrWrongClass(currentQuestion, a)">
                <span v-html="a.content" class="flex-1"></span>
                <label class="flex items-center gap-1">
                  <input type="radio" :name="'q_' + currentQuestion.id + '_' + a.id" value="true"
                    v-model="userAnswers[currentQuestion.id][a.id]" :disabled="showAnswer" class="accent-primary" />
                  Đúng
                </label>
                <label class="flex items-center gap-1">
                  <input type="radio" :name="'q_' + currentQuestion.id + '_' + a.id" value="false"
                    v-model="userAnswers[currentQuestion.id][a.id]" :disabled="showAnswer" class="accent-primary" />
                  Sai
                </label>
              </div>
            </div>
            <!-- Kéo thả sắp xếp -->
            <div v-else-if="currentQuestion.question_type === TYPE_ANSWER.ARRANGE" class="mb-2">
              <VueDraggableNext :list="userAnswers[currentQuestion.id]" item-key="id" dragClass="sortable-drag"
                :disabled="showAnswer">
                <template v-for="(element, index) in userAnswers[currentQuestion.id]" :key="`answer_${index}`">
                  <div class="p-2 m-2 rounded border flex items-center gap-2"
                    :class="arrangeAnswerClass(currentQuestion, element, index)">
                    <span class="font-bold">{{ index + 1 }}.</span>
                    <span v-html="element.content"></span>
                  </div>
                </template>
              </VueDraggableNext>
            </div>
            <!-- Điền đáp án (input/textarea) -->
            <div v-else-if="currentQuestion.question_type === TYPE_ANSWER.ESSAY" class="mb-2">
              <textarea v-model="userAnswers[currentQuestion.id]" class="w-full border rounded p-2" rows="1"
                :disabled="showAnswer"></textarea>
            </div>
            <!-- Hiển thị đáp án đúng và giải thích -->
            <div v-if="showAnswer" class="mt-4">
              <div v-if="currentQuestion.question_type === TYPE_ANSWER.ARRANGE">
                <div class="text-green-700 font-semibold mb-2">Thứ tự đúng:</div>
                <div class="flex flex-wrap gap-2 justify-center">
                  <span v-for="(a, idx) in arrangeCorrectAnswers(currentQuestion)" :key="a.id"
                    class="bg-green-100 text-green-700 px-3 py-1 rounded">
                    ({{ idx + 1 }}) {{ a.content }}
                  </span>
                </div>
              </div>
              <div v-else-if="currentQuestion.question_type !== TYPE_ANSWER.ESSAY
                  && currentQuestion.question_type !== TYPE_ANSWER.RIGHT_OR_WRONG">
                <div class="flex items-center gap-4">
                  <div class="text-green-700 font-semibold mb-2">Đáp án đúng:</div>
                  <div class="flex flex-wrap gap-2 justify-center">
                    <span v-for="a in correctAnswers(currentQuestion)" :key="a.id"
                      class="bg-green-100 text-green-700 px-3 py-1 rounded">
                      {{ a.content }}
                    </span>
                  </div>
                </div>
              </div>
              <div v-else-if="currentQuestion.question_type == TYPE_ANSWER.RIGHT_OR_WRONG">
                <div class="flex items-center gap-4 mb-4">
                  <div class="text-green-700 font-semibold mb-2">Các Đáp án Chọn Đúng là đúng:</div>
                  <div class="flex flex-wrap gap-2 justify-center">
                    <span v-for="a in correctAnswers(currentQuestion)" :key="a.id"
                      class="bg-green-100 text-green-700 px-3 py-1 rounded">
                      {{ a.content }}
                    </span>
                  </div>
                </div>
                <div class="flex items-center gap-4">
                  <div class="text-green-700 font-semibold mb-2">Các Đáp án Chọn Sai là đúng:</div>
                  <div class="flex flex-wrap gap-2 justify-center">
                    <span v-for="a in incorrectAnswers(currentQuestion)" :key="a.id"
                      class="bg-green-100 text-green-700 px-3 py-1 rounded">
                      {{ a.content }}
                    </span>
                  </div>
                </div>
              </div>
              <div v-if="currentQuestion.question_type === TYPE_ANSWER.ESSAY">
                <div class="flex items-center gap-4">
                  <div class="text-green-700 font-semibold mb-2">Đáp án đúng:</div>
                  <div class="flex flex-wrap gap-2 justify-center">
                    <span class="bg-green-100 text-green-700 px-3 py-1 rounded">
                      {{ currentQuestion.essay_answer }}
                    </span>
                  </div>
                </div>
              </div>
              <div v-if="currentQuestion.explanation" class="mt-2 text-gray-700 text-center">
                <span class="font-semibold">Giải thích:</span>
                <span v-html="currentQuestion.explanation"></span>
              </div>
            </div>
            <!-- Hiển thị số câu -->
            <div class="text-[18px] font-bold text-[#F27619] text-center mt-8">
              Câu {{ currentQuestionIndex + 1 }}/{{ currentGroup.questions.length }}
            </div>
            <!-- Nút Xem đáp án & Tiếp theo/Hoàn thành -->
            <div class="flex justify-center gap-4 mt-8 z-10 relative">
              <button v-if="!showAnswer" @click="showAnswer = true"
                class="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-3xl hover:bg-blue-600 transition"
                type="button">
                Xem đáp án
              </button>
              <button @click="onSubmitCurrentQuestion"
                class="flex items-center gap-2 bg-[#26993C] text-white px-4 py-2 rounded-3xl hover:bg-primary-dark transition"
                type="button">
                <span>{{ isLastQuestion ? 'Hoàn thành' : 'Tiếp theo' }}</span>
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
          <!-- <button class="text-white bg-primary p-4 rounded-lg" @click="nextLesson">Hoàn thành</button> -->
          <!-- <button class="text-white bg-gray-104 p-4 rounded-lg" @click="nextLesson">Bài học tiếp theo</button> -->
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import type { Lesson, GroupQuestion, Media } from "@/models"
import { TYPE_ANSWER } from "@/common/Constant"
import { VueDraggableNext } from 'vue-draggable-next';
import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
import 'videojs-markers'
import 'videojs-markers/dist/videojs.markers.css'
// import '~/common/videojs-disable-seek.js'

const props = defineProps<{
  lesson: Lesson,
  isNextLesson: boolean
}>()

const emit = defineEmits(['submitProcess', 'nextLesson'])
const route = useRoute()
const lessonComp = useLesson()

const disabled = ref(false)
const video_player = ref<HTMLVideoElement | null>(null)
const dashPlayer = ref<any>(null)
const markers: { time: number; text: string; }[] = [];

const onPlayerReady = (event: any) => {
  const player = event.player || event.target?.player
  if (player && typeof player.markers === 'function') {
    props.lesson?.group_questions?.forEach((group: any, index: number) => {
      markers.push({ time: group.time, text: `Câu hỏi ${index + 1}` })
    })
    player.markers({
      markers,
      markerStyle: { 'background-color': 'red' },
      onMarkerReached: function (marker: any) {
        console.log(marker);
      }
    })
  }
  console.log("window.videoj", window.videojs)

  if (player && typeof player.disableSeek === 'function') {
    if (!props.lesson.allow_video_rewind) {
      player.disableSeek({ threshold: 0.5 })
    }
  } else {
    console.warn('disableSeek plugin chưa được đăng ký hoặc player chưa đúng instance!')
  }
}

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
const showAnswer = ref(false)


const currentQuestion = computed(() =>
  currentGroup.value ? currentGroup.value.questions[currentQuestionIndex.value] : null
)
const isLastQuestion = computed(() =>
  currentGroup.value
    ? currentQuestionIndex.value === currentGroup.value.questions.length - 1
    : true
)

// Xác định class cho đáp án các loại câu hỏi thường
function answerClass(question: any, answer: any) {
  if (!showAnswer.value) {
    // Đang làm bài
    if (question.question_type === TYPE_ANSWER.ONE_CHOICE || question.question_type === TYPE_ANSWER.RIGHT_OR_WRONG) {
      return userAnswers.value[question.id] === answer.id ? 'border-primary bg-primary/10 text-primary border-2' : 'border-gray-200 border'
    }
    if (question.question_type === TYPE_ANSWER.MULTIPLE_CHOICE) {
      return userAnswers.value[question.id]?.includes(answer.id) ? 'border-primary bg-primary/10 text-primary border-2' : 'border-gray-200 border'
    }
    return 'border-gray-200 border'
  } else {
    // Đã xem đáp án
    if (question.question_type === TYPE_ANSWER.ONE_CHOICE || question.question_type === TYPE_ANSWER.RIGHT_OR_WRONG) {
      if (answer.is_correct) return 'border-green-600 bg-green-50 text-green-700 border-2'
      if (userAnswers.value[question.id] === answer.id && !answer.is_correct) return 'border-red-600 bg-red-50 text-red-700 border-2'
      return 'border-gray-200 border'
    }
    if (question.question_type === TYPE_ANSWER.MULTIPLE_CHOICE) {
      if (answer.is_correct) return 'border-green-600 bg-green-50 text-green-700 border-2'
      if (userAnswers.value[question.id]?.includes(answer.id) && !answer.is_correct) return 'border-red-600 bg-red-50 text-red-700 border-2'
      return 'border-gray-200 border'
    }
    return 'border-gray-200 border'
  }
}

// Class cho đáp án kéo thả
function arrangeAnswerClass(question: any, answer: any, idx: number) {
  if (!showAnswer.value) return 'border-gray-200 border'
  // Đã xem đáp án
  // Tìm vị trí đúng của đáp án này
  const correctIdx = answer.index_correct
  if ((idx + 1) === correctIdx) return 'border-green-600 bg-green-50 text-green-700 border-2'
  // Nếu vị trí này user kéo sai
  if (userAnswers.value[question.id][idx]?.id === answer.id && (idx + 1) !== correctIdx) return 'border-red-600 bg-red-50 text-red-700 border-2'
  return 'border-gray-200 border'
}
function rightOrWrongClass(question: any, answer: any) {
  if (!showAnswer.value) {
    // Đang làm bài, chọn thì border primary
    return userAnswers.value[question.id]?.[answer.id] !== undefined
      ? 'border-primary bg-primary/10 text-primary border-2'
      : 'border-gray-200 border'
  } else {
    // Đã xem đáp án
    const userVal = userAnswers.value[question.id]?.[answer.id]
    const correctVal = answer.is_correct ? 'true' : 'false'
    if (userVal === correctVal) {
      return 'border-green-600 bg-green-50 text-green-700 border-2'
    }
    if (userVal !== undefined && userVal !== correctVal) {
      return 'border-red-600 bg-red-50 text-red-700 border-2'
    }
    return 'border-gray-200 border'
  }
}

// Đáp án đúng cho các loại thường
function correctAnswers(question: any) {
  return question.answers.filter((a: any) => a.is_correct)
}

function incorrectAnswers(question: any) {
  return question.answers.filter((a: any) => !a.is_correct)
}

// Đáp án đúng cho kéo thả
function arrangeCorrectAnswers(question: any) {
  return [...question.answers].sort((a, b) => (a.index_correct ?? 0) - (b.index_correct ?? 0))
}

// Sửa lại onTimeUpdate để khởi tạo đúng cho ARRANGE
function onTimeUpdate(eventOrTime: any) {
  const currentTime = typeof eventOrTime === 'object' && eventOrTime.target && eventOrTime.target.player
    ? eventOrTime.target.player.currentTime()
    : eventOrTime
  console.log('eventOrTime', currentTime)
  const duration = typeof eventOrTime === 'object' && eventOrTime.target && eventOrTime.target.player
    ? eventOrTime.target.player.duration() : null
  console.log('duration', duration)
  if (duration && duration - currentTime <= 10) {
    lessonComp.completeLesson({ lesson: props.lesson.slug, course: route.params.course })
  }

  if (!props.lesson.group_questions) return
  const group = props.lesson.group_questions.find(
    g => !triggeredGroups.value.includes(g.id ?? -1) && Math.floor(currentTime) === Math.floor(g.time)
  )
  if (group) {
    showQuestionDialog.value = true
    currentGroup.value = group
    triggeredGroups.value.push(group.id ?? -1)
    pauseVideo(eventOrTime.target.player)
    currentQuestionIndex.value = 0
    showAnswer.value = false
    group.questions.forEach(q => {
      if (q.question_type === TYPE_ANSWER.MULTIPLE_CHOICE) {
        userAnswers.value[q.id] = []
      } else if (q.question_type === TYPE_ANSWER.ARRANGE) {
        userAnswers.value[q.id] = [...q.answers]
      } else if (q.question_type === TYPE_ANSWER.RIGHT_OR_WRONG) {
        userAnswers.value[q.id] = {}
        q.answers.forEach((a: any) => {
          userAnswers.value[q.id][a.id] = undefined
        })
      } else {
        userAnswers.value[q.id] = ''
      }
    })
  }
}

// Sửa lại onSubmitCurrentQuestion để reset showAnswer đúng
function onSubmitCurrentQuestion() {
  if (!showAnswer.value) {
    showAnswer.value = true
    return
  }
  showAnswer.value = false
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

function pauseVideo(player: any) {
  // if (dashPlayer.value && dashPlayer.value.player) {
  //   dashPlayer.value.player.pause()
  // }
  if (player) {
    player.pause()
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

function onVideoSeeked(event: any) {
  // const video = event.target as HTMLVideoElement
  // if (video.currentTime < 1) {
  //   triggeredGroups.value = []
  // }
  console.log('eventOrTime.target.player', event?.target?.player);
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

const isStreamMedia = (media: Media) => {
  if (media.source_encrypt_file_url) return true
  // Kiểm tra nếu là file S3, Dropbox, Google Drive (bạn bổ sung điều kiện ở đây)
  // if (media.src?.includes('s3.amazonaws.com')) return true
  // if (media.src?.includes('dropboxusercontent.com')) return true
  // if (media.src?.includes('drive.google.com')) return true
  return false
}

const getVideoUrl = (media: Media) => {
  return media.source_encrypt_file_url ?? media.src_url
}
const getTracks = (media: Media) => {
  const tracks = []
  if (media.vi_sub_url) {
    tracks.push({
      kind: 'subtitles',
      src: media.vi_sub_url,
      srclang: 'vi',
      label: 'Tiếng Việt',
      default: true
    })
  }
  if (media.en_sub_url) {
    tracks.push({
      kind: 'subtitles',
      src: media.en_sub_url,
      srclang: 'en',
      label: 'English'
    })
  }
  return tracks
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

.sortable-drag {
  @apply border-primary bg-primary/10 text-primary border-2;
}
</style>