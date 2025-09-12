import {defineStore} from 'pinia';

interface Toasted {
    isToasted: boolean;
    content: object;
}

export const toastStore = defineStore('toast', {
    state: (): Toasted => {
        return {
            isToasted: false,
            content: {}
        };
    },
    actions: {
        setToasted(data:any) {
            this.isToasted = true
            this.content = data
        },
        closeToast() {
            this.isToasted = false
        }
    },
});
