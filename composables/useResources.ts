import { resourcesStore } from "~/store/resource";
import type { Paginate, Resources} from '~/models';

interface State {
    resource: Resources,
    resources: Resources[],
    paginate: Paginate
}

export function useResources() {
    const state: State = reactive({
        resource: useState<Resources>('resources', () => ({} as Resources)),
        resources: useState<Resources[]>('resourcess', () => []),
        paginate: useState<Paginate>('paginate', () => ({} as Paginate)),
    })

    const resources_store = resourcesStore()

    const fetchResources = async (payload: any) => {
        const response: any = await resources_store.fetchResources(payload);
        if (response && response.status) {
            state.resources.splice(0); 
            state.resources.push(...response.data.data);
            state.paginate = response.data.paginate
        }
    }

    return {
        state,
        fetchResources
    }

}