import type { Article } from "@/models"
export interface Category {
  id: number
  title: string
  slug: string
  description?: string
  url?: string
  active?: number
  seo_key?:string
  seo_description?:string
  seo_title?:string
  created_at: string
  updated_at: string
  articles?: Article[]

}