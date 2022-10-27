<!-- 分栏布局 -->
<template>
	<el-container class="layout-columns">
		<div class="aside-split">
			<div class="logo flx-center">
				<img src="@/assets/images/logo.svg" alt="logo" />
			</div>
			<el-scrollbar>
				<div class="split-list">
					<div
						class="split-item"
						:class="{ 'split-active': splitActive.includes(item.path) }"
						v-for="item in menuList"
						:key="item.path"
						@click="changeSubMenu(item)"
					>
						<el-icon>
							<component :is="item.meta.icon"></component>
						</el-icon>
						<span class="title">{{ item.meta.title }}</span>
					</div>
				</div>
			</el-scrollbar>
		</div>
		<!-- 二级及二级以上菜单 -->
		<el-aside :class="{ 'not-aside': !subMenu.length }" :style="{ width: isCollapse ? '65px' : '210px' }">
			<div class="logo flx-center">
				<span v-show="subMenu.length">{{ isCollapse ? "H" : "Hood Admin" }}</span>
			</div>
			<el-scrollbar>
				<el-menu
					:default-active="activeMenu"
					:router="false"
					:collapse="isCollapse"
					:collapse-transition="false"
					:unique-opened="true"
					background-color="#ffffff"
				>
					<!-- 递归组件 -->
					<SubMenu :menuList="subMenu" />
				</el-menu>
			</el-scrollbar>
		</el-aside>
		<el-container>
			<el-header>
				<ToolBarLeft />
				<ToolBarRight />
			</el-header>
			<Main />
		</el-container>
	</el-container>
</template>

<script setup lang="ts" name="layoutColumns">
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useGlobalStore } from "@/stores";
import { useAuthStore } from "@/stores/modules/auth";
import { TABS_WHITE_LIST } from "@/config/baseconfig";
import SubMenu from "@/layout/components/menu/SubMenu.vue";
import Main from "@/layout/components/main/index.vue";
import ToolBarLeft from "@/layout/components/header/ToolBarLeft.vue";
import ToolBarRight from "@/layout/components/header/ToolBarRight.vue";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const globalStore = useGlobalStore();

// 当前激活的路由
const activeMenu = computed(() => route.path);
// 展示的菜单列表
const menuList = computed(() => authStore.showMenuListGet);
// 是否展开/收缩
const isCollapse = computed(() => globalStore.themeConfig.isCollapse);
// 监听菜单与当前路由
const watchData = computed(() => [menuList, route]);

const subMenu = ref<Menu.MenuOptions[]>([]);
// 当前激活的路由
const splitActive = ref<string>("");
watch(
	() => watchData,
	() => {
		// 当前路由存在 tabs 白名单中 || 当前菜单没有数据直接 return
		if (TABS_WHITE_LIST.includes(route.path) || !menuList.value.length) return;
		splitActive.value = route.path;
		// console.log(menuList.value);
		const menuItem = menuList.value.filter((item: Menu.MenuOptions) => route.path.includes(item.path));
		// 有二级及二级以上的菜单，则赋值给subMenu
		if (menuItem[0].children?.length) return (subMenu.value = menuItem[0].children);
		// 否则为空
		subMenu.value = [];
	},
	{
		deep: true,
		immediate: true
	}
);

// 切换 SubMenu
const changeSubMenu = (item: Menu.MenuOptions) => {
	splitActive.value = item.path;
	if (item.children?.length) return (subMenu.value = item.children);
	subMenu.value = [];
	router.push(item.path);
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>

<style lang="scss">
.columns {
	.el-menu,
	.el-menu--popup {
		.el-menu-item {
			&.is-active {
				background: var(--el-color-primary-light-9);
				&::before {
					position: absolute;
					top: 0;
					right: 0;
					bottom: 0;
					width: 4px;
					content: "";
					background: var(--el-color-primary);
				}
			}
		}
	}
}
</style>
