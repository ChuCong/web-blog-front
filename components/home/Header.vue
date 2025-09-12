<template>
  <div class="content_header bg-[#FFFFFF]">
    <div class="py-6 flex justify-between items-center 2xl:w-[90%] md:w-[95%] mx-auto 2xl:text-[18px]">
      <div class="flex items-center 2xl:gap-10 gap-7 content_logo_search">
        <div class="flex gap-4 items-center">
          <a href="/">
            <img src="@/assets/images/Logo_MSD.png" class="2xl:w-[139px] w-[110px] " alt="Msd VietNam">
          </a>
        </div>
        <div class="flex 2xl:gap-10 gap-7 items-center title_font text-[20px]">
          <div v-for="(item, index) in listMenuHeader" :key="index">
            <a :href="item.router" @click.prevent="handleMenuClick(item.router)">
              <div class="name_item_header ">{{ item.name }}</div>
            </a>
          </div>
          <div class="button_qg flex items-center cursor-pointer">
            <a href="https://msdunitedwayvn.org/tai-khoan-nhan-tai-tro/" target="_blank"
              class="text-[#0044B5] hover:text-[#FFF] px-4 py-[0px] uppercase ">
              Quyên góp
            </a>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M40 20C40 31.0457 31.0457 40 20 40C8.9543 40 0 31.0457 0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20Z"
                fill="#F27619" />
              <path
                d="M19.393 10.0016C19.7044 9.9711 19.9843 10.3733 20.1859 10.6053C22.8201 13.6365 25.2866 16.8715 27.9007 19.9248C28.0542 20.1974 28.0262 20.4584 27.8414 20.699L19.7603 29.8631C19.5144 30.0692 19.2696 30.0313 19.0394 29.8252C18.4041 29.2567 17.8241 28.331 17.1908 27.7289C17.0026 27.4996 16.9746 27.1222 17.1738 26.8929L22.6878 20.6425C23.0257 20.1591 22.8273 19.9206 22.5245 19.5285C20.846 17.3572 18.9576 15.3723 17.2563 13.222C17.0179 12.9389 16.889 12.6033 17.125 12.256L19.0889 10.1424C19.169 10.0774 19.2958 10.0109 19.3927 10.0013L19.393 10.0016Z"
                fill="white" />
            </svg>
          </div>
        </div>
      </div>
      <div class="flex gap-6 items-center">
        <div class="relative">
          <input type="text" placeholder="Tìm kiếm..."
            class="rounded-[10px] text_name_exam 2xl:w-[400px] xl:w-[320px] md:w-[260px] text-[20px] w-[200px] h-[44px] title_font border-[2px] border-gray-300 px-4 focus:border-[#F27619] focus:ring-1 focus:ring-[#F27619] outline-none"
            :value="searchText" @input="e => searchText = e.target.value" />
          <div v-if="showDialog && state.results.length"
            class="absolute right-0 top-full w-[400px] bg-white shadow-lg rounded-lg z-50 max-h-[400px] overflow-auto border-2 border-[#F27619]">
            <div v-for="item in state.results" :key="item.source_id"
              class="px-4 py-3 border-b hover:bg-gray-100 cursor-pointer flex justify-between items-center"
              @click="handleSelect(item)">
              <span class="font-medium truncate max-w-[260px] block">
                {{ item.title }}
              </span>
              <span class="text-xs text-gray-500 ml-2 flex-shrink-0">
                {{
                  item.type === SEARCH_TYPE_COURSE
                    ? 'Khóa học'
                    : item.type === SEARCH_TYPE_LESSON
                      ? 'Bài học'
                      : item.type === SEARCH_TYPE_RESOURCE
                        ? 'Tài nguyên'
                        : item.type === SEARCH_TYPE_NEWS
                          ? 'Tin tức'
                          : ''
                }}
              </span>
            </div>
            <div v-if="loading" class="text-center py-2 text-gray-400">Đang tìm kiếm...</div>
            <div v-if="!loading && !state.results.length" class="text-center py-2 text-gray-400">Không có kết quả</div>
          </div>
        </div>
        <div v-if="token">
          <div class="relative">
            <div @click="notification" class="cursor-pointer flex gap-2">
              <!-- Chuông SVG -->
              <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 25 25" fill="none">
                <circle cx="12.5" cy="12.5" r="11.5" stroke="#6D6E70" />
                <path
                  d="M12.4968 5.42969C10.0121 5.42969 7.99286 7.44897 7.99286 9.93366V12.1031C7.99286 12.561 7.79769 13.2591 7.56498 13.6494L6.70172 15.0832C6.16875 15.969 6.53658 16.9524 7.51244 17.2826C10.7478 18.3636 14.2384 18.3636 17.4737 17.2826C18.382 16.9824 18.7799 15.9089 18.2844 15.0832L17.4212 13.6494C17.196 13.2591 17.0008 12.561 17.0008 12.1031V9.93366C17.0008 7.45648 14.974 5.42969 12.4968 5.42969Z"
                  stroke="#6D6E70" stroke-miterlimit="10" stroke-linecap="round" />
                <path
                  d="M13.8858 5.64701C13.6531 5.57945 13.4129 5.5269 13.1652 5.49687C12.4446 5.40679 11.754 5.45934 11.1084 5.64701C11.3261 5.09152 11.8666 4.70117 12.4971 4.70117C13.1277 4.70117 13.6682 5.09152 13.8858 5.64701Z"
                  stroke="#6D6E70" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path
                  d="M14.7491 17.5527C14.7491 18.7913 13.7357 19.8047 12.4971 19.8047C11.8816 19.8047 11.3111 19.5495 10.9057 19.1441C10.5003 18.7388 10.2451 18.1683 10.2451 17.5527"
                  stroke="#6D6E70" stroke-miterlimit="10" />
              </svg>
              <span v-if="notificationState.unreadCount > 0"
                class="absolute -top-1 -right-1 bg-[#F27619] text-white text-xs font-bold rounded-full px-1.5 py-0.5"
                style="min-width: 22px; text-align: center;">
                {{ notificationState.unreadCount }}
              </span>
            </div>
          </div>
        </div>
        <ClientOnly>
          <SignInButton v-if="!token"></SignInButton>
          <div v-else class="flex cursor-pointer items-center gap-1" @click="showUser">
            <div class=" gap-1 items-center user_desktop hidden 2xl:flex ">
              <div class="mr-1 ">
                <img class="w-[44px] h-[44px] object-cover rounded-full"
                  :src="avatar ? avatar : '@/assets/images/icons/icon-user.svg'" alt="Tên người dùng">
              </div>
              <span class="text-[#397494] font-light">{{ userName }} </span>
            </div>
            <img src="@/assets/images/icons/icon-user.svg" alt="Người dùng" class="w-[44px] user_mobile 2xl:hidden">
            <div v-if="isOpen && token" class="boxUser p-4">
              <!-- <div @click="notification" class="cursor-pointer flex gap-4 pb-2">
                <img src="@/assets/images/icons/icon_notification.svg" style="height: 24px;" alt="Thông báo">
                <span>Xem thông báo</span>
              </div> -->
              <div @click="accountInfo" class="cursor-pointer flex gap-4 py-2">
                <img src="@/assets/images/icons/icon_account_info.svg" style="height: 24px;" alt="Thông tin cá nhân">
                <span>Thông tin cá nhân</span>
              </div>
              <div @click="myCourses" class="cursor-pointer flex gap-4 py-2">
                <img src="@/assets/images/icons/icon_my_courses.svg" style="height: 24px;" alt="Khóa học của tôi">
                <span>Khóa học của tôi</span>
              </div>
              <div @click="logout" class="cursor-pointer flex gap-4">
                <img src="@/assets/images/icons/icon_logout.svg" style="height: 24px;" alt="Log out">
                <span>Log out</span>
              </div>
            </div>
          </div>
        </ClientOnly>
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
const { state: notificationState, fetchUnreadCount } = useNotification()

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
  { name: 'Về msd', router: '/?ve-msd' },
  { name: 'khóa học', router: '/khoa-hoc' },
  { name: 'Tài nguyên', router: '/resource' },
  { name: 'FAQ', router: '/faq' }
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
const notification = () => {
  window.location.href = '/thong-tin-ca-nhan/thong-bao'
}

const accountInfo = () => {
  window.location.href = '/thong-tin-ca-nhan/profile'
}

const myCourses = () => {
  window.location.href = '/thong-tin-ca-nhan/khoa-hoc-cua-toi'
}

const logout = () => {
  JwtService.destroyToken()
  JwtService.destroyUser()
  reloadNuxtApp()
}

const { $pusher } = useNuxtApp()
const userEmail = JwtService.getEmail()
console.log(userEmail, 'email')
const channelName = 'user-' + userEmail

onMounted(() => {
  fetchUnreadCount()
  if ($pusher && userEmail) {
    console.log('channel', channelName)
    const channel = $pusher.subscribe(channelName)
    channel.bind('notification', (data: any) => {
      console.log(data.message)
      if (data && data.message) {
        messageSuccess(data.message)
      }
    })
  }
})

onUnmounted(() => {
  if ($pusher && userEmail) {
    $pusher.unsubscribe(channelName)
  }
})
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