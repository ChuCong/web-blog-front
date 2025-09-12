<template>
  <div class="relative rounded-l-lg overflow-hidden flex items-center justify-center parallax-container_custom" :style="{
    height: height + 'px',
    backgroundImage: `url(${bgUrl})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  }">
    <div class="w-full flex items-center justify-center parallax-content-column bg-black/30 py-8">
      <h2 v-if="lesson && lesson.parent" class="font-normal text-white text-2xl md:text-3xl">
        {{ lesson.parent.title }}
      </h2>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  lesson?: { parent?: { title?: string } }
  height?: number
}>()

const bgUrl = '/assets/images/Rectangle155.png'
</script>

<style scoped>
.parallax-content-column {
  min-height: 100%;
}

@media only screen and (max-width: 414px) {
  .parallax-container_custom {
    background-size: 375px 150px !important;
  }
}
</style>