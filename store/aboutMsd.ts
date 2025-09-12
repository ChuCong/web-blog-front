import { defineStore } from 'pinia';
import { useMyFetch } from "@/composables/useMyFetch";
import API from "~/common/API";
import type { ApiResponse} from '@/models';

export const aboutMsdStore = defineStore('about_msd', {
    actions: {
        async fetchAboutMsd(payload?: any) {
            const data = await useMyFetch(`${API.GET_LIST_SETTING_HOME}`, {
                method: 'GET',
                params: payload || {}
            })
            if (data) {
                return data;
            }
        },
    }
});
