import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import express from 'express'
import serveIndex from 'serve-index'
import path from 'path'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import fbConfig from './config/firebase-config'

const exApp = express()
exApp.use(express.static(path.dirname(__dirname)))
exApp.use(serveIndex(path.dirname(__dirname), { icons: true }))
exApp.listen(process.env.PORT || 3000)

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: fbConfig.apiKey,
  authDomain: fbConfig.authDomain,
  projectId: fbConfig.projectId,
  storageBucket: fbConfig.storageBucket,
  messagingSenderId: fbConfig.measurementId,
  appId: fbConfig.appId,
  measurementId: fbConfig.measurementId
}

// Initialize Firebase
const firebase = initializeApp(firebaseConfig)
const analytics = getAnalytics(firebase)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
