<template>
    <div v-if="value">
        <div class="w-full flex items-start  ">
            <div class="user-image mr-2">
                <img v-if="value.user?.avatar" class="w-[40px] h-[40px] rounded-full object-cover"
                    :src="value.user.avatar">
                <div v-else class="rounded-full w-[40px] h-[40px] bg-[#397494]"></div>
            </div>
            <div class="w-full px-2  rounded-lg">
                <div class="flex justify-between">
                    <div class="comment-user">
                        <span class="font-[600]">{{ value.user?.full_name }} </span>
                    </div>
                    <!-- Nút 3 chấm -->
                    <div class="relative">
                        <div v-if="userStore.state.userDetail?.id === value.user?.id"
                            class="hover:bg-[#f5f5f5] p-1 rounded-3xl cursor-pointer" @click="toggleActionDialog">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none">
                                <path
                                    d="M4 12C4 12.2652 4.10536 12.5196 4.29289 12.7071C4.48043 12.8946 4.73478 13 5 13C5.26522 13 5.51957 12.8946 5.70711 12.7071C5.89464 12.5196 6 12.2652 6 12C6 11.7348 5.89464 11.4804 5.70711 11.2929C5.51957 11.1054 5.26522 11 5 11C4.73478 11 4.48043 11.1054 4.29289 11.2929C4.10536 11.4804 4 11.7348 4 12ZM11 12C11 12.2652 11.1054 12.5196 11.2929 12.7071C11.4804 12.8946 11.7348 13 12 13C12.2652 13 12.5196 12.8946 12.7071 12.7071C12.8946 12.5196 13 12.2652 13 12C13 11.7348 12.8946 11.4804 12.7071 11.2929C12.5196 11.1054 12.2652 11 12 11C11.7348 11 11.4804 11.1054 11.2929 11.2929C11.1054 11.4804 11 11.7348 11 12ZM18 12C18 12.2652 18.1054 12.5196 18.2929 12.7071C18.4804 12.8946 18.7348 13 19 13C19.2652 13 19.5196 12.8946 19.7071 12.7071C19.8946 12.5196 20 12.2652 20 12C20 11.7348 19.8946 11.4804 19.7071 11.2929C19.5196 11.1054 19.2652 11 19 11C18.7348 11 18.4804 11.1054 18.2929 11.2929C18.1054 11.4804 18 11.7348 18 12Z"
                                    stroke="#65686C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <!-- Popup nhỏ ngay dưới nút -->
                        <div v-if="isShowActionDialog && value.user.full_name === userName"
                            class="absolute top-full right-0 mt-2 w-[180px] bg-white border rounded-lg shadow-lg z-50">
                            <button class="w-full text-left py-2 px-3 hover:bg-gray-100 rounded-t"
                                @click="editComment">Chỉnh sửa bình luận</button>
                            <button class="w-full text-left py-2 px-3 hover:bg-gray-100" @click="onDelete(value.id)">
                                Xóa bình luận
                            </button>
                        </div>
                    </div>
                </div>
                <div class="comment-content break-all text-[#4D4E50]">
                    <div v-if="isEditing" class="flex flex-col gap-2">
                        <textarea v-model="editContent" class="w-full border rounded p-2 text-sm" rows="3"></textarea>
                        <div class="flex gap-2">
                            <button class="px-3 py-1 bg-[#F15922] text-white rounded" @click="saveEdit">Lưu</button>
                            <button class="px-3 py-1 bg-gray-300 rounded" @click="cancelEdit">Hủy</button>
                        </div>
                    </div>
                    <span v-else class="font-[400]" v-html="value.content"></span>
                </div>
                <div class="flex justify-between items-center pt-2">
                    <div class="italic text-[#6D6E70] text-[14px]">
                        {{ formatDateDay(value.created_at) }}
                    </div>
                    <div class="comment-action cursor-pointer" @click="showAddCommentView" v-if="deepIndex == 0">
                        <span class="font-[300] text-[14px] hover:text-[#F15922] underline">Reply</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="pl-[48px] font-[600] italic cursor-pointer"
            v-if="value?.reply_count > 0 && !isShowChildCommentsView" @click="openRepliesView">
            <span>Xem {{ value?.reply_count }} trả lời</span>
        </div>
        <div v-if="(value?.reply_count > 0 && isShowChildCommentsView) || isShowAddCommentView" class="pl-[48px]">
            <ListComments :lessonSlug="lessonSlug" :parentId="value.id" :courseSlug="courseSlug" class="w-full"
                :deepIndex="deepIndex + 1"></ListComments>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useI18n } from "vue-i18n"
import type { Comment } from '@/models'
import { defineEmits, defineProps } from "vue"
import ListComments from "~/components/lesson/ListComments.vue"
import { useRoute, useRouter } from 'vue-router'
import convertDateTime from "~/mixin/convertDateTime";
import JwtService from "~/services/jwt.service"
import { useAuth } from "#imports"
import { useUser } from '@/composables/useUser'
import { useComment } from '@/composables/useComment'

const isEditing = ref(false)
const userStore = useUser()
const userName = JwtService.getUser()
const { methods } = convertDateTime;
const formatDateDay = methods.formatDateDay;
const route = useRoute()
const isShowAddCommentView = ref(false)
const isShowChildCommentsView = ref(false)
const commentComp = useComment()
const config = useRuntimeConfig()
const key = config.public.keyExam


// Removed duplicate editComment function
const courseSlug = Array.isArray(route.params.course) ? route.params.course[0] : route.params.course;
const props = defineProps({
    value: {
        type: Object,
        default: null
    },
    lessonSlug: {
        type: String,
        default: null
    },
    deepIndex: {
        type: Number,
        default: 0
    }
})
const editContent = ref(props.value?.content || "")
const emit = defineEmits(["update-comment", "delete-comment"])

const showAddCommentView = () => {
    isShowAddCommentView.value = true
}

const openRepliesView = () => {
    isShowChildCommentsView.value = true
}

const isShowActionDialog = ref(false)

const toggleActionDialog = () => {
    isShowActionDialog.value = !isShowActionDialog.value
}

onMounted(async () => {
    await userStore.getUserDetail()
})

const onDelete = (id: number) => {
    emit("delete-comment", id)
    isShowActionDialog.value = false
}

const cancelEdit = () => {
  isEditing.value = false
}
const editComment = () => {
  isEditing.value = true
  editContent.value = props.value?.content || ""
  isShowActionDialog.value = false
}
const saveEdit = () => {
  if (editContent.value.trim() === "") return
  props.value.content = editContent.value
  emit("update-comment", props.value)
  isEditing.value = false
}
</script>
<style lang="scss" scoped></style>