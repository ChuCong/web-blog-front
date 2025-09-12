<template>
  <div class="w-full">
    <BannerCourse />
    <div class="sm:flex 2xl:w-[80%] xl:w-[98%] gap-6 mx-auto min-h-[800px] p-8">
      <div
        class="flex items-center gap-2 mb-6 text-base text-[#0044B5] title_font cursor-pointer border-b-filter mobile uppercase"
        @click="toggleFilter">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M0.75 6.26284H12.9615C13.2984 7.6238 14.5295 8.63598 15.9931 8.63598C17.4567 8.63598 18.6878 7.6238 19.0246 6.26284H23.25C23.6642 6.26284 24 5.92702 24 5.51284C24 5.09865 23.6642 4.76284 23.25 4.76284H19.0246C18.6878 3.40187 17.4567 2.38965 15.993 2.38965C14.5294 2.38965 13.2983 3.40187 12.9615 4.76284H0.75C0.335812 4.76284 0 5.09865 0 5.51284C0 5.92702 0.335812 6.26284 0.75 6.26284ZM15.9931 3.88965C16.8881 3.88965 17.6163 4.6178 17.6163 5.51279C17.6163 6.40782 16.8881 7.13598 15.9931 7.13598C15.0981 7.13598 14.3699 6.40782 14.3699 5.51279C14.3699 4.6178 15.0981 3.88965 15.9931 3.88965ZM0.75 12.7498H4.97541C5.31225 14.1107 6.54333 15.1229 8.00695 15.1229C9.47058 15.1229 10.7017 14.1107 11.0385 12.7498H23.25C23.6642 12.7498 24 12.414 24 11.9998C24 11.5856 23.6642 11.2498 23.25 11.2498H11.0385C10.7016 9.8888 9.47053 8.87659 8.00691 8.87659C6.54328 8.87659 5.3122 9.8888 4.97536 11.2498H0.75C0.335812 11.2498 0 11.5856 0 11.9998C0 12.414 0.335766 12.7498 0.75 12.7498ZM8.00691 10.3766C8.90194 10.3766 9.63009 11.1047 9.63009 11.9998C9.63009 12.8948 8.90194 13.6229 8.00691 13.6229C7.11187 13.6229 6.38372 12.8948 6.38372 11.9998C6.38372 11.1047 7.11187 10.3766 8.00691 10.3766ZM23.25 17.7367H19.0246C18.6878 16.3757 17.4567 15.3635 15.993 15.3635C14.5294 15.3635 13.2983 16.3757 12.9615 17.7367H0.75C0.335812 17.7367 0 18.0725 0 18.4867C0 18.9009 0.335812 19.2367 0.75 19.2367H12.9615C13.2984 20.5977 14.5295 21.6099 15.9931 21.6099C17.4567 21.6099 18.6878 20.5977 19.0246 19.2367H23.25C23.6642 19.2367 24 18.9009 24 18.4867C24 18.0725 23.6642 17.7367 23.25 17.7367ZM15.9931 20.1099C15.0981 20.1099 14.3699 19.3817 14.3699 18.4867C14.3699 17.5917 15.0981 16.8635 15.9931 16.8635C16.8881 16.8635 17.6163 17.5917 17.6163 18.4867C17.6163 19.3817 16.8881 20.1099 15.9931 20.1099Z"
            fill="#0044B5" />
        </svg>
        Filter
      </div>
      <!-- Cột filter -->
      <div class="filter-container desktop">
        <div class="filter 2xl:w-[358px] xl:w-[300px] bg-white rounded-lg p-4 h-fit box_filter">
          <div
            class=" flex md:text-[32px] text-[25px] items-center gap-2 mb-4 text-base text-[#0044B5] title_font cursor-pointer uppercase border-b-filter  "
            @click="toggleFilter">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M0.75 6.26284H12.9615C13.2984 7.6238 14.5295 8.63598 15.9931 8.63598C17.4567 8.63598 18.6878 7.6238 19.0246 6.26284H23.25C23.6642 6.26284 24 5.92702 24 5.51284C24 5.09865 23.6642 4.76284 23.25 4.76284H19.0246C18.6878 3.40187 17.4567 2.38965 15.993 2.38965C14.5294 2.38965 13.2983 3.40187 12.9615 4.76284H0.75C0.335812 4.76284 0 5.09865 0 5.51284C0 5.92702 0.335812 6.26284 0.75 6.26284ZM15.9931 3.88965C16.8881 3.88965 17.6163 4.6178 17.6163 5.51279C17.6163 6.40782 16.8881 7.13598 15.9931 7.13598C15.0981 7.13598 14.3699 6.40782 14.3699 5.51279C14.3699 4.6178 15.0981 3.88965 15.9931 3.88965ZM0.75 12.7498H4.97541C5.31225 14.1107 6.54333 15.1229 8.00695 15.1229C9.47058 15.1229 10.7017 14.1107 11.0385 12.7498H23.25C23.6642 12.7498 24 12.414 24 11.9998C24 11.5856 23.6642 11.2498 23.25 11.2498H11.0385C10.7016 9.8888 9.47053 8.87659 8.00691 8.87659C6.54328 8.87659 5.3122 9.8888 4.97536 11.2498H0.75C0.335812 11.2498 0 11.5856 0 11.9998C0 12.414 0.335766 12.7498 0.75 12.7498ZM8.00691 10.3766C8.90194 10.3766 9.63009 11.1047 9.63009 11.9998C9.63009 12.8948 8.90194 13.6229 8.00691 13.6229C7.11187 13.6229 6.38372 12.8948 6.38372 11.9998C6.38372 11.1047 7.11187 10.3766 8.00691 10.3766ZM23.25 17.7367H19.0246C18.6878 16.3757 17.4567 15.3635 15.993 15.3635C14.5294 15.3635 13.2983 16.3757 12.9615 17.7367H0.75C0.335812 17.7367 0 18.0725 0 18.4867C0 18.9009 0.335812 19.2367 0.75 19.2367H12.9615C13.2984 20.5977 14.5295 21.6099 15.9931 21.6099C17.4567 21.6099 18.6878 20.5977 19.0246 19.2367H23.25C23.6642 19.2367 24 18.9009 24 18.4867C24 18.0725 23.6642 17.7367 23.25 17.7367ZM15.9931 20.1099C15.0981 20.1099 14.3699 19.3817 14.3699 18.4867C14.3699 17.5917 15.0981 16.8635 15.9931 16.8635C16.8881 16.8635 17.6163 17.5917 17.6163 18.4867C17.6163 19.3817 16.8881 20.1099 15.9931 20.1099Z"
                fill="#0044B5" />
            </svg>
            Filter
          </div>
          <div v-if="tagComp.state.groupedTags">
            <div v-for="(group, idx) in tagComp.state.groupedTags" :key="group?.id" class="mb-4">
              <div class=" text-lg text-[#2B2C2E] justify-between flex cursor-pointer mb-6"
                @click="group.open = !group.open">
                <span class="title_font text-[#0044B5]">{{ group.name }}</span>
                <img v-if="group.open" src="@/assets/images/icons/icon_arrow_down.svg" alt="Mở filter">
                <img v-else="!group.open" src="@/assets/images/icons/icon_arrow_up.svg" alt="Đóng filter">
              </div>
              <div class="flex flex-col gap-1" v-if="group.open">
                <template v-for="tag in group.tags" :key="tag.id">
                  <label v-if="tag.courses_count" class="flex items-center gap-3 cursor-pointer mb-4">
                    <input type="checkbox" v-model="selectedTags" :value="tag.id" class="accent-primary scale-[1.8]" />
                    <span class="text-[15px] font-[400] text-[#4D4E50]">{{ tag.name }} ({{ tag.courses_count
                    }})</span>
                  </label>
                </template>
              </div>
              <div v-if="idx < tagComp.state.groupedTags.length - 1" class="border-t border-[#C9CACD] mt-4"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- Cột courses -->
      <div class="courses w-full">
        <div class="grid xl:grid-cols-3 md:grid-cols-2 gap-6">
          <a v-for="course in filteredCourses" :key="course.id" :href="`/khoa-hoc/${course.slug}`"
            class="relative bg-white rounded-lg shadow overflow-hidden flex flex-col hover:shadow-lg transition duration-300 hover:-translate-y-3 hover:z-10 hover:scale-[1.02] cursor-pointer">
            <div class="relative">
              <img v-if="course.image" :src="course.image.src_url" alt="course image"
                class="w-full h-[220px] object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div
                class="absolute bottom-2 left-0 w-full px-4 text-white text-[18px] leading-snug line-clamp-2 hover:line-clamp-none title_font">
                {{ course.title }}
              </div>
            </div>
            <div class="bg-[#F36F21] p-4 text-white flex flex-col gap-2 h-full">
              <div v-for="(tag, index) in course.tags" :key="index" class="text-[14px] flex gap-1">
                <div class="whitespace-nowrap font-semibold">{{ tag.name }}:</div>
                <div>{{ tag.list_tags }}</div>
              </div>
              <div class="flex justify-end  mt-auto ">
                <div class="bg-[#FFF] p-[8px] rounded-[10px] ">
                  <!-- <div class="flex justify-start mb-[8px]">
                    <img class="px-2" src="@/assets/images/icons/icon_number_course.svg" alt="Số khóa học" />
                    <span class="text-[16px] font-medium text-[#F27619]">
                      4 khóa học
                    </span>
                  </div> -->
                  <div class="flex justify-start">
                    <img class="px-2" src="@/assets/images/icons/icon_number_user.svg" alt="Số học viên" />
                    <span class="text-[16px] font-medium text-[#F27619]">
                      {{ course.students_count }} học viên
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>

    </div>
    <!-- Popup Filter -->
    <div v-if="isFilterVisible" class="filter-popup mobile">
      <div class="pt-10 pb-4 w-fit mx-auto">
        <img @click="toggleFilter" src="@/assets/images/icons/icon_close_popup.svg" alt="Close popup">
      </div>
      <div class="filter-content overflow-y-auto max-h-[calc(100vh-150px)]">
        <div class="flex items-center gap-2 mb-4 text-lg justify-between border-b-filter">
          <div class="flex items-center gap-2 text-base cursor-pointer uppercase text-[#0044B5] title_font">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M0.75 6.26284H12.9615C13.2984 7.6238 14.5295 8.63598 15.9931 8.63598C17.4567 8.63598 18.6878 7.6238 19.0246 6.26284H23.25C23.6642 6.26284 24 5.92702 24 5.51284C24 5.09865 23.6642 4.76284 23.25 4.76284H19.0246C18.6878 3.40187 17.4567 2.38965 15.993 2.38965C14.5294 2.38965 13.2983 3.40187 12.9615 4.76284H0.75C0.335812 4.76284 0 5.09865 0 5.51284C0 5.92702 0.335812 6.26284 0.75 6.26284ZM15.9931 3.88965C16.8881 3.88965 17.6163 4.6178 17.6163 5.51279C17.6163 6.40782 16.8881 7.13598 15.9931 7.13598C15.0981 7.13598 14.3699 6.40782 14.3699 5.51279C14.3699 4.6178 15.0981 3.88965 15.9931 3.88965ZM0.75 12.7498H4.97541C5.31225 14.1107 6.54333 15.1229 8.00695 15.1229C9.47058 15.1229 10.7017 14.1107 11.0385 12.7498H23.25C23.6642 12.7498 24 12.414 24 11.9998C24 11.5856 23.6642 11.2498 23.25 11.2498H11.0385C10.7016 9.8888 9.47053 8.87659 8.00691 8.87659C6.54328 8.87659 5.3122 9.8888 4.97536 11.2498H0.75C0.335812 11.2498 0 11.5856 0 11.9998C0 12.414 0.335766 12.7498 0.75 12.7498ZM8.00691 10.3766C8.90194 10.3766 9.63009 11.1047 9.63009 11.9998C9.63009 12.8948 8.90194 13.6229 8.00691 13.6229C7.11187 13.6229 6.38372 12.8948 6.38372 11.9998C6.38372 11.1047 7.11187 10.3766 8.00691 10.3766ZM23.25 17.7367H19.0246C18.6878 16.3757 17.4567 15.3635 15.993 15.3635C14.5294 15.3635 13.2983 16.3757 12.9615 17.7367H0.75C0.335812 17.7367 0 18.0725 0 18.4867C0 18.9009 0.335812 19.2367 0.75 19.2367H12.9615C13.2984 20.5977 14.5295 21.6099 15.9931 21.6099C17.4567 21.6099 18.6878 20.5977 19.0246 19.2367H23.25C23.6642 19.2367 24 18.9009 24 18.4867C24 18.0725 23.6642 17.7367 23.25 17.7367ZM15.9931 20.1099C15.0981 20.1099 14.3699 19.3817 14.3699 18.4867C14.3699 17.5917 15.0981 16.8635 15.9931 16.8635C16.8881 16.8635 17.6163 17.5917 17.6163 18.4867C17.6163 19.3817 16.8881 20.1099 15.9931 20.1099Z"
                fill="#0044B5" />
            </svg>
            Filter
          </div>
        </div>
        <div v-if="tagComp.state.groupedTags" class="content_select">
          <div v-for="(group, idx) in tagComp.state.groupedTags" :key="group?.id" class="mb-4">
            <div class=" text-lg text-[#2B2C2E] justify-between flex cursor-pointer mb-6"
              @click="group.open = !group.open">
              <span class="text-[#0044B5] title_font">{{ group.name }}</span>
              <img src="@/assets/images/icons/icon_arrow_down.svg" alt="Mở filter">
            </div>
            <div class="flex flex-col gap-1" v-if="group.open">
              <template v-for="tag in group.tags" :key="tag.id">
                <label v-if="tag.courses_count" class="flex items-center gap-3 cursor-pointer mb-4">
                  <input type="checkbox" v-model="selectedTags" :value="tag.id" class="accent-primary scale-[1.8]" />
                  <span class="text-[15px] font-[400] text-[#4D4E50]">{{ tag.name }}({{ tag.courses_count }})</span>
                </label>
              </template>
            </div>
            <div v-if="idx < tagComp.state.groupedTags.length - 1" class="border-t border-[#C9CACD] mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { loadingStore } from "@/store/loading"
