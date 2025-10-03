import { articleStore } from "~/store/article";
import type { ApiResponse,Paginate , Article} from '~/models';

interface State {
    paginate: Paginate,
    article: Article,
    articles: Article[],
}

export function useArticle() {
    const state: State = reactive({
        paginate: useState<Paginate>('article_paginate', () => ({} as Paginate)),
        article: useState<Article>('article', () => ({} as Article)),
        articles: useState<Article[]>('articles', () => [])
    })

    const article_store = articleStore()

    // Lấy danh sách articles
    const fetchArticles = async (payload: any) => {
        const response = await article_store.fetchArticles(payload);
        if (response) {
            state.articles.splice(0);
            state.articles.push(...response.data.data); 
            state.paginate = response.data.paginate || {} as Paginate;
        }
    }

    // Lấy chi tiết article theo slug
    const fetchArticleBySlug = async (slug: string) => {
        const response: ApiResponse<Article> = await article_store.fetchArticleBySlug(slug);
        if (response) {
            state.article = response.data;
        }
    }

    return {
        state,
        fetchArticles,
        fetchArticleBySlug
    }
}
