<template>
	<el-form v-bind="$attrs" :model="model" :rules="rules" :validate-on-rule-change="false">
		<template v-for="(item, index) in options" :key="index">
			<!--			无children 或者 children不为空-->
			<el-form-item :label="item.label" :prop="item.prop" v-if="!item.children || !item.children.length">
				<component :is="`el-${item.type}`" v-bind="item.attrs" v-model="model[item.prop]"></component>
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
