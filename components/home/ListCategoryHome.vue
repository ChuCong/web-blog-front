<template>
    <div class="mx-auto md:pt-[90px] pt-[50px] ">
        <div class="2xl:w-[95%] xl:w-[92%] md:w-[90%] mx-auto">
            <div class="md:px-0 px-[10px]">
                <div class="flex items-center justify-center gap-4 ">
                    <img src="@/assets/images/Logo_MSD.png" alt="Msd VietNam" class="w-[117px] h-[60px]" />
                    <div class="text-[#0044B5] md:text-[42px] text-[32px] title_font">CHƯƠNG TRÌNH</div>
                </div>
                <!-- <p class="pt-4 text-[#333] text-[18px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                    finibus, elit quis dapibus
                    tincidunt, arcu metus iaculis sem.</p> -->
            </div>
            <ClientOnly>
                <Carousel :gap="20" :wrapAround="true" :clamp="false" :transition="500" :autoplay="5000" :breakpoints="{
                    1281: { itemsToShow: 5 },
                    1280: { itemsToShow: 3 },
                    1024: { itemsToShow: 3 },
                    768: { itemsToShow: 2 },
                    600: { itemsToShow: 2 }
                }" class="desktop" v-if="categoryComp.state.categories.length > 0">
                    <Slide v-for="item in categoryComp.state.categories" :key="item.id">
                        <div
                            class="mt-[27px] rounded-[10px] gap-3 item_category 2xl:w-[98%] md:w-[97%] min-h-[520px] flex flex-col hover:shadow-2xl hover:-translate-y-4 hover:z-10 hover:scale-[1.02] ">
                            <div class="title_font uppercase text-[#FFF] text-[20px] bg-primary border-b-[2px] border-[#21296B] rounded-[8px]
                                            flex items-center justify-center min-h-[60px] px-1 w-full">
                                <span
                                    class="truncate hover:whitespace-normal hover:overflow-visible hover:text-clip hover:p-2 hover">{{
                                        item.title }}
                                </span>
                            </div>
                            <div class="bg-white px-3 rounded-[10px] flex-1 flex flex-col justify-between">
                                <div>
                                    <img :src="item.full_url" :alt="item.title"
                                        class="rounded-[20px] h-[192px] w-full object-cover" />
                                    <div class="mt-4 text-[#2B2C2E] h-[54px] overflow-hidden text-ellipsis line-clamp-2"
                                        v-html="item.description"></div>

                                    <div class="mt-[15px] h-[125px] overflow-y-auto scrollbar-thin">
                                        <div v-if="item.courses && item.courses.length > 0">
                                            <div v-for="course in item.courses" :key="course.id">
                                                <a :href="`/khoa-hoc/${course.slug}`"
                                                    class="flex justify-between mb-2 text-[#2B2C2E] font-semibold">
                                                    <p>{{ course.title }}</p>
                                                    <img src="@/assets/images/icons/icon_back.svg" alt="Back" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex justify-end my-4">
                                    <div>
                                        <div class="flex justify-start">
                                            <img class="px-2" src="@/assets/images/icons/icon_number_course.svg"
                                                alt="Số khóa học" />
                                            <span class="text-[16px] font-medium text-[#F27619]">
                                                {{ item.courses ? item.courses.length : 0 }} khóa học
                                            </span>
                                        </div>
                                        <div class="flex justify-start">
                                            <img class="px-2" src="@/assets/images/icons/icon_number_user.svg"
                                                alt="Số học viên" />
                                            <span class="text-[16px] font-medium text-[#F27619]">
                                                {{ item.students_count }} học viên
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Slide>
                    <template #addons class="w-fit">
                        <Navigation>
                            <template #prev>
                                <button class="custom-prev">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="41" viewBox="0 0 25 41"
                                        fill="none">
                                        <path
                                            d="M19.5613 0.00337236C18.8537 -0.0592517 18.2174 0.765165 17.7594 1.24079C11.7725 7.45484 6.16687 14.0866 0.225664 20.3459C-0.123089 20.9047 -0.0595379 21.4398 0.360516 21.9329L18.7266 40.7193C19.2854 41.1418 19.8419 41.0641 20.365 40.6416C21.8088 39.4763 23.1271 37.5786 24.5663 36.3443C24.9941 35.8743 25.0576 35.1006 24.605 34.6305L12.0732 21.8171C11.3052 20.8263 11.7562 20.3372 12.4444 19.5333C16.259 15.0823 20.551 11.0133 24.4175 6.60505C24.9592 6.02479 25.2522 5.33672 24.7159 4.62487L20.2526 0.291917C20.0705 0.158742 19.7822 0.0223966 19.5621 0.00257887L19.5613 0.00337236Z"
                                            fill="#21296B" />
                                    </svg>
                                </button>
                            </template>
                            <template #next>
                                <button class="custom-next">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"
                                        fill="none">
                                        <path
                                            d="M17.4387 4.00337C18.1463 3.94075 18.7826 4.76516 19.2406 5.24079C25.2275 11.4548 30.8331 18.0866 36.7743 24.3459C37.1231 24.9047 37.0595 25.4398 36.6395 25.9329L18.2734 44.7193C17.7146 45.1418 17.1581 45.0641 16.635 44.6416C15.1912 43.4763 13.8729 41.5786 12.4337 40.3443C12.0059 39.8743 11.9424 39.1006 12.395 38.6305L24.9268 25.8171C25.6948 24.8263 25.2438 24.3372 24.5556 23.5333C20.741 19.0823 16.449 15.0133 12.5825 10.6051C12.0408 10.0248 11.7478 9.33672 12.2841 8.62487L16.7474 4.29192C16.9295 4.15874 17.2178 4.0224 17.4379 4.00258L17.4387 4.00337Z"
                                            fill="#21296B" />
                                    </svg>
                                </button>
                            </template>
                        </Navigation>
                    </template>
                </Carousel>
            </ClientOnly>
            <div class=" px-[30px]">
                <div v-for="item in categoryComp.state.categories" :key="item.id" class="mobile ">
                    <div class="mt-[27px] rounded-[10px] gap-3 item_category  min-h-[520px] shadow-lg  ">
                        <div
                            class="title_font uppercase text-[#FFF] text-[20px] px-4 text-center pt-3 pb-2 bg-primary border-b-[2px] border-[#21296B] rounded-[8px]">
                            {{ item.title }}
                        </div>
                        <div class="bg-white px-3 rounded-[10px] flex-1 flex flex-col justify-between">
                            <div>
                                <img :src="item.full_url" :alt="item.title"
                                    class="rounded-[20px] mt-4 h-[192px] w-full object-cover" />
                                <div class="text-[#2B2C2E] h-[54px] overflow-hidden text-ellipsis line-clamp-1"
                                    v-html="item.description"></div>

                                <div class="mt-[15px] h-[120px] overflow-y-auto scrollbar-thin">
                                    <div v-if="item.courses && item.courses.length > 0">
                                        <div v-for="course in item.courses" :key="course.id">
                                            <a :href="`/khoa-hoc/${course.slug}`"
                                                class="flex justify-between mb-2 text-[#2B2C2E] font-semibold">
                                                <p>{{ course.title }}</p>
                                                <img src="@/assets/images/icons/icon_back.svg" :alt="item.title" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex justify-end my-4">
                                <div>
                                    <div class="flex justify-start">
                                        <img class="px-2" src="@/assets/images/icons/icon_number_course.svg"
                                            alt="Số khóa học" />
                                        <span class="text-[16px] font-medium text-[#F27619]">
                                            {{ item.courses ? item.courses.length : 0 }} khóa học
                                        </span>
                                    </div>
                                    <div class="flex justify-start">
                                        <img class="px-2" src="@/assets/images/icons/icon_number_user.svg"
                                            alt="Số học viên" />
                                        <span class="text-[16px] font-medium text-[#F27619]">
                                            {{ item.students_count }} học viên
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <img class="pt-8 w-full desktop" src="@/assets/images/icons/line_color_1.svg" alt="Line color">
        <img class="pt-5 mobile w-full" src="@/assets/images/icons/line_color_1_mobile.svg" alt="Line color">
    </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n()

