import { defineStore } from "pinia";
import { MenuState } from "../types";
import piniaPersistConfig from "@/config/piniaPersistConfig";

// MenuStore
export const MenuStore = defineStore({
	id: "MenuState",
	state: (): MenuState => ({
		// menu collapse
		isCollapse: false,
		// menu List
		menuList: []
	}),
	getters: {},
	actions: {
		// 设置展开收缩状态
		async setCollapse() {
			this.isCollapse = !this.isCollapse;
		},
		// 设置菜单列表
		async setMenuList(menuList: Menu.MenuOptions[]) {
			this.menuList = menuList;
		}
	},
	persist: piniaPersistConfig("MenuState")
});
