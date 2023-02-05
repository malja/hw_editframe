import dotenv from 'dotenv'
dotenv.config()

export default defineNuxtConfig({
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css'
  ],
  build: {
    transpile: [
      'vuetify'
    ]
  },
  runtimeConfig: {
    public: {
      apiRoot: process.env.BACKEND_API_URL
    }
  },
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  app: {
    head: {
      title: 'Editframe',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})
