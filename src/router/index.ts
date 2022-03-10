import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/About.vue')
    },
    {
      path: '/clothes/:id?',
      name: 'clothes',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AddClothes.vue')
    },
    {
      path: '/brands/:id?',
      name: 'brands',
      component: () => import('../views/AddBrands.vue')
    },
    {
      path: '/subBrands/:id?',
      name: 'subBrands',
      component: () => import('../views/AddBrands.vue')
    },
    {
      path: '/location/:id?',
      name: 'location',
      component: () => import('../views/AddLocation.vue')
    },
    {
      path: '/status',
      name: 'status',
      component: () => import('../views/AddStatus.vue')
    }
  ]
})

export default router
