<template>
  <div class="content-notify pb-24">
    <!-- title header  -->
    <div class="md:px-5 flex justify-between md:mb-6 mb-4 pb-2 items-end">
      <div class="headline-noti text-2xl  text-[#0044B5] title_font">
        Thông báo của bạn
      </div>
      <div @click="allAsRead" class=" hover:text-[#F27619] cursor-pointer">
        Read all
      </div>
    </div>
    <div class="dashed-border"></div>
    <!-- Notification list desktop -->
    <div class="hidden md:block mt-5">
      <div v-for="(item, i) in messages" :key="i">
        <div :class="[
          'flex items-stretch justify-between px-5 py-2 hover:bg-gray-100 transition custom-item-tag',
          !item.is_read ? 'bg-[#FFF]' : ''
        ]">
          <div class="w-3/5">
            <div class="font-semibold text-base mb-1" :class="!item.is_read ? 'text-[#F27619]' : 'text-[#2B2C2E]'">
              {{ item.title }}
            </div>
            <div v-html="item.message || ''" class="value-message"
              :class="!item.is_read ? 'text-[#2B2C2E]' : 'text-[#abadaf]'"></div>
          </div>
          <!-- Cột ảnh ở giữa -->
          <div v-if="item.image_url" class="w-1/5 flex items-center justify-center">
            <img
              :src="item.image_url"
              alt="notification image"
              class="max-h-[60px] max-w-[80px] rounded cursor-pointer object-contain"
              @click="openImagePopup(item.image_url)"
            />
          </div>
          <!-- Nếu không có ảnh thì giữ chỗ trống để layout đều -->
          <div v-else class="w-1/5"></div>
          <div class="w-1/5 text-right align-middle h-full flex flex-col justify-between">
            <div class="text-gray-500 text-sm"><i>{{ item.created_at ? formatDate(item.created_at) : '' }}</i></div>
            <a v-if="item.link" class="text-blue-500 text-sm underline" :href="item.link" target="_blank"><i>Xem chi
                tiết</i></a>
          </div>
        </div>
        <div class="dashed-border"></div>
      </div>
    </div>
    <!-- Notification list mobile -->
    <div class="block md:hidden">
      <div v-for="(item, i) in messages" :key="i" :class="[
        'flex items-start gap-3 px-3 py-4 hover:bg-gray-100 transition custom-item-tag',
        !item.is_read ? 'bg-[#FFF]' : ''
      ]">
        <!-- Cột nội dung -->
        <div class="flex-1 min-w-0">
          <div class="font-semibold text-base mb-1" :class="!item.is_read ? 'text-[#F27619]' : 'text-[#2B2C2E]'">
            {{ item.title }}
          </div>
          <div v-html="item.message || ''" class="" :class="!item.is_read ? 'text-[#2B2C2E]' : 'text-gray-500'"></div>
          <div class="text-[#abadaf] text-[14px] my-2">
            <i>{{ item.created_at ? formatDate(item.created_at) : '' }}</i>
          </div>
          <a v-if="item.link" class="text-blue-500 text-sm underline" :href="item.link" target="_blank"><i>Xem chi tiết</i></a>
        </div>
        <!-- Cột ảnh ở giữa (nếu có) -->
        <div v-if="item.image_url" class="flex-shrink-0 flex items-center justify-center ml-2">
          <img
            :src="item.image_url"
            alt="notification image"
            class="max-h-[60px] max-w-[80px] rounded cursor-pointer object-contain"
            @click="openImagePopup(item.image_url)"
          />
        </div>
      </div>
      <div class="dashed-border"></div>
    </div>
    <!-- Load more button -->
    <div v-if="hasMore" class="flex justify-center mt-6">
      <button @click="loadMore"
        class="px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition">
        Tải thêm thông báo
      </button>
    </div>
    <!-- Thêm PopupPreview vào template nếu chưa có -->
    <PopupPreview v-if="showImagePopup" :link="imagePopupUrl" @close="closeImagePopup" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useNotification } from '@/composables/useNotification'
import { loadingStore } from "@/store/loading"
import { useRouter } from 'vue-router'
import PopupPreview from '@/components/elements/PopupPreview.vue'

const router = useRouter()
const loading = loadingStore()
definePageMeta({
  layout: 'account'
})

const page = ref(1)
const limit = 10

const { state, fetchNotifications, markAllAsRead } = useNotification()

const messages = computed(() => state.notifications)
const hasMore = computed(() =>
  state.paginate ? state.paginate.current_page < state.paginate.total_page : false
)

onMounted(async () => {
  await fetchNotifications({ page: page.value, limit })
})

async function loadMore() {
  if (hasMore.value) {
    page.value += 1
    await fetchNotifications({ page: page.value, limit }, true)
  }
}
const allAsRead = async ()=>{
  loading.setLoading(true)
  await markAllAsRead()
  loading.setLoading(false)
  window.location.href=router.currentRoute.value.path

}
function formatDate(date?: string) {
  if (!date) return ''
  const newDate = new Date(date)
  const [year, month, day, hour, minute, second] = [
    newDate.getFullYear(),
    newDate.getMonth() + 1,
    newDate.getDate(),
    newDate.getHours(),
    newDate.getMinutes(),
    newDate.getSeconds()
  ]
  const pad = (n: number) => n > 9 ? n : `0${n}`
  return `${pad(day)}/${pad(month)}/${year} ${pad(hour)}:${pad(minute)}:${pad(second)}`
}

const showImagePopup = ref(false)
const imagePopupUrl = ref('')

function openImagePopup(url: string) {
  imagePopupUrl.value = url
  showImagePopup.value = true
}
function closeImagePopup() {
  showImagePopup.value = false
}
</script>

<style scoped>
.value-message {
  height: 40px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  display: -webkit-box;
  line-height: 20px;
}
.content-notify {
  @apply md:mb-[100px];
}

.headline-noti {
  font-size: 25px;
  font-weight: 500;
}

@media (max-width: 768px) {
  .headline-noti {
    font-size: 20px;
    width: 80%;
  }
}

.dashed-border {
  width: 100%;
  height: 1px;
  background: repeating-linear-gradient(to left,
      lightgray 0px,
      lightgray 13px,
      transparent 15px,
      transparent 25px);
}
</style>
