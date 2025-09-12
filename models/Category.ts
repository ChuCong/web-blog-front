import type { Course } from "@/models"
export interface Category {
  id: number
  title: string
  slug: string
  description?: string
  url?: string
  full_url?: string
  courses: Course[]
  students_count?: number
  created_at: string
  updated_at: string
}