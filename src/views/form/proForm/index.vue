<template>
	<div class="card content-box">
		<HForm
			ref="hform"
			:options="options"
			label-width="100px"
			@on-change="handleChange"
			@before-upload="handleBeforeUpload"
			@on-preview="handlePreview"
			@on-remove="handleRemove"
			@before-remove="beforeRemove"
			@on-success="handleSuccess"
			@on-exceed="handleExceed"
		>
			<template #uploadArea>
				<el-button type="primary">上传图片</el-button>
			</template>
			<template #uploadTip>
				<div>jpg/png files with a size less than 500KB.</div>
			</template>
			<template #action="scope">
				<el-button type="primary" @click="submitForm(scope)">提交</el-button>
				<el-button @click="resetForm(scope)">重置</el-button>
			</template>
		</HForm>
	</div>
</template>

<script setup lang="ts">
import HForm from "@/components/HForm/index.vue";
import { FormOptions } from "@/components/HForm/types/types";
import { ElMessage, ElMessageBox, FormInstance, UploadFile, UploadFiles, UploadProps, UploadRawFile } from "element-plus";
import { ref } from "vue";

interface Scope {
	form: FormInstance;
	model: any;
}

const hform = ref();

// 表单配置项
const options: FormOptions[] = [
	{
		type: "input",
		value: "",
		label: "用户名",
		attrs: {
			clearable: true
		},
		prop: "username",
		rules: [
			{
				required: true,
				message: "用户名不能为空",
				trigger: "blur"
			},
			{
				min: 2,
				max: 6,
				required: true,
				message: "用户名在2-6位之间",
				trigger: "blur"
			}
		]
	},
	{
		type: "input",
		value: "",
		label: "密码",
		attrs: {
			showPassword: true,
			clearable: true
		},
		prop: "password",
		rules: [
			{
				required: true,
				message: "密码不能为空",
				trigger: "blur"
			},
			{
				min: 6,
				max: 15,
				required: true,
				message: "密码在6-15位之间",
				trigger: "blur"
			}
		]
	},
	{
		type: "select",
		value: "",
		label: "职位",
		placeholder: "请选择职位",
		prop: "role",
		attrs: {
			style: {
				width: "100%"
			}
		},
		rules: [
			{
				required: true,
				message: "职位不能为空",
				trigger: "blur"
			}
		],
		children: [
			{
				type: "option",
				label: "经理",
				value: "1"
			},
			{
				type: "option",
				label: "主管",
				value: "2"
			},
			{
				type: "option",
				label: "员工",
				value: "3"
			}
		]
	},
	{
		type: "checkbox-group",
		value: [],
		prop: "like",
		rules: [
			{
				required: true,
				message: "爱好不能为空",
				trigger: "blur"
			}
		],
		label: "爱好",
		children: [
			{
				type: "checkbox",
				label: "足球",
				value: "1"
			},
			{
				type: "checkbox",
				label: "篮球",
				value: "2"
			},
			{
				type: "checkbox",
				label: "排球",
				value: "3"
			}
		]
	},
	{
		type: "upload",
		label: "上传",
		prop: "pic",
		uploadAttrs: {
			action: "https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15",
			multiple: true,
			limit: 3,
			fileList: []
		},
		rules: [
			{
				required: true,
				message: "图片不能为空",
				trigger: "blur"
			}
		]
	},
	{
		type: "editor",
		value: "",
		label: "描述",
		prop: "desc",
		attrs: {
			style: {
				border: "1px solid #ccc"
			}
		},
		rules: [
			{
				required: true,
				message: "描述不能为空",
				trigger: "blur"
			}
		]
	}
];

// 提交表单
const submitForm = async (scope: Scope) => {
	if (!scope.form) return;
	await scope.form.validate((valid, fields) => {
		if (valid) {
			// 验证成功，获取提交的数据
			console.log(scope.model);
			console.log("submit!");
		} else {
			console.log("error submit!", fields);
		}
	});
};

// 重置表单
const resetForm = (scope: Scope) => {
	if (!scope.form) return;
	hform.value.resetFields();
};

const handleChange: UploadProps["onChange"] = (val: any) => {
	console.log("handleChange");
	console.log(val);
};

const handleBeforeUpload: UploadProps["beforeUpload"] = (rawFile: UploadRawFile) => {
	console.log("handleBeforeUpload");
	console.log(rawFile);
};

const handleSuccess: UploadProps["onSuccess"] = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
	console.log("handleSuccess");
	console.log(response, uploadFile, uploadFiles);
};

const handleRemove: UploadProps["onRemove"] = (file, uploadFiles) => {
	console.log("handleRemove");
	console.log(file, uploadFiles);
};

const handlePreview: UploadProps["onPreview"] = uploadFile => {
	console.log("handlePreview");
	console.log(uploadFile);
};

const handleExceed: UploadProps["onExceed"] = (val: any) => {
	ElMessage.warning(
		`The limit is 3, you selected ${val.files.length} files this time, add up to ${
			val.files.length + val.uploadFiles.length
		} totally`
	);
};

const beforeRemove: UploadProps["beforeRemove"] = uploadFile => {
	console.log("beforeRemove");
	return ElMessageBox.confirm(`Cancel the transfert of ${uploadFile.name} ?`).then(
		() => true,
		() => false
	);
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
