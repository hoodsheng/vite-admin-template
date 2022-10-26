<!-- 💥 这里是一次性加载 LayoutComponents -->
<template>
	<!-- https://cn.vuejs.org/guide/essentials/component-basics.html#dynamic-components	-->
	<component :is="LayoutComponents[themeConfig.layout]" />
	<ThemeDrawer />
</template>

<script setup lang="ts" name="layout">
import { computed } from "vue";
import { useGlobalStore } from "@/stores";
import ThemeDrawer from "./components/ThemeDrawer/index.vue";
import LayoutVertical from "./LayoutVertical/index.vue";
import LayoutClassic from "./LayoutClassic/index.vue";
import LayoutTransverse from "./LayoutTransverse/index.vue";
import LayoutColumns from "./LayoutColumns/index.vue";

const LayoutComponents: { [key: string]: any } = {
	vertical: LayoutVertical,
	classic: LayoutClassic,
	transverse: LayoutTransverse,
	columns: LayoutColumns
};

const globalStore = useGlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);
</script>
