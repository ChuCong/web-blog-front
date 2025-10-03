export interface Article {
    id: number
    title: String
    slug?: String
    description?: String
    url?: String
    active?: number
    content?: string
    seo_key?:string
    seo_description?:string
    seo_title?:string
    created_at: String
    updated_at: String
}

