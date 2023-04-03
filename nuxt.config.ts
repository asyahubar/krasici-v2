// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: true,

  css: [
    '@/assets/css/fonts.css'
  ],

  modules: [
    "@nuxtjs/i18n",
    "@nuxtjs/tailwindcss",
    "nuxt-vuefire"
  ],

  components: true,

  i18n: {
    defaultLocale: "uk",
    langDir: "lang",
    locales: [
      {
        code: "en",
        file: "en.json",
      },
      {
        code: "sr",
        file: "sr.json",
      },
      {
        code: "uk",
        file: "uk.json",
      },
    ],
    vueI18n: {
      fallbackLocale: "en",
    },
  },

  vuefire: {
    config: {
      apiKey: process.env.FB_API_KEY,
      authDomain: process.env.FB_AUTH_DOMAIN,
      projectId: process.env.FB_PROJECT_ID,
      storageBucket: process.env.FB_STORAGE_BUCKET,
      messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
      appId: process.env.FB_APP_ID,
      measurementId: process.env.FB_MEASUREMENT_ID
    }
  }
});
