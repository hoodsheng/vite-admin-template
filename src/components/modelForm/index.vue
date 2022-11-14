<template>
	<el-dialog v-model="dialogVisible" v-bind="$attrs">123</el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
	visible: {
		type: Boolean,
		default: false
	}
});

const emit = defineEmits(["update:visible"]);

const dialogVisible = ref<boolean>(props.visible);

watch(
	() => props.visible,
	val => {
		dialogVisible.value = val;
	}
);

watch(
	() => dialogVisible.value,
	val => {
		emit("update:visible", val);
	}
);
</script>

<style scoped lang="scss"></style>
