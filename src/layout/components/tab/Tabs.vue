<template>
	<div class="tabs-box">
		<div class="tabs-menu">
			<el-tabs v-model="tabsMenuValue" type="card" @tab-click="tabClick" @tab-remove="tabRemove">
				<el-tab-pane
					v-for="(item, index) in tabsMenuList"
					:key="item.path"
					:label="item.title"
					:name="item.path"
					:closable="item.close"
				>
					<template #label>
						<el-dropdown
							trigger="contextmenu"
							:id="item.path"
							@visible-change="handleChange($event, item.path)"
							ref="dropdownRef"
						>
							<span class="el-dropdown-link">
								<el-icon class="tabs-icon" v-if="item.icon && themeConfig.tabsIcon">
									<component :is="item.icon"></component>
								</el-icon>
								{{ item.title }}
							</span>
							<template #dropdown>
								<el-dropdown-menu>
									<el-dropdown-item v-if="item.path === tabsMenuValue" @click="refresh">
										<el-icon><RefreshRight /></el-icon>重新加载
									</el-dropdown-item>
									<el-dropdown-item v-if="item.path !== '/home-page'" @click="closeCurrentTab">
										<el-icon><Close /></el-icon>关闭当前标签页
									</el-dropdown-item>
									<el-dropdown-item v-if="index !== 0 && index !== 1" @click="closeLeftTab(index)">
										<el-icon><DArrowLeft /></el-icon>关闭左侧标签页
									</el-dropdown-item>
									<el-dropdown-item
										v-if="index !== tabsMenuList.length - 1 && tabsMenuList.length !== 1"
										@click="closeRightTab(item.path, index)"
									>
										<el-icon><DArrowRight /></el-icon>关闭右侧标签页
									</el-dropdown-item>
									<el-dropdown-item @click="closeOtherTab" v-if="tabsMenuList.length !== 1">
										<el-icon><Operation /></el-icon>关闭其他标签页
									</el-dropdown-item>
									<el-dropdown-item @click="closeAllTab" v-if="tabsMenuList.length !== 1">
										<el-icon><Minus /></el-icon>关闭全部标签页
									</el-dropdown-item>
								</el-dropdown-menu>
							</template>
						</el-dropdown>
					</template>
				</el-tab-pane>
			</el-tabs>
			<div class="reloading">
				<div class="reloading-icon">
					<el-icon :size="22" @click="refresh"><RefreshRight /></el-icon>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, watch, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useGlobalStore } from "@/stores";
import { useTabsStore } from "@/stores/modules/tabs";
import { ElMessage, TabsPaneContext } from "element-plus";
import { HOME_URL } from "@/config/baseconfig";

const route = useRoute();
const router = useRouter();
const tabStore = useTabsStore();
const globalStore = useGlobalStore();

// 当前激活的路由
const tabsMenuValue = ref(route.path);
const tabsMenuList = computed(() => tabStore.tabsMenuList);
const themeConfig = computed(() => globalStore.themeConfig);
const reload: Function = inject("refresh") as Function;

// 监听路由的变化（防止浏览器后退/前进不变化 tabsMenuValue）
watch(
	() => route.path,
	() => {
		tabsMenuValue.value = route.path;
		const tabsParams = {
			icon: route.meta.icon as string,
			title: route.meta.title as string,
			path: route.path,
			close: !route.meta.isAffix
		};
		tabStore.addTabs(tabsParams);
	},
	{
		immediate: true
	}
);

// 点击Tab
const tabClick = (tabItem: TabsPaneContext) => {
	let path = tabItem.props.name as string;
	router.push(path);
};

// 移除Tab
const tabRemove = (activeTabPath: string) => {
	tabStore.removeTabs(activeTabPath, activeTabPath == route.path);
};

// 选中当前标签右击，关闭其他标签下拉框
const dropdownRef = ref();
const handleChange = (visible: boolean, path: string) => {
	if (!visible) return;
	dropdownRef.value.forEach((item: { id: string; handleClose: () => void }) => {
		if (item.id === path) return;
		item.handleClose();
	});
};
// 刷新当前页面
const refresh = () => {
	ElMessage({ type: "success", message: "刷新当前页面 🚀" });
	reload();
};
// 关闭当前标签
const closeCurrentTab = () => {
	if (route.meta.isAffix) return;
	tabStore.removeTabs(route.path);
};
// 关闭左侧标签
const closeLeftTab = (i: number) => {
	if (route.meta.isAffix) return;
	tabStore.closeLeftTabs(route.path, i);
};
// 关闭右侧标签
const closeRightTab = (path: string, i: number) => {
	if (route.meta.isAffix) return;
	tabStore.closeRightTabs(path, i);
};
// 关闭其他标签
const closeOtherTab = () => {
	tabStore.closeMultipleTab(route.path);
};
// 关闭所有标签
const closeAllTab = () => {
	tabStore.closeMultipleTab();
	router.push(HOME_URL);
};
</script>

<style scoped lang="scss">
.tabs-box {
	:deep(.tabs-menu) {
		position: relative;
		.el-tabs--card {
			box-sizing: border-box;
			width: calc(100% - 50px);
			height: 50px;
			padding-left: 20px;
			line-height: 50px;
			.el-tabs__header {
				display: flex;
				align-items: center;
				height: 50px;
				border-bottom: none;
				.el-tabs__nav {
					display: flex;
					align-items: center;
					border: none;
				}
			}
			.el-tabs__item {
				height: 100%;
				padding: 8px 20px;
				margin-right: 6px;
				line-height: 100%;
				color: #67748e;
				background-color: #ffffff;
				border: none;
				border-radius: 8px;
				box-shadow: 0 0 27px #0000000d !important;
				.el-dropdown {
					font-size: 13px;
					color: #67748e;
				}
			}
			.el-tabs__item.is-active {
				color: var(--el-color-primary);
				.el-dropdown {
					color: var(--el-color-primary);
				}
			}
			.el-tabs__item:hover {
				background-color: #eaf4fe !important;
			}
			.el-tabs__nav-next,
			.el-tabs__nav-prev {
				line-height: 46px;
			}
		}
		.reloading {
			position: absolute;
			top: 0;
			right: 10px;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 50px;
			height: 50px;
			.reloading-icon {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 32px;
				height: 32px;
				margin: 8px auto;
				color: #67748e;
				background-color: #ffffff;
				border-radius: 6px;
				box-shadow: 0 0 5px #eeeeee;
			}
		}
	}
}
</style>
