<template>
	<div class="card content-box">
		<el-button type="primary" @click="open">打开弹窗</el-button>
		<modelForm
			v-model:visible="visible"
			width="50%"
			title="编辑"
			:options="options"
			:on-success="onSuccess"
			:on-change="onChange"
		>
			<template #footer="{ form }">
				<el-button @click="cancle(form)">取消</el-button>
				<el-button type="primary" @click="confirm(form)">确认</el-button>
			</template>
			<template #uploadArea>
				<el-button type="primary">上传图片</el-button>
			</template>
			<template #uploadTip>
				<div>jpg/png files with a size less than 500KB.</div>
			</template>
		</modelForm>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import modelForm from "@/components/modelForm/index.vue";
import { FormOptions } from "@/components/HForm/types/types";
import { ElMessage, FormInstance, UploadFile, UploadFiles, UploadProps } from "element-plus";

const visible = ref<boolean>(false);
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
		placeholder: "请输入描述",
		editorAttrs: {
			height: 200
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

const open = () => {
	visible.value = true;
};

// 点击
const cancle = (form: FormInstance) => {
	console.log(form);
};

const confirm = (form: any) => {
	const validate = form.validate();
	const model = form.getFromData();
	validate((valid: boolean) => {
		if (valid) {
			ElMessage.success("验证成功");
			console.log(model);
		} else {
			console.log("error submit!");
		}
	});
};

const onChange: UploadProps["onChange"] = (val: any) => {
	console.log("handleChange");
	console.log(val);
};

const onSuccess: UploadProps["onSuccess"] = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
	console.log("handleSuccess");
	console.log(response, uploadFile, uploadFiles);
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
