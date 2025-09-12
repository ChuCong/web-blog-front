import type {Tag, Media} from "@/models"
export interface Resources {
    id: number
    title: string
    url: string
    type: string
    image_thumbnail?: string
    image_thumbnail_url?: string
    media_id: number
    media: Media
    tags: Tag[],
}