import { useCourse } from "@/composables/useCourse"
import { useTag } from "@/composables/useTag"
import { TAG_COURSE_PAGE } from "@/common/Constant"
import BannerCourse from '~/components/elements/BannerCourse.vue'
import ImgBannerSeo from "@/assets/images/seo_image_banner_course.png"

const config = useRuntimeConfig()
let pageURL = config.public.pageURL;
const isFilterVisible = ref(false)
const loading = loadingStore()
const courseComp = useCourse()
const tagComp = useTag()
const selectedTags = ref<number[]>([])
const toggleFilter = () => {
  isFilterVisible.value = !isFilterVisible.value;
}
onMounted(async () => {
  loading.setLoading(true)
  await courseComp.fetchCourses({ tag_selected: null })
  await tagComp.fetchTags({ tag_selected: null, page: TAG_COURSE_PAGE })
  loading.setLoading(false)
})

const filteredCourses = computed(() => {
  return courseComp.state.courses
})

watch(() => selectedTags.value, (newVal) => {
  if (newVal) {
    loading.setLoading(true)
    courseComp.fetchCourses({ tag_selected: newVal.join(','), page: TAG_COURSE_PAGE })
    tagComp.fetchTags({ tag_selected: newVal.join(','), page: TAG_COURSE_PAGE })
    loading.setLoading(false)
  }
}, { deep: true, immediate: true })

