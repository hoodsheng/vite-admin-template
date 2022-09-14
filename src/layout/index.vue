<template>
	<el-container>
		<el-aside>
			<Menu />
		</el-aside>
		<el-container>
			<el-header>
				<Header />
				<Tabs v-if="themeConfig.tabs" />
			</el-header>
			<el-main>
				<!-- <router-view v-slot="{ Component, route }">
					<transition appear name="fade-transform" mode="out-in">
						<keep-alive :include="cacheRouter">
							<component :is="Component" :key="route.path"></component>
						</keep-alive>
					</transition>
				</router-view> -->
			</el-main>
		</el-container>
	</el-container>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { getAuthButtons } from "@/api/modules/login";
import { GlobalStore } from "@/store";
import { AuthStore } from "@/store/modules/auth";
import Menu from "./menu/Menu.vue";
import Header from "./header/Header.vue";
import Tabs from "./tab/Tabs.vue";

const authStore = AuthStore();
const globalStore = GlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);

onMounted(async () => {
	// 获取按钮权限列表
	const res = await getAuthButtons();
	res.data && authStore.setAuthButtons(res.data);
});
</script>

<style scoped lang="scss">
.el-container {
	width: 100%;
	min-width: 950px;
	height: 100%;
	.el-aside {
		width: auto;
		overflow: inherit;
	}
	.el-header,
	.el-footer {
		height: auto;
		padding: 0;
	}
	.el-main {
		box-sizing: border-box;
		padding: 10px 12px;
		overflow-x: hidden;
		background: #f0f2f5;
		&::-webkit-scrollbar {
			background-color: #f0f2f5;
		}
	}
}
</style>
