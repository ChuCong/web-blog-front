export interface Tag {
    id?: number
    name?: string
    tag_type_id: number
    courses_count?: number
    resources_count?: number
    tag_type?: TagType
    created_at?: string
    updated_at?: string
}

export interface TagType {
    id?: number
    name?: string
    tags?: Tag[]
    open: boolean | true
    created_at?: string
    updated_at?: string
}