export interface Notification {
  user_id: number
  notification_id: number
  title: string
  image?: string
  image_url?: string
  link?: string
  message: string
  is_read: boolean
  read_at?: string
  updated_at: string
  created_at: string
}