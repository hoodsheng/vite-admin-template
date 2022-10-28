<template>
	<div>
		<el-form v-bind="$attrs" :model="model" :rules="rules">
			<el-form-item :label="item.label" :prop="item.prop" v-for="(item, index) in options" :key="index">
				<component v-bind="$attrs" :is="`el-${item.type}`"></component>
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup lang="ts">
import { onMounted, PropType, ref } from "vue";
import { FormOptions } from "./types/types";
import cloneDeep from "lodash/cloneDeep";

const props = defineProps({
	options: {
		type: Array as PropType<FormOptions[]>,
		require: true
	}
});

const model = ref<any>({});
const rules = ref<any>({});

onMounted(() => {
	const m: any = {};
	const r: any = {};
	props.options!.map((item: FormOptions) => {
		m[item.prop!] = item.value;
		r[item.prop!] = item.rules;
	});
	model.value = cloneDeep(m);
	rules.value = cloneDeep(r);
});
</script>

<style scoped lang="scss"></style>
