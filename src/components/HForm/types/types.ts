import { RuleItem } from "./rule";
import { CSSProperties } from "vue";
import { UploadUserFile } from "element-plus";

// 表单的每一项配置选项
export interface FormOptions {
	// 表单项显示的元素
	type:
		| "cascader"
		| "checkbox"
		| "checkbox-group"
		| "checkbox-button"
		| "color-picker"
		| "date-picker"
		| "input"
		| "input-number"
		| "radio"
		| "radio-group"
		| "radio-button"
		| "rate"
		| "select"
		| "option"
		| "slider"
		| "switch"
		| "time-picker"
		| "time-select"
		| "transfer"
		| "upload";
	// 表单项的值
	value?: any;
	// 表单项label
	label?: string;
	// 表单项的标识,可用于表单验证
	prop?: string;
	// 表单项的验证规则
	rules?: RuleItem[];
	// 表单项的占位符
	placeholder?: string;
	// 表单元素特有的属性
	attrs?: {
		// css样式
		style?: CSSProperties;
		clearable?: boolean;
		showPassword?: boolean;
		disabled?: boolean;
	};
	// 表单项的子元素,例如下拉选择这种
	children?: FormOptions[];
	// 处理上传组件的属性和方法
	uploadAttrs?: {
		action: string;
		headers?: Headers | Record<string, any>;
		method?: string;
		multiple?: boolean;
		data?: Record<string, any>;
		name?: string;
		withCredentials?: boolean;
		showFileList?: boolean;
		drag?: boolean;
		accept?: string;
		thumbnailMode?: boolean;
		fileList?: UploadUserFile[];
		listType?: "text" | "picture" | "picture-card";
		autoUpload?: boolean;
		disabled?: boolean;
		limit?: number;
	};
}
