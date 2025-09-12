<template>
    <div class="content_header bg-[#FFFFFF]">
        <div class="py-4 px-2 gap-2 flex justify-between items-center ">
            <div class="flex items-center 2xl:gap-10 gap-7 content_logo_search">
                <div class="flex gap-4 items-center">
                    <a href="/">
                        <img src="@/assets/images/Logo_MSD.png" class="w-[100px] " alt="Logo Msd">
                    </a>
                </div>
            </div>
            <div class="flex gap-[10px] items-center">
                <div class="">
                    <input type="text" placeholder="Tìm kiếm..."
                        class="rounded-[10px] text_name_exam h-[40px] border title_font border-gray-300 px-4 focus:border-[#F27619] focus:ring-1 focus:ring-[#F27619] outline-none w-full"
                        :value="searchText" @input="e => searchText = e.target.value" />
                    <div v-if="showDialog && state.results.length"
                        class="absolute left-0 top-full w-full bg-white shadow-lg rounded-lg z-50 max-h-[400px] overflow-auto border-2 border-[#F27619] mt-2">
                        <div class="flex justify-between items-center px-4 py-3 border-b border-gray-200">
                            <span class="font-semibold text-lg">Kết quả tìm kiếm</span>
                            <button @click="showDialog = false"
                                class="text-2xl font-bold text-gray-500">&times;</button>
                        </div>
                        <div class="flex-1">
                            <div v-for="item in state.results" :key="item.source_id"
                                class="px-4 py-3 border-b hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                                @click="handleSelect(item)">
                                <span class="font-medium truncate max-w-[220px] block">
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
                            <div v-if="!loading && !state.results.length" class="text-center py-2 text-gray-400">Không
                                có kết quả
                            </div>
                        </div>
                    </div>
                </div>
                <div class="boxt_user">
                    <img @click="showUser" src="@/assets/images/icons/icon-user.svg" class="w-[40px] h-[40px]" alt="Người dùng">
                    <div v-if="isOpen" class="boxUser p-4">
                        <ClientOnly>
                            <SignInButton v-if="!token"></SignInButton>
                            <div v-else class="">
                                <div class="flex gap-1 items-center py-5">
                                    <div class="mr-1">
                                        <img class="w-[48px] h-[48px] object-cover rounded-full"
                                            :src="avatar ? avatar : '@/assets/images/icons/icon-user.svg'"
                                            alt="Tên người dùng">
                                    </div>
                                    <span class="text-[#397494] font-light">{{ userName }} </span>
                                </div>
                                <div @click="notification" class="cursor-pointer flex gap-4 pb-3 relative">
                                    <img src="@/assets/images/icons/icon_notification.svg" style="height: 24px;"
                                        alt="Thông báo">
                                    <span>Xem thông báo</span>
                                    <span v-if="notificationState.unreadCount > 0"
                                        class="absolute -top-2 -right-2 bg-[#F27619] text-white text-xs font-bold rounded-full px-1.5 py-0.5"
                                        style="min-width: 20px; text-align: center;">
                                        {{ notificationState.unreadCount }}
                                    </span>
                                </div>
                                <div @click="accountInfo" class="cursor-pointer flex gap-4 py-3">
                                    <img src="@/assets/images/icons/icon_account_info.svg" style="height: 24px;"
                                        alt="Thông tin cá nhân">
                                    <span>Thông tin cá nhân</span>
                                </div>
                                <div @click="myCourses" class="cursor-pointer flex gap-4 py-3">
                                    <img src="@/assets/images/icons/icon_my_courses.svg" style="height: 24px;"
                                        alt="Khóa học của tôi">
                                    <span>Khóa học của tôi</span>
                                </div>
                                <div @click="logout" class="cursor-pointer flex gap-4 pt-3">
                                    <img src="@/assets/images/icons/icon_logout.svg" style="height: 24px;"
                                        alt="Log out">
                                    <span>Log out</span>
                                </div>
                            </div>
                        </ClientOnly>
                    </div>
                </div>
                <div class="box_menu_left">
                    <img @click="showMenuLeft" src="@/assets/images/icons/icon_show_menu.svg" class="w-[40px]" alt="Menu">
                    <div v-if="menuLeft"
                        class="absolute bg-white border border-[#bbbbbb] mt-4 rounded-[10px] shadow-lg w-[300px] px-10 pt-3 pb-10 right-[20px] z-50 title_font">
                        <!-- <div class="relative px-3 py-2 border border-[#6D6E70] rounded-[8px]">
                            <div @click="toggleDropdown" class="flex items-center cursor-pointer gap-[6px] justify-between">
                                <img :src="currentLanguage.icon" alt="national flag" style="height: 24px;">
                                <div>{{ currentLanguage.name }}</div>
                                <img src="@/assets/images/icons/icon_turn_down.svg" alt="Show national flag">
                            </div>
                            <div v-if="dropdownOpen"
                                class="absolute bg-white border border-[#6D6E70] mt-4 rounded-[10px] shadow-lg  ">
                                <div v-for="locale in listLanguage" :key="locale.code" @click="changeLanguage(locale)"
                                    class="flex gap-3 items-center py-2 px-3 cursor-pointer hover:bg-gray-100 ">
                                    <img class="h-[24px]" :src="locale.icon" alt="Quốc kỳ">
                                    {{ locale.name }}
                                </div>
                            </div>
                        </div> -->
                        <div class=" border-b mb-5">
                            <div v-for="(item, index) in listMenuHeader" :key="index" class="py-5 border-b">
                                <a :href="item.router" @click.prevent="handleMenuClick(item.router)"
                                    class="flex gap-5 items-center">
                                    <img :src="item.icon" alt="Menu">
                                    <div class="name_item_header ">{{ item.name }}</div>
                                </a>
                            </div>
                        </div>
                        <div class="button_qg flex items-center cursor-pointer">
                            <a href="https://msdunitedwayvn.org/tai-khoan-nhan-tai-tro/" target="_blank"
                                class="text-[#0044B5] hover:text-[#FFF] px-4 py-[8px] font-semibold uppercase ">
                                Quyên góp
                            </a>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
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

            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import SignInButton from "@/components/elements/SignInButton.vue";
