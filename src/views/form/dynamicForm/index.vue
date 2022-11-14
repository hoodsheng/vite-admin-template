<template>
	<div class="card content-box">
		<el-button type="primary" @click="open">打开弹窗</el-button>
		<modelForm v-model:visible="visible" width="50%" title="编辑" />
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import modelForm from "@/components/modelForm/index.vue";

const visible = ref<boolean>(false);

const open = () => {
	visible.value = true;
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
