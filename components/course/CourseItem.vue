<template>
  <div v-if="courseManager && courseManager.course" class="course-item1 rounded-xl py-3 border 
  border-green-600 min-h-[320px] min-w-[240px] bg-[#F1EFF1] relative flex flex-col">
    <div class="font-bold text-center px-2 line-clamp-2 text-lg min-h-[50px]">
      {{ courseManager.course.title || '' }}
    </div>
    <div class="content-course px-2 my-3 text-justify text-black overflow-hidden line-clamp-4 h-[80px]">
      <p>{{ courseManager.course.description || '' }}</p>
    </div>
    <div class="flex-1"></div>
    <div class="px-2 mb-2">
      <div class="flex items-center justify-between text-xs md:text-base mb-2">
        <div>
          {{ courseManager.course.lesson_number || 0 }} Bài học
          <span v-if="courseManager.course.total_time">({{ courseManager.course.total_time }} phút)</span>
        </div>
        <div class="text-green-600 italic font-semibold">
          {{ percent }}%
        </div>
      </div>
      <!-- Progress bar giống index.vue -->
      <div class="flex-1 h-3 bg-white rounded-full overflow-hidden mb-2">
        <div class="h-3 bg-green-600 rounded-full transition-all duration-300" :style="{ width: percent + '%' }"></div>
      </div>
      <!-- <div class="flex flex-wrap gap-2 mt-2">
        <span
          v-for="tag in courseManager.course.tags"
          :key="tag.id"
          class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
        >
          {{ tag.name }}
        </span>
      </div> -->
    </div>
    <div class="footer-course px-2 text-[14px] w-full">
      <div class="mb-0 text-center flex items-center gap-1 justify-center">
        <BtnBase v-if="percent === 100" :text="$t('course.download_certificate')" color="#FFF" bg_color="#f59e42"
          bg_color_border="#f59e42" class="btn-course" @click="downloadCertificate" :width="200"/>
        <NuxtLink :to="`/khoa-hoc/${courseManager.course.slug}`" class="flex justify-center">
          <BtnBase :text="percent === 100 ? $t('course.learn_again') : $t('course.discover')"
            :color="percent === 100 ? '#727272' : '#FFF'" :bg_color="percent === 100 ? '#E0E0E0' : '#22c55e'"
            :bg_color_border="percent === 100 ? '#727272' : '#22c55e'" class="btn-course" :width="120"/>
        </NuxtLink>
      </div>
    </div>
    <div v-if="showPopup">
      <PopupPreview :link="linkPopup" @close="closePopup" />
    </div>
  </div>
</template>

<script setup lang="ts">
import PopupPreview from '@/components/elements/PopupPreview.vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import BtnBase from '~/components/elements/BtnBase.vue'
import type { CourseManager } from '@/models'
import { useUser } from '@/composables/useUser'
import { loadingStore } from "@/store/loading"
const loading = loadingStore()


const props = defineProps<{
  courseManager: CourseManager
}>()

const { t } = useI18n()
const { generateCertificate } = useUser()

const percent = computed(() =>
  props.courseManager.course.lesson_process_count && props.courseManager.course.lesson_number
    ? Math.round(props.courseManager.course.lesson_process_count * 100 / props.courseManager.course.lesson_number)
    : 0
)

async function downloadCertificate() {
  if (props.courseManager.certificate_url) {
    // window.open(props.courseManager.certificate_url, '_blank')
    openPopup(props.courseManager.certificate_url)
  } else {
    loading.setLoading(true)
    const url = await generateCertificate(props.courseManager.course.id)
    loading.setLoading(false)
    // if (url) window.open(url, '_blank')
    if (url) {
      openPopup(url)
    }
  }
}

const showPopup = ref(false)
const linkPopup = ref('')

const openPopup = (link: string) => {
  linkPopup.value = link;
  showPopup.value = true;
}
const closePopup = () => {
  showPopup.value = false;
}

</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

