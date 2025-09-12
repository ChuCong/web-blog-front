import type { Paginate} from "@/models";
export interface ApiResponse<T> {
    message: string;
    status: string;
    code: number;
    data: T;
}

export interface Overview {
    icon: string,
    title: string,
    key: string,
    value: string
}

export interface Link {
    _id?: string,
    icon: string,
    title: string,
    key: string,
    value: string
}

export interface Column {
    key: string;
    label: string;
    _id: string;
}

export interface ListResponse {
    list: any[],
    paginate: Paginate
}