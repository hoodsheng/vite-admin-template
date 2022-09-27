<!-- 经典布局 -->
<template>
	<el-container class="layout-classic">
		<el-header>
			<div class="header-lf">
				<div class="logo flx-center">
					<img src="@/assets/images/logo.svg" alt="logo" />
					<span>Geeker Admin</span>
				</div>
				<ToolBarLeft />
			</div>
			<ToolBarRight />
		</el-header>
		<el-container class="classic-bottom">
			<el-aside>
				<div class="menu" :style="{ width: isCollapse ? '65px' : '220px' }">
					<el-scrollbar>
						<el-menu
							:default-active="activeMenu"
							:router="false"
							:collapse="isCollapse"
							:collapse-transition="false"
							:unique-opened="true"
							background-color="#ffffff"
							text-color="#303133"
						>
							<SubMenu :menuList="menuList" />
						</el-menu>
					</el-scrollbar>
				</div>
			</el-aside>
			<el-container class="classic-bottom-right">
				<Main />
			</el-container>
		</el-container>
	</el-container>
</template>

<script setup lang="ts" name="layoutClassic">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { MenuStore } from "@/store/modules/menu";
import Main from "@/layout/components/main/index.vue";
import ToolBarLeft from "@/layout/components/header/ToolBarLeft.vue";
import ToolBarRight from "@/layout/components/header/ToolBarRight.vue";
import SubMenu from "@/layout/components/menu/SubMenu.vue";

const route = useRoute();
const menuStore = MenuStore();
const activeMenu = computed(() => route.path);
const menuList = computed(() => menuStore.menuList);
const isCollapse = computed(() => menuStore.isCollapse);
</script>

<style scoped lang="scss">
.layout-classic {
	min-width: 1030px;
	.classic-bottom {
		height: calc(100% - 55px);
		.classic-bottom-right {
			display: flex;
			flex-direction: column;
		}
	}
}
.el-container {
	width: 100%;
	height: 100%;
	.el-header {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 55px;
		padding: 0 15px 0 0;
		background-color: #191a20;
		border-bottom: 1px solid #f6f6f6;
		.header-lf {
			display: flex;
			align-items: center;
			.logo {
				width: 220px;
				margin-right: 16px;
				span {
					font-size: 22px;
					font-weight: bold;
					color: #dadada;
					white-space: nowrap;
				}
				img {
					width: 30px;
					object-fit: contain;
					margin-right: 8px;
				}
			}
		}
		:deep(.tool-bar-lf) {
			color: #ffffff;
			.el-breadcrumb__inner.is-link {
				color: #e5eaf3;
				&:hover {
					color: var(--el-color-primary);
				}
			}
			.el-breadcrumb__item:last-child .el-breadcrumb__inner,
			.el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
				color: #cfd3dc;
			}
		}
		:deep(.tool-bar-ri) {
			.toolBar-icon,
			.username {
				color: #e5eaf3;
			}
		}
	}
	.el-aside {
		width: auto;
		overflow: inherit;
		background-color: #ffffff;
		border-right: 1px solid var(--el-border-color);
		transition: all 0.3s ease;
		.menu {
			display: flex;
			flex-direction: column;
			height: 100%;
			transition: all 0.3s ease;
			.el-menu {
				overflow-x: hidden;
				border-right: none;
			}
		}
	}
}
.classic {
	.el-menu,
	.el-menu--popup {
		.el-menu-item {
			&.is-active {
				background: var(--el-color-primary-light-9);
				&::before {
					position: absolute;
					top: 0;
					bottom: 0;
					left: 0;
					width: 4px;
					content: "";
					background: var(--el-color-primary);
				}
			}
		}
	}
}
</style>
