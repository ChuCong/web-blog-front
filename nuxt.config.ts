import { resolve } from "path"
let pageURL = process.env.PAGE_URL
// import ckeditor5 from "@ckeditor/vite-plugin-ckeditor5"
import svgLoader from "vite-svg-loader"
import { createRequire } from "node:module"
const require = createRequire(import.meta.url)
// const larkTheme = require.resolve("@ckeditor/ckeditor5-theme-lark")

export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-16",
      title:
        "Viện nghiên cứu Quản lý Phát triển bền vững, MSD Vietnam",
      meta: [
        {
          name: "og:title",
          content:
            "Viện nghiên cứu Quản lý Phát triển bền vững, MSD Vietnam",
        },
        {
          name: "keywords",
          content: "MSD Vietnam, MSD LMS, MSD Vietnam LMS, Viện Nghiên cứu Quản lý phát triển bền vững LMS, Viện Nghiên cứu Quản lý phát triển bền vững Khoá học, Viện Nghiên cứu Quản lý phát triển bền vững Học online, Viện Nghiên cứu Quản lý phát triển bền vững Bài giảng, học trực tuyến NGO, đào tạo quản trị, khóa học SDG​",
        },
        {
          name: "description",
          content:
            "KMSD Vietnam LMS – nền tảng học trực tuyến của Viện Nghiên cứu Quản lý Phát triển Bền vững. Chia sẻ tri thức, nâng cao năng lực cho NGO, đối tác và cộng đồng với các khóa học đa dạng về SDG, quản trị, truyền thông và công nghệ. Học tập linh hoạt với video bài giảng tương tác và lấy chứng chỉ online dễ dàng.",
        },
        {
          name: "og:description",
          content:
            "KMSD Vietnam LMS – nền tảng học trực tuyến của Viện Nghiên cứu Quản lý Phát triển Bền vững. Chia sẻ tri thức, nâng cao năng lực cho NGO, đối tác và cộng đồng với các khóa học đa dạng về SDG, quản trị, truyền thông và công nghệ. Học tập linh hoạt với video bài giảng tương tác và lấy chứng chỉ online dễ dàng.",
        },
        // {
        //   name: "google-site-verification",
        //   content: "a7xIY42BGF_nHGYApLA9_KIZMBhmhpB-tVFapg0WUUs",
        // },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/logo_msd.png" }],
    },
  },

  css: ["~/assets/css/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ["@pinia/nuxt", "nuxt-jsonld", "@nuxtjs/sitemap", "@pinia/nuxt", "vue3-carousel-nuxt", "nuxt-vue3-google-signin"],

  googleSignIn: {
    clientId: '534009563248-t621rdhbveolkpoh1k8agtdiglfltcg3.apps.googleusercontent.com',
  },

  // site: {
  //   url: pageURL,
  //   trailingSlash: false,
  // },

  // sitemap: {
  //   xsl: false,
  //   sitemaps: true,
  //   sources: ["/api/sitemap"],
  //   defaultSitemapsChunkSize: 5000,
  //   exclude: ['/user/**', '/theme/**', '/auth/**', '/exam/*', '/category', '/payment_completed'],
  //   sortEntries: false,
  // },

  runtimeConfig: {
    public: {
      baseURL: process.env.URL_API,
      pusherKey: process.env.PUSHER_KEY,
      pusherCluster: process.env.PUSHER_CLUSTER,
      pageURL: process.env.PAGE_URL,
    },
  },

  hooks: {
    "pages:extend"(pages) {
      pages.push(
        {
          name: 'thong-tin-ca-nhan/thong-bao',
          path: '/thong-tin-ca-nhan/thong-bao',
          file: resolve(__dirname, './pages/account/notification.vue'),
          meta: { layout: 'account' }
        },
        {
          name: 'thong-tin-ca-nhan/profile',
          path: '/thong-tin-ca-nhan/profile',
          file: resolve(__dirname, './pages/account/profile.vue'),
          meta: { layout: 'account' }
        },
        {
          name: 'thong-tin-ca-nhan/khoa-hoc-cua-toi',
          path: '/thong-tin-ca-nhan/khoa-hoc-cua-toi',
          file: resolve(__dirname, './pages/account/user-course.vue'),
          meta: { layout: 'account' }
        }
      )
    }
  },

  components: {
    global: true,
    dirs: ["~/components", "@/common", "@/mixin"],
  },

  plugins: [
    { src: "~/plugins/i18n.ts" },
    { src: "~/plugins/validate.ts" },
    { src: '~/plugins/videojs-global.client.ts' },
    { src: '~/plugins/videojs-disable-seek.client.ts' }
  ],
  vite: {
    plugins: [
      svgLoader({
        defaultImport: 'url'
      })
    ]
  },

  build: {
    transpile: ['@meforma/vue-toaster']
  },

  compatibilityDate: "2025-02-12"
});