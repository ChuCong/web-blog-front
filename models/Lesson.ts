import type { Media, GroupQuestion, Question } from "@/models"

export interface Lesson {
  id: number
  title: string
  description?: string
  lesson_index?: number
  status: number //0 | 1  // 0: Lock, 1: Unlock
  type: number //0 | 1 | 2 | 3  // 0: init, 1: content, 2: exercise, 3: flashcard
  allow_video_rewind: number //0: dont alow, 1: allow
  content?: string
  slug?: string
  reference_id?: number
  course_id: number
  order: number
  is_free: number  // 0 | 1
  active: boolean
  seo_key?: string
  seo_title?: string
  seo_description?: string
  time: string
  medias?: Media[]
  parent?: Lesson
  children?: Lesson[]
  group_questions?: GroupQuestion[]
  questions: Question[]
  encrypt_process: any
  created_at: string
  updated_at: string
}

export enum LessonStatus {
  Lock = 0,
  Unlock = 1,
}

export enum LessonType {
  Init = 0,
  Content = 1,
  Exercise = 2,
  Flashcard = 3,
}