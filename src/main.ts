import { createApp } from "vue";
import App from "./App.vue";
// css
import "./styles/index.scss";
// element icons
import * as Icons from "@element-plus/icons-vue";
// vue Router
import router from "@/routers";
// pinia stores
import pinia from "@/stores";

const app = createApp(App);
// 注册element Icons组件
Object.keys(Icons).forEach(key => {
	app.component(key, Icons[key as keyof typeof Icons]);
});

app.use(router);
app.use(pinia);
app.mount("#app");
