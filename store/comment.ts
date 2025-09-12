import { defineStore } from 'pinia';
import { useMyFetch } from "@/composables/useMyFetch";
import API from "~/common/API";
import type { ApiResponse, Comment } from '@/models';

export const commentStore = defineStore('comment', {
    actions: {
        async addComment(payload: any) {
            return await useMyFetch(`${API.COMMENT}`, {
                method: 'POST',
                body: payload
            })
        },
        async getListCommentByLessonSlug(lessonSlug: string, payload: any) {
            const res = await useMyFetch(`${API.GET_COMMENT_BY_SLUG}/${lessonSlug}`, {
                method: 'GET',
                params: payload
            })
            return res
        },
        async getListCommentByID(id: number, payload: any) {
            const res = await useMyFetch(`${API.GET_COMMENT_BY_ID}/${id}`, {
                method: 'GET',
                params: payload
            })
            return res
        },
        async updateCommentByID(id: number, payload: any) {
            const res = await useMyFetch(`${API.UPDATE_COMMENT}/${id}`, {
                method: 'PUT',
                body: payload
            })
            return res
        },
        async deleteComment(id: number) {
            const res = await useMyFetch(`${API.DELETE_COMMENT}/${id}`, {
                method: 'DELETE'
            })
            return res
        }
    }
});
