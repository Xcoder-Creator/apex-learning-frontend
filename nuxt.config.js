import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Apex-Learning',
    title: 'Apex-Learning',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  ssr: true,

  loading: false, //Loading progress bar

  loadingIndicator: false, //Splash screen loader indicator

  server: {
    port: 4500
  },

  publicRuntimeConfig: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    apiUrl: process.env.API_URL || 'http://localhost:3000',
    environment: process.env.ENVIRONMENT || 'production',
    student_classesUrl: process.env.STUDENT_CLASSES_URL || '/student/classes',
    teacher_classesUrl: process.env.TEACHER_CLASSES_URL || '/teacher/classes',
    VUEX_PAGE_LOADING_UPDATE_DATA: process.env.VUEX_PAGE_LOADING_UPDATE_DATA || 'page_loading/update_data',
    VUEX_CLOSE_ERR_MSG_DIALOG: process.env.VUEX_CLOSE_ERR_MSG_DIALOG || 'dialog/err_msg_dialog/reset_data',
    VUEX_UPDATE_ERR_MSG_DIALOG: process.env.VUEX_UPDATE_ERR_MSG_DIALOG || 'dialog/err_msg_dialog/update_data',
    VUEX_LOGIN_ROUTE_UPDATE_ENABLE_LOGIN: process.env.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_LOGIN || 'login/login_route_config/update_enable_login',
    VUEX_STORE_USER_DETAILS: process.env.VUEX_STORE_USER_DETAILS || 'user_details/user_details/update_data',
    VUEX_RESET_VERIF_ACCT_DIALOG_LOGIN: process.env.VUEX_RESET_VERIF_ACCT_DIALOG_LOGIN || 'dialog/verify_acct_login/verify_acct_dialog/reset_data',
    VUEX_UPDATE_VERIF_ACCT_DIALOG_LOGIN: process.env.VUEX_UPDATE_VERIF_ACCT_DIALOG_LOGIN || 'dialog/verify_acct_login/verify_acct_dialog/update_data',
    VUEX_LOGIN_ROUTE_UPDATE_ENABLE_VERIF_ACCT: process.env.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_VERIF_ACCT || 'login/login_route_config/update_enable_verif_acct',
    VUEX_LOGIN_ROUTE_UPDATE_ENABLE_RESEND_VERIF_CODE: process.env.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_RESEND_VERIF_CODE || 'login/login_route_config/update_enable_resend_verif_code',
    VUEX_LOGIN_ROUTE_CLOSE_FORGOT_PASSWORD_DIALOG: process.env.VUEX_LOGIN_ROUTE_CLOSE_FORGOT_PASSWORD_DIALOG || 'dialog/forgot_password_login/forgot_password_dialog/reset_data',
    VUEX_LOGIN_ROUTE_OPEN_FORGOT_PASSWORD_DIALOG: process.env.VUEX_LOGIN_ROUTE_OPEN_FORGOT_PASSWORD_DIALOG || 'dialog/forgot_password_login/forgot_password_dialog/update_data',
    VUEX_LOGIN_ROUTE_UPDATE_ENABLE_CHECK_EMAIL: process.env.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_CHECK_EMAIL || 'login/login_route_config/update_enable_check_email',
    VUEX_LOGIN_ROUTE_CLOSE_RESET_CODE_DIALOG: process.env.VUEX_LOGIN_ROUTE_CLOSE_RESET_CODE_DIALOG || 'dialog/forgot_password_login/reset_code_dialog/reset_data',
    VUEX_LOGIN_ROUTE_UPDATE_ENABLE_VALIDATE_RESET_CODE: process.env.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_VALIDATE_RESET_CODE || 'login/login_route_config/update_enable_reset_code',
    VUEX_LOGIN_ROUTE_UPDATE_RESET_CODE_DIALOG: process.env.VUEX_LOGIN_ROUTE_UPDATE_RESET_CODE_DIALOG || 'dialog/forgot_password_login/reset_code_dialog/update_data',
    VUEX_PASSWORD_RESET_CODE_UPDATE: process.env.VUEX_PASSWORD_RESET_CODE_UPDATE || 'user_details/reset_code/update_data',
    VUEX_LOGIN_ROUTE_UPDATE_RESET_PASSWORD_DIALOG: process.env.VUEX_LOGIN_ROUTE_UPDATE_RESET_PASSWORD_DIALOG || 'dialog/forgot_password_login/reset_password_dialog/update_data',
    VUEX_LOGIN_ROUTE_CLOSE_RESET_PASSWORD_DIALOG: process.env.VUEX_LOGIN_ROUTE_CLOSE_RESET_PASSWORD_DIALOG || 'dialog/forgot_password_login/reset_password_dialog/reset_data',
    VUEX_LOGIN_ROUTE_UPDATE_ENABLE_RESET_PASSWORD: process.env.VUEX_LOGIN_ROUTE_UPDATE_ENABLE_RESET_PASSWORD || 'login/login_route_config/update_enable_reset_password',
    VUEX_UPDATE_SNACKBAR: process.env.VUEX_UPDATE_SNACKBAR || 'snackbar/snackbar/update_data',
    VUEX_CLOSE_ACCT_VERIF_DIALOG: process.env.VUEX_CLOSE_ACCT_VERIF_DIALOG || 'dialog/verify_acct_login/verify_acct_dialog/reset_data',
    VUEX_SIGNUP_ROUTE_UPDATE_ENABLE_SIGNUP: process.env.VUEX_SIGNUP_ROUTE_UPDATE_ENABLE_SIGNUP || 'signup/signup_route_config/update_enable_signup',
    VUEX_UPDATE_VERIF_ACCT_DIALOG_SIGNUP: process.env.VUEX_UPDATE_VERIF_ACCT_DIALOG_SIGNUP || 'dialog/verify_acct_signup/verify_acct_dialog/update_data',
    VUEX_SIGNUP_ROUTE_UPDATE_ENABLE_VERIF_ACCT: process.env.VUEX_SIGNUP_ROUTE_UPDATE_ENABLE_VERIF_ACCT || 'signup/signup_route_config/update_enable_verif_acct',
    VUEX_SIGNUP_ROUTE_UPDATE_ENABLE_RESEND_VERIF_CODE: process.env.VUEX_SIGNUP_ROUTE_UPDATE_ENABLE_RESEND_VERIF_CODE || 'signup/signup_route_config/update_enable_resend_verif_code',
    VUEX_RESET_VERIF_ACCT_DIALOG_SIGNUP: process.env.VUEX_RESET_VERIF_ACCT_DIALOG_SIGNUP || 'dialog/verify_acct_signup/verify_acct_dialog/reset_data',
    VUEX_RESET_SNACKBAR: process.env.VUEX_RESET_SNACKBAR || 'snackbar/snackbar/reset_data'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/TiptapVuetify'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',

    '@nuxtjs/dotenv'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vuetify/lib', "tiptap-vuetify"]
  }
}
