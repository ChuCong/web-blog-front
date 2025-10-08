<template>
  <div class="content">
    <div class="header w-[100%] border-b border-[#C2C2C2] desktop">
      <Header />
    </div>
    <div class="header w-[100%] border-b border-[#C2C2C2] mobile">
      <HeaderMobile />
    </div>
    <div class="main-content ">
      <div class="course-layout-wrapper bg-white mx-auto md:flex lg:flex-row w-full">
        <!-- Main content -->
        <div class="w-full lg:w-9/12 pr-0">
          <NuxtPage />
        </div>
        <!-- Sidebar -->
        <!-- <aside class="lesson-menu-column w-full lg:w-3/12 mt-8 lg:mt-0">
          <LessonInfoBox v-if="courseComp.state.course" :course="courseComp.state.course" />
          <LessonMenu v-if="lessonComp.state.lessons" :lessons="lessonComp.state.lessons"
            :course="courseComp.state.course" />
        </aside> -->
      </div>
      <!-- <FooterBlock :listCourseMenu="listCourseMenu" :footerConf="footerConf" /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/home/Header.vue";
import HeaderMobile from "~/components/home/HeaderMobile.vue";
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
// import { useCoursesStore } from '~/stores/courses'
// import { useLessonsStore } from '~/stores/lessons'
// import { useSettingStore } from '~/stores/setting'
// import NavBar from '~/components/widgets/navbar.vue'
// import FooterBlock from '~/components/footer/footer.vue'

const route = useRoute()
const courseSlug = Array.isArray(route.params.course) ? route.params.course[0] : route.params.course;
const lessonSlug = Array.isArray(route.params.lesson) ? route.params.lesson[0] : route.params.lesson;

// const settingStore = useSettingStore()

// const { courseDetail: course } = storeToRefs(coursesStore)
// const { lessonMenu } = storeToRefs(lessonsStore)
// const { listCourseMenu, footerConf } = storeToRefs(settingStore)
</script>

<style scoped>
.block-course {
  min-height: 100vh;
  background: #EFEFEF;
}

.course-layout-wrapper {
  background: #fff;
}

/* .lesson-menu-column {
  display: none;
} */

@media (min-width: 1024px) {
  .lesson-menu-column {
    display: block;
  }

  /* .course-layout-wrapper {
    max-width: 80%;
  } */
}

/* @media (min-width: 1280px) {
  .course-layout-wrapper {
    max-width: 70%;
  }
} */

/* .content {
  font-family: Inter;
} */

.main-content {
  @apply flex;

  &__sidebar {
    transition: width 500ms;
    @apply mb-10 w-[17rem];
  }

  &__content {
    @apply w-full h-full;
  }
}

.main-content__sidebar {
  position: static;
  @apply fixed right-0 h-[100%] left-0 z-50 bg-[#FFFFFF] transition-transform duration-500;
}

.main-content__sidebar {
  @apply fixed right-0 h-full top-0 left-0 z-50 bg-white transition-transform duration-500 overflow-y-auto;

  scrollbar-width: none;
  -ms-overflow-style: none;
}

.main-content__sidebar::-webkit-scrollbar {
  display: none;
}

@media screen and (min-width:1090px) {
  .mobile {
    display: none;
  }
}

@media screen and (max-width:1089px) {
  .desktop {
    display: none;
  }
}
</style>