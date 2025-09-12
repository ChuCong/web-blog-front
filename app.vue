<template>
  <div id="app">
    <LoadSpinner v-if="isLoading" />
    <NuxtLayout class="h-full">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
// import { ref, onMounted, watch } from "vue";
import { loadingStore } from "@/store/loading"
import LoadSpinner from "~/components/elements/LoadSpinner.vue"
const loading = loadingStore()
const isLoading = ref(false)
watch(() => loading.isLoading, (newValue: boolean) => {
  isLoading.value = newValue
})
// onMounted(() => {
//   setTimeout(() => {
//     isLoading.value = false; // Simulating data load completion
//   }, 2000); // Adjust time as needed based on data loading duration
// });
</script>
