import { testimonialStore } from "~/store/testimonial";
import type { Testimonial } from '~/models';

interface State {
    testimonial: Testimonial,
    testimonials: Testimonial[],
}

export function useTestimonial() {
    const state: State = reactive({
        testimonial: useState<Testimonial>('faq', () => ({} as Testimonial)),
        testimonials: useState<Testimonial[]>('faqs', () => []),
    })

    const testimonial_store = testimonialStore()

    const fetchTestimonial = async (payload?: any) => {
        const response: any = await testimonial_store.fetchTestimonial(payload);
        if (response && response.status) {
            state.testimonials.splice(0); 
            state.testimonials.push(...response.data);
        }
    }

    return {
        state,
        fetchTestimonial
    }

}