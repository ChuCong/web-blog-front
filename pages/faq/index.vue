<template>
    <div class="md:px-10 px-[10px] 2xl:px-0 py-10 min-h-[422px]">
        <div class="2xl:w-[69.3%] mx-auto">
            <div v-for="item in faqComp.state.faqs" :key="item.id"
                class="border border-[#ABADAF] mb-6 rounded-[6px] flex">
                <div class="w-[10px] bg-primary box_left"></div>
                <div class="w-full" @click="toggleAnswer(item.id)" @mouseenter="hoverId = item.id"
                    @mouseleave="hoverId = null">
                    <div class="flex items-center justify-between hover:bg-[#757575] ">
                        <div class="title" v-html="item.title"></div>
                        <div v-if="isOpen(item.id)" class="pr-5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"
                                fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    :fill="hoverId === item.id ? '#FFF' : '#6D6E70'"
                                    d="M9.4623 15.5255L15.5789 9.40887C15.8776 9.11017 16.3608 9.11017 16.6595 9.40887L22.7761 15.5255C23.0748 15.8231 23.0748 16.3084 22.7761 16.6061C22.4784 16.9048 21.9932 16.9048 21.6955 16.6061L16.1192 11.0308L10.5429 16.6061C10.2452 16.9048 9.75998 16.9048 9.4623 16.6061C9.16361 16.3084 9.16361 15.8231 9.4623 15.5255Z" />
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    :fill="hoverId === item.id ? '#FFF' : '#6D6E70'"
                                    d="M9.4623 20.6231L15.5789 14.5065C15.8776 14.2078 16.3608 14.2078 16.6595 14.5065L22.7761 20.6231C23.0748 20.9208 23.0748 21.406 22.7761 21.7037C22.4784 22.0024 21.9932 22.0024 21.6955 21.7037L16.1192 16.1284L10.5429 21.7037C10.2452 22.0024 9.75998 22.0024 9.4623 21.7037C9.16361 21.406 9.16361 20.9208 9.4623 20.6231Z" />
                            </svg>
                        </div>
                        <img v-else src="@/assets/images/icons/icon_turn_down_faq.svg" alt="Icon down" class="pr-5">
                    </div>
                    <div v-if="isOpen(item.id)" class="answer py-4 px-[24px] border-t border-[#ABADAF] text-[#2B2C2E]"
                        v-html="item.answer"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { loadingStore } from "@/store/loading"
import Logo from '@/assets/images/Logo_MSD.png'

const loading = loadingStore()
const faqComp = useFaq()
const config = useRuntimeConfig()
let pageURL = config.public.pageURL;
const selectedId = ref<number | null>(null)
const hoverId = ref<number | null>(null)
const payload = {
    limit: 20,
    page: 1,
}

const isOpen = (id: number) => {
    return selectedId.value === id || hoverId.value === id
}

const toggleAnswer = (id: number) => {
    selectedId.value = selectedId.value === id ? null : id
}

onMounted(async () => {
    loading.setLoading(true)
    await faqComp.fetchFaqs(payload)
    loading.setLoading(false)
    if (faqComp.state.faqs.length > 0) {
        selectedId.value = faqComp.state.faqs[0].id
    }
})
const { data: faq } = await useAsyncData('course', () =>
    faqComp.fetchFaqs(payload)
)
useHead({
    title: 'FAQ – Câu hỏi thường gặp về học trực tuyến trên MSD Vietnam LMS',
    meta: [
        {
            property: 'og:title',
            content: 'FAQ – Câu hỏi thường gặp về học trực tuyến trên MSD Vietnam LMS'
        },
        {
            name: 'keywords',
            content: 'FAQ LMS MSD Vietnam, câu hỏi thường gặp MSD, học trực tuyến NGO, đăng ký khóa học MSD, chứng chỉ MSD Vietnam, tài nguyên LMS, tạo xu hướng dẫn dắt thay đổi'
        },
        {
            name: 'description',
            content: 'Tìm câu trả lời cho các câu hỏi thường gặp về LMS MSD Vietnam: cách đăng ký khóa học, truy cập tài nguyên, nhận chứng chỉ và hỗ trợ học viên. Giúp bạn học tập hiệu quả để tạo xu hướng và dẫn dắt thay đổi.'
        },
        {
            property: 'og:description',
            content: 'Tìm câu trả lời cho các câu hỏi thường gặp về LMS MSD Vietnam: cách đăng ký khóa học, truy cập tài nguyên, nhận chứng chỉ và hỗ trợ học viên. Giúp bạn học tập hiệu quả để tạo xu hướng và dẫn dắt thay đổi.'
        },
        {
            property: 'og:type',
            content: 'website'
        },
        {
            property: 'og:url',
            content: pageURL + '/faq'
        },
        {
            property: 'og:image',
            content: pageURL + Logo
        }
    ],
    link: [
        { rel: 'canonical', href: pageURL + '/faq' }
    ],
    script: [
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ItemList",
                "name": "FAQ – Câu hỏi thường gặp về học trực tuyến trên MSD Vietnam LMS",
                "description": "Tìm câu trả lời cho các câu hỏi thường gặp về LMS MSD Vietnam: cách đăng ký khóa học, truy cập tài nguyên, nhận chứng chỉ và hỗ trợ học viên. Giúp bạn học tập hiệu quả để tạo xu hướng và dẫn dắt thay đổi.",
                "itemListElement": {
                    "@type": "ListItem",
                    "position": 3,
                    "url": `${pageURL}/faq`,
                    "name": 'FAQ – Câu hỏi thường gặp về học trực tuyến trên MSD Vietnam LMS'
                }
            })
        }
    ]
})
</script>

<style scoped>
.title {
    cursor: pointer;
    @apply px-[34px] py-4 w-full text-[#2B2C2E] font-semibold text-[18px] hover:text-[#FFF];
}

.box_left {
    border-radius: 6px 0px 0px 6px;
}
</style>