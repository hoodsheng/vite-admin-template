<!-- 纵向布局 -->
<template>
	<el-container class="layout-vertical">
		<el-aside>
			<div class="menu" :style="{ width: isCollapse ? '65px' : '220px' }">
				<div class="logo flx-center">
					<img src="@/assets/images/logo.svg" alt="logo" />
					<span v-show="!isCollapse">Hood Admin</span>
				</div>
				<el-scrollbar>
					<el-menu
						:default-active="activeMenu"
						:router="false"
						:collapse="isCollapse"
						:collapse-transition="false"
						:unique-opened="true"
						background-color="#191a20"
						text-color="#bdbdc0"
						active-text-color="#ffffff"
					>
						<SubMenu :menuList="menuList" />
					</el-menu>
				</el-scrollbar>
			</div>
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

<script setup lang="ts" name="layoutVertical">
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
.layout-vertical {
	min-width: 1030px;
}
.el-container {
	width: 100%;
	height: 100%;
	.el-aside {
		width: auto;
		overflow: inherit;
		background-color: #191a20;
		border-right: 1px solid #191a20;
		.menu {
			display: flex;
			flex-direction: column;
			height: 100%;
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
				border-bottom: 1px solid #282a35;
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
	}
	.el-header {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 55px;
		padding: 0 15px;
		background-color: #ffffff;
		border-bottom: 1px solid #f6f6f6;
		:deep(.tool-bar-ri) {
			.toolBar-icon,
			.username {
				color: var(--el-text-color-primary);
			}
		}
	}
}
</style>
