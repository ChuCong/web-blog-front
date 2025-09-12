<template>
    <div class="w-full">
        <div class="flex w-full mx-auto p-10 uppercase justify-center text-[28px] font-bold">Tin tức</div>
        <div class="md:flex md:w-[80%] gap-6 mx-auto min-h-[800px] p-8">
            <div class="grid 2xl:grid-cols-4 xl:grid-cols-3 grid-cols-2 gap-6">
                <div v-for="item in newsComp.state.news" :key="item.id">
                    <div @mouseover="hoveredItem = item.id" @mouseleave="hoveredItem = null"
                        class="border cursor-pointer text-left border-[#C9CACD] rounded-[10px] hover:-translate-y-3 hover:z-10 hover:scale-[1.02]">
                        <img :src="item.media.src_url" alt="Ảnh tin tức" class="w-[100%]">
                        <div class="px-3 pt-4 pb-10">
                            <div class="text-[#6D6E70] italic text-[12px] mb-2 text_font_svn">{{
                                formatDateDay(item.created_at) }}
                            </div>
                            <div class="font-bold text-[#2B2C2E] overflow-hidden text-ellipsis line-clamp-2">{{
                                item.title }}
                            </div>
                            <div :class="{'line-clamp-3': hoveredItem !== item.id, 'line-clamp-none': hoveredItem === item.id}"
                                class="text_font_svn mt-4 text-[#2B2C2E] h-auto ">
                                {{ item.description }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { loadingStore } from "@/store/loading"
import { useTag } from "@/composables/useTag"
import convertDateTime from "~/mixin/convertDateTime"

const { formatDateDay } = convertDateTime.methods;
const loading = loadingStore()
const newsComp = useNews()

const payload = {
    limit: 20,
    page: 1,
}

const hoveredItem = ref<number | null>(null);

onMounted(async () => {
    loading.setLoading(true)
    await newsComp.fetchNews(payload)
    loading.setLoading(false)
})

const openFile = (url: any) => {
    window.open(url, '_bran');
}
</script>

<style scoped lang="scss">
.title_resource {
    @apply overflow-hidden line-clamp-2 font-semibold text-[#2B2C2E];
}
// .line-clamp-none {
//     display: block; 
// }
</style>