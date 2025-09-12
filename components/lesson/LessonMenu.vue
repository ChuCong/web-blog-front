<template>
  <div class="curriculum-wrapper bg-white rounded-b-lg">
    <div>
      <div v-for="(item, index) in data_lessons" :key="'a' + index" class="border-t-[0.4px] border-t-[#C9CACD]">
        <!-- Parent lesson row -->
        <button class="flex items-center justify-between w-full px-4 py-3 
            focus:outline-none row_lessons" :class="[item.active_tree ? 'bg-[#F1F2F5]' : 'bg-[#F1F2F5]']"
          @click="toggleLesson(item, index)">
          <div class="flex items-center gap-2">
            <span class="text-content-menu font-semibold"
              :class="[item.active_tree ? 'text-[#2B2C2E]' : 'text-[#2B2C2E]']">{{
              item.title }}</span>
            <span v-if="item.process && item.process.percent"
              class="ml-2 text-xs bg-orange-100 text-orange-600 rounded-full px-2 py-0.5">
              <!-- {{ item.process.percent }}% -->
              Done
            </span>
          </div>
          <svg v-if="item.active_tree" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            fill="none">
            <path d="M18 9.5L13.0606 15.0118C12.4773 15.6627 11.5227 15.6627 10.9394 15.0118L6 9.5"
              stroke="currentColor" stroke-width="1.6" stroke-miterlimit="10" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
          <svg v-else
            :class="{ 'rotate-90': item.active_tree, 'rotate-0': !item.active_tree, 'transition-transform': true }"
            width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M9 5l7 7-7 7"></path>
          </svg>

        </button>
        <!-- Child lessons -->
        <div v-show="item.active_tree" class="pl-6 pr-2 py-2 bg-gray-50">
          <div v-for="(child, cidx) in item.children" :key="'b' + child.title"
            class="flex items-center border-b last:border-b-0 group">
            <NuxtLink :to="`/khoa-hoc/${course.slug}/${child.slug}`" :class="[
                'flex items-center gap-2 flex-1 hover:text-green-700 transition py-2',
                child.slug === route.params.lesson ? 'bg-green-100 text-green-700 font-semibold' : ''
              ]">
              <img src="~/assets/images/icons/ic_book.png" class="icon-first" alt="icon" />
              <span class="text-content-menu">{{ child.title }}</span>
              <div class="ml-auto flex items-center gap-2 pr-2">
                <span v-if="child.process && child.process.percent"
                  class="ml-2 text-xs bg-green-100 text-green-600 rounded-full px-2 py-0.5">
                  <!-- {{ child.process.percent }}% -->
                  Done
                </span>
                <span v-if="child.status == 3" class="ml-2 text-xs text-blue-500">Học thử</span>
                <span v-else-if="child.status == 1 && !token" class="ml-2 text-gray-400 end-2">
                  <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <rect x="5" y="11" width="14" height="8" rx="2" stroke="currentColor" fill="none" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" fill="none" />
                  </svg>
                </span>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="flex justify-end mt-4">
      <BtnBase :outlined="true" :text="courseTxt" :color="courseBtnColor" class="more-btn" @click="showCourse" />
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { Course, Lesson } from '~/models';
import JwtService from "~/services/jwt.service"

const props = defineProps<{
  lessons: Lesson[],
  course: Course
}>()

const router = useRouter()
const route = useRoute()
const data_lessons = ref<any[]>([])
const token = JwtService.getToken()

watch(() => props.lessons, (newVal) => {
  data_lessons.value = newVal ? [...newVal] : []
  data_lessons.value.forEach(item => {
    item.active_tree = false
  })
}, { immediate: true })

watch(data_lessons, (newVal) => {
  if (newVal) {
    newVal.forEach(item => {
      const idLesson = localStorage.getItem('idLesson')
      if (typeof idLesson !== "undefined" && idLesson == item.id) {
        item.active_tree = true
      }
    })
  }
})

function toggleLesson(item: any, index: number) {
  item.active_tree = !item.active_tree
  localStorage.setItem('idLesson', item.id)
}

function showCourse() {
  router.push({ path: '/khoa-hoc/' })
}
</script>

<style scoped>
.row_lessons {
  width: 100%;
}

.text-content-menu {
  font-size: 16px;
  line-height: 1.6;
}

.icon-first {
  width: 18px;
  height: 18px;
}

@media (max-width: 640px) {
  .text-content-menu {
    font-size: 15px;
  }

  .icon-first {
    width: 15px;
    height: 15px;
  }
}
</style>