<template>
    <div class="mx-auto ">
        <h1 class="my-[33px] text-[#0144B5] md:text-[42px] text-[32px] title_font text-center">
            TRẢI NGHIỆM CỦA HỌC VIÊN
        </h1>
        <div
            class="md:bg-[url('@/assets/images/icons/line_color_3.svg')] bg-[url('@/assets/images/icons/line_color_3_mobile.svg')] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center">
            <Swiper :modules="[Autoplay, FreeMode, Navigation]" :slides-per-view="slidesPerView" :space-between="30"
                :loop="true" :loopedSlides="repeatedTestimonials.length" :speed="3000"
                :freeMode="{ enabled: true, momentum: false }" :autoplay="{ delay: 0, disableOnInteraction: false }"
                @swiper="onSwiper" @mouseenter="pauseAutoplay" @mouseleave="resumeAutoplay" class="w-full relative"
                :navigation="{ nextEl: '.custom-next', prevEl: '.custom-prev' }">
                <SwiperSlide v-for="(item, index) in repeatedTestimonials" :key="`${item.id ?? 't'}-${index}`">
                    <!-- nội dung slide -->
                    <div class="flex flex-col items-center text-center md:w-[70%] w-[80%] mx-auto">
                        <div class="my-6 mt-[73px] testimonial relative">
                            <div
                                class="w-[60px] h-[60px] absolute md:top-7 md:left-[70px] md:-translate-x-1/2 md:-translate-y-1/2  z-10">
                                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"
                                    fill="none">
                                    <path
                                        d="M60.0001 28.6578C60.0001 27.5532 59.1047 26.6578 58.0001 26.6578H48.9693C47.9503 26.6578 47.0813 25.8916 47.0551 24.8729C46.9208 19.657 48.9036 13.9102 57.9989 13.1853C59.1 13.0975 60.0001 12.212 60.0001 11.1074C60.0001 10.5422 60.0001 10.0606 60.0001 9.65261C60.0001 8.54804 59.0973 7.65087 57.9932 7.68212C35.0364 8.33183 34.3125 20.2022 34.3125 26.6579V50.3454C34.3125 51.45 35.2079 52.3454 36.3125 52.3454H58.0001C59.1047 52.3454 60.0001 51.45 60.0001 50.3454V28.6578Z"
                                        fill="#F27619" />
                                    <path
                                        d="M25.6876 28.6579C25.6876 27.5533 24.7922 26.6579 23.6876 26.6579H14.6573C13.6383 26.6579 12.7693 25.8917 12.743 24.873C12.6087 19.657 14.5915 13.9102 23.6864 13.1853C24.7875 13.0975 25.6876 12.212 25.6876 11.1074C25.6876 10.5423 25.6876 10.0606 25.6876 9.65262C25.6876 8.54804 24.7848 7.65088 23.6806 7.68213C0.724391 8.33196 0 20.2023 0 26.6579V50.3454C0 51.45 0.895431 52.3454 2 52.3454H23.6876C24.7922 52.3454 25.6876 51.45 25.6876 50.3454V28.6579Z"
                                        fill="#F27619" />
                                </svg>
                            </div>
                            <div v-if="item.media?.src_url"
                                class="absolute top-5  right-[-120px] -translate-x-1/2 -translate-y-1/2 z-20">
                                <img :src="item.media.src_url"
                                    class="w-[140px] h-[140px] border-[3px] border-[#F27619] rounded-full object-cover" />
                            </div>
                            <div
                                class="bg-white rounded-[30px] shadow-md mt-[50px]  max-w-[700px] min-h-[300px] pt-[100px] relative testimonial-box">
                                <div class="mb-4 text-[#2B2C2E] font-semibold">
                                    {{ item.name }}
                                </div>
                                <p class="text-gray-600 leading-relaxed">
                                    {{ item.introduction }}
                                </p>
                                <a :href="item.url_course?.toString()" class="click_course">
                                    Xem khóa học
                                </a>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <div class="custom-prev absolute left-5 md:bottom-[50px] bottom-[12px] cursor-pointer z-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="41" viewBox="0 0 25 41" fill="none">
                        <path
                            d="M19.5613 0.00337236C18.8537 -0.0592517 18.2174 0.765165 17.7594 1.24079C11.7725 7.45484 6.16687 14.0866 0.225664 20.3459C-0.123089 20.9047 -0.0595379 21.4398 0.360516 21.9329L18.7266 40.7193C19.2854 41.1418 19.8419 41.0641 20.365 40.6416C21.8088 39.4763 23.1271 37.5786 24.5663 36.3443C24.9941 35.8743 25.0576 35.1006 24.605 34.6305L12.0732 21.8171C11.3052 20.8263 11.7562 20.3372 12.4444 19.5333C16.259 15.0823 20.551 11.0133 24.4175 6.60505C24.9592 6.02479 25.2522 5.33672 24.7159 4.62487L20.2526 0.291917C20.0705 0.158742 19.7822 0.0223966 19.5621 0.00257887L19.5613 0.00337236Z"
                            fill="#21296B" />
                    </svg>
                </div>
                <div class="custom-next absolute right-5 md:bottom-[50px] bottom-[12px] cursor-pointer z-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <path
                            d="M17.4387 4.00337C18.1463 3.94075 18.7826 4.76516 19.2406 5.24079C25.2275 11.4548 30.8331 18.0866 36.7743 24.3459C37.1231 24.9047 37.0595 25.4398 36.6395 25.9329L18.2734 44.7193C17.7146 45.1418 17.1581 45.0641 16.635 44.6416C15.1912 43.4763 13.8729 41.5786 12.4337 40.3443C12.0059 39.8743 11.9424 39.1006 12.395 38.6305L24.9268 25.8171C25.6948 24.8263 25.2438 24.3372 24.5556 23.5333C20.741 19.0823 16.449 15.0133 12.5825 10.6051C12.0408 10.0248 11.7478 9.33672 12.2841 8.62487L16.7474 4.29192C16.9295 4.15874 17.2178 4.0224 17.4379 4.00258L17.4387 4.00337Z"
                            fill="#21296B" />
                    </svg>
                </div>
            </Swiper>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/autoplay'
import 'swiper/css/navigation'
import { Autoplay, FreeMode, Navigation } from 'swiper/modules'

const testimonialComp = useTestimonial()
const minSlides = 10

const repeatedTestimonials = computed(() => {
    const data = testimonialComp.state.testimonials ?? []
    const len = data.length
    return len === 0 ? [] : Array.from({ length: Math.max(len, minSlides) }, (_, i) => data[i % len])
})

const slidesPerView = ref<number>(3)
const updateSlidesPerView = () => {
    slidesPerView.value = window.innerWidth >= 1280 ? 2 : 1
}

const swiperInstance = ref<any>(null)
const onSwiper = (swiper: any) => (swiperInstance.value = swiper)
const pauseAutoplay = () => swiperInstance.value?.autoplay?.stop?.()
const resumeAutoplay = () => swiperInstance.value?.autoplay?.start?.()

onMounted(() => {
    updateSlidesPerView()
    window.addEventListener('resize', updateSlidesPerView)
})
onBeforeUnmount(() => {
    window.removeEventListener('resize', updateSlidesPerView)
})
</script>

<style scoped lang="scss">
.click_course {
    @apply text-[#F27619] py-4 mx-auto;
}

.testimonial-box {
    position: relative;
    border-radius: 20px;
    background: #f27619;
    padding: 30px 30px 30px 0;
    z-index: 1;
}

.testimonial-box::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ffffff;
    border-radius: 20px;
    transform: translate(-20px, -20px);
    z-index: -1;
}

</style>
