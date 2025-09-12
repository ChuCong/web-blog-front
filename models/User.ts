export interface User {
    id?: string,
    full_name: string,
    phone?: number,
    email: string,
    avatar: string | null,
    sex: string,
    active: string | null,
    birth_day?: string | null
}