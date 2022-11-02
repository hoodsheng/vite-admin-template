<template>
	<div class="card content-box">
		<HForm :options="options" label-width="100px">
			<template #uploadArea>
				<el-button type="primary">Click to upload</el-button>
			</template>
			<template #uploadTip>
				<div>jpg/png files with a size less than 500KB.</div>
			</template>
		</HForm>
	</div>
</template>

<script setup lang="ts">
import HForm from "@/components/HForm/index.vue";
import { FormOptions } from "@/components/HForm/types/types";

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
			action: "https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
		},
		rules: [
			{
				required: true,
				message: "图片不能为空",
				trigger: "blur"
			}
		]
	}
];
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
