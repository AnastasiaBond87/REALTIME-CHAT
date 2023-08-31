import '@/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { BiEyeFill, BiEyeSlashFill } from 'oh-vue-icons/icons';

addIcons(BiEyeFill, BiEyeSlashFill);

import App from '@/App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component('v-icon', OhVueIcon);

app.mount('#app');
