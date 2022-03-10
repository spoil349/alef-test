import Vue from 'vue'
import VueRouter from 'vue-router'
import Form from '../views/Form.vue'
import Preview from '../views/Preview.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Form',
    component: Form
  },
  {
    path: '/preview',
    name: 'Preview',
    component: Preview
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
