<template>
	<div class="tabs-box">
		<div class="tabs-menu">
			<el-tabs v-model="tabsMenuValue" type="card" @tab-click="tabClick" @tab-remove="removeTab">
				<el-tab-pane
					v-for="item in tabsMenuList"
					:key="item.path"
					:path="item.path"
					:label="item.title"
					:name="item.path"
					:closable="item.close"
				>
					<template #label>
						<el-icon class="tabs-icon" v-if="item.icon">
							<component :is="item.icon"></component>
						</el-icon>
						{{ item.title }}
					</template>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { TabsStore } from "@/store/modules/tabs";
import { TabsPaneContext } from "element-plus";

const tabStore = TabsStore();
const tabsMenuList = computed(() => tabStore.tabsMenuList);
const tabsMenuValue = computed({
	get: () => {
		return tabStore.tabsMenuValue;
	},
	set: val => {
		tabStore.setTabsMenuValue(val);
	}
});

const route = useRoute();
const router = useRouter();
// 监听路由的变化（防止浏览器后退/前进不变化 tabsMenuValue）
watch(
	() => route.path,
	() => {
		let params = {
			title: route.meta.title as string,
			path: route.path,
			close: true
		};
		tabStore.addTabs(params);
	},
	{
		immediate: true
	}
);

// Tab Click
const tabClick = (tabItem: TabsPaneContext) => {
	let path = tabItem.props.name as string;
	router.push(path);
};

// Remove Tab
const removeTab = (activeTabPath: string) => {
	tabStore.removeTabs(activeTabPath);
};
</script>

<style scoped lang="scss">
.tabs-box {
	background-color: #ffffff;
	:deep(.tabs-menu) {
		position: relative;
		width: 100%;
		.el-dropdown {
			position: absolute;
			top: 8px;
			right: 13px;
		}
		.tabs-icon {
			top: 2px;
		}
		.el-tabs__nav-wrap {
			position: absolute;
			width: calc(100% - 110px);
		}
		.el-tabs--card > .el-tabs__header {
			box-sizing: border-box;
			height: 40px;
			padding: 0 10px;
			margin: 0;
		}
		.el-tabs--card > .el-tabs__header .el-tabs__nav {
			border: none;
		}
		.el-tabs--card > .el-tabs__header .el-tabs__item {
			color: #cccccc;
			border: none;
		}
		.el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
			color: $primary-color;
			border-bottom: 2px solid $primary-color;
		}
		.el-tabs__item .is-icon-close svg {
			margin-top: 0.5px;
		}
	}
}
</style>
