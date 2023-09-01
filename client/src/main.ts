import '@/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/App.vue';
import router from '@/router';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import Icons from '@/ui/Icons';

addIcons(...Icons);

const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(pinia);
app.component('v-icon', OhVueIcon);
app.mount('#app');
