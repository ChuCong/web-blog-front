
import type {User} from "@/models"
export interface Comment {
  id: number,
  user_id: number,
  lesson_id: number,
  course_id: number,
  content?: string,
  parent_id: number ,
  user?: User
  // like?: number
  // type: number
  created_at: string
  updated_at: string
}