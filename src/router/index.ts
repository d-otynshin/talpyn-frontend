import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/occupations/:id',
      name: 'occupation',
      component: () => import('../views/OccupationView.vue'),
    }
  ]
})

export default router
