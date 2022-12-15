import { defineStore } from "pinia";
import { TabsState, TabsMenuProps } from "../types";
import { TABS_WHITE_LIST } from "@/config/baseconfig";
import piniaPersistConfig from "@/config/piniaPersistConfig";
import router from "@/routers/index";

// useTabsStore
export const useTabsStore = defineStore({
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
		},
		// 关闭左侧tab
		async closeLeftTabs(...args: (number | string)[]) {
			// console.log([...args][1], this.tabsMenuList);
			this.tabsMenuList = this.tabsMenuList.filter((item, index) => {
				return [...args][1] <= index || !item.close;
			});
		},
		// 关闭左侧tab
		async closeRightTabs(...args: (number | string)[]) {
			console.log([...args][0], this.tabsMenuList);
			this.tabsMenuList = this.tabsMenuList.filter((item, index) => {
				return [...args][1] >= index;
			});
			router.push([...args][0] as string);
		}
	},
	persist: piniaPersistConfig("TabsState")
});
