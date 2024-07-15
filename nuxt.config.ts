// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/sitemap',
    '@nuxt/image',
  ],
  sitemap: {
    hostname: 'https://recruit-report.com',
  },
  content: {
    csv: {
      delimiter: ',',
      parse: {
        numeric: ['consensusOverallRank', 'weightedAggregateScore', 'industryStars']
      }
    },
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3
      },
    },
    documentDriven: true,
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config',
    exposeConfig: false,
    injectPosition: 0,
    viewer: true,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  routeRules: {
    '/': { prerender: true },
    '/players': { prerender: true },
    '/players/**': { prerender: true }
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  },
  image: {
    // Add image module options here
  },
  typescript: {
    strict: true
  },
  compatibilityDate: '2024-07-13'
})