import { defineStore } from 'pinia';
import { useMyFetch } from "@/composables/useMyFetch";
import API from "~/common/API";
import type { ApiResponse, Faq, ListResponse } from '@/models';

export const faqStore = defineStore('faq', {
    actions: {
        async fetchFaqs(payload: any) {
            const data = await useMyFetch(`${API.FAQ}`, {
                method: 'GET',
                params: payload
            })
            if (data) {
                return data;
            }
        },
    }
});
