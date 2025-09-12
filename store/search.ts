import { defineStore } from 'pinia'
import { useMyFetch } from "@/composables/useMyFetch"
import API from "~/common/API"
import type { ApiResponse, SearchResult } from '@/models'

export const searchStore = defineStore('search', {
  actions: {
    async fetchSearch(keyword: string): Promise<ApiResponse<SearchResult[]>> {
      return await useMyFetch(`${API.SEARCH}`, {
        method: 'GET',
        params: { q: keyword }
      })
    }
  }
})