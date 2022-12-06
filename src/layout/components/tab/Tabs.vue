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
									<el-dropdown-item v-if="item.path !== '/home/index'" @click="closeCurrentTab">
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
				<el-icon :size="22" @click="refresh"><RefreshRight /></el-icon>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, watch, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useGlobalStore } from "@/stores";
import { TabsStore } from "@/stores/modules/tabs";
import { ElMessage, TabsPaneContext } from "element-plus";
import { HOME_URL } from "@/config/baseconfig";

const route = useRoute();
const router = useRouter();
const tabStore = TabsStore();
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
	background-color: #ffffff;
	:deep(.tabs-menu) {
		position: relative;
		.el-tabs--card {
			width: calc(100% - 40px);
			height: 40px;
			line-height: 40px;
			.el-tabs__header {
				display: flex;
				align-items: center;
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
				margin-right: 4px;
				line-height: 100%;
				border: 1px solid #d9d9d9;
				.el-dropdown {
					font-size: 12px;
				}
			}
			.el-tabs__item.is-active {
				background-color: var(--el-color-primary);
				border: 1px solid var(--el-color-primary);
				.el-dropdown {
					color: #ffffff;
				}
			}
			.el-tabs__nav-next,
			.el-tabs__nav-prev {
				line-height: 36px;
			}
		}
		.reloading {
			position: absolute;
			top: 0;
			right: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 40px;
			height: 40px;
		}
	}
}
</style>