const categoryComp = useCategory()
const { data: listCategory } = await useAsyncData(() => categoryComp.fetchCategories());
</script>
<style scoped lang="scss">
.scrollbar-thin::-webkit-scrollbar {
    width: 4px;
    height: 4px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
    background: #bdbdbd;
    border-radius: 8px;
}

.scrollbar-thin::-webkit-scrollbar-track {
    background: transparent;
}

.item_category {
    position: relative;
    border: 2px solid transparent;
    background: linear-gradient(#fff, #fff) padding-box,
        linear-gradient(180deg, rgba(33, 41, 107, 1), rgba(242, 118, 25, 1)) border-box;
}

:deep(.carousel__prev),
:deep(.carousel__next) {
    // font-size: 10px;
    width: 60px;
    height: 60px;
    color: #1F296F;
    display: flex;
    align-items: center;
    justify-content: center;
    // transition: transform 0.2s ease;
}

:deep(.carousel__prev) {
    @apply 2xl:left-[-50px] md:left-[-48px];
    // left: -40px;
}

:deep(.carousel__next) {
    @apply 2xl:right-[-50px] md:right-[-48px];
}

@media (max-width: 768px) {

    :deep(.carousel__prev) {
        left: -23px;
    }

    :deep(.carousel__next) {
        right: -23px;
    }

    .desktop {
        display: none;
    }
}

@media (min-width: 769px) {
    .desktop {
        display: block;
    }

    .mobile {
        display: none;
    }
}
</style>