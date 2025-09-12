import type { Course } from "@/models"

export interface CourseManager {
  id: number
  user_id: number
  course_id: number
  created_at?: string
  updated_at?: string
  certificate?: string
  certificate_url?: string
  course: Course
}