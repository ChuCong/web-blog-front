<template>
  <div>
    <div class="bg-[#C9CACD] shadow-md mx-auto text-center p-6" style="height:180px;">
      <div class="lesson-information-title text-lg text-[#F27619] mb-2 title_font">
        {{ course.title }}
      </div>
      <div class="text-[#4D4E50] mb-2">
        <div class="size-lesson">
          {{ course?.lesson_number || 0 }} Bài học
        </div>
      </div>
      <div v-if="token" class="progress-percent text-right text-primary flex items-center gap-2 mt-2">
        <div class="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
          <div class="h-3 bg-primary rounded-full transition-all duration-300" :style="{ width: percent + '%' }">
          </div>
        </div>
        <span class="ml-2 min-w-[40px] text-base font-semibold">
          {{ percent }}%
        </span>
      </div>

      <!-- <div v-if="isLogged && active === COURSE_ACTIVE" class="size-lesson text-green-300 mb-2">
        Ngày hết hạn: {{ course?.expiration_date || '' }}
      </div> -->

      <!-- <div v-if="isLogged" class="flex justify-between items-center mb-2">
        <span class="size-lesson text-left">{{ course?.number_lesson || 0 }} Bài học</span>
        <span class="size-lesson text-right text-green-400 italic">{{ course?.process?.percent || 0 }}%</span>
      </div>
      <div v-if="isLogged" class="w-full h-2 bg-white rounded mb-4">
        <div class="h-2 bg-green-500 rounded" :style="{ width: (course?.process?.percent || 0) + '%' }"></div>
      </div>

      <div class="flex justify-center">
        <div class="bought-button-wrapper">
          <hnr-button v-if="course && !course.not_buy && active === 0" rounded class="pr-5" text-color="white"
            width="150" text="Mua khóa học" color="red" @hnrClickEvent="goPaymentPage" />
          <hnr-button v-if="active === COURSE_FREE" rounded class="pr-5" text-color="white" width="150"
            text="Khoá học miễn phí" color="green" />
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// import { storeToRefs } from 'pinia'
// import { useAuthStore } from '~/stores/auth'
// import { useCoursesStore } from '~/stores/courses'
// import { COURSE_ACTIVE, COURSE_PAYMENT, COURSE_FREE } from '@/common/constants'
import JwtService from "~/services/jwt.service"

const props = defineProps<{
  course: any
}>()

const route = useRoute()
const router = useRouter()
const token = JwtService.getToken()

const percent = computed(() =>
  props.course.lesson_process_count && props.course.lesson_number
    ? Math.round(props.course.lesson_process_count * 100 / props.course.lesson_number)
    : 0
)

// Pinia store (sửa lại nếu bạn dùng Vuex hoặc composable khác)
// const authStore = useAuthStore()
// const coursesStore = useCoursesStore()
// const { isLogged } = storeToRefs(authStore)
// const { courseActive } = storeToRefs(coursesStore)

// const active = computed(() => courseActive.value)

// function goPaymentPage() {
//   router.push({ path: '/thanh-toan-khoa-hoc', query: { course_slug: route.params.course } })
// }
</script>

<style scoped>
.lesson-information-title {
  word-break: keep-all;
}

.size-lesson {
  font-size: 18px;
}
</style>