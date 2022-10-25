<!-- 💥 这里是一次性加载 LayoutComponents -->
<template>
	<!-- 动态组件，默认纵向布局 -->
	<component :is="LayoutComponents[themeConfig.layout]" />
	<ThemeDrawer />
</template>

<script setup lang="ts" name="layout">
import { ref, computed } from "vue";
import { useGlobalStore } from "@/stores";
import { MenuStore } from "@/stores/modules/menu";
import ThemeDrawer from "./components/ThemeDrawer/index.vue";
import LayoutVertical from "./LayoutVertical/index.vue";
import LayoutClassic from "./LayoutClassic/index.vue";
import LayoutTransverse from "./LayoutTransverse/index.vue";
import LayoutColumns from "./LayoutColumns/index.vue";

const LayoutComponents: any = {
	vertical: LayoutVertical,
	classic: LayoutClassic,
	transverse: LayoutTransverse,
	columns: LayoutColumns
};

const menuStore = MenuStore();
const globalStore = useGlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);
const isCollapse = computed((): boolean => menuStore.isCollapse);

// 监听窗口大小变化，折叠 aside
const screenWidth = ref<number>(0);
const listeningWindow = () => {
	window.onresize = () => {
		return (() => {
			screenWidth.value = document.body.clientWidth;
			if (!isCollapse.value && screenWidth.value < 1200) menuStore.setCollapse();
			if (isCollapse.value && screenWidth.value > 1200) menuStore.setCollapse();
		})();
	};
};
listeningWindow();
</script>
