import { defineStore } from 'pinia';
import { useMyFetch } from "@/composables/useMyFetch";
import API from "~/common/API";
import type { ApiResponse} from '@/models';

export const bannerStore = defineStore('banner', {
    actions: {
        async fetchBanner(payload: any) {
            const data = await useMyFetch(`${API.GET_LIST_SETTING_HOME}`, {
                method: 'GET',
                params: payload
            })
            if (data) {
                return data;
            }
        },
    }
});
