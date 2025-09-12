<template>
  <div class="content-profile mx-0 mt-0 p-0 md:mb-[100px] mb-[50px]">
    <div class="flex items-center mb-4 px-5">
      <div class="headline-profile text-2xl font-semibold flex-1 text-[#0044B5] title_font">
        {{ $t("profile.profile_title") }}
      </div>
      <button v-if="!isEdited" class="edit-btn text-[18px] hover:underline flex items-center gap-1" @click="editProfile"
        type="button">
        <div>{{ $t("profile.edit") || 'Chỉnh sửa' }}</div>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <g clip-path="url(#clip0_205_14899)">
            <path
              d="M2.5 14.3751V17.5001H5.625L14.8417 8.28346L11.7167 5.15846L2.5 14.3751ZM17.2583 5.8668C17.5833 5.5418 17.5833 5.0168 17.2583 4.6918L15.3083 2.7418C14.9833 2.4168 14.4583 2.4168 14.1333 2.7418L12.6083 4.2668L15.7333 7.3918L17.2583 5.8668Z"
              fill="#F27619" />
          </g>
          <defs>
            <clipPath id="clip0_205_14899">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>
    </div>
    <template v-if="isEdited">
      <div class="list-profile mb-4">
        <form @submit.prevent="updateProfile" class="space-y-5">
          <InputTextOutline :value="user.full_name" @input="(value) => user.full_name = value"
            :placeholder="$t('profile.full_name')" :readonly="true" width="100" />
          <InputTextOutline :value="user.email" @input="(value) => user.email = value"
            :placeholder="$t('profile.email')" width="100" :readonly="true" />
          <InputTextOutline :value="user.phone" @input="(value) => user.phone = value"
            :placeholder="$t('profile.phone_number')" :readonly="!isEdited" width="100" />
          <InputTextOutline type="select" :value="user.sex" @input="(value) => user.sex = value" :items="SEXES"
            itemText="text" itemValue="value" :placeholder="$t('profile.sex')" :readonly="!isEdited" width="100" />
          <div>
            <label class="block mb-1 text-gray-700">{{ $t('profile.ethnicity') }}</label>
            <InputTextOutline :value="user.ethnicity" @input="(value) => user.ethnicity = value"
              :placeholder="$t('profile.ethnicity')" :readonly="!isEdited" width="100" />
          </div>
          <div>
            <label class="block mb-1 text-gray-700">{{ $t('profile.birthday') }}</label>
            <Datepicker v-model="user.birthday" :type="'date'" :enable-time-picker="false" :format="'dd/MM/yyyy'"
              :disabled="!isEdited" input-class-name="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label class="block mb-1 text-gray-700">{{ $t('profile.address') }}</label>
            <InputTextOutline :value="user.address" @input="(value) => user.address = value"
              :placeholder="$t('profile.address')" :readonly="!isEdited" width="100" />
          </div>
          <div>
            <label class="block mb-1 text-gray-700">{{ $t('profile.disability') }}</label>
            <InputTextOutline :value="user.disability" @input="(value) => user.disability = value"
              :placeholder="$t('profile.disability')" :readonly="!isEdited" width="100" />
          </div>
          <div>
            <label class="block mb-1 text-gray-700">{{ $t('profile.education') }}</label>
            <InputTextOutline type="select" :value="user.education" @input="(value) => user.education = value" :items="EDUCATIONS"
              itemText="text" itemValue="value" :placeholder="$t('profile.education')" :readonly="!isEdited" width="100" />
          </div>
          <div>
            <label class="block mb-1 text-gray-700">{{ $t('profile.organization') }}</label>
            <InputTextOutline :value="user.organization" @input="(value) => user.organization = value"
              :placeholder="$t('profile.organization')" :readonly="!isEdited" width="100" />
          </div>
          <div v-if="isEdited" class="text-center mt-6">
            <BtnBase :width="120" :text="$t('profile.save')" color="#fff" bg_color="#22c55e" bg_color_border="#22c55e"
              :rounded="8" class="mx-auto" @click="updateProfile" />
          </div>
        </form>
      </div>
    </template>
    <template v-else>
      <div v-for="(item, index) in userInfo" :key="index">
        <div class=" text-[#2B2C2E] py-[14px] flex justify-between gap-3 px-5">
          <div class="w-[30%]">{{ item.label }}</div>
          <div class="w-[70%] flex justify-end">{{ item.value || '-' }}</div>
        </div>
        <div class="dashed-border"></div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUser } from '@/composables/useUser'
