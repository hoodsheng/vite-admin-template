<!-- 纵向布局 -->
<template>
	<el-container class="layout-vertical">
		<el-aside>
			<div class="menu" :style="{ width: isCollapse ? '65px' : '210px' }">
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
						<!-- 递归组件 -->
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
import { useGlobalStore } from "@/stores";
import { useAuthStore } from "@/stores/modules/auth";
import SubMenu from "@/layout/components/menu/SubMenu.vue";
import Main from "@/layout/components/main/index.vue";
import ToolBarLeft from "@/layout/components/header/ToolBarLeft.vue";
import ToolBarRight from "@/layout/components/header/ToolBarRight.vue";

const route = useRoute();
const authStore = useAuthStore();
const globalStore = useGlobalStore();

// 当前激活的路由
const activeMenu = computed(() => route.path);
// 展示的菜单列表
const menuList = computed(() => authStore.showMenuListGet);
// 是否展开/收缩
const isCollapse = computed(() => globalStore.themeConfig.isCollapse);
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>

<style lang="scss">
.vertical {
	.el-menu,
	.el-menu--popup {
		.el-menu-item {
			&.is-active {
				background: #060708;
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
