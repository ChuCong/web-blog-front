<template>
    <div class="w-full   p-8">
        <div class="2xl:w-[50%] xl:w-[60%] mx-auto">
            <div class="text-2xl font-bold">{{ articleComp.state.article.title }}</div>
            <div>
                <div v-html="articleComp.state.article.content"></div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { loadingStore } from "@/store/loading"
import { useArticle } from '@/composables/useArticle'

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
<style scoped lang="scss"></style>