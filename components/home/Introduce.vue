<template>
    <div class="md:mt-[50px]">
        <div class="md:w-[95%] mx-auto md:px-0 px-[10px]">
            <div class="flex items-center gap-[6px]">
                <div class="flex items-center gap-[16px] md:w-1/2 w-[100%]">
                    <img src="@/assets/images/Logo_MSD.png" alt="Msd VietNam" class="w-[117px] h-[60px]" />
                    <div class="title_font md:text-[42px] text-[32px] "><span class="text-[#F56624]">VỀ </span><span
                            class="text-[#007600]">MSD VIỆT NAM</span></div>
                </div>
            </div>
            <div v-if="aboutMsd.state.aboutMsds.length > 1">
                <ClientOnly>
                    <Carousel ref="carouselRef" :autoplay="5000" :gap="20" site
                        :breakpoints="{ 600: { itemsToShow: 1 } }" :wrapAround="true" :clamp="true">
                        <Slide v-for="(item, index) in aboutMsd.state.aboutMsds" :key="index">
                            <div class=" mx-auto ">
                                <div class="md:flex gap-[56px] mt-10">
                                    <div class="text-[18px] md:text-left md:w-[70%]" v-html="item.content">
                                    </div>
                                    <div>
                                        <div class="md:w-[617px] md:h-[300px] h-[250px] ">
                                            <div v-if="item.type === 'link' && item.url_youtube !== null"
                                                class="w-[100%] h-[100%]">
                                                <iframe class="w-[100%] h-[100%]"
                                                    :src="convertToEmbedUrl(item.url_youtube)" frameborder="0"
                                                    allowfullscreen style="border-radius: 10px;">
                                                </iframe>
                                            </div>
                                            <div v-else-if="item.type === 'image'" class="w-[100%] h-[100%]">
                                                <img v-if="item.url_media" :src="String(item.url_media)" alt="About Msd"
                                                    class="w-[100%] h-[100%] object-cover rounded-[10px]" />
                                            </div>
                                            <div v-else-if="item.type === 'video'" class="w-[100%] h-[100%]">
                                                <video v-if="item.url_media" :src="String(item.url_media)" controls
                                                    class="w-[100%] h-[100%] object-cover rounded-[10px]">
                                                </video>
                                            </div>
                                        </div>
                                        <div class=" mt-5 mb-10 w-fit mx-auto title_font">
                                            <button
                                                class=" mx-auto px-[39px] py-[6px] bg-[#26993C] text-[#FFF] rounded-[30px] "
                                                @click="goToWebMsd">TRUY CẬP WEBSITE CHÍNH THỨC</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Slide>
                    </Carousel>
                </ClientOnly>
            </div>
            <div v-else>
                <div class=" mx-auto">
                    <div v-for="(item, index) in aboutMsd.state.aboutMsds" :key="index">
                        <div class="md:flex gap-[56px] mt-10">
                            <div class="text-[18px] md:text-left md:w-[70%]" v-html="item.content"></div>
                            <div class="md:w-[617px] md:h-[300px] h-[250px] mb-8">
                                <div v-if="item.type === 'link' && item.url_youtube !== null" class="w-[100%] h-[100%]">
                                    <iframe class="w-[100%] h-[100%]" :src="convertToEmbedUrl(item.url_youtube)"
                                        frameborder="0" allowfullscreen style="border-radius: 10px;">
                                    </iframe>
                                </div>
                                <div v-else-if="item.type === 'image'" class="w-[100%] h-[100%]">
                                    <img v-if="item.url_media" :src="String(item.url_media)" alt="About Msd"
                                        class="w-[100%] h-[100%] object-cover rounded-[10px]" />
                                </div>
                                <div v-else-if="item.type === 'video'" class="w-[100%] h-[100%]">
                                    <video v-if="item.url_media" :src="String(item.url_media)" controls
                                        class="w-[100%] h-[100%] object-cover rounded-[10px]">
                                    </video>
                                </div>
                                <div class="mt-5 mb-10 mx-auto w-fit title_font">
                                    <button
                                        class="px-3 py-[6px] bg-[#006F00] text-[#FFF] text-[20px] rounded-[10px] title_font"
                                        @click="goToWebMsd">TRUY CẬP WEBSITE CHÍNH THỨC</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <img class="mt-[70px] desktop w-full" src="@/assets/images/icons/line_color_2.svg" alt="Line color">
        <img class="mt-[89px] mobile w-full" src="@/assets/images/icons/line_color_2_mobile.svg" alt="Line color">
    </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { loadingStore } from "@/store/loading";
const loading = loadingStore();
const aboutMsd = useSetting();
const payload = {
    key: 'about-msd'
};
// onMounted(async () => {
//     loading.setLoading(true);
//     await aboutMsd.fetchAboutMsd(payload);
//     loading.setLoading(false);
// });
const goToWebMsd = () => {
    window.open('https://msdvietnam.org/', '_blank');
}
const convertToEmbedUrl = (url: any) => {
    const match = url.match(/(?:youtube\.com\/(?:watch\?v=|live\/)|youtu\.be\/)([\w\-]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : undefined;
}

const { t } = useI18n()
</script>
<style scoped lang="scss">
@media only screen and (max-width: 767px) {
    .desktop {
        display: none;
    }
}

@media only screen and (min-width: 768px) {
    .mobile {
        display: none;
    }
}
</style>