<template>
	<div class="card content-box">
		<!-- 组件双向数据绑定，value可以自定义名称 -->
		<WangEditor height="400px" v-model:value="content" />
	</div>
</template>

<script setup lang="ts" name="wangEditor">
import { ref } from "vue";
import WangEditor from "@/components/WangEditor/index.vue";

const content = ref<string>("");
</script>

<style scoped lang="scss">
.el-button {
	margin-top: 20px;
}
:deep(.el-dialog__body) {
	height: 700px !important;
	overflow: auto;
}
</style>
