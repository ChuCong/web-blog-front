<template>
  <div class="wrapper-box">
    <div class="content-box">
      <div class="text-white text-[20px] uppercase py-4">Bạn cần đăng nhập để bắt đầu học</div>
      <div class="py-2 px-0">
        <SignInButton></SignInButton>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import SignInButton from "@/components/elements/SignInButton.vue";

</script>
<style>
.wrapper-box {
  background: grey;
  padding: 200px 0;
  text-align: center;
}
</style>
