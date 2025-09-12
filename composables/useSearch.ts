import { searchStore } from '~/store/search'
import type { ApiResponse, SearchResult } from '@/models'

interface State {
    results: SearchResult[]
}

export function useSearch() {
    const state: State = reactive({
        results: useState<SearchResult[]>('results', () => []),
    })
    const store = searchStore()

    const search = async (keyword: string) => {
        const response: ApiResponse<SearchResult[]> =await store.fetchSearch(keyword)
        if (response && response.status) {
            state.results.splice(0);
            state.results.push(...response.data);
        }
    }

    const clearResults = () => {
        state.results.splice(0);
    }

    return {
        state,
        search,
        clearResults
    }
}