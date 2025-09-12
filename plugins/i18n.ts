import {createI18n} from 'vue-i18n'
import vi from "../locales/vi"

export default defineNuxtPlugin(({vueApp}) => {
    const i18n = createI18n({
        legacy: false,
        globalInjection: true,
        locale: 'vi',
        warnHtmlInMessage: "off",
        warnHtmlMessage: false,
        messages: {
            vi
        }
    })

    vueApp.use(i18n)
    vueApp.provide('i18n', i18n)
})
