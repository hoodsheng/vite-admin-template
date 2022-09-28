import { createApp } from "vue";
import App from "./App.vue";
// css
import "./styles/index.scss";
// element icons
import * as Icons from "@element-plus/icons-vue";
// custom directives
import directives from "./directives/index";
// vue Router
import router from "@/routers";
// pinia store
import pinia from "@/store";
// svg-icons
import "virtual:svg-icons-register";

const app = createApp(App);
// 注册element Icons组件
Object.keys(Icons).forEach(key => {
	app.component(key, Icons[key as keyof typeof Icons]);
});

app.use(directives);
app.use(router);
app.use(pinia);
app.mount("#app");
