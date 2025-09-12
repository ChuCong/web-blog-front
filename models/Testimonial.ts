import type { Media } from "@/models"
export interface Testimonial {
    id?: number
    name?: string
    url_course?: String
    introduction?:String
    media_id?: number
    media?: Media
    lang?:String
    created_at?: string
    updated_at?: string
}