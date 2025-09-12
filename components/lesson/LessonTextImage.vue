<template>
  <div class="lesson-video">
    <div class="w-full">
      <div class="p-8">
        <h2 class="text-green-700 text-xl font-bold mb-4 flex justify-center">{{ lesson.title }}</h2>
        <div class="lesson-content" v-html="contentVideo"></div>
      </div>
    </div>
    <Transition name="fade">
      <div>
        <div class="flex gap-4 justify-center text-center">
          <button class="text-white complete-btn" @click="completeLesson">Hoàn thành</button>
          <!-- <button class="text-white bg-gray-104 p-4 rounded-lg" @click="nextLesson">Bài học tiếp theo</button> -->
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Lesson } from "@/models"

const props = defineProps<{
  lesson: Lesson,
  isNextLesson: boolean
}>()

const emit = defineEmits(['submitProcess', 'nextLesson'])
const route = useRoute()
const lessonComp = useLesson()

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

const completeLesson = () => {
  lessonComp.completeLesson({ lesson: props.lesson.slug, course: route.params.course })
}

const nextLesson = () => {
  emit('nextLesson')
}

</script>

<style scoped>
.lesson-content {
  margin-bottom: 20px;
  min-height: 300px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.lesson-video {
  margin-left: 200px;
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

.complete-btn {
  gap: 10px;
  border-radius: 10px;
  padding-top: 8px;
  padding-right: 27px;
  padding-bottom: 8px;
  padding-left: 27px;
  background: linear-gradient(180deg, #FFB37B 0%, #F27619 82.21%);
}
</style>