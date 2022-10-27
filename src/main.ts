import { createApp } from "vue";
import App from "./App.vue";
// css
import "./styles/index.scss";
// element icons
import * as Icons from "@element-plus/icons-vue";
// svg icon
import "virtual:svg-icons-register";
// vue Router
import router from "@/routers";
// pinia stores
import pinia from "@/stores";
// 全局错误捕获
import errorHandler from "@/utils/errorHandler";

const app = createApp(App);

app.config.errorHandler = errorHandler;

// 注册element Icons组件
Object.keys(Icons).forEach(key => {
	app.component(key, Icons[key as keyof typeof Icons]);
});

app.use(router);
app.use(pinia);
app.mount("#app");
