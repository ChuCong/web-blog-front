<template>
  <div class="pa-o ma-0 mb-[70px]">
    <div class="bg-[#FFFF] rounded-md banner_home  ">
      <div v-if="settingComp.state.banners.length > 0">
        <BoxBanner />
      </div>
      <div class=" 2xl:px-0 content_box_home mx-auto">
        <ListCategoryHome />
        <div v-if="testimonialComp.state.testimonials.length > 0">
          <BoxTestimonnial />
        </div>
        <div id="introduce-section" class="content_introduce md:py-0 pt-10">
          <Introduce />
        </div>
         <BoxCountData />
        <div class="md:px-0 px-[10px] ">
          <BoxNew />
          <BoxContactMsd />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import BoxBanner from "~/components/home/BoxBanner.vue"
import Introduce from "~/components/home/Introduce.vue";
import ListCategoryHome from "~/components/home/ListCategoryHome.vue"
import BoxNew from "~/components/home/BoxNew.vue";
import BoxTestimonnial from "~/components/home/BoxTestimonial.vue";
import BoxCountData from "~/components/home/BoxCountData.vue";
import BoxContactMsd from "~/components/home/BoxContactMsd.vue";
import { useRoute } from 'vue-router';

const route = useRoute();

const settingComp = useSetting()
const testimonialComp = useTestimonial()

onMounted(async () => {
  testimonialComp.fetchTestimonial()
  settingComp.fetchSetting()
  if (settingComp.state.learningStatisticsDetail?.type === 1) {
    console.log(settingComp.state.learningStatisticsDetail.type)
    await settingComp.fetchCountData()
  }

  if (route.query['ve-msd'] !== undefined) {
    setTimeout(() => {
      const element = document.getElementById('introduce-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1500);
  }
})


</script>
<style lang="scss" scoped>
.img_project {
  border-radius: 6px 6px 0px 0px;
}

@media only screen and (max-width: 767px) {
  .desktop {
    display: none;
  }

  .button_detail {
    @apply text-center;
  }

}

@media only screen and (min-width: 768px) {
  .mobile {
    display: none;
  }

  .button_detail {
    @apply flex gap-10 justify-center;
  }
}
</style>
