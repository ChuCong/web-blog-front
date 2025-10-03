<template>
  <div class="content_header bg-[#FFFFFF]">
    <div class="py-4 flex justify-between items-center 2xl:w-[90%] md:w-[95%] mx-auto 2xl:text-[18px]">
      <div class="flex items-center 2xl:gap-10 gap-7 content_logo_search">
        <div class="flex gap-4 items-center">
          <a href="/">
            <img src="@/assets/images/xo_blog_logo.png" class="2xl:w-[139px] w-[110px] " alt="Msd VietNam">
          </a>
        </div>
        <div class="flex 2xl:gap-10 gap-7 items-center title_font text-[20px]">
          <div v-for="(item, index) in listMenuHeader" :key="index">
            <a :href="item.router" @click.prevent="handleMenuClick(item.router)">
              <div class="name_item_header ">{{ item.name }}</div>
            </a>
          </div>
        </div>
      </div>
      <div class="flex gap-6 items-center">
        <div class="relative">
          <input type="text" placeholder="Tìm kiếm..."
            class="rounded-[10px] text_name_exam 2xl:w-[400px] xl:w-[320px] md:w-[260px] text-[20px] w-[200px] h-[44px] title_font border-[2px] border-gray-300 px-4 focus:border-[#F27619] focus:ring-1 focus:ring-[#F27619] outline-none"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SignInButton from "@/components/elements/SignInButton.vue";
import { ref, watch, onMounted, onUnmounted } from 'vue';
import IconVn from "@/assets/images/national_flag_vn.png";
import IconEn from "@/assets/images/national_flag_vn.png";
import JwtService from "~/services/jwt.service"
import { messageSuccess, messageError } from '~/common/message.service';
import { useSearch } from '@/composables/useSearch'
import type { SearchResult } from '@/models/SearchResult'
import {
  SEARCH_TYPE_COURSE,
  SEARCH_TYPE_LESSON,
  SEARCH_TYPE_RESOURCE,
  SEARCH_TYPE_NEWS
} from '~/common/Constant'
import { debounce } from 'lodash-es'
import { useNotification } from '@/composables/useNotification'

const searchText = ref('')
const showDialog = ref(false)
const { state, search, clearResults } = useSearch()
const loading = ref(false)

const doSearch = debounce(async (val: string) => {
  if (val) {
    loading.value = true
    await search(val)
    loading.value = false
    showDialog.value = true
  } else {
    clearResults()
    showDialog.value = false
  }
}, 400)

watch(searchText, (val) => {
  console.log("search val: " + val)
  doSearch(val)
}, { deep: true })

const dropdownOpen = ref(false);
const currentLanguage = ref({ code: 'vi', name: 'Tiếng Việt', icon: IconVn });
const token = JwtService.getToken()
const avatar = JwtService.getUserAvatar()
const userName = JwtService.getUser()

const listMenuHeader = [
  // { name: 'Về msd', router: '/?ve-msd' },
  { name: 'Chuyên mục', router: '/chuyen-muc' },
  // { name: 'Tài nguyên', router: '/resource' },
  // { name: 'FAQ', router: '/faq' }
];

const listLanguage = [
  { code: 'vi', name: 'Tiếng Việt', icon: IconVn },
  { code: 'en', name: 'English', icon: IconEn },
];

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const changeLanguage = (locale: any) => {
  currentLanguage.value = locale;
  dropdownOpen.value = false;
};

const isOpen = ref(false)
const showUser = () => {
  isOpen.value = !isOpen.value
}

const router = useRouter()

const logout = () => {
  JwtService.destroyToken()
  JwtService.destroyUser()
  reloadNuxtApp()
}
const navigateTo = (route: any) => {
  router.push(route);
};
const scrollToSection = (id: any) => {
  const element = document.querySelector(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  } else {
    router.push('/');
  }
};

const handleMenuClick = async (routePath: string) => {
  if (routePath === '/?ve-msd') {
    if (router.currentRoute.value.path != '/') {
      navigateTo('/?ve-msd')
    } else {
      await router.push('/')
      setTimeout(() => {
        scrollToSection('#introduce-section')
      }, 1000)
    }
  } else {
    router.push(routePath)
  }
}

function handleSelect(item: SearchResult) {
  showDialog.value = false
  searchText.value = ''
  clearResults()
  if (item.type === SEARCH_TYPE_COURSE && item.data?.slug) {
    router.push(`/khoa-hoc/${item.data.slug}`)
  } else if (item.type === SEARCH_TYPE_LESSON && item.data?.course_slug && item.data?.slug) {
    router.push(`/khoa-hoc/${item.data.course_slug}/${item.data.slug}`)
  } else if (item.type === SEARCH_TYPE_RESOURCE && item.data?.link) {
    window.open(item.data.link, '_blank')
  } else if (item.type === SEARCH_TYPE_NEWS && item.data?.link) {
    window.open(item.data.link, '_blank')
  }
}
</script>

<style scoped lang="scss">
.name_item_header {
  @apply text-[#F27619] uppercase;
  line-height: 20px;
}

.boxUser {
  @apply absolute w-[250px] bg-white top-[100px] rounded-lg px-[20px] py-[10px] shadow-lg 2xl:right-[160px] xl:right-5;
  z-index: 1000;
}

.button_qg {
  border-radius: 25px;
  border: 2px solid transparent;
  background: linear-gradient(#fff, #fff) padding-box,
    linear-gradient(90deg, rgba(33, 41, 107, 1), rgba(242, 118, 25, 1)) border-box;
}
.button_qg:hover {
  border: none;
  background: linear-gradient(90deg, rgba(33, 41, 107, 1), rgba(242, 118, 25, 1)) ;
}
.button_qg:hover svg path:first-child {
  fill: transparent; 
}
</style>