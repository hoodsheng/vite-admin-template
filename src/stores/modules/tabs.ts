import { defineStore } from "pinia";
import { TabsState, TabsMenuProps } from "../types";
import { TABS_WHITE_LIST } from "@/config/baseconfig";
import piniaPersistConfig from "@/config/piniaPersistConfig";
import router from "@/routers/index";

// TabsStore
export const TabsStore = defineStore({
	id: "TabsState",
	state: (): TabsState => ({
		tabsMenuList: []
	}),
	getters: {},
	actions: {
		// 添加tab
		async addTabs(tabItem: TabsMenuProps) {
			// not add tabs white list
			if (TABS_WHITE_LIST.includes(tabItem.path)) return;
			if (this.tabsMenuList.every(item => item.path !== tabItem.path)) {
				this.tabsMenuList.push(tabItem);
			}
		},
		// 移除tab
		async removeTabs(tabPath: string, isCurrent: boolean = true) {
			const tabsMenuList = this.tabsMenuList;
			if (isCurrent) {
				tabsMenuList.forEach((item, index) => {
					if (item.path !== tabPath) return;
					const nextTab = tabsMenuList[index + 1] || tabsMenuList[index - 1];
					if (!nextTab) return;
					router.push(nextTab.path);
				});
			}
			this.tabsMenuList = tabsMenuList.filter(item => item.path !== tabPath);
		},
		// 关闭tab
		async closeMultipleTab(tabsMenuValue?: string) {
			this.tabsMenuList = this.tabsMenuList.filter(item => {
				return item.path === tabsMenuValue || !item.close;
			});
		}
	},
	persist: piniaPersistConfig("TabsState")
});
