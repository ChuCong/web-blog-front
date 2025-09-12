import { defineStore } from 'pinia';
import { useMyFetch } from "@/composables/useMyFetch";
import API from "~/common/API";
import type { ApiResponse} from '@/models';

export const settingStore = defineStore('about_msd', {
    actions: {
        async fetchSetting(payload?: any) {
            const data = await useMyFetch(`${API.GET_LIST_SETTING_HOME}`, {
                method: 'GET',
                params: payload || {}
            })
            if (data) {
                return data;
            }
        },
        async fetchCountData() {
            const data = await useMyFetch(`${API.COUNT_DATA}`, {
                method: 'GET',
            })
            if (data) {
                return data;
            }
        },
    }
});
