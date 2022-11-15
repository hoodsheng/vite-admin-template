<template>
	<el-dialog v-model="dialogVisible" v-bind="$attrs">
		<template #default>
			<HForm
				ref="hform"
				:options="options"
				label-width="80px"
				@on-change="onChange"
				@before-upload="beforeUpload"
				@on-preview="onPreview"
				@on-remove="onRemove"
				@before-remove="beforeRemove"
				@on-success="onSuccess"
				@on-exceed="onExceed"
			>
				<!-- 点击哪块区域或者哪个按钮上传 -->
				<template #uploadArea>
					<slot name="uploadArea"></slot>
				</template>
				<!-- 上传前默认显示的tip -->
				<template #uploadTip>
					<slot name="uploadTip"></slot>
				</template>
			</HForm>
		</template>
		<template #footer>
			<slot name="footer" :form="hform"></slot>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from "vue";
import { FormOptions } from "@/components/HForm/types/types";
import HForm from "@/components/HForm/index.vue";

const props = defineProps({
	visible: {
		type: Boolean,
		default: false
	},
	// 表单配置项
	options: {
		type: Array as PropType<FormOptions[]>,
		required: true
	},
	onChange: {
		type: Function
	},
	beforeUpload: {
		type: Function
	},
	onPreview: {
		type: Function
	},
	onRemove: {
		type: Function
	},
	beforeRemove: {
		type: Function
	},
	onSuccess: {
		type: Function
	},
	onExceed: {
		type: Function
	}
});

const hform = ref();
const dialogVisible = ref<boolean>(props.visible);

const emit = defineEmits(["update:visible"]);

watch(
	() => props.visible,
	val => {
		dialogVisible.value = val;
	}
);

watch(
	() => dialogVisible.value,
	val => {
		emit("update:visible", val);
	}
);
</script>

<style scoped lang="scss"></style>
