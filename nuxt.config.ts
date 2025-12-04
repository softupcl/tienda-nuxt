// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css:[
    '~/assets/css/main.css'
  ],

  app:{
    head:{
      title: 'Mi tienda',
      meta:[
        {
          name: 'description',
          content:'Bienvenido a mi tienda de regalos'
        }
      ]
    }
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/ui'
  ],

  //config SPA
  // ssr:false,
  // nitro:{
  //   preset:'static',
  //   static:true
  // }

  //Pre render de todo el sitio
  nitro:{
   prerender:{
      routes:['/', '/about','/contact','/pricing','/products'],
      ignore:['/dashboard', '/dashboard/**'],
      crawlLinks: true
   }
  }
})