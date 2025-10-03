import { defineStore } from 'pinia';
import { useMyFetch } from "@/composables/useMyFetch";
import API from "~/common/API";
import type { ApiResponse, Category } from '@/models';

export const categoryStore = defineStore('category', {
    actions: {
        // Lấy danh sách categories
        async fetchCategories(payload: any): Promise<ApiResponse<{ data: Category[]; paginate?: any }>> {
            return await useMyFetch(`${API.CATEGORIES}`, {
                method: 'GET',
                params: payload
            })
        },

        // Lấy chi tiết category theo slug
        async fetchCategoryBySlug(slug: string, payload: any): Promise<ApiResponse<Category>> {
            return await useMyFetch(`${API.CATEGORIES}/${slug}`, {
                method: 'GET',
                params: payload
            })
        }
    }
});
