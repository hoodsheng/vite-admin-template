<template>
	<el-form ref="form" v-if="model" v-bind="$attrs" :model="model" :rules="rules" :validate-on-rule-change="false">
		<template v-for="(item, index) in options" :key="index">
			<!--			无children 或者 children不为空-->
			<el-form-item :label="item.label" :prop="item.prop" v-if="!item.children || !item.children.length">
				<component
					:is="`el-${item.type}`"
					v-bind="item.attrs"
					v-model="model[item.prop]"
					v-if="item.type !== 'upload' && item.type !== 'editor'"
				></component>
				<!-- 单独处理上传组件 -->
				<el-upload
					ref="upload"
					v-if="item.type === 'upload'"
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
					<!-- 上传前默认显示的tip -->
					<slot name="uploadTip"></slot>
				</el-upload>
				<!-- 单独处理富文本编辑器 -->
				<div v-if="item.type === 'editor'" v-bind="item.attrs">
					{{ editorConfig }}
					<Toolbar style="border-bottom: 1px solid #cccccc" :editor="editorRef" :defaultConfig="toolbarConfig" mode="default" />
					<Editor
						style="height: 500px; overflow-y: hidden"
						v-model="valueHtml"
						:defaultConfig="editorConfig"
						mode="default"
						@onCreated="handleCreated"
					/>
				</div>
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
		<!--	表单操作，例如提交，重置等 -->
		<el-form-item>
			<!--			具名作用域插槽-->
			<slot name="action" :form="form" :model="model"></slot>
		</el-form-item>
	</el-form>
</template>

<script setup lang="ts">
import { PropType, ref, onMounted, watch, onBeforeUnmount, shallowRef } from "vue";
import type { FormInstance, FormRules, UploadFile, UploadFiles, UploadProgressEvent, UploadRawFile } from "element-plus";
import { FormOptions } from "./types/types";
import cloneDeep from "lodash/cloneDeep";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import "@wangeditor/editor/dist/css/style.css";
import { IEditorConfig, IToolbarConfig } from "@wangeditor/editor"; // 引入 css

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref("");

const toolbarConfig: Partial<IToolbarConfig> = {
	// TS 语法
	// const toolbarConfig = {                        // JS 语法
	/* 工具栏配置 */
};

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
	const editor = editorRef.value;
	if (editor == null) return;
	editor.destroy();
});

const handleCreated = (editor: any) => {
	editorRef.value = editor; // 记录 editor 实例，重要！
};

// 接收属性
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
// 表单元素
const form = ref<FormInstance | null>();

const editorConfig = ref<Partial<IEditorConfig>>({
	// TS 语法
	placeholder: ""
	// 其他属性...
});

const initEditorConfig = () => {
	console.log("111");
	if (props.options && props.options.length) {
		editorConfig.value.placeholder = props.options.find(item => item.type === "editor")!.placeholder;
	}
};

// 初始化表单
const initForm = () => {
	if (props.options && props.options.length) {
		const m: any = {};
		const r: any = {};
		props.options!.map((item: FormOptions) => {
			// console.log(item);
			m[item.prop!] = item.value;
			r[item.prop!] = item.rules;
			// if (item.type === "editor") {
			// 	editorConfig.placeholder = item.placeholder;
			// 	console.log(editorConfig);
			// }
		});
		model.value = cloneDeep(m);
		rules.value = cloneDeep(r);
		// console.log(model.value);
		// console.log(rules.value);
	}
};

// 组件重写表单重置的方法
const resetFields = () => {
	// 1、重置element-plus 的表单
	form.value!.resetFields();
	// 2、重置富文本编辑器的内容
	if (props.options && props.options.length) {
		const uploadItem = props.options.find(item => item.type === "upload")!;
		// console.log(uploadItem);
		uploadItem.uploadAttrs!.fileList = [];
	}
};

// 暴露方法
defineExpose({
	resetFields,
	initEditorConfig
});

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
	// 上传图片成功 给表单上传项赋值
	const uploadItem = props.options.find(item => item.type === "upload")!;
	// console.log(uploadItem);
	model.value[uploadItem.prop!] = { response, uploadFile, uploadFiles };
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
