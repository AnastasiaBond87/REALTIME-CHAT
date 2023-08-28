import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ChatView from '@/views/ChatView.vue';
import NotFound from '@/views/NotFoundView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/chat',
      name: 'Chat',
      component: ChatView,
    },
    {
      path: '/:notFound',
      name: 'NotFound',
      component: NotFound,
    },
  ],
});

export default router;
