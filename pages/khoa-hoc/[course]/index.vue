<template>
  <div class="course-intro text-start w-full">
    <div class="bg-[#F1F2F5] shadow-md px-6 pb-6 pt-2 mb-8" v-if="courseComp.state.course">
      <div class="flex gap-2 pb-4 text-[#A8A8A8] text-[17px] pl-3 font-semibold">
        <a href="/" class="underline underline-offset-2 decoration-[#A8A8A8]">
          Trang chủ
        </a>
        <span>>></span>
        <a href="/khoa-hoc" class="underline underline-offset-2 decoration-[#A8A8A8]">
          Khóa học
        </a>
      </div>
      <div class=" w-[100%] mx-auto md:grid grid-cols-12 gap-8">
        <!-- Image -->
        <div class="2xl:col-span-4 xl:col-span-5 col-span-4 md:mt-0 md:mb-0 mb-10 mt-4">
          <img v-if="courseComp.state.course && courseComp.state.course.image"
            class="mx-auto mb-2 hidden md:block rounded-[20px] w-auto object-cover"
            :src="courseComp.state.course.image.src_url" alt="Course" />
          <img v-if="courseComp.state.course && courseComp.state.course.responsive_image"
            class="intro-image-mobile w-full block md:hidden rounded-[20px]"
            :src="courseComp.state.course.responsive_image.src_url" alt="Course" />
        </div>
        <!-- Content -->
         
        <div class="xl:col-span-7 col-span-8">
          <div>
            <span class="title-course-index text-2xl text-[#F27619] title_font">{{
              courseComp.state.course.title ||
              '' }}</span>
          </div>
          <div>
            <p class="introduction-content mt-2 text-[#0044B5]">
              {{ courseComp.state.course.description || '' }}
            </p>
          </div>
          <div class="md:mt-0 mt-6">
            <p class="size-text text-base text-[#4D4E50]">
              {{ courseComp.state.course.lesson_number || 0 }} Bài học
              ({{ courseComp.state.course.total_time || 0 }} phút)
              <!-- {{ courseComp.state.course.number_month_expired || 0 }} tháng -->
            </p>
            <div v-if="token" class="progress-percent text-right text-primary flex items-center gap-2 mt-2">
              <div class="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div class="h-3 bg-primary rounded-full transition-all duration-300" :style="{ width: percent + '%' }">
                </div>
              </div>
              <span class="ml-2 min-w-[40px] text-base font-semibold">
                {{ percent }}%
              </span>
            </div>
          </div>
          <div class="mt-4 w-full flex justify-between">
            <span class="text-primary">Khóa học miễn phí</span>
            <BtnBase v-if="percent === 100" :text="$t('course.download_certificate')" color="#FFF" bg_color="#f59e42"
              bg_color_border="#f59e42" class="btn-course" @click="downloadCertificate" :width="200" />
          </div>
        </div>
      </div>
    </div>

    <!-- Course Introduction -->
    <div class="layout-container min-h-[500px] mx-auto py-10">
      <div class="flex text-center  justify-between md:justify-between overflow-x-auto md:overflow-x-visible">
        <div class="flex flex-nowrap md:flex-wrap min-w-max gap-10">
          <button class="py-2 px-2 font-bold text-[20px]" :class="{
            'text-primary border-b-2 border-primary': activeTab === 'tab-1',
            'text-gray-600 hover:text-primary': activeTab !== 'tab-1'
          }" @click="changeTab('tab-1')">
            Chi tiết khóa học
          </button>

          <button v-if="whatYouWillLearn && whatYouWillLearn.length > 0" class="py-2 px-2 font-bold text-[20px]" :class="{
            'text-primary border-b-2 border-primary': activeTab === 'tab-2',
            'text-gray-600 hover:text-primary': activeTab !== 'tab-2'
          }" @click="changeTab('tab-2')">
            Bạn sẽ học được gì
          </button>

          <button v-if="courseComp.state.course?.course_resources?.length > 0" class="py-2 px-2 font-bold text-[20px]" :class="{
            'text-primary border-b-2 border-primary': activeTab === 'tab-3',
            'text-gray-600 hover:text-primary': activeTab !== 'tab-3'
          }" @click="changeTab('tab-3')">
            Tài liệu
          </button>

          <button class="py-2 px-2 font-bold text-[20px]" :class="{
            'text-primary border-b-2 border-primary': activeTab === 'tab-4',
            'text-gray-600 hover:text-primary': activeTab !== 'tab-4'
          }" @click="changeTab('tab-4')">
            Thông tin giảng viên
          </button>
        </div>
      </div>

      <div class="w-full lg:w-3/4 mt-4 md:mb-0 mb-[80px]" v-show="activeTab == 'tab-1'">
        <!-- <div>
          <div class="text-[26px] font-normal mb-3">{{ courseComp.state.course.title }}</div>
          <div class="introduction_content" v-html="courseComp.state.course.introduction || ''"></div>
        </div> -->
        <div class="bg-[#F27619] rounded-t-lg shadow-md mt-5">
          <div class="uppercase font-semibold p-4 text-white">Tiến trình học</div>
        </div>
        <keep-alive>
          <LessonMenu :lessons="lessonComp.state.lessons" :course="courseComp.state.course" />
        </keep-alive>
      </div>
      <div class="w-full mt-[48px]" v-show="activeTab === 'tab-2'">
        <div class=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 grid-container">
          <div v-for="(item, index) in whatYouWillLearn" :key="index"
            :style="{ backgroundColor: colors[index % colors.length] }" class="learning-item ">
            <div class="">{{ item }}</div>
          </div>
        </div>
      </div>
      <div class="w-full mt-[48px]" v-show="activeTab === 'tab-3'">
        <div class="grid xl:grid-cols-3 md:grid-cols-2 gap-6 w-full h-fit">
          <div v-for="item in courseComp.state.course.course_resources" :key="item.id"
            class="bg-cover bg-center rounded-lg relative hover:shadow-lg hover:-translate-y-3 hover:z-10 hover:scale-[1.02]">
            <div class="content-preview">
              <div v-if="item.type === VIDEO">
                <div @click="downloadFile(item.media?.src_url)"
                  class="absolute top-2 right-2 flex gap-2 px-3 py-1 border-[2px] w-fit rounded-[8px] border-[#F27619] cursor-pointer z-10">
                  <img src="@/assets/images/icons/icon_download_resource.svg" alt="Download">
                  <p class="text-[#F27619] text-[14px] font-semibold">Download</p>
                </div>
                <video controls class="max-w-full rounded-lg shadow-lg">
                  <source :src="item.media?.src_url" type="video/mp4" />
                </video>
                <div class="title_resource">{{ item.title }}</div>
              </div>
              <div v-else-if="item.type === LINK" class="border rounded-[10px] overflow-hidden"
                style="aspect-ratio: 16/9;">
                <div @click="downloadFileGoogleDrive(item.url)"
                  class="absolute top-2 right-2 flex gap-2 px-3 py-1 border-[2px] w-fit rounded-[8px] border-[#F27619] cursor-pointer z-10">
                  <img src="@/assets/images/icons/icon_download_resource.svg" alt="Download">
                  <p class="text-[#F27619] text-[14px] font-semibold">Download</p>
                </div>
                <img :src="viewUrl(item.url)" class="w-full h-full object-cover">
                <div class="title_resource">{{ item.title }}</div>
              </div>
              <div v-else-if="item.type === IMAGE">
                <div @click="downloadFile(item.media?.src_url)"
                  class="absolute top-2 right-2 flex gap-2 px-3 py-1 border-[2px] w-fit rounded-[8px] border-[#F27619] cursor-pointer z-10">
                  <img src="@/assets/images/icons/icon_download_resource.svg" alt="Download">
                  <p class="text-[#F27619] text-[14px] font-semibold">Download</p>
                </div>
                <img :src="item.media?.src_url" :alt="item.title" class="rounded-[10px] w-[100%] aspect-video">
                <div class="title_resource">{{ item.title }}</div>
              </div>
              <div v-else class="bg-cover bg-center rounded-lg relative content_file aspect-video"
                :style="item.image_thumbnail ? { backgroundImage: `url('${item.image_thumbnail}')` } : {}">
                <div @click="downloadFile(item.media?.src_url)"
                  class="absolute top-2 right-2 flex gap-2 px-3 py-1 border-[2px] w-fit rounded-[8px] border-[#F27619] cursor-pointer z-10">
                  <img src="@/assets/images/icons/icon_download_resource.svg" alt="Download">
                  <p class="text-[#F27619] text-[14px] font-semibold">Download</p>
                </div>
                <div
                  class=" absolute bottom-2 left-0 right-0 px-4 overflow-hidden line-clamp-2 font-semibold text-[#ffffff] ">
                  {{ item.title }}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div class="w-full mt-[90px]" v-show="activeTab == 'tab-4'">
        <template v-if="courseComp.state.course.teacher">
          <div class="">
            <div class="md:relative">
              <div
                class="box_avata md:absolute md:top-[30px] top-[20px] right-0 z-10 justify-items-center md:mr-[32px] flex flex-col items-center relative"
                v-if="courseComp.state.course.teacher.avatar_full_url">
                <div class="relative w-[160px] h-[160px] rounded-full item_avata">
                  <img :src="courseComp.state.course.teacher.avatar_full_url"
                    class="w-[160px] h-[160px] rounded-full border-4 border-[#0f6cd3] object-cover">
                  <div class="absolute bottom-2 right-0 translate-x-1/4 translate-y-2/4 rounded-full top-10 ">
                    <img src="@/assets/images/icons/icon_border_avata.svg" alt="verified" class="w-6 h-6">
                  </div>
                </div>
                <!-- Liên hệ -->
                <div class="flex items-center justify-center gap-4 mt-[100px]">
                  <a :href="'mailto:' + courseComp.state.course.teacher.email" title="Send Email" target="_blank">
                    <img src="@/assets/images/icons/email_orange.svg" alt="Email">
                  </a>
                  <a :href="'tel:' + courseComp.state.course.teacher.phone_number" title="Call Phone"
                    @click.prevent="copyToClipboard(courseComp.state.course.teacher.phone_number || '')">
                    <img src="@/assets/images/icons/phone_orange.svg" alt="Phone">
                  </a>
                  <a :href="courseComp.state.course.teacher.linkedin_link" target="_blank">
                    <img src="@/assets/images/icons/icon_in.svg" alt="LinkedIn">
                  </a>
                </div>
              </div>
              <div class="pl-8 pt-8 pb-8 box_content_teacher  bg-[#F1F2F5] text-[#0044B5] mt-10">
                <span
                  class="xl:text-[26px] md:text-[20px] text-[18px] title_font uppercase border-b-[2px] border-[#0044B5]">
                  {{ courseComp.state.course.teacher.full_name }}
                </span>
                <div class="mt-[15px]">{{ courseComp.state.course.teacher.area_of_expertise }}</div>
                <div class="w-fit mt-1 box_organization text-[14px] font-semibold">
                  {{ courseComp.state.course.teacher.organization }}
                </div>
              </div>

            </div>
          </div>
          <div class="md:pt-[50px]">
            <div class="mt-[54px] flex gap-3">
              <span class="text-[#FFF] bg-primary px-3 py-1 rounded-[8px] w-25 shrink-0">Chức vụ&nbsp;</span><span
                class="text-[#4D4E50] pt-1">{{
                  courseComp.state.course.teacher.position }}</span>
            </div>
            <div class="mt-4 flex gap-3">
              <span class="text-[#FFF] w-25 shrink-0  bg-primary px-3 py-1 rounded-[8px]">Tổ chức&nbsp;</span>
              <span class="text-[#4D4E50] pt-1">
                {{ courseComp.state.course.teacher.organization }}</span>
            </div>
            <div class="mt-4 flex gap-3 items-start">
              <span class="text-[#FFF] w-25 shrink-0 bg-primary px-4 py-1 rounded-[8px]">Tiểu sử</span>
              <div class="text-[#4D4E50] pt-1 leading-relaxed" v-html="courseComp.state.course.teacher.biography"></div>
            </div>
            <div class="mt-4 flex gap-3">
              <span class="text-[#FFF] w-25 h-fit shrink-0 bg-primary px-3 py-1 rounded-[8px]">Lĩnh vực chuyên
                môn&nbsp;</span><span class="text-[#4D4E50] pt-1">{{
                  courseComp.state.course.teacher.area_of_expertise }}</span>
            </div>
            <div class="mt-4 flex gap-3 mb-[100px]">
              <span class="text-[#FFF] w-25 shrink-0 bg-primary px-3 py-1 rounded-[8px]">Kỹ năng&nbsp;</span>
              <div class="text-[#4D4E50] pt-1" v-html="courseComp.state.course.teacher.skills"></div>
            </div>
          </div>
        </template>
      </div>
      <div v-if="showPopup">
        <PopupPreview :link="linkPopup" @close="closePopup" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import LessonMenu from '@/components/lesson/LessonMenu.vue'
