<template>
    <div class="" :style="{
        backgroundImage: `url(${bannerComp.state.courseBanner?.image_url})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    }">
        <div
            class="xl:w-[45%] md:w-[55%] bg-white md:pb-10 pt-10  md:relative md:h-[350px] md:flex md:items-center ">
            <img src="@/assets/images/line_banner_course.png" class="absolute top-0 h-[350px] right-[-150px] desktop"
                alt="Ảnh Banner khóa học">
            <div class="box_title text-center w-fit 2xl:pl-[30%] xl:pl-[18%] md:pl-[10%] ">
                <img src="@/assets/images/Logo_MSD.png" alt="MSD Viêt Nam" class="w-[195px] mb-5" />
                <div class="uppercase text-[#0044B5] title_font text-[42px]">
                    Các khóa học
                </div>
            </div>
        </div>

    </div>
</template>
<script setup lang="ts">
const bannerComp = useSetting();
onMounted(async () => {
    bannerComp.fetchSetting()
})
</script>
<style scoped lang="scss">
@media screen and (max-width:768px) {
    .desktop {
        display: none;
    }

}
</style>