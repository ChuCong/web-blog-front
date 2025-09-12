import { defineStore } from 'pinia';
import { useMyFetch } from "@/composables/useMyFetch";
import API from "~/common/API";
import type { ApiResponse, Category } from '@/models';

export const categoryStore = defineStore('category', {
    actions: {
        async fetchCategories(): Promise<ApiResponse<Category[]>> {
            return await useMyFetch(`${API.CATEGORIES}`, {
                method: 'GET'
            })
        },
    }
});
