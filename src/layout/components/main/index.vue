<template>
	<Tabs v-if="themeConfig.tabs" />
	<el-main>
		<router-view v-slot="{ Component, route }">
			<transition appear name="fade-transform" mode="out-in">
				<keep-alive :include="cacheRouter" v-if="isRouterRefresh">
					<component :is="Component" :key="route.path" />
				</keep-alive>
			</transition>
		</router-view>
	</el-main>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, provide } from "vue";
import { GlobalStore } from "@/stores";
import cacheRouter from "@/routers/cacheRouter";
import Tabs from "@/layout/components/tab/Tabs.vue";

const globalStore = GlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);

// 刷新当前页面
const isRouterRefresh = ref(true);
const refreshCurrentPage = () => {
	isRouterRefresh.value = false;
	nextTick(function () {
		isRouterRefresh.value = true;
	});
};
provide("refresh", refreshCurrentPage);
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
