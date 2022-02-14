import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import TimeTableAdmin from '../views/TimeTableAdmin.vue'
import ISL from '../views/ISL.vue'
import ISLHome from '../views/ISLHome.vue'
import Setting from '../views/Setting.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/time-table',
    name: 'TimeTable',
    component: TimeTableAdmin
  },
  {
    path: '/isl',
    name: 'ISL',
    component: ISL
  },
  {
    path: '/isl-home',
    name: 'ISL Home',
    component: ISLHome
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Setting
  }
]

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
