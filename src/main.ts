import { createApp } from "vue";

import App from "./App.vue";

import router from './router'
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/notify/style'
import 'vant/es/image-preview/style'
import "./assets/main.scss";

const app = createApp(App);
app.use(router);
app.mount("#app");

