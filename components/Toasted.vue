<template>
  <div class="toasted-alert ">
    <div id="toast-success" class="flex items-center p-4 mb-4
    w-full max-w-xs text-gray-500 text-white rounded-lg shadow
     dark:text-gray-400 "
         :class="props.content.type=== 'success'  ? 'bg-[#0ea640]' : 'bg-[#E02832]'" role="alert">
      <div class="text-sm font-normal" v-html="props.content.message"></div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  content :{
    type : Object,
    default:{
      type : 'success',
      message : "Demo"
    }
  }
})

</script>
<style lang="scss">
.toasted-alert{
  position: fixed;
  right: 10px;
  top: 10px;
  z-index: 1000000;
}
</style>
