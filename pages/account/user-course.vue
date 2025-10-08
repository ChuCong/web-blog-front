<template>
  <div class="repon-course m-0 p-0">
    <div class="headline-course mb-4 mx-2 text-2xl font-semibold text-[#0044B5] title_font">{{ $t("course.my_courses") }}</div>
    <div class="list-course mb-4">
      <div v-if="!userCourses.length" class="not-course text-center my-10 flex flex-col items-center">
        <p>{{ $t("course.no_course_text") }}</p>
        <img src="~/assets/images/group.svg" width="80" alt="no course" />
      </div>
      <!-- <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4">
        <CourseItem v-for="(course, index) in userCourses" :key="course.id" :courseManager="course" />
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
// import CourseItem from '~/components/course/CourseItem.vue'
import { loadingStore } from "@/store/loading"
const loading = loadingStore()

definePageMeta({
  layout: 'account'
})

const { state, fetchUserCourses } = useUser()
const userCourses = computed(() => state.userCourses)

onMounted(async () => {
  loading.setLoading(true)
  await fetchUserCourses()
  loading.setLoading(false)
})
</script>

<style scoped>
.headline-course {
  font-size: 25px;
  font-weight: 500;
}
@media screen and (max-width: 768px) {
  .headline-course {
    font-size: 20px !important;
  }
}
</style>
