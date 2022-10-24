<!-- 横向布局 -->
<template>
	<el-container class="layout-transverse">
		<el-header>
			<div class="logo flx-center">
				<img src="@/assets/images/logo.svg" alt="logo" />
				<span>Hood Admin</span>
			</div>
			<el-menu
				mode="horizontal"
				:default-active="activeMenu"
				:router="false"
				:unique-opened="true"
				background-color="#191a20"
				text-color="#dadada"
				active-text-color="#ffffff"
			>
				<!-- 只有在这里写 submenu 才能触发 menu 三个点省略 -->
				<template v-for="subItem in menuList" :key="subItem.path">
					<el-sub-menu
						v-if="subItem.children && subItem.children.length > 0"
						:index="subItem.path"
						:key="subItem.path + 'el-sub-menu'"
					>
						<template #title>
							<el-icon>
								<component :is="subItem.icon"></component>
							</el-icon>
							<span>{{ subItem.title }}</span>
						</template>
						<SubMenu :menuList="subItem.children" />
					</el-sub-menu>
					<el-menu-item v-else :index="subItem.path" :key="subItem.path + 'el-menu-item'" @click="handleClickMenu(subItem)">
						<el-icon>
							<component :is="subItem.icon"></component>
						</el-icon>
						<template #title>
							<span>{{ subItem.title }}</span>
						</template>
					</el-menu-item>
				</template>
			</el-menu>
			<ToolBarRight />
		</el-header>
		<Main />
	</el-container>
</template>

<script setup lang="ts" name="layoutTransverse">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { MenuStore } from "@/stores/modules/menu";
import { useRouter } from "vue-router";
import Main from "@/layout/components/main/index.vue";
import ToolBarRight from "@/layout/components/header/ToolBarRight.vue";
import SubMenu from "@/layout/components/menu/SubMenu.vue";

const router = useRouter();
const handleClickMenu = (subItem: Menu.MenuOptions) => {
	if (subItem.isLink) window.open(subItem.isLink, "_blank");
	router.push(subItem.path);
};

const route = useRoute();
const menuStore = MenuStore();
const activeMenu = computed(() => route.path);
const menuList = computed(() => menuStore.menuList);
</script>

<style scoped lang="scss">
.layout-transverse {
	min-width: 970px;
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
		border-bottom: 1px solid #f1f1f1;
		.logo {
			width: 220px;
			margin-right: 30px;
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
		:deep(.el-menu) {
			flex: 1;
			overflow: hidden;
			border-bottom: none;
			.is-active {
				background-color: var(--el-color-primary) !important;
				border-bottom-color: var(--el-color-primary) !important;
				.el-sub-menu__title {
					color: #ffffff !important;
					background-color: var(--el-color-primary) !important;
					border-bottom-color: var(--el-color-primary) !important;
				}
				&:hover {
					color: #ffffff !important;
				}
			}
		}
		:deep(.tool-bar-ri) {
			.toolBar-icon,
			.username {
				color: #e5eaf3;
			}
		}
	}
}

// 横向菜单布局
.el-menu--horizontal {
	.el-menu-item,
	.el-sub-menu {
		height: 54px !important;
		.el-sub-menu__title {
			height: 100%;
		}
	}
}
.transverse {
	.el-menu,
	.el-menu--popup {
		.el-menu-item {
			&.is-active {
				color: #ffffff;
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
