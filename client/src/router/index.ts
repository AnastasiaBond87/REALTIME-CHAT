import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ChatView from '@/views/ChatView.vue';
import NotFound from '@/views/NotFoundView.vue';
import ProfileView from '@/views/ProfileView.vue';
import { useUserStore } from '@/stores/user';

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
      path: '/profile',
      name: 'Profile',
      component: ProfileView,
    },
    {
      path: '/:notFound',
      name: 'NotFound',
      component: NotFound,
    },
  ],
});

router.beforeEach((to, _, next) => {
  const auth = useUserStore();

  if (!auth.isAuth && to.path === '/chat') {
    next({ name: 'Home' });
  } else if (auth.isAuth && to.path === '/') {
    next({ name: 'Chat' });
  } else {
    next();
  }
});

export default router;
