import { defineStore } from 'pinia';
import { useMyFetch } from "@/composables/useMyFetch";
import API from "~/common/API";
import type { ApiResponse } from '@/models';

export const resourcesStore = defineStore('resources', {
    actions: {
        async fetchResources(payload: any) {
            const data = await useMyFetch(`${API.RESOURCES}`, {
                method: 'GET',
                params: payload
            })
            if (data) {
                return data;
            }
        },
    }
});
