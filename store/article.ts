import { defineStore } from 'pinia';
import { useMyFetch } from "@/composables/useMyFetch";
import API from "~/common/API";
import type { ApiResponse, Article, Category } from '@/models';

export const articleStore = defineStore('article', {
    actions: {
        // Lấy danh sách articles
        async fetchArticles(payload: any): Promise<ApiResponse<{ data: Article[]; paginate?: any }>> {
            return await useMyFetch(`${API.ARTICLES}`, {
                method: 'GET',
                params: payload
            })
        },

        // Lấy chi tiết article theo slug
        async fetchArticleBySlug(slug: string): Promise<ApiResponse<Article>> {
            return await useMyFetch(`${API.DETAIL_ARTICLE.replace(':slug', slug)}`, {
                method: 'GET'
            })
        }
    }
});
