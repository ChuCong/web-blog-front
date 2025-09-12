import { UNAUTHENTICATE_STATUS, CONTENT_ERROR_STATUS } from "@/common/Constant";
import { authStore } from "@/store/auth";
import { toastStore } from "~/store/toasted";

export function useMyFetch<T>(
    url: string,
    opts?: any
) {
    const route = useRoute();
    const token = useCookie('token');
    const auth = authStore();
    const toast = toastStore();

    const config = useRuntimeConfig();
    let authorization = '';
    if (token.value) {
        authorization = `Bearer ${token.value}`;
    }

    const result = $fetch<T>(url, {
        baseURL: config.public.baseURL,
        initialCache: false,
        headers: {
            Authorization: authorization,
            'Cache-Control': 'no-cache'
        },
        onResponse: async ({ response }) => {
            if (response.status === UNAUTHENTICATE_STATUS) {
                auth.setHasPermission(false);
            }

            if (response.status === CONTENT_ERROR_STATUS) {
                const error = {
                    type: 'error',
                    message: response?._data?.errors.join(','),
                };
                toast.setToasted(error);
            }
        },
        ...opts,
    });

    return result;
}

