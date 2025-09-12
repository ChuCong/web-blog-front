import { defineStore } from 'pinia';
import { useMyFetch } from "@/composables/useMyFetch";
import API from "~/common/API";
import type { ApiResponse, Lesson, LessonProcess } from '@/models';


export const lessonStore = defineStore('lesson', {
    actions: {
        async fetchLessonsByCourseSlug(courseSlug: string): Promise<ApiResponse<Lesson[]>> {
            return await useMyFetch(`${API.LESSONS_BY_COURSE_SLUG}/${courseSlug}`, {
                method: 'GET'
            })
        },
        async fetchLessonSlug(slug: string): Promise<ApiResponse<Lesson>> {
            return await useMyFetch(`${API.LESSON}/${slug}`, {
                method: 'GET'
            })
        },
        async completeLesson(payload: any): Promise<ApiResponse<LessonProcess>> {
            return await useMyFetch(`${API.LESSONS_COMPLETE}`, {
                method: 'POST',
                body: payload
            })
        }
    }
});
