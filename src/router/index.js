import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    component:()=>import('@/views/home.vue'),
    name:'home'
  },
  {
    path:'/listPage',
    component:()=>import('@/views/listPage.vue'),
    name:'listPage'
  }
]

const router = new VueRouter({
  routes
})

export default router
