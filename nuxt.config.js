import colors from 'vuetify/es5/util/colors'
// import customPaths from './paths'
// import '@fortawesome/fontawesome-free/css/all.css'
require('dotenv').config()
let VUE_APP_API_HOST = process.env.VUE_APP_API_HOST

let productName = process.env.PRODUCT_NAME || 'SatLegal'

export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s | ' + productName,
    title: 'Modern Law Practice Management Software',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap',
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#6d42c7' },
  /*
   ** Global CSS
   */
  css: ['~/assets/main.css', '~/assets/argon.min.css', '~/assets/docs.min.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/global-mixin',
    '~/plugins/store',
    '~/plugins/axios',
    '~/plugins/eventBus',
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/dotenv',
    // '@nuxtjs/router'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'portal-vue/nuxt',
    // "@nuxtjs/pwa",
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    // baseURL: '/',
    baseURL: VUE_APP_API_HOST,
    // proxy: process.env.NODE_ENV !== 'production' // enable proxy for development mode only,
    // retry: { retries: 3 }
  },
  proxy: {
    /*'/api/': {
      target: process.env.VUE_APP_API_HOST
        ? VUE_APP_API_HOST
        : 'http://[::1]:8000',
    },*/
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    icons: {
      // iconfont: 'md',
      //iconfont: 'mdi',
      iconfont: 'fa',
      // iconfont: 'fa4'
      // iconfont: 'mdiSvg',
      // iconfont: 'mdiSvg', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4'
    },
    theme: {
      // disable: true,
      // dark: true,
      dark: false,
      themes: {
        light: {
          primary: '#6d42c7',
        },
        dark: {
          primary: '#6d42c7',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  /*
   ** Build configuration
   */
  build: {
    extractCSS: {
      allChunks: true,
      ignoreOrder: true,
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.worker\.js$/,
        use: { loader: 'worker-loader' },
      })
    },
  },
  env: {
    productName: productName,
  },
  router: {
    extendRoutes(routes, resolve) {
      // console.log(routes)
      /*customPaths.forEach((item) => {
        routes.push({
          name: item.name,
          path: item.path,
          chunkName: item.chunkName,
          component: resolve(__dirname, item.component),
        })
      })*/
      // routes = [...routes, ...customPaths]
    },
  },
}
