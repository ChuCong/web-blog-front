<template>
    <div class="w-full ">
        <div class="flex w-full mx-auto p-10 uppercase justify-center text-[28px] title_font text-[#0044B5]">Tài nguyên
        </div>
        <div class="md:flex 2xl:w-[80%] xl:w-[90%] gap-6 mx-auto min-h-[800px] p-8 ">
            <div class="title_font text-[#0044B5] flex items-center gap-2 mb-6 text-base  cursor-pointer border-b border-[#C9CACD] mobile uppercase"
                @click="toggleFilter">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M0.75 6.26284H12.9615C13.2984 7.6238 14.5295 8.63598 15.9931 8.63598C17.4567 8.63598 18.6878 7.6238 19.0246 6.26284H23.25C23.6642 6.26284 24 5.92702 24 5.51284C24 5.09865 23.6642 4.76284 23.25 4.76284H19.0246C18.6878 3.40187 17.4567 2.38965 15.993 2.38965C14.5294 2.38965 13.2983 3.40187 12.9615 4.76284H0.75C0.335812 4.76284 0 5.09865 0 5.51284C0 5.92702 0.335812 6.26284 0.75 6.26284ZM15.9931 3.88965C16.8881 3.88965 17.6163 4.6178 17.6163 5.51279C17.6163 6.40782 16.8881 7.13598 15.9931 7.13598C15.0981 7.13598 14.3699 6.40782 14.3699 5.51279C14.3699 4.6178 15.0981 3.88965 15.9931 3.88965ZM0.75 12.7498H4.97541C5.31225 14.1107 6.54333 15.1229 8.00695 15.1229C9.47058 15.1229 10.7017 14.1107 11.0385 12.7498H23.25C23.6642 12.7498 24 12.414 24 11.9998C24 11.5856 23.6642 11.2498 23.25 11.2498H11.0385C10.7016 9.8888 9.47053 8.87659 8.00691 8.87659C6.54328 8.87659 5.3122 9.8888 4.97536 11.2498H0.75C0.335812 11.2498 0 11.5856 0 11.9998C0 12.414 0.335766 12.7498 0.75 12.7498ZM8.00691 10.3766C8.90194 10.3766 9.63009 11.1047 9.63009 11.9998C9.63009 12.8948 8.90194 13.6229 8.00691 13.6229C7.11187 13.6229 6.38372 12.8948 6.38372 11.9998C6.38372 11.1047 7.11187 10.3766 8.00691 10.3766ZM23.25 17.7367H19.0246C18.6878 16.3757 17.4567 15.3635 15.993 15.3635C14.5294 15.3635 13.2983 16.3757 12.9615 17.7367H0.75C0.335812 17.7367 0 18.0725 0 18.4867C0 18.9009 0.335812 19.2367 0.75 19.2367H12.9615C13.2984 20.5977 14.5295 21.6099 15.9931 21.6099C17.4567 21.6099 18.6878 20.5977 19.0246 19.2367H23.25C23.6642 19.2367 24 18.9009 24 18.4867C24 18.0725 23.6642 17.7367 23.25 17.7367ZM15.9931 20.1099C15.0981 20.1099 14.3699 19.3817 14.3699 18.4867C14.3699 17.5917 15.0981 16.8635 15.9931 16.8635C16.8881 16.8635 17.6163 17.5917 17.6163 18.4867C17.6163 19.3817 16.8881 20.1099 15.9931 20.1099Z"
                        fill="#0044B5" />
                </svg>
                Filter
            </div>
            <div class="filter w-[358px] bg-white rounded-lg p-4 h-fit desktop ">
                <div
                    class="title_font  text-[#0044B5] flex items-center gap-2 mb-4 text-[32px]  cursor-pointer uppercase border-b border-[#C9CACD]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M0.75 6.26284H12.9615C13.2984 7.6238 14.5295 8.63598 15.9931 8.63598C17.4567 8.63598 18.6878 7.6238 19.0246 6.26284H23.25C23.6642 6.26284 24 5.92702 24 5.51284C24 5.09865 23.6642 4.76284 23.25 4.76284H19.0246C18.6878 3.40187 17.4567 2.38965 15.993 2.38965C14.5294 2.38965 13.2983 3.40187 12.9615 4.76284H0.75C0.335812 4.76284 0 5.09865 0 5.51284C0 5.92702 0.335812 6.26284 0.75 6.26284ZM15.9931 3.88965C16.8881 3.88965 17.6163 4.6178 17.6163 5.51279C17.6163 6.40782 16.8881 7.13598 15.9931 7.13598C15.0981 7.13598 14.3699 6.40782 14.3699 5.51279C14.3699 4.6178 15.0981 3.88965 15.9931 3.88965ZM0.75 12.7498H4.97541C5.31225 14.1107 6.54333 15.1229 8.00695 15.1229C9.47058 15.1229 10.7017 14.1107 11.0385 12.7498H23.25C23.6642 12.7498 24 12.414 24 11.9998C24 11.5856 23.6642 11.2498 23.25 11.2498H11.0385C10.7016 9.8888 9.47053 8.87659 8.00691 8.87659C6.54328 8.87659 5.3122 9.8888 4.97536 11.2498H0.75C0.335812 11.2498 0 11.5856 0 11.9998C0 12.414 0.335766 12.7498 0.75 12.7498ZM8.00691 10.3766C8.90194 10.3766 9.63009 11.1047 9.63009 11.9998C9.63009 12.8948 8.90194 13.6229 8.00691 13.6229C7.11187 13.6229 6.38372 12.8948 6.38372 11.9998C6.38372 11.1047 7.11187 10.3766 8.00691 10.3766ZM23.25 17.7367H19.0246C18.6878 16.3757 17.4567 15.3635 15.993 15.3635C14.5294 15.3635 13.2983 16.3757 12.9615 17.7367H0.75C0.335812 17.7367 0 18.0725 0 18.4867C0 18.9009 0.335812 19.2367 0.75 19.2367H12.9615C13.2984 20.5977 14.5295 21.6099 15.9931 21.6099C17.4567 21.6099 18.6878 20.5977 19.0246 19.2367H23.25C23.6642 19.2367 24 18.9009 24 18.4867C24 18.0725 23.6642 17.7367 23.25 17.7367ZM15.9931 20.1099C15.0981 20.1099 14.3699 19.3817 14.3699 18.4867C14.3699 17.5917 15.0981 16.8635 15.9931 16.8635C16.8881 16.8635 17.6163 17.5917 17.6163 18.4867C17.6163 19.3817 16.8881 20.1099 15.9931 20.1099Z"
                            fill="#0044B5" />
                    </svg>
                    Filter
                </div>
                <div v-if="tagComp.state.groupedTags">
                    <div v-for="(group, idx) in tagComp.state.groupedTags" :key="group?.id" class="mb-4">
                        <div class="text-lg title_font text-[#0044B5] justify-between flex cursor-pointer mb-6"
                            @click="group.open = !group.open">
                            <div>{{ group.name }}</div>
                            <img v-if="group.open" src="@/assets/images/icons/icon_arrow_down.svg" alt="Mở filter">
                            <img v-else="!group.open" src="@/assets/images/icons/icon_arrow_up.svg" alt="Đóng filter">
                        </div>
                        <div class="flex flex-col gap-1" v-if="group.open">
                            <template v-for="tag in group.tags" :key="tag.id">
                                <label v-if="tag.resources_count" class="flex items-center gap-3 cursor-pointer mb-4">
                                    <input type="checkbox" v-model="selectedTags" :value="tag.id"
                                        class="accent-primary scale-[1.8]" />
                                    <span>{{ tag.name }} ({{ tag.resources_count
                                        }})</span>
                                </label>
                            </template>
                        </div>
                        <div v-if="idx < tagComp.state.groupedTags.length - 1" class="border-t border-[#C9CACD] mt-4">
                        </div>
                    </div>
                </div>
            </div>
            <div class="grid xl:grid-cols-3 md:grid-cols-2 gap-6 w-full h-fit">
                <div v-for="item in filteredCourses" :key="item.id"
                    class="bg-cover bg-center rounded-lg relative hover:shadow-lg hover:-translate-y-3 hover:z-10 hover:scale-[1.02]">
                    <div class="content-preview">
                        <div v-if="item.type === VIDEO">
                            <div @click="downloadFile(item.media?.src_url)"
                                class="absolute top-2 right-2 flex gap-2 px-3 py-1 border-[2px] w-fit rounded-[8px] border-[#F27619] cursor-pointer z-10">
                                <img src="@/assets/images/icons/icon_download_resource.svg" alt="Download">
                                <p class="text-[#F27619] text-[14px] font-semibold">Download</p>
                            </div>
                            <video controls class="max-w-full rounded-lg shadow-lg">
                                <source :src="item.media?.src_url" type="video/mp4" />
                            </video>
                            <div class="title_resource">{{ item.title }}</div>
                        </div>
                        <div v-else-if="item.type === LINK" class="border rounded-[10px] overflow-hidden"
                            style="aspect-ratio: 16/9;">
                            <div @click="downloadFileGoogleDrive(item.url)"
                                class="absolute top-2 right-2 flex gap-2 px-3 py-1 border-[2px] w-fit rounded-[8px] border-[#F27619] cursor-pointer z-10">
                                <img src="@/assets/images/icons/icon_download_resource.svg" alt="Download">
                                <p class="text-[#F27619] text-[14px] font-semibold">Download</p>
                            </div>
                            <img :src="viewUrl(item.url)" class="w-full h-full object-cover">
                            <div class="title_resource">{{ item.title }}</div>
                        </div>
                        <div v-else-if="item.type === IMAGE">
                            <div @click="downloadFile(item.media?.src_url)"
                                class="absolute top-2 right-2 flex gap-2 px-3 py-1 border-[2px] w-fit rounded-[8px] border-[#F27619] cursor-pointer z-10">
                                <img src="@/assets/images/icons/icon_download_resource.svg" alt="Download">
                                <p class="text-[#F27619] text-[14px] font-semibold">Download</p>
                            </div>
                            <img :src="item.media?.src_url" :alt="item.title" class="rounded-[10px] w-[100%] aspect-video">
                            <div class="title_resource">{{ item.title }}</div>
                        </div>
                        <div v-else class="bg-cover bg-center rounded-lg relative content_file aspect-video"
                            :style="item.image_thumbnail_url ? { backgroundImage: `url('${item.image_thumbnail_url}')` } : {}">
                            <div @click="downloadFile(item.media?.src_url)"
                                class="absolute top-2 right-2 flex gap-2 px-3 py-1 border-[2px] w-fit rounded-[8px] border-[#F27619] cursor-pointer z-10">
                                <img src="@/assets/images/icons/icon_download_resource.svg" alt="Download">
                                <p class="text-[#F27619] text-[14px] font-semibold">Download</p>
                            </div>
                            <div
                                class=" absolute bottom-2 left-0 right-0 px-4 overflow-hidden line-clamp-2 font-semibold text-[#ffffff] ">
                                {{ item.title }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="isFilterVisible" class="filter-popup mobile">
            <div class="pt-10 pb-4 w-fit mx-auto">
                <img @click="toggleFilter" src="@/assets/images/icons/icon_close_popup.svg" alt="Close popup">
            </div>
            <div class="filter-content overflow-y-auto max-h-[calc(100vh-150px)]">
                <div class="flex items-center gap-2 mb-4 text-lg justify-between border-b border-[#C9CACD]">
                    <div class="flex items-center gap-2 text-base title_font text-[#0044B5] cursor-pointer uppercase">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M0.75 6.26284H12.9615C13.2984 7.6238 14.5295 8.63598 15.9931 8.63598C17.4567 8.63598 18.6878 7.6238 19.0246 6.26284H23.25C23.6642 6.26284 24 5.92702 24 5.51284C24 5.09865 23.6642 4.76284 23.25 4.76284H19.0246C18.6878 3.40187 17.4567 2.38965 15.993 2.38965C14.5294 2.38965 13.2983 3.40187 12.9615 4.76284H0.75C0.335812 4.76284 0 5.09865 0 5.51284C0 5.92702 0.335812 6.26284 0.75 6.26284ZM15.9931 3.88965C16.8881 3.88965 17.6163 4.6178 17.6163 5.51279C17.6163 6.40782 16.8881 7.13598 15.9931 7.13598C15.0981 7.13598 14.3699 6.40782 14.3699 5.51279C14.3699 4.6178 15.0981 3.88965 15.9931 3.88965ZM0.75 12.7498H4.97541C5.31225 14.1107 6.54333 15.1229 8.00695 15.1229C9.47058 15.1229 10.7017 14.1107 11.0385 12.7498H23.25C23.6642 12.7498 24 12.414 24 11.9998C24 11.5856 23.6642 11.2498 23.25 11.2498H11.0385C10.7016 9.8888 9.47053 8.87659 8.00691 8.87659C6.54328 8.87659 5.3122 9.8888 4.97536 11.2498H0.75C0.335812 11.2498 0 11.5856 0 11.9998C0 12.414 0.335766 12.7498 0.75 12.7498ZM8.00691 10.3766C8.90194 10.3766 9.63009 11.1047 9.63009 11.9998C9.63009 12.8948 8.90194 13.6229 8.00691 13.6229C7.11187 13.6229 6.38372 12.8948 6.38372 11.9998C6.38372 11.1047 7.11187 10.3766 8.00691 10.3766ZM23.25 17.7367H19.0246C18.6878 16.3757 17.4567 15.3635 15.993 15.3635C14.5294 15.3635 13.2983 16.3757 12.9615 17.7367H0.75C0.335812 17.7367 0 18.0725 0 18.4867C0 18.9009 0.335812 19.2367 0.75 19.2367H12.9615C13.2984 20.5977 14.5295 21.6099 15.9931 21.6099C17.4567 21.6099 18.6878 20.5977 19.0246 19.2367H23.25C23.6642 19.2367 24 18.9009 24 18.4867C24 18.0725 23.6642 17.7367 23.25 17.7367ZM15.9931 20.1099C15.0981 20.1099 14.3699 19.3817 14.3699 18.4867C14.3699 17.5917 15.0981 16.8635 15.9931 16.8635C16.8881 16.8635 17.6163 17.5917 17.6163 18.4867C17.6163 19.3817 16.8881 20.1099 15.9931 20.1099Z"
                                fill="#0044B5" />
                        </svg>
                        Filter
                    </div>
                </div>
                <div v-if="tagComp.state.groupedTags" class="content_select">
                    <div v-for="(group, idx) in tagComp.state.groupedTags" :key="group?.id" class="mb-4">
                        <div class="text-lg title_font text-[#0044B5] justify-between flex cursor-pointer mb-6"
                            @click="group.open = !group.open">
                            <span>{{ group.name }}</span>
                            <img src="@/assets/images/icons/icon_arrow_down.svg" alt="Mở filter">
                        </div>
                        <div class="flex flex-col gap-1" v-if="group.open">
                            <template v-for="tag in group.tags" :key="tag.id">
                                <label v-if="tag.resources_count" class="flex items-center gap-3 cursor-pointer mb-4">
                                    <input type="checkbox" v-model="selectedTags" :value="tag.id"
                                        class="accent-primary scale-[1.8]" />
                                    <span class="text-[15px] font-[400] text-[#4D4E50]">{{ tag.name
                                    }}({{ tag.resources_count }})</span>
                                </label>
                            </template>
                        </div>
                        <div v-if="idx < tagComp.state.groupedTags.length - 1" class="border-t border-[#C9CACD] mt-4">
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
import { VIDEO, LINK, IMAGE, TAG_RESOURCE_PAGE } from '~/common/Constant'
import Logo from '@/assets/images/Logo_MSD.png'

const config = useRuntimeConfig()
let pageURL = config.public.pageURL;
const loading = loadingStore()
const tagComp = useTag()
const resourcesComp = useResources()
const selectedTags = ref<number[]>([])
const isFilterVisible = ref(false)
const toggleFilter = () => {
    isFilterVisible.value = !isFilterVisible.value;
}
const payload: { limit: number; page: number; tag_selected: string | null } = {
    limit: 20,
    page: 1,
    tag_selected: null
}
onMounted(async () => {
    loading.setLoading(true)
    await resourcesComp.fetchResources(payload)
    await tagComp.fetchTags({ tag_selected: null, page: TAG_RESOURCE_PAGE })
    loading.setLoading(false)
})

const downloadFileGoogleDrive = (url: string) => {
    const fileId = url.split('/d/')[1].split('/')[0];
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    window.location.href = downloadUrl;
};

const downloadFile = (url: any) => {
    window.open(url);
}

const viewUrl = (url: string) => {
    const fileId = url.split('/d/')[1].split('/')[0];
    console.log(fileId)
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w320`;
}

// Lọc course theo selectedTags (nếu có chọn tag nào)
const filteredCourses = computed(() => {
    return resourcesComp.state.resources
})

watch(() => selectedTags.value, (newVal) => {
    if (newVal) {
        loading.setLoading(true)
        payload.tag_selected = newVal.join(',')
        resourcesComp.fetchResources(payload)
        tagComp.fetchTags({ tag_selected: newVal.join(','), page: TAG_RESOURCE_PAGE })
        loading.setLoading(false)
    }
}, { deep: true, immediate: true })

useHead({
    title: 'Tài nguyên học tập độc quyền - MSD Vietnam LMS',
    meta: [
        {
            property: 'og:title',
            content: 'Tài nguyên học tập độc quyền - MSD Vietnam LMS'
        },
        {
            name: 'keywords',
            content: 'tài nguyên học tập MSD, học liệu trực tuyến NGO, tài liệu SDG, nền tảng LMS Việt Nam'
        },
        {
            name: 'description',
            content: 'Truy cập tài nguyên học tập độc quyền trên MSD Vietnam LMS – video giảng dạy, tài liệu và bài luyện tập dành riêng cho học viên đăng ký.'
        },
        {
            property: 'og:description',
            content: 'Truy cập tài nguyên học tập độc quyền trên MSD Vietnam LMS – video giảng dạy, tài liệu và bài luyện tập dành riêng cho học viên đăng ký.'
        },
        {
            property: 'og:type',
            content: 'website'
        },
        {
            property: 'og:url',
            content: pageURL + '/resource'
        },
        {
            property: 'og:image',
            content: pageURL + Logo
        }
    ],
    link: [
        { rel: 'canonical', href: pageURL + '/resource' }
    ],
    script: [
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ItemList",
                "name": "Tài nguyên học tập độc quyền - MSD Vietnam LMS",
                "description": "Truy cập tài nguyên học tập độc quyền trên MSD Vietnam LMS – video giảng dạy, tài liệu và bài luyện tập dành riêng cho học viên đăng ký",
                "itemListElement": {
                    "@type": "ListItem",
                    "position": 3,
                    "url": `${pageURL}/resource`,
                    "name": 'Tài nguyên học tập độc quyền - MSD Vietnam LMS'
                }
            })
        }
    ]
})
</script>

<style scoped lang="scss">
.title_resource {
    @apply absolute bottom-2 left-0 right-0 px-4 overflow-hidden line-clamp-2 font-semibold text-white;
}

.content_file {
    height: auto;
    border: 1px solid #EBECEE;
    border-radius: 10px;
    background-image: url('@/assets/images/MSD_UW.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
}

.filter-popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
}

.filter-content {
    background: white;
    padding: 20px;
    max-width: 500px;
    width: 98%;
    margin: 0px auto;
}

@media screen and (max-width: 639px) {
    .desktop {
        display: none;
    }
}

@media screen and (min-width: 640px) {
    .mobile {
        display: none;
    }
}
</style>