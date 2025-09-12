<template>
    <div v-if="token" class="flex w-full items-start gap-2">
        <div class="flex items-center w-full">
            <div class="user-image mr-2">
                <div v-if="!hasAvatar" class="rounded-full w-[40px] h-[40px] bg-[#397494]"></div>
                <img v-else class="rounded-full w-[40px] h-[40px] object-cover" :src="avatar" >
            </div>
            <div class="flex grow">
                <textarea class="grow border border-[#ABADAF] rounded px-3 py-2 focus:outline-[#397494]"
                    v-model="value.content" rows="2" :placeholder="placeholder" @input="changeValue"></textarea>
                <!-- <ck-content class="w-full" :value="value.content" @input="(val) => value.content = val"  :placeholder="placeholder"/> -->
            </div>
        </div>
        <button class="p-2 font-bold bg-primary text-[#FFF] px-[20px] py-2 rounded-[8px] h-full self-stretch" @click="addComent">
            Gửi
        </button>
    </div>
    <div v-else class="flex w-full items-center">
        <span class="p-2 font-bold italic">
            Đăng nhập để comment
        </span>
        <div class="mt-3">
            <SignInButton></SignInButton>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { defineEmits, defineProps } from "vue"
import { useI18n } from "vue-i18n"
// import { Comment } from '@/ts/model'
// import InputTextOutline from "~/components/elements/InputTextOutline.vue"
import SignInButton from "~/components/elements/SignInButton.vue"
import JwtService from "~/services/jwt.service"
// import CkContent from "@/components/ck-content.vue"

const { t } = useI18n()

const props = defineProps({
    value: {
        type: Object,
        default: null
    },
    placeholder: {
        type: String,
        default: 'Thêm comment'
    }
})

const emit = defineEmits(['add'])
const token = JwtService.getToken()
const avatar = JwtService.getUserAvatar()

const hasAvatar = computed(() => {
    return avatar !== null && avatar !== 'null'
})

const changeValue = ($event: any) => { }

const addComent = () => {
    emit("add")
}

</script>
<style lang="scss" scoped></style>