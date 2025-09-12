import { defineStore } from 'pinia'

interface Loading {
    isLoading: boolean
}

export const loadingStore = defineStore('loading', {
    state: (): Loading => {
        return {
            isLoading: false,
        }
    },
    actions: {
        setLoading(isLoading: boolean) {
            this.isLoading = isLoading
        }
    }
});
