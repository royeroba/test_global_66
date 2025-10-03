import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { hideFooter: true },
    },
    {
      path: '/pokemon',
      name: 'pokemon-list',
      component: () => import('../views/PokemonListView.vue'),
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('../views/FavoritesView.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

export default router
