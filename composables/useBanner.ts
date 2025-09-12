import { bannerStore } from "~/store/banner";
import type { Banner ,Paginate} from '~/models';

interface State {
    baner: Banner,
    banners: Banner[],
    paginate: Paginate
}

export function useBanner() {
    const state: State = reactive({
        baner: useState<Banner>('baner', () => ({} as Banner)),
        banners: useState<Banner[]>('banners', () => []),
        paginate: useState<Paginate>('paginate', () => ({} as Paginate)),
    })

    const banner_store = bannerStore()

    const fetchBanners = async (payload: any) => {
        const response: any = await banner_store.fetchBanner(payload);
        if (response && response.status) {
            console.log(response);
            state.banners.splice(0);
            if (response.data) {
                state.banners.push(...response.data.value);
            }
        }
    }

    return {
        state,
        fetchBanners
    }

}