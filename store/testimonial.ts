import { defineStore } from 'pinia';
import { useMyFetch } from "@/composables/useMyFetch";
import API from "~/common/API";
import type { ApiResponse} from '@/models';

export const testimonialStore = defineStore('testimonial', {
    actions: {
        async fetchTestimonial(payload?: any) {
            const data = await useMyFetch(`${API.TESTUMONIAL}`, {
                method: 'GET',
                params: payload
            })
            if (data) {
                return data;
            }
        },
    }
});
