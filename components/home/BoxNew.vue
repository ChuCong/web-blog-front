<template>
    <div class=" mx-auto md:pt-[50px] pt-[30px] 2xl:w-[94%] xl:w-[92%]">
        <div class="flex justify-end items-center">
            <div class="flex items-center justify-center gap-[6px]  ">
                <p class=" title_font text-[#007600] md:text-[42px] text-[32px]">TIN TỨC CÙNG</p>
                <img src="@/assets/images/Logo_MSD.png" alt="MSD Viêt Nam" class="w-[117px]" />
            </div>
        </div>
        <ClientOnly>
            <Carousel :autoplay="isPlaying ? 3000 : 0" :gap="20" :wrapAround="true" :clamp="false" :transition="500"
                :breakpoints="{
                    1280: { itemsToShow: 4 },
                    1024: { itemsToShow: 3 },
                    768: { itemsToShow: 2 },
                    600: { itemsToShow: 1 }
                }" v-if="newsComp.state.news.length > 0">
                <Slide v-for="item in newsComp.state.news" :key="item.id">
                    <div @mouseenter="isPlaying = false" @mouseleave="isPlaying = true" @click="openFile(item.link)"
                        class="border cursor-pointer text-left border-[#C9CACD]  rounded-[10px] hover:-translate-y-3 mt-8 hover:z-10 hover:scale-[1.02]">
                        <img :src="item.media.src_url" alt="Ảnh tin tức" class="w-full">
                        <div class="px-3 pt-4 pb-10">
                            <div class="text-[#6D6E70] italic text-[12px] mb-2 text_font_svn">
                                {{ formatDateDay(item.created_at) }}
                            </div>
                            <div class="font-bold text-[#2B2C2E] overflow-hidden text-ellipsis line-clamp-2">
                                {{ item.title }}
                            </div>
                            <div
                                class="text_font_svn mt-4 text-[#2B2C2E] h-[70px] overflow-hidden text-ellipsis line-clamp-3">
                                {{ item.description }}
                            </div>
                        </div>
                    </div>
                </Slide>
                <template #addons>
                    <Navigation>
                        <template #prev>
                            <button class="custom-prev">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"
                                    fill="none">
                                    <path
                                        d="M30.5613 4.00337C29.8537 3.94075 29.2174 4.76516 28.7594 5.24079C22.7725 11.4548 17.1669 18.0866 11.2257 24.3459C10.8769 24.9047 10.9405 25.4398 11.3605 25.9329L29.7266 44.7193C30.2854 45.1418 30.8419 45.0641 31.365 44.6416C32.8088 43.4763 34.1271 41.5786 35.5663 40.3443C35.9941 39.8743 36.0576 39.1006 35.605 38.6305L23.0732 25.8171C22.3052 24.8263 22.7562 24.3372 23.4444 23.5333C27.259 19.0823 31.551 15.0133 35.4175 10.6051C35.9592 10.0248 36.2522 9.33672 35.7159 8.62487L31.2526 4.29192C31.0705 4.15874 30.7822 4.0224 30.5621 4.00258L30.5613 4.00337Z"
                                        fill="#26993C" />
                                </svg>
                            </button>
                        </template>
                        <template #next>
                            <button class="custom-next">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"
                                    fill="none">
                                    <path
                                        d="M17.4387 4.00337C18.1463 3.94075 18.7826 4.76516 19.2406 5.24079C25.2275 11.4548 30.8331 18.0866 36.7743 24.3459C37.1231 24.9047 37.0595 25.4398 36.6395 25.9329L18.2734 44.7193C17.7146 45.1418 17.1581 45.0641 16.635 44.6416C15.1912 43.4763 13.8729 41.5786 12.4337 40.3443C12.0059 39.8743 11.9424 39.1006 12.395 38.6305L24.9268 25.8171C25.6948 24.8263 25.2438 24.3372 24.5556 23.5333C20.741 19.0823 16.449 15.0133 12.5825 10.6051C12.0408 10.0248 11.7478 9.33672 12.2841 8.62487L16.7474 4.29192C16.9295 4.15874 17.2178 4.0224 17.4379 4.00258L17.4387 4.00337Z"
                                        fill="#26993C" />
                                </svg>
                            </button>
                        </template>
                    </Navigation>
                </template>
            </Carousel>
        </ClientOnly>
    </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import ImageNew1 from "@/assets/images/img_new1.png"
import ImageNew2 from "@/assets/images/img_new2.png"
import { ref, computed, onMounted } from 'vue'
import { loadingStore } from "@/store/loading"
import { useTag } from "@/composables/useTag"
import convertDateTime from "~/mixin/convertDateTime"
import { Navigation } from 'vue3-carousel'

const isPlaying = ref(true)
const { formatDateDay } = convertDateTime.methods;
const loading = loadingStore()
const newsComp = useNews()

const payload = {
    limit: 20,
    page: 1,
}
onMounted(async () => {
    loading.setLoading(true)
    await newsComp.fetchNews(payload)
    loading.setLoading(false)
})
const openFile = (url: any) => {
    window.open(url, '_bran');
}

</script>
<style lang="scss" scoped>
.img_project {
    border-radius: 6px 6px 0px 0px;
}

:deep(.carousel__prev) {
    left: -40px;
}

:deep(.carousel__next) {
    right: -40px;
}

@media (max-width: 768px) {

    :deep(.carousel__prev),
    :deep(.carousel__next) {
        display: none !important;
    }
}
</style>