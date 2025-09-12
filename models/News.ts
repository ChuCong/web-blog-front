import type { Media } from "@/models"
export interface News {
    id: number
    title: string
    link: string
    description: string
    lang: string
    media_id: number
    created_at?: string
    updated_at?: string
    media: Media
}