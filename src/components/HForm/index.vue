<template>
	<el-form v-bind="$attrs" :model="model" :rules="rules" :validate-on-rule-change="false">
		<el-form-item v-for="(item, index) in options" :key="index" :label="item.label" :prop="item.prop">
			<component :is="`el-${item.type}`" v-bind="item.attrs" v-model="model[item.prop]"></component>
		</el-form-item>
	</el-form>
</template>

<script setup lang="ts">
import { PropType, ref, onMounted } from "vue";
import type { FormRules } from "element-plus";
import { FormOptions } from "./types/types";
import cloneDeep from "lodash/cloneDeep";

const props = defineProps({
	// 表单配置项
	options: {
		type: Array as PropType<FormOptions[]>,
		required: true
	}
});
// 表单绑定数据
const model = ref<Record<string, any>>({});
// 表单所有验证规则
const rules = ref<FormRules>({});

onMounted(() => {
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
});
</script>

<style scoped lang="scss"></style>
