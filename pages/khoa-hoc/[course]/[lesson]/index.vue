<template>
  <div class="lesson overflow-hidden">
    <div class="lesson-container w-full md:mb-[120px] mb-10 ">
      <client-only>
        <auth-box v-if="!token"></auth-box>
        <component v-else-if="lessonComp.state.lesson && loaded" :is="LessonComponent" :lesson="lessonComp.state.lesson"
          :course="lessonComp.state.lesson" @nextLesson="goToNextLesson" :isNextLesson="isNextLesson()" />
      </client-only>
      <!-- <div class=" mt-5 px-4 ">
        <ListComments :lessonSlug="lessonSlug" :courseSlug="courseSlug" class=""></ListComments>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'
import { LESSON } from '~/common/Constant'
import { loadingStore } from "@/store/loading"
import AuthBox from '@/components/elements/AuthBox.vue'
import JwtService from "~/services/jwt.service"
import ListComments from '~/components/lesson/ListComments.vue'
import Logo from '@/assets/images/Logo_MSD.png'

definePageMeta({
  layout: 'course'
})
const config = useRuntimeConfig()
let pageURL = config.public.pageURL;
const route = useRoute()
const router = useRouter()
const courseComp = useCourse()
const lessonComp = useLesson()
const loading = loadingStore()
const token = JwtService.getToken()
const courseSlug = Array.isArray(route.params.course) ? route.params.course[0] : route.params.course;

const lessonSlug = Array.isArray(route.params.lesson) ? route.params.lesson[0] : route.params.lesson;
const lesson = ref<any>(null)
const course = ref<any>(null)
const lessonMenu = ref<any[]>([])
const loaded = ref(false)
const LessonComponent = ref<any>(null)

function getSlugNext(lessons: any[], id: number) {
  let result = null
  let length = lessons.length
  let index_cursor = 0
  lessons.forEach((item, index) => {
    if (item.id == id && index <= length) {
      index_cursor = index
    }
    if (index == index_cursor + 1 && index_cursor >= 0 && index < length) {
      result = item
    }
    if (index_cursor + 1 == length) {
      result = null
    }
  })
  return result
}

function LessonNext() {
  const l = lesson.value
  if (!l) return null
  if (l.reference_id != 0) {
    const lesson_parent = lessonMenu.value.find(item => item.id == l.reference_id)
    const next_lesson = getSlugNext(lesson_parent?.children || [], l.id)
    if (next_lesson) return next_lesson
    const next_parent_lesson = getSlugNext(lessonMenu.value, l.reference_id)
    if (next_parent_lesson && next_parent_lesson.children.length > 0) {
      return next_parent_lesson.children[0]
    }
  }
  if (l.reference_id == 0) {
    return getSlugNext(lessonMenu.value, l.id)
  }
  return null
}

function isNextLesson() {
  return !!LessonNext()
}

function comeBack() {
  if (course.value?.slug) {
    router.push(`/khoa-hoc/${course.value.slug}`)
  }
}

async function goToNextLesson() {
  const next = LessonNext()
  if (next) {
    router.push(`/khoa-hoc/${route.params.course}/${next.slug}`)
  }
}

function loadComponentByType(type: number) {
  switch (type) {
    case LESSON.VIDEO:
      LessonComponent.value = defineAsyncComponent(() => import('@/components/lesson/LessonVideo.vue'))
      break;
    case LESSON.EXCERCISE:
      LessonComponent.value = defineAsyncComponent(() => import('~/components/lesson/LessonExcercise.vue'))
      break;
    default:
      LessonComponent.value = defineAsyncComponent(() => import('~/components/lesson/LessonTextImage.vue'))
      break;
  }
}

async function fetchLessonData() {
  console.log(route.params)
  loading.setLoading(true)
  await lessonComp.fetchLesson(String(route.params.lesson))
  await courseComp.fetchCourseDetail(String(route.params.course))
  await lessonComp.fetchLessonsByCourseSlug(String(route.params.course))
  loaded.value = true
  loading.setLoading(false)
}
const { data: lessons } = await useAsyncData('course', () =>
  courseComp.fetchCourseDetail(String(route.params.course))
)
watch(() => lessonComp.state.lesson, (newVal) => {
  if (newVal) {
    loadComponentByType(newVal.type)
  }
})

onMounted(async () => {
  loaded.value = false
  await fetchLessonData()
})

useHead(() => ({
  title: lesson.value?.seo_title || lesson.value?.title || 'Bài học',
  meta: [
    {
      name: 'description',
      content: lesson.value?.seo_description || ''
    }
  ]
}))

function submitProcess() {
  // Xử lý hoàn thành bài học nếu cần
}

useHead({
  title: lessonComp.state.lesson.title,
  meta: [
    {
      property: 'og:title',
      content: lessonComp.state.lesson.seo_title || lessonComp.state.lesson.title
    },
    {
      name: 'keywords',
      content: lessonComp.state.lesson.seo_key || lessonComp.state.lesson.title
    },
    {
      name: 'description',
      content:  lessonComp.state.lesson.seo_description || lessonComp.state.lesson.title
    },
    {
      property: 'og:description',
      content: lessonComp.state.lesson.seo_description || lessonComp.state.lesson.title
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:url',
      content: pageURL  + route.path
    },
    {
      property: 'og:image',
      content: pageURL + Logo
    }
  ],
  link: [
    { rel: 'canonical', href: pageURL + route.path }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": lessonComp.state.lesson.title,
        "description": lessonComp.state.lesson.seo_description
      })
    }
  ]
})
</script>

<style scoped>
.lesson {
  overflow: hidden;
}

.back-btn {
  width: 120px;
}

/* 
.lesson-container {
  padding: 20px 10px;
} */

/* @media (min-width: 768px) {
  .lesson-container {
    padding: 0 30px;
  }
} */

@media (min-width: 501px) {
  .parallax-mobie {
    display: none !important;
  }
}

@media (max-width: 500px) {
  .parallax-web {
    display: none !important;
  }
}
</style>