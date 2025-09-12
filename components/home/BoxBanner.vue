<template>
    <div class="">
        <ClientOnly>
            <Carousel ref="carouselRef" :autoplay="5000" :gap="20" site class="w-[100%]"
                :breakpoints="{ 600: { itemsToShow: 1 } }" :wrapAround="true" :clamp="true"
                @slideEnd="updateCurrentIndex">
                <Slide v-for="banner in bannerComp.state.banners" :key="banner.id">
                    <div class="box_banner w-full" :style="{
                        backgroundImage: !isMobile && banner.url_image ? `url(${banner.url_image.toString()})` : '',
                        backgroundSize: !isMobile ? 'cover' : '',
                        backgroundRepeat: !isMobile ? 'no-repeat' : '',
                        backgroundPosition: !isMobile ? 'center' : ''
                    }">
                        <div class="2xl:h-[600px] xl:h-[560px] item_content 2xl:w-[37%] xl:w-[52%] md:w-[55%] flex flex-col">
                            <div class="md:pl-5 w-[100%] flex flex-col h-full">
                                <div class="mobile w-[100%]" v-if="isMobile && banner.url_image">
                                    <img :src="typeof banner.url_image === 'string' ? banner.url_image : banner.url_image?.toString()"
                                       class="w-full" alt="Image banner">
                                </div>
                                <div
                                    class="md:mt-10 uppercase flex items-center justify-center text-[40px] md:text-[#ffffff] text-[#007600] w-fit md:mb-4 h-[63px] title_font md:px-0 px-[10px]">
                                    {{ banner.title }}
                                </div>
                                <template v-if="banner.list_contents && banner.list_contents.length > 0" class="">
                                    <div v-for="item in banner.list_contents" :key="item.id"
                                        class="md:mb-6 mb-3 md:w-[80%] flex gap-3 items-center md:px-0 px-[10px]">
                                        <img class="mobile" src="@/assets/images/icons/icon_trace.svg" alt="Background title">
                                        <div class="2xl:text-[27px] xl:text-[24px] md:text-[#FFF] font-medium">{{ item.title }}
                                        </div>
                                    </div>
                                </template>
                                <template v-else>
                                    <div v-html="banner.content" class="md:text-[#FFF] md:w-[80%] text-[32px]"></div>
                                </template>
                                <div class="md:w-[80%] mt-auto mb-[20px]">
                                    <div class="button_banner mb-4 title_font">
                                        <a href="/khoa-hoc">XEM THÊM</a>
                                    </div>
                                    <div class="button_banner title_font">
                                        <a :href="banner.url_course ? banner.url_course.toString() : undefined">
                                            BẮT ĐẦU HỌC
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Slide>
            </Carousel>
        </ClientOnly>
        <div class="flex justify-center gap-2 mt-4">
            <span v-for="(banner, index) in bannerComp.state.banners" :key="index"
                class="w-3 h-3 rounded-full transition-all duration-300" :class="{
                    'bg-[#28A745]': currentIndex === index,
                    'bg-gray-300': currentIndex !== index
                }"></span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { loadingStore } from "@/store/loading";

const loading = loadingStore();
const bannerComp = useSetting();
const carouselRef = ref();
const currentIndex = ref(0);

const updateCurrentIndex = () => {
    if (carouselRef.value) {
        currentIndex.value = carouselRef.value.currentSlide;
    }
};
const isMobile = ref(false);

onMounted(() => {
    const checkWidth = () => {
        isMobile.value = window.innerWidth <= 769;
    };
    checkWidth();
    window.addEventListener("resize", checkWidth);
});

</script>
<style scoped lang="scss">
.button_banner {
    @apply w-[190px] text-[#fff] text-center px-8 py-[6px] mx-auto md:text-[25px] text-[18px];
    border-radius: 30px;
    background: var(--Primary-02, #F27619);
}

@media screen and (min-width: 769px) {
    .item_content {
        background-image: url('@/assets/images/content_banner.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;

    }

    .mobile {
        display: none;
    }
}

@media screen and (max-width: 768px) {
    .box_banner {
        @apply mx-auto;
    }
}

.background-animation {
    background: linear-gradient(45deg, #4CAF50, #81C784);
    background-size: 300% 300%;
    animation: gradientAnimation 5s ease infinite;
    min-height: 550px;
    /* Đảm bảo chiều cao tối thiểu */
}

@keyframes gradientAnimation {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}
</style>