<template>
  <div class="w-full max-w-3xl mx-auto my-4">
    <video ref="videoRef" class="video-js vjs-fluid rounded-lg shadow" autoplay loop preload="auto" controls>
      <source :src="src" :type="videoType" />
    </video>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

const props = defineProps<{
  src: string
}>()

const emit = defineEmits(['timeupdate', 'play', 'seeked'])

const videoRef = ref<HTMLVideoElement | null>(null)
const player = ref<any>(null)

const getFileExtension = (src: string) => {
  return src.split(/[#?]/)[0].split('.').pop()?.trim() || ''
}

const isHls = computed(() => getFileExtension(props.src) === 'm3u8')
const videoType = computed(() =>
  isHls.value ? 'application/x-mpegURL' : 'application/dash+xml'
)

const loadVideo = () => {
  if (videoRef.value) {
    player.value = videojs(videoRef.value)
    player.value.src({
      src: props.src,
      type: videoType.value
    })
    player.value.on('timeupdate', () => {
      emit('timeupdate', player.value.currentTime())
    })
    player.value.on('play', () => {
      emit('play')
    })
    player.value.on('seeked', () => {
      emit('seeked', player.value.currentTime())
    })
  }
}

onMounted(() => {
  loadVideo()
})

watch(() => props.src, () => {
  if (player.value) {
    player.value.src({
      src: props.src,
      type: videoType.value
    })
  } else {
    loadVideo()
  }
})

onBeforeUnmount(() => {
  if (player.value) {
    player.value.dispose()
  }
})

// expose player for parent
defineExpose({ player })
</script>

<style scoped>
/* Nếu muốn custom thêm cho video.js thì thêm ở đây */
</style>