<template>
    <div class="w-full">
        <div v-if="categoryComp.state.categories.length < 1" class="w-fit mx-auto mt-[14%]">
            <img src="@/assets/images/coming_soon.png" alt="">
        </div>
        <div v-else>
            <div class="text-2xl font-bold text-center my-8 text-[#F36F21]">
                Danh Sách Chuyên Mục
            </div>
            <div class="sm:flex 2xl:w-[80%] xl:w-[98%] gap-6 mx-auto  p-8">
                <div class="items w-full">
                    <div class="grid xl:grid-cols-3 md:grid-cols-2 gap-6">
                        <a v-for="item in categoryComp.state.categories" :key="item.id"
                            :href="`/chuyen-muc/${item.slug}`"
                            class="relative bg-white rounded-lg shadow overflow-hidden flex flex-col hover:shadow-lg transition duration-300 hover:-translate-y-3 hover:z-10 hover:scale-[1.02] cursor-pointer">
                            <div class="relative">
                                <img v-if="item.url" :src="item.url" alt="item image"
                                    class="w-full h-[220px] object-cover" />
                            </div>
                            <div class=" p-4 flex flex-col gap-2 h-full">
                                <div
                                    class=" bottom-2 left-0 w-full px-4 text-[18px] leading-snug line-clamp-2 hover:line-clamp-none title_font">
                                    {{ item.title }}
                                </div>
                                <div>
                                    {{ item.description }}
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div @click="loadMore"
                v-if="categoryComp.state.paginate && categoryComp.state.paginate.current_page < categoryComp.state.paginate.total_page"
                class="px-[60px] text-[#F36F21] py-2 w-fit mx-auto mb-10 border border-[#F36F21] rounded-lg cursor-pointer">
                Xem thêm
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { loadingStore } from "@/store/loading"
import { useCategory } from '@/composables/useCategory'

const loading = loadingStore()
const route = useRoute()
const categoryComp = useCategory()
const payload = {
    page: 1,
    limit: 10,
}
onMounted(async () => {
    loading.setLoading(true)
    await categoryComp.fetchCategories(payload)
    loading.setLoading(false)
})
const loadMore = async () => {
    if (categoryComp.state.paginate.current_page < categoryComp.state.paginate.total_page) {
        const payloadMore = {
            page: payload.page ,
            limit: payload.limit + 10,
        }
        loading.setLoading(true)
        await categoryComp.fetchCategories(payloadMore)
        loading.setLoading(false)
    }
}
</script>
<style scoped lang="scss"></style>