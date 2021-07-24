import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import express from 'express'
import serveIndex from 'serve-index'
import path from 'path'

const exApp = express()
exApp.use(express.static(path.dirname(__dirname)))
exApp.use(serveIndex(path.dirname(__dirname), { icons: true }))
exApp.listen(process.env.PORT || 3001)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
