import { createRouter, createWebHistory } from 'vue-router';
import VehiclesView from '@/views/VehiclesView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/vehicles'
    },
    {
      path: '/vehicles',
      name: 'vehicles',
      component: VehiclesView
    }
  ]
});

export default router;