import InputTextOutline from '~/components/elements/InputTextOutline.vue'
import BtnBase from '~/components/elements/BtnBase.vue'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import anonymousAvatar from '~/assets/images/avatar_nho.png'
import { messageSuccess, messageError } from '~/common/message.service'
import { SEXES, EDUCATIONS } from '@/common/Constant'

definePageMeta({
  layout: 'account'
})

const { state, updateUser, uploadAvatar, getUserDetail } = useUser()

const user = ref<any>({})
const isEdited = ref(false)

const userInfo = computed(() => [
  { label: 'Họ và tên', value: user.value.full_name },
  { label: 'Email', value: user.value.email || '-' },
  { label: 'SDT', value: user.value.phone || '-' },
  { label: 'Giới tính', value: SEXES.find(s => s.value === user.value.sex)?.text || '-' },
  {
    label: 'Ngày sinh',
    value: user.value.birthday
      ? (user.value.birthday instanceof Date
          ? user.value.birthday.toLocaleDateString('vi-VN')
          : (typeof user.value.birthday === 'string'
              ? user.value.birthday.split('T')[0].split('-').reverse().join('/')
              : '-'))
      : '-'
  },
  { label: 'Địa chỉ', value: user.value.address || '-' },
  { label: 'Dân tộc', value: user.value.ethnicity || '-' },
  { label: 'Tình trạng khuyết tật', value: user.value.disability || '-' },
  { label: 'Học vấn', value: EDUCATIONS.find(e => e.value === user.value.education)?.text || '-' },
  { label: 'Đơn vị', value: user.value.organization || '-' },
]);

onMounted(async () => {
  await getUserDetail()
  if (state.userDetail) {
    user.value = { ...state.userDetail }
  }
  if (!state.avatarUrl) {
    state.avatarUrl = anonymousAvatar
  }
})

function editProfile() {
  isEdited.value = true
}

