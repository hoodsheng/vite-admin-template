<template>
	<el-icon class="collapse-icon" @click="collapse">
		<component :is="themeConfig.isCollapse ? 'expand' : 'fold'"></component>
	</el-icon>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useGlobalStore } from "@/stores";

const globalStore = useGlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);

// 切换展开/收缩状态isCollapse
const collapse = () => {
	globalStore.setThemeConfig({ ...themeConfig.value, isCollapse: !themeConfig.value.isCollapse });
};
</script>

<style scoped lang="scss">
.collapse-icon {
	margin-right: 20px;
	font-size: 22px;
	cursor: pointer;
}
</style>
