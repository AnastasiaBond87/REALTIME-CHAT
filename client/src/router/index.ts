import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ChatView from '@/views/ChatView.vue';
import NotFound from '@/views/NotFoundView.vue';
import AccountView from '@/views/AccountView.vue';
import { useAuthStore } from '@/stores/auth';

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
      path: '/account',
      name: 'Account',
      component: AccountView,
    },
    {
      path: '/:notFound',
      name: 'NotFound',
      component: NotFound,
    },
  ],
});

router.beforeEach((to, _, next) => {
  const auth = useAuthStore();

  if (!auth.isAuth && to.path === '/chat') {
    next({ name: 'Home' });
  } else if (auth.isAuth && to.path === '/') {
    next({ name: 'Chat' });
  } else {
    next();
  }
});

export default router;
