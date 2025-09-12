<template>
  <div class="w-full max-w-xs mx-auto bg-white rounded-xl shadow p-4 border ">
    <div class="flex flex-col items-center gap-2">
      <div class="relative">
        <img
          v-if="state.avatarUrl"
          :src="state.avatarUrl"
          alt="avatar"
          class="w-28 h-28 rounded-full object-cover "
        />
        <img
          v-else
          :src="anonymousAvatar"
          alt="avatar"
          class="w-28 h-28 rounded-full object-cover border-4 border-gray-300"
        />
        <input id="fileUpload" type="file" class="hidden" @change="previewFiles" />
      </div>
      <BtnBase
        v-if="!hasImage"
        :width="190"
        text="Thêm ảnh đại diện"
        :rounded="999"
        bg_color="#fff"
        bg_color_border="#F27619"
        color="#F27619"
        class="mt-2"
        @click="chooseFiles"
      />
      <BtnBase
        v-else
        :width="180"
        text="Lưu ảnh"
        :rounded="999"
        bg_color="#F27619"
        bg_color_border="#F27619"
        color="#fff"
        class="mt-2"
        @click="updateAvatar"
      />
    </div>

    <ul class="mt-6 space-y-1">
      <li
        v-for="(item, i) in items"
        :key="i"
        class="flex items-center gap-3 px-3 py-2 rounded cursor-pointer"
        @click="handleMenuClick(item)" :class="{'active-child': isActive(item.link ?? '')}"
      >
        <span>
           <Icon :type="item.icon" :active="isActive(item.link ?? '')" />
        </span>
        <span  class="flex-1 text-base font-medium">{{ item.text }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import BtnBase from '~/components/elements/BtnBase.vue'
import { useRouter } from 'vue-router'
import { useUser } from '@/composables/useUser'
import anonymousAvatar from '~/assets/images/avatar_nho.png'
import iconAccountInfo from '~/assets/images/icons/icon_account_info.svg'
import iconLogout from '~/assets/images/icons/icon_logout.svg'
import iconMyCourses from '~/assets/images/icons/icon_my_courses.svg'
import iconNotification from '~/assets/images/icons/icon_notification.svg'
import Icon from '@/components/elements/Icon.vue'
import JwtService from "~/services/jwt.service"

// const avatar = ref(null);
// const user_name = ref(null);
const isActive = (link: string) => {
  return router.currentRoute.value.path === link
}
const router = useRouter()
const { state, uploadAvatar, logout ,getUserDetail} = useUser()

const hasImage = ref(false)
const image = ref<File | null>(null)

const items = [
  { text: 'Xem thông báo', icon: 'BELL', link: '/thong-tin-ca-nhan/thong-bao' },
  { text: 'Thông tin cá nhân', icon: 'PROFILE', link: '/thong-tin-ca-nhan/profile' },
  { text: 'Khóa học của tôi', icon: 'COURSE', link: '/thong-tin-ca-nhan/khoa-hoc-cua-toi' },
  { text: 'Đăng xuất', icon:'LOG_OUT', action: 'logout' }
]

function chooseFiles() {
  document.getElementById('fileUpload')?.click()
}

function previewFiles(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    image.value = target.files[0]
    state.avatarUrl = URL.createObjectURL(image.value)
    hasImage.value = true
  }
}
const getClassActive = (item: any) => {
  return item.active ? 'active-child' : '';
}
async function updateAvatar() {
  hasImage.value = false
  if (!image.value) return
  const formData = new FormData()
  formData.append('avatar', image.value)
  await uploadAvatar(formData)
  window.location.href=router.currentRoute.value.path
}

function handleMenuClick(item: any) {
  if (item.action === 'logout') {
    logout()
    JwtService.destroyToken()
    JwtService.destroyEmail()
    JwtService.destroyUser()
    JwtService.destroyUserAvatar()
    window.location.href = '/'
  } else if (item.link) {
    router.push(item.link)
  }
}

onMounted(async() => {
  await getUserDetail()
  if (!state.avatarUrl) {
    state.avatarUrl = anonymousAvatar
  }
})
</script>

<style scoped>
.active-child {
  @apply rounded-[10px] text-[#F27619] py-2;
}

/* Bạn có thể thêm style tuỳ ý, nhưng đã dùng Tailwind là chủ yếu */
</style>
