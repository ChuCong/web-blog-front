<template>
    <div class="content_footer ">
        <div class="2xl:w-[90%] md:w-[95%] mx-auto px-4">
            <div class="md:flex justify-between pt-[60px] md:pb-[50px]">
                <div class="md:w-[40%] pb-[42px] md:pb-0">
                    <img class="w-[195px] h-[100px]" src="@/assets/images/MSD_mobile.png" alt="Msd VietNam">
                    <div class="text-[#FFF] pt-4">
                        <div class="flex gap-4 items-start">
                            <img src="@/assets/images/icons/icon_map.svg" alt="Map">
                            <p class="leading-[22px] tracking-[1.1px] whitespace-pre-line">{{ t('footer.address') }}</p>
                        </div>
                        <div class="flex gap-4 items-start mt-4">
                            <img src="@/assets/images/icons/icon_phone.svg" alt="Phone number">
                            <p class="leading-[22px] tracking-[1.1px]">{{ t('footer.phone') }}</p>
                        </div>
                        <div class="flex gap-4 items-start mt-4">
                            <img src="@/assets/images/icons/icon_email.svg" alt="Email">
                            <p class="leading-[22px] tracking-[1.1px]">contact@msdvietnam.org </p>
                        </div>
                    </div>
                </div>
                <div class="md:w-[52%]">
                    <div class="md:grid gap-[48px] grid-cols-2">
                        <div v-for="menu in listMenuFooter" :key="menu.title" class="mb-[48px] max-w-[250px]">
                            <div class="flex text-[#FFF] justify-between pb-[7px] border-b font-semibold">
                                {{ menu.title }}
                                <img src="@/assets/images/icons/icon_two_turn_down.svg" alt="Icon Down">
                            </div>
                            <div v-if="menu.listItem.length > 0" class="pt-[15px] ">
                                <div v-for="item in menu.listItem" :key="item.name">
                                    <a v-if="item.slug.startsWith('http')" :href="item.slug" target="_blank"
                                        class="text-[#FFF] pb-[10px]">
                                        {{ item.name }}
                                    </a>
                                    <a v-else :href="`/${item.slug}`">
                                        <div class="text-[#FFF] pb-[10px] ">
                                            {{ item.name }}
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="max-w-[250px]">
                            <div class="flex text-[#FFF] justify-between pb-[7px] border-b font-semibold">
                                {{ t('category.title') }}
                                <img src="@/assets/images/icons/icon_two_turn_down.svg" alt="Icon Down">
                            </div>
                            <div v-if="categoryComp.state.categories.length > 0" class="pt-[15px] ">
                                <div v-for="item in categoryComp.state.categories" :key="item.title"
                                    class="item_lesson">
                                    <!-- <a :href="`/khoa-hoc/${item.slug}`" -->
                                    <!-- class=" item_lesson"> -->
                                    {{ item.title }}
                                    <!-- </a> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dashed-border"></div>
            <div class="copyright">
                {{ t('footer.copyright') }}
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { loadingStore } from "@/store/loading"

const categoryComp = useCategory()
const { t } = useI18n();
const loading = loadingStore()
interface ListItem {
    name: string;
    slug: string;
}

interface MenuFooter {
    title: string;
    listItem: ListItem[];
}

const listMenuFooter: MenuFooter[] = [
    {
        title: 'VỀ MSD',
        listItem: [
            { name: 'Giới thiệu', slug: 'gioi-thieu' },
            { name: 'Tin tức', slug: 'news' },
            { name: 'Tài nguyên', slug: 'resource' },
            { name: 'Quyên góp - Ủng hộ', slug: 'https://msdunitedwayvn.org/tai-khoan-nhan-tai-tro' }
        ]
    }
];
onMounted(async () => {
    loading.setLoading(true)
    await categoryComp.fetchCategories()
    loading.setLoading(false)
})
</script>
<style scoped lang="scss">
.dashed-border {
    width: 100%;
    height: 1px;
    background: repeating-linear-gradient(to left,
            lightgray 0px,
            lightgray 13px,
            transparent 15px,
            transparent 25px);
}

.copyright {
    font-family: SVN-Gilroy-Xlight;
    color: rgba(255, 255, 255, 0.50);
    @apply md:pt-4 md:pb-6 py-6 md:py-0 text-center;
}
.item_lesson {
    @apply text-[#FFF] h-auto overflow-hidden text-ellipsis line-clamp-2 mb-[10px];
}

@media only screen and (max-width: 767px) {
    .content_footer {
        min-height: 242px;
        background-image: url('@/assets/images/footer_mobile.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
}

@media only screen and (min-width: 768px) {
    .content_footer {
        min-height: 242px;
        background-image: url('@/assets/images/background_footer.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
}
</style>