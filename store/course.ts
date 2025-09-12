import { defineStore } from 'pinia';
import { useMyFetch } from "@/composables/useMyFetch";
import API from "~/common/API";
import type { ApiResponse, Course, CourseManager } from '@/models';

export const courseStore = defineStore('course', {
    actions: {
        async fetchCourseDetail(slug: string): Promise<ApiResponse<Course>> {
            return await useMyFetch(`${API.COURSE}/${slug}`, {
                method: 'GET'
            })
        },
        async fetchCourses(payload: any): Promise<ApiResponse<Course[]>> {
            return await useMyFetch(`${API.COURSES}`, {
                method: 'GET',
                params: payload
            })
        },
        async addCourseLearn(courseSlug: any): Promise<ApiResponse<CourseManager>> {
            return await useMyFetch(`${API.COURSE_LEARN.replace(':course_slug', courseSlug)}`, {
                method: 'POST'
            })
        },
    }
});
