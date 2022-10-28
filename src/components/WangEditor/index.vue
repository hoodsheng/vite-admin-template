<template>
	<div :class="['editor-box', disabled ? 'editor-disabled' : '']">
		<!-- toolbar区域配置	-->
		<Toolbar class="editor-toolbar" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
		<!-- 编辑区域配置	-->
		<Editor
			:style="{ height }"
			class="editor-content'"
			v-model="valueHtml"
			:defaultConfig="editorConfig"
			:mode="mode"
			@on-created="handleCreated"
		/>
	</div>
</template>

<script setup lang="ts" name="wangEditor">
import { onBeforeUnmount, shallowRef, nextTick, computed } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { IToolbarConfig, IEditorConfig } from "@wangeditor/editor";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css

// 富文本 DOM 元素
const editorRef = shallowRef();

// 实列化编辑器
const handleCreated = (editor: any) => {
	editorRef.value = editor;
};

// 接收父组件参数，并设置默认值
interface RichEditorProps {
	value: string; // 富文本值 ==> 必传
	toolbarConfig?: Partial<IToolbarConfig>; // 工具栏配置 ==> 非必传（默认为空）
	editorConfig?: Partial<IEditorConfig>; // 编辑器配置 ==> 非必传（默认为空）
	height?: string; // 富文本高度 ==> 非必传（默认为 500px）
	mode?: "default" | "simple"; // 富文本模式 ==> 非必传（默认为 default）
	disabled?: boolean; // 是否禁用编辑器 ==> 非必传（默认为false）
}
const props = withDefaults(defineProps<RichEditorProps>(), {
	toolbarConfig: () => {
		return {
			// 排除菜单组，写菜单组 key 的值即可
			excludeKeys: []
		};
	},
	editorConfig: () => {
		return {
			placeholder: "请输入内容...",
			// 菜单配置
			MENU_CONF: {}
		};
	},
	height: "500px",
	mode: "default",
	disabled: false
});

// 判断当前富文本编辑器是否禁用
if (props.disabled) nextTick(() => editorRef.value.disable());

// 富文本的内容监听，触发父组件改变，实现双向数据绑定
type EmitProps = {
	(e: "update:value", val: string): void;
	(e: "check-validate"): void;
};
const emit = defineEmits<EmitProps>();
const valueHtml = computed({
	get() {
		return props.value;
	},
	set(val: string) {
		// 防止富文本内容为空时，校验失败
		if (editorRef.value.isEmpty()) val = "";
		emit("update:value", val);
	}
});

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
	const editor = editorRef.value;
	if (editor == null) return;
	editor.destroy();
});

// 暴露editor属性
defineExpose({
	editor: editorRef
});
</script>

<style scoped lang="scss">
/* 富文本组件校验失败样式 */
.is-error {
	.editor-box {
		border-color: var(--el-color-danger);
	}
}

/* 富文本组件禁用样式 */
.editor-disabled {
	cursor: not-allowed !important;
}

/* 富文本组件样式 */
.editor-box {
	/* 防止富文本编辑器全屏时 tabs组件 在其层级之上 */
	z-index: 2;
	width: 100%;
	border: 1px solid #cccccc;
	.editor-toolbar {
		border-bottom: 1px solid #cccccc;
	}
	.editor-content {
		overflow-y: hidden;
	}
}
</style>
