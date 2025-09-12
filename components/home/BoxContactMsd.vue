<template>
    <div class=" mx-auto md:pt-[90px] pt-[50px] w-[100%]">
        <div class="md:relative">
            <img class="mobile w-full h-[400px] " src="@/assets/images/background_contactmsd.png" alt="Image Contact Msd">
            <div class="2xl:w-[30%] md:w-[40%]  bg-[#007600] rounded-[10px] p-4 md:top-1/2 md:-translate-y-1/2 md:absolute  2xl:right-[300px] md:right-[100px] z-10">
                <div class="text-[32px] title_font text-white ">
                    LIÊN HỆ <br>
                    VỚI MSD VIỆT NAM
                </div>
                <div class="flex gap-5 mb-4 mt-4 w-[100%]">
                    <InputTextOutline type="text" :value="user.name" @input="(value) => user.name = value"
                        placeholder="Tên của bạn..." width="100" class="flex-1" />
                    <InputTextOutline type="text" :value="user.phone" @input="(value) => user.phone = value"
                        placeholder="Số điện thoại..." width="100" class="flex-1" />
                </div>
                <InputTextOutline type="text" :value="user.email" @input="(value) => user.email = value"
                    placeholder="Email..." width="100" class="mb-4" />
                <InputTextOutline type="textarea" :value="user.content" @input="(value) => user.content = value"
                    placeholder="Nội dung..." width="100" />
                <div class="w-fit mx-auto mt-4 title_font">
                    <button class=" bg-primary text-white px-3 py-2 text-[20px] rounded-[10px] title_font" @click="createContact">GỬI THÔNG TIN</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import InputTextOutline from '../elements/InputTextOutline.vue';
import { useContact } from '~/composables';
import { loadingStore } from "@/store/loading"
import { messageSuccess, messageError } from '~/common/message.service';

const loading = loadingStore()
const contacComp = useContact()
const user = ref<any>({})

const createContact = async () => {
    loading.setLoading(true)
    let res: { status?: number; message?: string } | undefined = await contacComp.addContact(user.value)
    if (res && res.status === 1) {
        messageSuccess('Success')
    }else{
        messageError(res?.message || 'Có lỗi xảy ra')
    }
    loading.setLoading(false)
}
</script>
<style lang="scss" scoped>
@media (max-width: 768px) {

    .mobile{
        display: none;
    }
}
</style>