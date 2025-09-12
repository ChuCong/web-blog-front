import { categoryStore } from "~/store/category";
import { messageSuccess, messageError } from '~/common/message.service';
import type { ApiResponse, Category } from '~/models';

interface State {
    category: Category,
    categories: Category[]
}

export function useCategory() {
    const state: State = reactive({
        category: useState<Category>('category', () => ({} as Category)),
        categories: useState<Category[]>('categories', () => [])
    })

    const category_store = categoryStore()
    const fetchCategories = async () => {
        const response: ApiResponse<Category[]> = await category_store.fetchCategories();
        if (response && response.status) {
            state.categories.splice(0);
            state.categories.push(...response.data);
        }
    }

    return {
        state,
        fetchCategories
    }

}