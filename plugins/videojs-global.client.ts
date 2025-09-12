import videojs from 'video.js'

// Gán videojs lên window để các plugin custom có thể truy cập
if (typeof window !== 'undefined') {
  window.videojs = videojs
}

export default defineNuxtPlugin(() => {})