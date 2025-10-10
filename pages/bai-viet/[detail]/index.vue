<template>
    <div class="w-full p-8">
        <div class="2xl:w-[50%] xl:w-[70%] mx-auto">
            <div class="text-[30px] font-bold">{{ articleComp.state.article.title }}</div>
            <div class="flex items-center gap-2 my-4">
                <img src="@/assets/images/icons/icon_date.svg" alt="">
                <div class="text-[#6D6E70] ">
                    {{formatDateTime(articleComp.state.article.created_at) }}
                </div>
            </div>
            <div v-html="articleComp.state.article.content" class="pt-5 content_new"></div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { loadingStore } from "@/store/loading"
import { useArticle } from '@/composables/useArticle'
import convertDateTime from "~/mixin/convertDateTime";

const { methods } = convertDateTime;
const formatDateTime = methods.formatDateTime;
const loading = loadingStore()
const route = useRoute()
const articleComp = useArticle()
const slugParam = route.params.detail
const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam
onMounted(async () => {
    loading.setLoading(true)
    await articleComp.fetchArticleBySlug(slug)
    loading.setLoading(false)
})
</script>
<style scoped lang="scss">
.content_new {
  ::v-deep(.ql-syntax) {
    background-color: #1e1e1e !important;
    color: #ffffff;
    padding: 10px;
    border-radius: 8px;
  }
}
</style>