import { loadingStore } from "@/store/loading"
import JwtService from "~/services/jwt.service"
import BtnBase from '~/components/elements/BtnBase.vue'
import PopupPreview from '@/components/elements/PopupPreview.vue'
import { VIDEO, LINK, IMAGE, TAG_RESOURCE_PAGE } from '~/common/Constant'

const route = useRoute()
const loading = loadingStore()
const config = useRuntimeConfig()
let pageURL = config.public.pageURL;
// Store
const { generateCertificate } = useUser()
const courseComp = useCourse()
const lessonComp = useLesson()
const token = JwtService.getToken()
const whatYouWillLearn = ref<string[]>([])
// const course = computed(() => courseComp.state)
const percent = computed(() =>
  courseComp.state.course.lesson_process_count && courseComp.state.course.lesson_number
    ? Math.round(courseComp.state.course.lesson_process_count * 100 / courseComp.state.course.lesson_number)
    : 0
)
const downloadFileGoogleDrive = (url: string) => {
  const fileId = url.split('/d/')[1].split('/')[0];
  const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
  window.location.href = downloadUrl;
};

const downloadFile = (url: any) => {
  window.open(url);
}
const viewUrl = (url: string) => {
  const fileId = url.split('/d/')[1].split('/')[0];
  console.log(fileId)
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w320`;
}

onMounted(async () => {
  loading.setLoading(true)
  const course_slug = String(route.params.course)
  // await courseComp.fetchCourseDetail(course_slug)
  await lessonComp.fetchLessonsByCourseSlug(course_slug)
  courseComp.addCourseLearn(course_slug)
  try {
    whatYouWillLearn.value = JSON.parse(courseComp.state.course.what_you_will_learn || '[]')
  } catch {
    whatYouWillLearn.value = []
  }
  loading.setLoading(false)
})

const activeTab = ref('tab-1');
const changeTab = (tabId: string) => {
  activeTab.value = tabId;
}

const copyToClipboard = (phoneNumber: string) => {
  navigator.clipboard.writeText(phoneNumber).then(() => {
    alert('Phone number copied to clipboard!');
  }).catch(err => {
    console.error('Could not copy text: ', err);
  });
}
const colors = ['#F96B2B', '#23265E', '#FFBC16', '#006F00'];
async function downloadCertificate() {
  loading.setLoading(true)
  const url = await generateCertificate(courseComp.state.course.id)
  loading.setLoading(false)
  // if (url) window.open(url, '_blank')
  if (url) {
    openPopup(url)
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
const course_slug = String(route.params.course)
const { data: course } = await useAsyncData('course', () =>
  courseComp.fetchCourseDetail(course_slug)
)
useHead({
  title: courseComp.state.course.title,
  meta: [
    {
      property: 'og:title',
      content: courseComp.state.course.title || ''
    },
    {
      name: 'keywords',
      content: courseComp.state.course.meta || ''
    },
    {
      name: 'description',
      content:  courseComp.state.course.description || ''
    },
    {
      property: 'og:description',
      content: courseComp.state.course.description || ''
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:url',
      content: pageURL  + '/khoa-hoc/' + courseComp.state.course.slug
    },
    {
      property: 'og:image',
      content: courseComp.state.course.image?.src_url || ''
    }
  ],
  link: [
    { rel: 'canonical', href: pageURL + '/khoa-hoc/' + courseComp.state.course.slug }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": courseComp.state.course.title,
        "description": courseComp.state.course.description
      })
    }
  ]
})

</script>

<style scoped>
.layout-container {
  width: 80%;
  margin: auto;
}

.title-course-index {
  font-size: 25px;
  font-weight: 600;
}

.size-text {
  font-size: 20px;
}

.introduction-content {
  @apply 2xl:min-h-[200px] xl:min-h-[130px] min-h-[100px];

  overflow: hidden;
}

.intro-image {
  max-width: 200px;
}

.box_avata {
  padding: 17px 80px;
  border-radius: 10px;
  background: #FFF;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  background: linear-gradient(180deg, #21296B 0%, #F27619 100%);
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
}


@media (max-width: 900px) {
  .layout-container {
    width: 95%;
  }
}

@media (max-width: 600px) {
  .intro-image {
    display: none;
  }

  .intro-image-mobile {
    display: block;
    width: 100%;
    margin-top: -24px;
  }

  .payment-btn {
    width: 60% !important;
  }
}

.learning-item {
  padding: 10px 20px;
  border-radius: 8px;
  color: #fff;
  font-weight: 500;
  text-align: center;
}

.box_avata .item_avata {
  border-radius: 50%;
  width: 160px;
  height: 160px;
  object-fit: cover;
  position: absolute;
  top: -80px;
  left: 50%;
  transform: translateX(-50%);
}

.title_resource {
  @apply absolute bottom-2 left-0 right-0 px-4 overflow-hidden line-clamp-2 font-semibold text-white;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  /* IE và Edge */
  scrollbar-width: none;
  /* Firefox */
}
</style>