useHead({
  title: 'Danh sách khóa học - Viện nghiên cứu Quản lý Phát triển bền vững, MSD Vietnam',
  meta: [
    {
      property: 'og:title',
      content: 'Khóa học trực tuyến SDG, Khoá học trực tuyến NGO, Khoá học trực tuyến tổ chức xã hội.'
    },
    {
      name: 'keywords',
      content: 'Khóa học SDG online, học quản trị trực tuyến, kỹ năng truyền thông online, khóa học công nghệ MSD, chứng chỉ học trực tuyến, học trực tuyến nâng cao năng lực, khóa học NGO trực tuyến, đào tạo tổ chức xã hội, học online MSD Vietnam, LMS NGO Việt Nam'
    },
    {
      name: 'description',
      content: 'Khóa học SDG online, học quản trị trực tuyến, kỹ năng truyền thông online, khóa học công nghệ MSD, chứng chỉ học trực tuyến, học trực tuyến nâng cao năng lực, khóa học NGO trực tuyến, đào tạo tổ chức xã hội, học online MSD Vietnam, LMS NGO Việt Nam'
    },
    {
      property: 'og:description',
      content: 'Khóa học SDG online, học quản trị trực tuyến, kỹ năng truyền thông online, khóa học công nghệ MSD, chứng chỉ học trực tuyến, học trực tuyến nâng cao năng lực, khóa học NGO trực tuyến, đào tạo tổ chức xã hội, học online MSD Vietnam, LMS NGO Việt Nam'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:url',
      content: pageURL  + '/khoa-hoc'
    },
    {
      property: 'og:image',
      content: pageURL + ImgBannerSeo
    }
  ],
  link: [
    { rel: 'canonical', href: pageURL + '/khoa-hoc' }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Danh sách khóa học - Viện nghiên cứu Quản lý Phát triển bền vững, MSD Vietnam",
        "description": "Khóa học SDG online, học quản trị trực tuyến, kỹ năng truyền thông online, khóa học công nghệ MSD, chứng chỉ học trực tuyến, học trực tuyến nâng cao năng lực, khóa học NGO trực tuyến, đào tạo tổ chức xã hội, học online MSD Vietnam, LMS NGO Việt Nam",
        "itemListElement": filteredCourses.value.map((course, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "url": `${pageURL}/khoa-hoc/${course.slug}`,
          "name": course.title
        }))
      })
    }
  ]
})

</script>

<style scoped>
.filter-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.filter-content {
  background: white;
  padding: 20px;
  max-width: 500px;
  width: 98%;
  margin: 0px auto;
}

@media screen and (max-width: 639px) {
  .desktop {
    display: none;
  }
}

@media screen and (min-width: 640px) {
  .mobile {
    display: none;
  }
}
.box_filter{
  border: 2px solid transparent;
  border-radius: 10px;
  background: linear-gradient(#fff, #fff) padding-box,
    linear-gradient(180deg, rgba(33, 41, 107, 1), rgba(242, 118, 25, 1)) border-box;
}
.border-b-filter{
   padding-bottom: 10px;
  border-bottom: 3px solid;
  border-image: linear-gradient(90deg, #21296B, #F27619) 1;
  border-image-slice: 1;
}
</style>