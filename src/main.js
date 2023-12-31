import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"
import "@/assets/main.scss"
import { OhVueIcon, addIcons } from "oh-vue-icons";
import * as LaIcons from "oh-vue-icons/icons/la";
import * as Md from "oh-vue-icons/icons/md";
import { axios } from "./lib/axios";
import Notifications from '@kyvg/vue3-notification';
import VNetworkGraph from "v-network-graph";
import VueCookies from 'vue-cookies';


const La = Object.values({ ...LaIcons });
addIcons(...La, Md.MdMenuRound);

const app = createApp(App);

app.config.globalProperties.$axios = { ...axios };

app.component("v-icon", OhVueIcon);

app.use(VNetworkGraph);

app.use(VueCookies);

app.use(store);

app.use(router);

app.use(Notifications);

app.mount('#app')