import { newsStore } from "~/store/news";
import type { News ,Paginate} from '~/models';

interface State {
    new: News,
    news: News[],
    paginate: Paginate
}

export function useNews() {
    const state: State = reactive({
        new: useState<News>('new', () => ({} as News)),
        news: useState<News[]>('news', () => []),
        paginate: useState<Paginate>('paginate', () => ({} as Paginate)),
    })

    const news_store = newsStore()

    const fetchNews = async (payload: any) => {
        const response: any = await news_store.fetchNews(payload);
        if (response && response.status) {
            state.news.splice(0); 
            state.news.push(...response.data.data);
            state.paginate = response.data.paginate
        }
    }

    return {
        state,
        fetchNews
    }

}