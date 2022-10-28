<template>
	<div>
		<HForm :options="options" label-width="100px" />
	</div>
</template>

<script setup lang="ts">
import HForm from "@/components/HForm/index.vue";
import { FormOptions } from "@/components/HForm/types/types";

const options: FormOptions[] = [
	{
		type: "input",
		value: "",
		label: "用户名",
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
				message: "用户名在6-15位之间",
				trigger: "blur"
			}
		]
	}
];
</script>

<style scoped lang="scss"></style>
