<template>
  <GoogleSignInButton @success="handleLoginSuccess" @error="handleLoginError"></GoogleSignInButton>
</template>
<script lang="ts" setup>
import {
  GoogleSignInButton,
  type CredentialResponse,
} from "vue3-google-signin"
import { authStore } from "~/store/auth"
import { toastStore } from "~/store/toasted"
import type { ApiResponse } from "~/models"


const config = useRuntimeConfig()
const key = config.public.keyExam
const auth = authStore()
const toast = toastStore()

const handleLoginSuccess = (response: CredentialResponse) => {
  const { credential } = response
  auth.loginByGoogle({ token: credential }).then((data: ApiResponse<any>) => {
    if (data && data.status && data.data.status) {
      reloadNuxtApp()
    } else if (data && data.status && !data.data.status) {
      const error = {
        type: 'error',
        message: data.data.message
      }
      toast.setToasted(error)
    } else {
      const error = {
        type: 'error',
        message: data.message
      }
      toast.setToasted(error)
    }
  })
}

// handle an error event
const handleLoginError = () => {
  console.error("Login failed")
}
</script>