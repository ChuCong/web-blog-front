import { defineStore } from 'pinia';
import { useMyFetch } from "@/composables/useMyFetch";
import API from "~/common/API";

export const contactStore = defineStore('contact', {
    actions: {
        async create(payload: any) {
            const data = await useMyFetch(`${API.CONTACTS}`, {
                method: 'POST',
                body: payload
            })
            if (data) {
                return data;
            }
        },
    }
});