async function updateProfile() {
  // Validate
  // if (!user.value.full_name) {
  //   alert('Không được bỏ trống Họ và tên')
  //   return
  // }
  // if (!user.value.phone) {
  //   alert('Không được bỏ trống Số điện thoại')
  //   return
  // }
  // if (!/^(0[0-9]{9})$/.test(user.value.phone)) {
  //   alert('Số điện thoại của bạn không đúng định dạng!')
  //   return
  // }
  if (user.value.birthday instanceof Date) {
    const d = user.value.birthday
    user.value.birthday = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`
  }

  const res = await updateUser(user.value)
  if (res?.status) {
    isEdited.value = false
    // window.location.href = '/thong-tin-ca-nhan/profile'
    messageSuccess('Cập nhật thông tin thành công!')
  } else {
    messageError('Cập nhật thông tin thất bại!')
  }
}
</script>

<style lang="scss">
.v-text-field-custom-email.v-text-field input {
  color: #8E8E8E !important;
}

.v-text-field input {
  color: #000;
}

.v-text-field input:disabled {
  color: #000;
}

// .content {
//   padding: 10px;
//   margin-bottom: 100px;
// }

.btn-save {
  color: #fff !important;
  font-weight: bold !important;
  margin-bottom: 50px;
}

#app .edit-btn {
  color: #F27619;
}

.edit-btn:hover {
  cursor: pointer;
}

.headline-profile {
  font-size: 25px;
  font-weight: 500;
}

hr {
  margin-bottom: 30px;
  margin-top: -30px;
}

.v-text-field--rounded>.v-input__control>.v-input__slot {
  padding: 0px !important;
  width: unset !important;
}

.v-select__selection.v-select__selection--comma.v-select__selection--disabled {
  color: #000 !important;
}

@media screen and (max-width: 2560px) {
  .user-avatar-profile {
    display: none;
  }

  .headline-profile {
    font-size: 25px !important;
  }

  .btn-down-level.v-select.v-input--dense .v-select__selection--comma {
    margin-left: 389px;
    margin-top: -14px;
  }

  .btn-down-sex.v-select.v-input--dense .v-select__selection--comma {
    margin-left: 415px;
    margin-top: -14px;
  }

  .btn-down-country.v-select.v-input--dense .v-select__selection--comma {
    margin-left: 516px;
    margin-top: -14px;
  }

  .input__profile.v-text-field input {
    margin-top: -21px;
  }

  .btn-down-level .mdi-menu-down,
  .btn-down-country .mdi-menu-down,
  .btn-down-sex .mdi-menu-down {
    margin-top: -16px;
  }

  .icon-pencil {
    font-size: 18px !important;
    margin-top: -5px;
  }
}

@media screen and (max-width: 1920px) {
  .menu-profile.v-menu__content {
    margin-left: 80px;
  }

  .headline-profile {
    font-size: 25px !important;
  }

  .btn-down-level.v-select.v-input--dense .v-select__selection--comma {
    margin-left: 257px;
    margin-top: -16px;
  }

  .btn-down-sex.v-select.v-input--dense .v-select__selection--comma {
    margin-left: 290px;
    margin-top: -14px;
  }

  .btn-down-country.v-select.v-input--dense .v-select__selection--comma {
    margin-left: 357px;
    margin-top: -14px;
  }

  .input__profile.v-text-field input,
  .btn-down-level .mdi-menu-down,
  .btn-down-sex .mdi-menu-down {
    margin-top: -21px;
  }
}

@media screen and (max-width: 1440px) {
  .v-menu__content {
    margin-left: 0px;
  }

  .btn-down-level.v-select.v-input--dense .v-select__selection--comma {
    margin-left: 166px;
    margin-top: -18px;
  }

  .btn-down-sex.v-select.v-input--dense .v-select__selection--comma {
    margin-left: 192px;
    margin-top: -14px;
  }

  .btn-down-country.v-select.v-input--dense .v-select__selection--comma {
    margin-left: 240px;
    margin-top: -14px;
  }

  .input__profile.v-text-field input,
  .btn-down-level .mdi-menu-down,
  .btn-down-country .mdi-menu-down,
  .btn-down-sex .mdi-menu-down {
    margin-top: -21px;
  }
}

@media screen and (max-width: 1366px) {
  .btn-down-level.v-select.v-input--dense .v-select__selection--comma {
    margin-left: 153px;
    margin-top: -16px;
  }

  .btn-down-sex.v-select.v-input--dense .v-select__selection--comma {
    margin-left: 175px;
    margin-top: -14px;
  }

  .btn-down-country.v-select.v-input--dense .v-select__selection--comma {
    margin-left: 220px;
    margin-top: -14px;
  }
}

@media screen and (max-width: 1024px) {
  hr {
    margin-bottom: 30px;
    margin-top: -20px;
  }

  .headline-profile {
    font-size: 25px !important;
  }

  .btn-down-level.v-select.v-input--dense .v-select__selection--comma {
    margin-left: 134px;
    margin-top: -8px;
  }

  .btn-down-sex.v-select.v-input--dense .v-select__selection--comma {
    margin-left: 160px;
    margin-top: -14px;
  }

  .btn-down-country.v-select.v-input--dense .v-select__selection--comma {
    margin-left: 137px;
    margin-top: -14px;
  }

  .input__profile.v-text-field input {
    margin-top: -6px;
  }

  .btn-down-level .mdi-menu-down,
  .btn-down-country .mdi-menu-down,
  .btn-down-sex .mdi-menu-down {
    margin-top: -14px;
  }
}

@media screen and (max-width: 768px) {

  // .content-profile {
  //   padding-right: 20px;
  // }
  .user-avatar-profile {
    display: inline;
  }

  .user-avatar-profile .v-card__title {
    margin-top: -40px !important;
  }

  .hr-first {
    display: none;
  }

  .headline-profile {
    font-size: 20px !important;
  }

  .icon-pencil {
    font-size: 18px !important;
  }

  #app .edit-btn {
    font-size: 20px;
    line-height: 40px;
  }

  .btn-down-level.v-select.v-input--dense .v-select__selection--comma {
    margin-left: 334px;
    margin-top: -7px;
  }

  .btn-down-sex.v-select.v-input--dense .v-select__selection--comma {
    margin-left: 371px;
    margin-top: -14px;
  }

  .btn-down-country.v-select.v-input--dense .v-select__selection--comma {
    margin-left: 336px;
    margin-top: -14px;
  }

  .input__profile.v-text-field input {
    margin-top: -6px;
  }

  .btn-down-level .mdi-menu-down,
  .btn-down-country .mdi-menu-down,
  .btn-down-sex .mdi-menu-down {
    margin-top: -13px;
  }
}

@media screen and (max-width: 425px) {

  // .content-profile {
  //   padding-right: 20px;
  // }
  .menu-profile.v-menu__content {
    margin-left: -140px;
  }

  .headline-profile {
    font-size: 20px !important;
  }

  #app .edit-btn {
    font-size: 15px;
    margin-top: -8px;
  }

  .btn-down-level.v-select.v-input--dense .v-select__selection--comma {
    margin-left: 67px;
  }

  .btn-down-sex.v-select.v-input--dense .v-select__selection--comma {
    margin-left: 104px;
    margin-top: -14px;
  }

  .btn-down-country.v-select.v-input--dense .v-select__selection--comma {
    margin-left: 69px;
    margin-top: -14px;
  }

  .v-text-field--rounded>.v-input__control>.v-input__slot {
    padding: 0px !important;
    width: auto !important;
  }

  .v-text-field-custom-email {
    width: 275px !important;
  }

  // .content {
  //   padding: 0px;
  //   margin-bottom: 50px;
  // }
  .input__profile.v-text-field input,
  .v-select.v-input--dense .v-select__selection--comma {
    margin-top: -6px;
  }

  .btn-down-level .mdi-menu-down,
  .btn-down-country .mdi-menu-down,
  .btn-down-sex .mdi-menu-down {
    margin-top: -15px;
  }
}

@media screen and (max-width: 375px) {
  .headline-profile {
    font-size: 20px !important;
    color: #000000;
  }

  .icon-pencil {
    font-size: 15px !important;
    margin-top: -3px;
  }

  #app .edit-btn {
    font-size: 15px;
  }

  .btn-down-level.v-select.v-input--dense .v-select__selection--comma {
    margin-left: 42px;
  }

  .btn-down-sex.v-select.v-input--dense .v-select__selection--comma {
    margin-left: 79px;
    margin-top: -14px;
  }

  .btn-down-country.v-select.v-input--dense .v-select__selection--comma {
    margin-left: 44px;
  }

  .v-text-field-custom-email {
    width: 245px !important;
  }
}

@media screen and (max-width: 320px) {
  .headline-profile {
    font-size: 20px;
  }

  #app .edit-btn {
    font-size: 10px;
  }

  .btn-down-level.v-select.v-input--dense .v-select__selection--comma {
    margin-left: 7px;
  }

  .btn-down-sex.v-select.v-input--dense .v-select__selection--comma {
    margin-left: 32px;
    margin-top: -14px;
  }
}

.dashed-border {
  width: 100%;
  height: 1px;
  background: repeating-linear-gradient(to left,
      lightgray 0px,
      lightgray 13px,
      transparent 15px,
      transparent 25px);
}
</style>
