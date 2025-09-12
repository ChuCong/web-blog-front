import Pusher from 'pusher-js'

export default defineNuxtPlugin(nuxtApp => {
  // Optionally, you can provide Pusher config via runtimeConfig
  const config = useRuntimeConfig()
  const pusher = new Pusher(config.public.pusherKey, {
    cluster: config.public.pusherCluster,
    encrypted: true,
  })
  nuxtApp.provide('pusher', pusher)
})