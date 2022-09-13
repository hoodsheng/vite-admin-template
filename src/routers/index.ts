import router from "@/routers/router";
import NProgress from "@/utils/nprogress";
import { AxiosCanceler } from "@/api/helper/axiosCancel";
import { GlobalStore } from "@/store";

const axiosCanceler = new AxiosCanceler();

/**
 * @description 路由拦截 beforeEach
 * */
router.beforeEach((to, from, next) => {
	NProgress.start();
	axiosCanceler.removeAllPending();
	// 判断权限
	if (!to.matched.some(record => record.meta.requiresAuth)) return next();
	const globalStore = GlobalStore();
	if (!globalStore.token) {
		next({
			path: "/login"
		});
		NProgress.done();
		return;
	}
});

router.afterEach(() => {
	NProgress.done();
});

export default router;
