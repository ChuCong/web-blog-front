import { aboutMsdStore } from "~/store/aboutMsd";
import type { AboutMsd } from '~/models';

interface State {
    aboutMsd: AboutMsd,
    aboutMsds: AboutMsd[],
}

export function useAboutMsd() {
    const state: State = reactive({
        aboutMsd: useState<AboutMsd>('aboutMsd', () => ({} as AboutMsd)),
        aboutMsds: useState<AboutMsd[]>('aboutMsds', () => []),
    })

    const aboutMsd_store = aboutMsdStore()

    const fetchAboutMsd = async (payload?: any) => {
        const response: any = await aboutMsd_store.fetchAboutMsd(payload);
        if (response && response.status) {
            state.aboutMsds.splice(0);
            if (response.data) {
                state.aboutMsds.push(...response.data.value);
            }
        }
    }

    return {
        state,
        fetchAboutMsd
    }

}