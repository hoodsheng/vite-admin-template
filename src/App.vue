<script setup lang="ts">
import { ElMessage } from "element-plus";
import { ref } from "vue";

const value = ref("");

const options = [
	{
		value: "Option1",
		label: "Option1"
	},
	{
		value: "Option2",
		label: "Option2"
	},
	{
		value: "Option3",
		label: "Option3"
	},
	{
		value: "Option4",
		label: "Option4"
	},
	{
		value: "Option5",
		label: "Option5"
	}
];

const open1 = () => {
	ElMessage({
		message: "Congrats, this is a success message.",
		type: "success"
	});
};
</script>

<template>
	<div>
		<el-select v-model="value" class="m-2" placeholder="Select" size="large">
			<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
		</el-select>
		<el-button type="primary" @click="open1">Primary</el-button>
		<el-button type="success">Success</el-button>
		<el-button type="info">Info</el-button>
		<el-button type="warning">Warning</el-button>
		<el-button type="danger">Danger</el-button>
		<a href="https://vitejs.dev" target="_blank">
			<img src="/vite.svg" class="logo" alt="Vite logo" />
		</a>
		<a href="https://vuejs.org/" target="_blank">
			<img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
		</a>
	</div>
</template>

<style scoped>
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
}
.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
