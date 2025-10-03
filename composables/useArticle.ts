import { articleStore } from "~/store/article";
import type { ApiResponse,Paginate , Article} from '~/models';

interface State {
    paginate: Paginate,
    article: Article,
    articles: Article[],
    articleByCategoryId: Article[]
}

export function useArticle() {
    const state: State = reactive({
        paginate: useState<Paginate>('article_paginate', () => ({} as Paginate)),
        article: useState<Article>('article', () => ({} as Article)),
        articles: useState<Article[]>('articles', () => []),
        articleByCategoryId: useState<Article[]>('article_by_category_id', () => []),   
    })

    const article_store = articleStore()
    const fetchArticles = async (payload: any) => {
        const response = await article_store.fetchArticles(payload);
        if (response) {
            state.articles.splice(0);
            state.articles.push(...response.data.data); 
            state.paginate = response.data.paginate || {} as Paginate;
        }
    }

    const fetchArticleBySlug = async (slug: string) => {
        const response: ApiResponse<Article> = await article_store.fetchArticleBySlug(slug);
        if (response) {
            state.article = response.data;
        }
    }

    const fetchArticleByCategoryId = async (slug: string) => {
        const response = await article_store.fetchArticleByCategoryId(slug);
        if (response) {
            state.articleByCategoryId.push(...response.data.data);
        }
    }

    return {
        state,
        fetchArticles,
        fetchArticleBySlug,
        fetchArticleByCategoryId
    }
}
