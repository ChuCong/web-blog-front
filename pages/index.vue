<template>
  <div class="pa-o ma-0 mb-[70px] 2xl:w-[80%] xl:w-[90%] mx-auto px-[10px]">
    <div class="bg-[#FFFF] rounded-md banner_home md:flex justify-center gap-5 pt-10">
      <div class="md:w-[70%]">
        <div class="md:flex gap-5 ">
          <img v-if="articleComp.state.articles[0]?.url" :src="articleComp.state.articles[0].url?.toString()"
            class="md:w-[350px] rounded-[10px]" alt="">
          <a :href="`/bai-viet/${articleComp.state.articles[0]?.slug}`">
            <div class="text-[#353637] md:py-0 py-3 text-[20px] font-semibold hover:text-[#1894D7] h-[59px] overflow-hidden">
              {{ articleComp.state.articles[0]?.title }}
            </div>
            <div class="flex items-center gap-2 my-4">
              <img src="@/assets/images/icons/icon_date.svg" alt="">
              <div class="text-[#6D6E70] ">
                {{ formatDateTime(articleComp.state.articles[0]?.created_at) }}
              </div>
            </div>
            <div>
              {{ articleComp.state.articles[0]?.description }}
            </div>
          </a>
        </div>
      </div>
      <div class="w-[30%] desktop border-l-2 pl-5 h-fit">
        <div class="flex md:flex-wrap gap-3">
          <div v-for="value in categoryComp.state.categories" :key="value.id"
            class="border border-gray-200 rounded-full px-4 py-2 text-sm text-center hover:bg-[#1894D7] hover:text-[#fff] ">
            <a :href="`/chuyen-muc/${value.slug}`" class="cursor-pointer">{{ value.title }}</a>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 xl:grid-cols-3 gap-4 mt-10">
      <div v-for="value in articleComp.state.articles.slice(2)" :key="value.id">
        <a :href="`/bai-viet/${value.slug}`">
          <img v-if="value.url" :src="value.url?.toString()" class=" rounded-[10px]" alt="">
          <div class="text-[#353637] py-3 text-[16px] font-semibold hover:text-[#1894D7] h-[59px] overflow-hidden">
            {{ value.title }}
          </div>
          <div class="flex items-center gap-2 my-4">
            <img src="@/assets/images/icons/icon_date.svg" alt="">
            <div class="text-[#6D6E70] ">
              {{ formatDateTime(value.created_at) }}
            </div>
          </div>
          <div>
            {{ value.description }}
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { loadingStore } from '@/store/loading';
import convertDateTime from "~/mixin/convertDateTime";

const { methods } = convertDateTime;
const formatDateTime = methods.formatDateTime;
const route = useRoute();
const loading = loadingStore();
const articleComp = useArticle();
const categoryComp = useCategory();
onMounted(async () => {
  loading.setLoading(true);
  const payloadCategory = {
    page: 1,
    limit: 100,
  };
  const payloadArticle = {
    page: 1,
    limit: 20,
  };
  await articleComp.fetchArticles(payloadArticle);
  await categoryComp.fetchCategories(payloadCategory);
  loading.setLoading(false);
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
