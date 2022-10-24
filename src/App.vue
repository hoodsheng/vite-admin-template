<template>
	<el-config-provider :locale="locale">
		<router-view></router-view>
	</el-config-provider>
</template>

<script setup lang="ts">
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { onMounted, ref } from "vue";
import { useTheme } from "@/hooks/useTheme";

const locale = ref();

onMounted(() => {
	locale.value = zhCn;
});
useTheme();
</script>
