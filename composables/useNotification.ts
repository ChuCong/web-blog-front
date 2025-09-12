import { notificationStore } from '~/store/notification'
import type { Notification, ApiResponse, Paginate } from '@/models'
import { reactive } from 'vue'

interface NotificationState {
  notifications: Notification[]
  unreadCount: number
  paginate: Paginate | null
}

export function useNotification() {
  const state = reactive<NotificationState>({
    notifications: [],
    unreadCount: 0,
    paginate: null
  })

  const store = notificationStore()

  const fetchNotifications = async (params?: any, append = false) => {
    const response: ApiResponse<{ data: Notification[]; paginate: Paginate }> = await store.fetchNotifications(params)
    if (response && response.status) {
      if (append) {
        state.notifications = [...state.notifications, ...(response.data?.data ?? [])]
      } else {
        state.notifications = response.data?.data ?? []
      }
      state.paginate = response.data?.paginate ?? null
    }
  }

  const markAsRead = async (id: number) => {
    return await store.markAsRead(id)
  }

  const markAllAsRead = async () => {
    return await store.markAllAsRead()
  }

  const fetchUnreadCount = async () => {
    const response: ApiResponse<{ unread_count: number }> = await store.fetchUnreadCount()
    if (response && response.status) {
      state.unreadCount = response.data?.unread_count ?? 0
    }
  }

  return {
    state,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    fetchUnreadCount
  }
}