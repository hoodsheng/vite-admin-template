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
						:class="splitActive.includes(item.path) ? 'split-active' : ''"
						v-for="item in menuList"
						:key="item.path"
						@click="changeSubMenu(item)"
					>
						<el-icon>
							<component :is="item.icon"></component>
						</el-icon>
						<span class="title">{{ item.title }}</span>
					</div>
				</div>
			</el-scrollbar>
		</div>
		<el-aside :class="{ 'not-aside': !subMenu.length }" :style="{ width: isCollapse ? '65px' : '220px' }">
			<div class="logo flx-center">
				<span v-show="subMenu.length">{{ isCollapse ? "G" : "Hood Admin" }}</span>
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
import { MenuStore } from "@/stores/modules/menu";
import { TABS_WHITE_LIST } from "@/config/baseconfig";
import Main from "@/layout/components/main/index.vue";
import ToolBarLeft from "@/layout/components/header/ToolBarLeft.vue";
import ToolBarRight from "@/layout/components/header/ToolBarRight.vue";
import SubMenu from "@/layout/components/menu/SubMenu.vue";

const route = useRoute();
const router = useRouter();
const menuStore = MenuStore();
const activeMenu = computed(() => route.path);
const menuList = computed(() => menuStore.menuList);
const isCollapse = computed(() => menuStore.isCollapse);
const watchData = computed(() => [menuList, route]);

const subMenu = ref<Menu.MenuOptions[]>([]);
const splitActive = ref<string>("");
watch(
	() => watchData,
	() => {
		// 当前路由存在 tabs 白名单中 || 当前菜单没有数据直接 return
		if (TABS_WHITE_LIST.includes(route.path) || !menuList.value.length) return;
		splitActive.value = route.path;
		const menuItem = menuList.value.filter((item: Menu.MenuOptions) => route.path.includes(item.path));
		if (menuItem[0].children?.length) return (subMenu.value = menuItem[0].children);
		subMenu.value = [];
	},
	{
		deep: true,
		immediate: true
	}
);

const changeSubMenu = (item: Menu.MenuOptions) => {
	splitActive.value = item.path;
	if (item.children?.length) return (subMenu.value = item.children);
	subMenu.value = [];
	router.push({ path: item.path });
};
</script>

<style scoped lang="scss">
.layout-columns {
	min-width: 1100px;
}
.el-container {
	width: 100%;
	height: 100%;
	.aside-split {
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
		width: 70px;
		height: 100%;
		background-color: #191a20;
		border-right: 1px solid #ffffff;
		.logo {
			box-sizing: border-box;
			height: 55px;
			border-bottom: 1px solid #282a35;
			img {
				width: 33px;
				object-fit: contain;
			}
		}
		.el-scrollbar {
			height: calc(100% - 55px);
			.split-list {
				flex: 1;
				.split-item {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					height: 70px;
					cursor: pointer;
					transition: all 0.3s ease;
					&:hover {
						background-color: #292b35;
					}
					.el-icon {
						font-size: 21px;
					}
					.title {
						margin-top: 6px;
						font-size: 12px;
						transform: scale(0.96);
					}
					.el-icon,
					.title {
						color: #e5eaf3;
					}
				}
				.split-active {
					background-color: $primary-color !important;
					.el-icon,
					.title {
						color: #ffffff;
					}
				}
			}
		}
	}
	.el-aside {
		display: flex;
		flex-direction: column;
		height: 100%;
		overflow: hidden;
		background-color: #ffffff;
		border-right: 1px solid #f0eded;
		transition: all 0.3s ease;
		.el-scrollbar {
			height: calc(100% - 55px);
			.el-menu {
				overflow-x: hidden;
				border-right: none;
			}
		}
		.logo {
			box-sizing: border-box;
			height: 55px;
			border-bottom: 1px solid #f0eded;
			span {
				font-size: 24px;
				font-weight: bold;
				color: var(--el-menu-text-color);
				white-space: nowrap;
			}
		}
	}
	.not-aside {
		width: 0 !important;
	}
	.el-header {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 55px;
		padding: 0 15px;
		background-color: #ffffff;
		border-bottom: 1px solid #f1f1f1;
		:deep(.tool-bar-ri) {
			.toolBar-icon,
			.username {
				color: var(--el-text-color-primary);
			}
		}
	}
}
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
