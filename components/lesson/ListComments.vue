<template>
    <div class="py-4 md:px-0 px-[10px]">
        <div class="mb-4" v-if="deepIndex == 0">
            <span class="font-bold text-[18px] text-[#32312F]">Ý kiến học viên</span>
        </div>
        <ClientOnly>
            <AddComment class="mb-6" :value="newComment"
                :placeholder="deepIndex == 0 ? 'Nhập ý kiến của bạn' : 'Nhập trả lời'" @add="addComment">
            </AddComment>
        </ClientOnly>
        <template v-if="commentComp.state.comments && commentComp.state.comments.length > 0">
            <div class="mb-2 py-6" v-for="(comment, index) in commentComp.state.comments" :key="`comment_${index}`"
                :id="comment.id" :class="{ 'border-b': index < commentComp.state.comments.length - 1 }">
                <ViewComment :value="comment" :lessonSlug="props.lessonSlug" :deepIndex="deepIndex" @delete-comment="deleteComment" @update-comment="updateComment"></ViewComment>
            </div>
            <div v-if="!commentComp.state.loadedAllComments" class="flex w-full justify-end mt-4 cursor-pointer"
                @click="loadMoreComments">
                <span class="font-medium underline">{{ t("view_more") }}</span>
            </div>
        </template>
        <template v-else>
            <div class="p-6 rounded-lg bg-[#F0F2F5]" v-if="deepIndex == 0">
                <span class="italic">Chưa có Bình luận</span>
            </div>
        </template>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, defineProps } from "vue"
import { useI18n } from "vue-i18n"
import ViewComment from "~/components/elements/ViewComment.vue"
import AddComment from "~/components/elements/AddComment.vue"
import type { Comment } from '@/models'
import { loadingStore } from "@/store/loading"

const { t } = useI18n()
const commentComp = useComment()
const config = useRuntimeConfig()
const loading = loadingStore()

const key = config.public.keylesson
const isLoading = ref(false)

const props = defineProps({
    lessonSlug: {
        type: String,
        default: null
    },
    parentId: {
        type: Number,
        default: null
    },
    deepIndex: {
        type: Number,
        default: 0
    },
    courseSlug: {
        type: String,
        default: null
    }
})

const paginate = {
    start: 0,
    limit: 10,
    key: key
}

const newComment = reactive({
    content: '',
})

const loadComments = async () => {
    if (props.deepIndex == 0) {
        const searchData = {
            lesson_slug: props.lessonSlug,
            panigate: paginate
        }
        await commentComp.getListCommentsByLessonSlug(searchData)
    } else if (props.parentId) {
        const searchData = {
            id: props.parentId,
            panigate: paginate
        }
        await commentComp.getListCommentsByID(searchData)
    }
}

loadComments()

const addComment = async () => {
    loading.setLoading(true)
    const payload = {
        content: newComment.content,
        lesson_slug: props.lessonSlug,
        course_slug: props.courseSlug,
        parent_id: props.parentId

    }
    let res: boolean = await commentComp.addComment(payload)
    if (res) {
        payload.content = ''
    }
    loading.setLoading(false)
}

const loadMoreComments = async () => {
    if (isLoading.value) {
        return
    }
    isLoading.value = true
    loading.setLoading(true)
    paginate.start = commentComp.state.comments.length
    await loadComments()
    isLoading.value = false
    loading.setLoading(false)
}

const deleteComment = async (commentId: number) => {
    loading.setLoading(true)
    const comment = commentComp.state.comments.find(c => c.id === commentId)
    if (comment) {
        await commentComp.deleteComment(comment)
        commentComp.state.comments = commentComp.state.comments.filter(c => c.id !== commentId)
    }
    loading.setLoading(false)
}
const updateComment = async (item: Comment) => {
  loading.setLoading(true)
  await commentComp.updateComment(item)
  // cập nhật lại trong state
  const idx = commentComp.state.comments.findIndex(c => c.id === item.id)
  if (idx !== -1) {
    commentComp.state.comments[idx] = { ...commentComp.state.comments[idx], ...item }
  }
  loading.setLoading(false)
}
</script>