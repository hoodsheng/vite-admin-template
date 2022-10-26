<template>
	<Maximize v-if="themeConfig.maximize" />
	<Tabs v-if="themeConfig.tabs" />
	<el-main>
		<router-view v-slot="{ Component, route }">
			<transition appear name="fade-transform" mode="out-in">
				<keep-alive :include="authStore.keepAliveRouterGet" v-if="isRouterRefresh">
					<component :is="Component" :key="route.path" />
				</keep-alive>
			</transition>
		</router-view>
	</el-main>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, provide, onBeforeUnmount } from "vue";
import { useGlobalStore } from "@/stores";
import { useAuthStore } from "@/stores/modules/auth";
// 全屏
import Maximize from "./components/Maximize.vue";
// 快捷导航栏
import Tabs from "@/layout/components/tab/Tabs.vue";

const authStore = useAuthStore();
const globalStore = useGlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);
const isCollapse = computed(() => globalStore.themeConfig.isCollapse);

// 刷新当前页面
const isRouterRefresh = ref<boolean>(true);
const refreshCurrentPage = () => {
	isRouterRefresh.value = false;
	nextTick(() => {
		isRouterRefresh.value = true;
	});
};
provide("refresh", refreshCurrentPage);

// 监听窗口大小变化，折叠侧边栏
const screenWidth = ref<number>(0);
const listeningWindow = () => {
	screenWidth.value = document.body.clientWidth;
	if (!isCollapse.value && screenWidth.value < 1200) globalStore.setThemeConfig({ ...themeConfig.value, isCollapse: true });
	if (isCollapse.value && screenWidth.value > 1200) globalStore.setThemeConfig({ ...themeConfig.value, isCollapse: false });
};
window.addEventListener("resize", listeningWindow);
onBeforeUnmount(() => {
	window.removeEventListener("resize", listeningWindow);
});
</script>

<style scoped lang="scss">
.el-main {
	box-sizing: border-box;
	padding: 10px 12px;
	overflow-x: hidden;
	background: #f0f2f5;
	&::-webkit-scrollbar {
		background-color: #f0f2f5;
	}
}
</style>
