<template>
	<el-form v-if="model" v-bind="$attrs" :model="model" :rules="rules" :validate-on-rule-change="false">
		<template v-for="(item, index) in options" :key="index">
			<!--			无children 或者 children不为空-->
			<el-form-item :label="item.label" :prop="item.prop" v-if="!item.children || !item.children.length">
				<component
					:is="`el-${item.type}`"
					v-bind="item.attrs"
					v-model="model[item.prop]"
					v-if="item.type !== 'upload'"
				></component>
				<!-- 单独处理上传组件 -->
				<el-upload
					v-else
					v-bind="item.uploadAttrs"
					:on-preview="onPreview"
					:on-remove="onRemove"
					:on-success="onSuccess"
					:on-error="onError"
					:on-progress="onProgress"
					:on-change="onChange"
					:on-exceed="onExceed"
					:before-upload="beforeUpload"
					:before-remove="beforeRemove"
					:http-request="httpRequest"
				>
					<!-- 点击哪块区域或者哪个按钮上传 -->
					<slot name="uploadArea"></slot>
					<!-- 传前的tip -->
					<slot name="uploadTip"></slot>
				</el-upload>
			</el-form-item>
			<!--			有children 且 children不为空-->
			<el-form-item :label="item.label" :prop="item.prop" v-if="item.children && item.children.length">
				<component :is="`el-${item.type}`" v-bind="item.attrs" v-model="model[item.prop]" :placeholder="item.placeholder">
					<component
						v-for="(child, i) in item.children"
						:key="i"
						:is="`el-${child.type}`"
						:label="child.label"
						:value="child.value"
					></component>
				</component>
			</el-form-item>
		</template>
	</el-form>
</template>

<script setup lang="ts">
import { PropType, ref, onMounted, watch } from "vue";
import type { FormRules, UploadFile, UploadFiles, UploadProgressEvent, UploadRawFile } from "element-plus";
import { FormOptions } from "./types/types";
import cloneDeep from "lodash/cloneDeep";

const props = defineProps({
	// 表单配置项
	options: {
		type: Array as PropType<FormOptions[]>,
		required: true
	},
	// 覆盖默认的 Xhr 行为，允许自行实现上传文件的请求
	httpRequest: {
		type: Function
	}
});
// 表单绑定数据
const model = ref<Record<string, any>>({});
// 表单所有验证规则
const rules = ref<FormRules>({});

// 初始化表单
const initForm = () => {
	if (props.options && props.options.length) {
		const m: any = {};
		const r: any = {};
		props.options!.map((item: FormOptions) => {
			// console.log(item);
			m[item.prop!] = item.value;
			r[item.prop!] = item.rules;
		});
		model.value = cloneDeep(m);
		rules.value = cloneDeep(r);
		// console.log(model.value);
		// console.log(rules.value);
	}
};

onMounted(() => {
	initForm();
});

// 监听父组件传进来的options
watch(
	() => props.options,
	() => {
		initForm();
	},
	{ deep: true }
);

// 发射
const emits = defineEmits([
	"on-preview",
	"on-remove",
	"on-success",
	"on-error",
	"on-progress",
	"on-change",
	"on-exceed",
	"before-upload",
	"before-remove"
]);
// 上传组件的所有方法
const onPreview = (uploadFile: UploadFile) => {
	// console.log(uploadFile);
	emits("on-preview", uploadFile);
};

const onRemove = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
	// console.log(uploadFile, uploadFiles);
	emits("on-remove", { uploadFile, uploadFiles });
};

const onSuccess = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
	// console.log(response, uploadFile, uploadFiles);
	emits("on-success", { response, uploadFile, uploadFiles });
};

const onError = (error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
	// console.log(error, uploadFile, uploadFiles);
	emits("on-error", { error, uploadFile, uploadFiles });
};

const onProgress = (evt: UploadProgressEvent, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
	// console.log(evt, uploadFile, uploadFiles);
	emits("on-progress", { evt, uploadFile, uploadFiles });
};

const onChange = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
	// console.log(uploadFile, uploadFiles);
	emits("on-change", { uploadFile, uploadFiles });
};

const onExceed = (files: File[], uploadFiles: UploadFiles) => {
	// console.log(uploadFile, uploadFiles);
	emits("on-exceed", { files, uploadFiles });
};

const beforeUpload = (rawFile: UploadRawFile) => {
	// console.log(rawFile);
	emits("before-upload", rawFile);
};

const beforeRemove = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
	// console.log(uploadFile, uploadFiles);
	emits("before-remove", { uploadFile, uploadFiles });
};
</script>

<style scoped lang="scss"></style>
