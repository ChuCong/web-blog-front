import { faqStore } from "~/store/faq";
import type { Faq ,Paginate} from '~/models';

interface State {
    faq: Faq,
    faqs: Faq[],
    paginate: Paginate
}

export function useFaq() {
    const state: State = reactive({
        faq: useState<Faq>('faq', () => ({} as Faq)),
        faqs: useState<Faq[]>('faqs', () => []),
        paginate: useState<Paginate>('paginate', () => ({} as Paginate)),
    })

    const faq_store = faqStore()

    const fetchFaqs = async (payload: any) => {
        const response: any = await faq_store.fetchFaqs(payload);
        if (response && response.status) {
            state.faqs.splice(0); 
            state.faqs.push(...response.data.data);
            state.paginate = response.data.paginate
        }
    }

    return {
        state,
        fetchFaqs
    }

}