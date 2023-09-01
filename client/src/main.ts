import '@/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/App.vue';
import router from '@/router';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { BiEyeFill, BiEyeSlashFill } from 'oh-vue-icons/icons';

addIcons(BiEyeFill, BiEyeSlashFill);

const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(pinia);
app.component('v-icon', OhVueIcon);
app.mount('#app');
