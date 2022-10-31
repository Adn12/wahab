import { createApp } from 'vue'
import store from "./store";
import App from './App.vue'
import AddView from "./components/AddView.vue";
import FindView from "./components/FindView.vue";
import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
    { path: '/', component: FindView },
    { path: '/add', component: AddView },
  ]
  const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
  })
const app = createApp(App);
app.use(router)
app.use(store);
app.mount('#app');
