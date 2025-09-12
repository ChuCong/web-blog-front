import { defineStore } from 'pinia'
import { useMyFetch } from "@/composables/useMyFetch"
import API from "~/common/API"
import type { ApiResponse, User, CourseManager } from '@/models'

export const userStore = defineStore('user', {
  actions: {
    async fetchUserDetail(): Promise<ApiResponse<User>> {
      return await useMyFetch(`${API.USER_DETAIL}`, {
        method: 'GET'
      })
    },
    async uploadAvatar(formData: FormData): Promise<ApiResponse<{ url: string }>> {
      return await useMyFetch(`${API.UPLOAD_AVATAR_USER}`, {
        method: 'POST',
        body: formData
      })
    },
    async logout(): Promise<ApiResponse<any>> {
      return await useMyFetch(`${API.USER_LOGOUT}`, {
        method: 'POST'
      })
    },
    async fetchUserCourses(): Promise<ApiResponse<CourseManager[]>> {
        return await useMyFetch(`${API.USER_COURSES}`, {
            method: 'GET'
        })
    },
    async updateUser(payload: any): Promise<ApiResponse<any>> {
      return await useMyFetch(`${API.UPDATE_USER}`, {
        method: 'PUT',
        body: payload
      })
    },
    async generateCertificate(payload: any): Promise<ApiResponse<{ certificate_url: string }>> {
        return await useMyFetch(`${API.GENERATE_CERTIFICATE}`, {
          method: 'POST',
          body: payload
        })
    }
  }
})