import { ref, onMounted } from 'vue';
import IconVn from "@/assets/images/national_flag_vn.png";
import IconEn from "@/assets/images/national_flag_vn.png";
import JwtService from "~/services/jwt.service"
import IconAbouteMsd from "@/assets/images/icons/icon_about_msd.svg"
import IconCourse from "@/assets/images/icons/icon_course.svg"
import IconResources from "@/assets/images/icons/icon-resources.svg"
import IconFaq from "@/assets/images/icons/icon_faq.svg"
import { useSearch } from '@/composables/useSearch'
import { debounce } from 'lodash-es'
import type { SearchResult } from '@/models/SearchResult'
import {
    SEARCH_TYPE_COURSE,
    SEARCH_TYPE_LESSON,
    SEARCH_TYPE_RESOURCE,
    SEARCH_TYPE_NEWS
} from '~/common/Constant'

const { state: notificationState, fetchUnreadCount } = useNotification()
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
    doSearch(val)
}, { deep: true })

const dropdownOpen = ref(false);
const currentLanguage = ref({ code: 'vi', name: 'Tiếng Việt', icon: IconVn });
const token = JwtService.getToken()
const avatar = JwtService.getUserAvatar()
const userName = JwtService.getUser()
const menuLeft = ref(false)
const isOpen = ref(false)
const listMenuHeader = [
    { name: 'Về msd', router: '/?ve-msd', icon: IconAbouteMsd },
    { name: 'khóa học', router: '/khoa-hoc', icon: IconCourse },
    { name: 'Tài nguyên', router: '/resource', icon: IconResources },
    { name: 'FAQ', router: '/faq', icon: IconFaq },
];

const listLanguage = [
    { code: 'vi', name: 'Tiếng Việt', icon: IconVn },
    { code: 'en', name: 'English', icon: IconEn },
];

const toggleDropdown = () => {
    dropdownOpen.value = !dropdownOpen.value;
};

const showMenuLeft = () => {
    isOpen.value = false;
    menuLeft.value = !menuLeft.value;
}
const changeLanguage = (locale: any) => {
    currentLanguage.value = locale;
    dropdownOpen.value = false;
};


const showUser = () => {
    menuLeft.value = false;
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

const handleSelect = (item: SearchResult) => {
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

onMounted(() => {
    fetchUnreadCount()
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
</script>

<style scoped lang="scss">
.name_item_header {
    @apply text-[#F27619] font-semibold uppercase;
    line-height: 20px;
}

.boxUser {
    @apply absolute w-[250px] bg-white top-[75px] rounded-lg px-[20px] py-[10px] right-3 border border-[#bbbbbb];
    z-index: 1000;
}

.button_qg {
    width: fit-content;
    margin: 0 auto;
    border-radius: 25px;
    border: 2px solid transparent;
    background: linear-gradient(#fff, #fff) padding-box,
        linear-gradient(90deg, rgba(33, 41, 107, 1), rgba(242, 118, 25, 1)) border-box;
}

.button_qg:hover {
    border: none;
    background: linear-gradient(90deg, rgba(33, 41, 107, 1), rgba(242, 118, 25, 1));
}

.button_qg:hover svg path:first-child {
    fill: transparent;
}
</style>