import { defineStore } from 'pinia';
import { useMyFetch } from "@/composables/useMyFetch";
import API from "~/common/API";
import type { ApiResponse} from '@/models';

export const newsStore = defineStore('news', {
    actions: {
        async fetchNews(payload: any) {
            const data = await useMyFetch(`${API.NEWS}`, {
                method: 'GET',
                params: payload
            })
            if (data) {
                return data;
            }
        },
    }
});
