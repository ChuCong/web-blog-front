import { settingStore } from "~/store/setting";
import type { AboutMsd, Banner, LearningStatistics,CourseBanner } from '~/models';
import { SETTING_ABOUT_MSD, SETTING_BANNER, SETTING_LEARNING_STATISTICS,SETTING_COURSE_BANNER } from "~/common/Constant";

interface State {
    aboutMsds: AboutMsd[],
    banners: Banner[],
    learningStatistics: LearningStatistics[],
    learningStatisticsDetail: LearningStatistics,
    courseBanner: CourseBanner
}

export function useSetting() {
    const state: State = reactive({
        aboutMsds: useState<AboutMsd[]>('aboutMsds', () => []),
        banners: useState<Banner[]>('banners', () => []),
        learningStatistics: useState<LearningStatistics[]>('learningStatistics', () => []),
        learningStatisticsDetail: useState<LearningStatistics>('learningStatisticsDetail', () => ({} as LearningStatistics)),
        courseBanner: useState<CourseBanner>('courseBanner', () => ({} as CourseBanner)),
    })

    const setting_store = settingStore()

    const fetchSetting = async (payload?: any) => {
        const response: any = await setting_store.fetchSetting(payload);
        if (response && response.status) {
            state.aboutMsds = []
            state.banners= []
            for (const item of response.data) {
                if (item.key === SETTING_ABOUT_MSD) {
                    state.aboutMsds.push(...item.value);
                }
                if (item.key === SETTING_BANNER) {
                    state.banners.push(...item.value);
                }
                if (item.key === SETTING_COURSE_BANNER) {
                    state.courseBanner = item.value;
                }
                if (item.key === SETTING_LEARNING_STATISTICS) {
                    state.learningStatisticsDetail = item.value;
                    if(item.value.type === 1){
                        await fetchCountData();
                    }
                }
            }
        }
    }

    const fetchCountData = async () => {
        const response: any = await setting_store.fetchCountData();
        if (response && response.status) {
            state.learningStatisticsDetail = response.data;
        }
    }

    return {
        state,
        fetchSetting,
        fetchCountData
    }

}