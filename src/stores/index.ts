import { defineStore, createPinia } from "pinia";
import { GlobalState, ThemeConfigProp } from "./types";
import { DEFAULT_PRIMARY } from "@/config/baseconfig";
import piniaPersistConfig from "@/config/piniaPersistConfig";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useGlobalStore = defineStore("global", {
	state: (): GlobalState => ({
		// token
		token: "",
		// userInfo
		userInfo: "",
		// themeConfig
		themeConfig: {
			// 布局切换 ==>  纵向：vertical | 经典：classic | 横向：transverse | 分栏：columns
			layout: "vertical",
			// 默认 primary 主题颜色
			primary: DEFAULT_PRIMARY,
			// 深色模式
			isDark: false,
			// 灰色模式
			isGrey: false,
			// 色弱模式
			isWeak: false,
			// 面包屑导航
			breadcrumb: true,
			// 标签页
			tabs: true,
			// 页脚
			footer: true
		}
	}),
	getters: {},
	actions: {
		// 设置token
		setToken(token: string) {
			this.token = token;
		},
		// 主题配置
		setThemeConfig(themeConfig: ThemeConfigProp) {
			this.themeConfig = themeConfig;
		}
	},
	persist: piniaPersistConfig("GlobalState")
});

// piniaPersist(持久化)
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;
