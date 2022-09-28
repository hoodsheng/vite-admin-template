import { createApp } from "vue";
import App from "./App.vue";
// element icons
import * as Icons from "@element-plus/icons-vue";
import "./styles/reset.scss";
import "./styles/common.scss";
import "./assets/iconfont/iconfont.scss";
import "element-plus/dist/index.css";
// element dark(内置暗黑模式)
import "element-plus/theme-chalk/dark/css-vars.css";
// custom element dark(自定义暗黑模式)
import "./styles/theme/element-dark.scss";
import "./styles/element.scss";
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
