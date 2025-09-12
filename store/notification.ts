import { defineStore } from 'pinia'
import { useMyFetch } from '@/composables/useMyFetch'
import API from '~/common/API'
import type { ApiResponse, Notification, Paginate } from '@/models'

export const notificationStore = defineStore('notification', {
  actions: {
    async fetchNotifications(params?: any): Promise<ApiResponse<{ data: Notification[]; paginate: Paginate }>> {
      return await useMyFetch(`${API.USER_NOTIFICATIONS}`, {
        method: 'GET',
        params
      })
    },
    async markAsRead(id: number): Promise<ApiResponse<any>> {
      return await useMyFetch(`${API.USER_NOTIFICATION_READ.replace(':id', id.toString())}`, {
        method: 'POST'
      })
    },
    async markAllAsRead(): Promise<ApiResponse<any>> {
      return await useMyFetch(`${API.USER_NOTIFICATION_READ_ALL}`, {
        method: 'POST'
      })
    },
    async fetchUnreadCount(): Promise<ApiResponse<{ unread_count: number }>> {
      return await useMyFetch(`${API.USER_NOTIFICATION_UNREAD_COUNT}`, {
        method: 'GET'
      })
    }
  }
})