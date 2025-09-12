import { defineStore } from 'pinia';
import { useMyFetch } from "@/composables/useMyFetch";
import API from "~/common/API";
import type { ApiResponse, Tag } from '@/models';

export const tagStore = defineStore('tag', {
    actions: {
        async fetchTags(payload: any): Promise<ApiResponse<Tag[]>> {
            return await useMyFetch(`${API.TAGS}`, {
                method: 'GET',
                params: payload
            })
        },
    }
});
