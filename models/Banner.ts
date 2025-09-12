import type { Media , ListContent} from "@/models"
export interface Banner {
    id: number
    title: String
    url_course?: String
    content: String
    lang: String
    url_image: String
    created_at: String
    updated_at: String
    list_contents: ListContent[] | null
}

