import { createRouter, createWebHistory } from 'vue-router'
import PortfolioView from '@/views/Portfolio/PortfolioView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'portfolio',
      component: PortfolioView,
    },
  ],
})

export default router
