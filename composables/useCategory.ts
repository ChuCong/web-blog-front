import { categoryStore } from "~/store/category";
import type { ApiResponse, Category ,Paginate} from '~/models';

interface State {
    category: Category,
    categories: Category[],
    paginate: Paginate
}

export function useCategory() {
    const state: State = reactive({
        category: useState<Category>('category', () => ({} as Category)),
        categories: useState<Category[]>('categories', () => []),
        paginate: useState<Paginate>('category_paginate', () => ({} as Paginate))
    })

    const category_store = categoryStore()

    // Lấy danh sách categories
    const fetchCategories = async (payload: any) => {
        const response = await category_store.fetchCategories(payload);
        if (response ) {
            state.categories.splice(0);
            state.categories.push(...response.data.data); 
            state.paginate = response.data.paginate || {} as Paginate;
        }
    }

    // Lấy chi tiết category theo slug
    const fetchCategoryBySlug = async (slug: string, payload: any) => {
        const response: ApiResponse<Category> = await category_store.fetchCategoryBySlug(slug, payload);
        if (response) {
            state.category = response.data;
        }
    }

    return {
        state,
        fetchCategories,
        fetchCategoryBySlug
    }
}
