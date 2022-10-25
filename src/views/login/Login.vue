<template>
	<div class="login-container flx-center">
		<SwitchDark class="dark" />
		<div class="login-box">
			<div class="login-left">
				<img src="@/assets/images/login_left0.png" alt="login" />
			</div>
			<div class="login-form">
				<div class="login-logo">
					<img class="login-icon" src="@/assets/images/logo.svg" alt="" />
					<h2 class="logo-text">Hood-Admin</h2>
				</div>
				<el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
					<el-form-item prop="username">
						<el-input v-model="loginForm.username" placeholder="用户名：admin / user">
							<template #prefix>
								<el-icon class="el-input__icon"><user /></el-icon>
							</template>
						</el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input
							type="password"
							v-model="loginForm.password"
							placeholder="密码：123456"
							show-password
							autocomplete="new-password"
						>
							<template #prefix>
								<el-icon class="el-input__icon"><lock /></el-icon>
							</template>
						</el-input>
					</el-form-item>
				</el-form>
				<div class="login-btn">
					<el-button round @click="resetForm(loginFormRef)" size="large">重置</el-button>
					<el-button round @click="login(loginFormRef)" size="large" type="primary" :loading="loading"> 登录 </el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="login">
import SwitchDark from "@/components/SwitchDark/index.vue";
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import type { FormInstance } from "element-plus";
import { ElMessage } from "element-plus";
import { Login } from "@/api/types";
import { loginApi } from "@/api/modules/login";
import md5 from "js-md5";
import { useGlobalStore } from "@/stores";

const router = useRouter();
const globalStore = useGlobalStore();

const loginFormRef = ref<FormInstance>();
// 提交时加载loading
const loading = ref<boolean>(false);
// 规则校验
const loginRules = reactive({
	username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
	password: [{ required: true, message: "请输入密码", trigger: "blur" }]
});
// 提交数据
const loginForm = reactive<Login.ReqLoginForm>({
	username: "",
	password: ""
});
// 提交表单
const login = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(async valid => {
		if (!valid) return;
		loading.value = true;
		try {
			const requestLoginForm: Login.ReqLoginForm = {
				username: loginForm.username,
				password: md5(loginForm.password)
			};
			const res = await loginApi(requestLoginForm);
			// * 存储 token
			globalStore.setToken(res.data.access_token);
			ElMessage.success("登录成功！");
			await router.push("/home/index");
		} finally {
			loading.value = false;
		}
	});
};
// 重置表单
const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.resetFields();
};
onMounted(() => {
	// 监听enter事件（调用登录）
	document.onkeydown = (e: any) => {
		if (e.code === "Enter" || e.code === "enter" || e.code === "NumpadEnter") {
			if (loading.value) return;
			login(loginFormRef.value);
		}
	};
});
</script>

<style scoped lang="scss">
.login-container {
	position: relative;
	min-width: 550px;
	height: 100%;
	min-height: 500px;
	background-color: #eeeeee;
	background-image: url("@/assets/images/login_bg.svg");
	background-position: 50%;
	background-size: cover;
	.dark {
		position: absolute;
		top: 4.5%;
		right: 3.2%;
	}
	.login-box {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-around;
		width: 96%;
		height: 94%;
		padding: 0 50px;
		background-color: hsl(0deg 0% 100% / 80%);
		border-radius: 10px;
		.login-left {
			width: 800px;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.login-form {
			width: 420px;
			padding: 50px 40px 45px;
			border-radius: 10px;
			box-shadow: 2px 3px 7px rgb(0 0 0 / 20%);
			.login-logo {
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: 45px;
				.login-icon {
					width: 60px;
					height: 52px;
				}
				.logo-text {
					padding: 0 0 0 25px;
					margin: 0;
					font-size: 42px;
					font-weight: bold;
					color: #34495e;
					white-space: nowrap;
				}
			}
			.el-form-item {
				margin-bottom: 40px;
			}
			.login-btn {
				display: flex;
				justify-content: space-between;
				width: 100%;
				margin-top: 40px;
				white-space: nowrap;
				.el-button {
					width: 185px;
				}
			}
		}
	}
}
</style>
