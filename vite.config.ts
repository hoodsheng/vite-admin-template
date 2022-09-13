import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
// Element-Plus按需引入
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { wrapperEnv } from "./src/utils/getEnv";

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
	const env = loadEnv(mode, process.cwd());
	const viteEnv = wrapperEnv(env);
	console.log(viteEnv);
	return {
		// 别名配置
		resolve: {
			alias: {
				"@": resolve(__dirname, "./src")
			}
		},
		// 插件扩展
		plugins: [
			vue(),
			AutoImport({
				resolvers: [ElementPlusResolver()]
			}),
			Components({
				dts: true,
				resolvers: [
					ElementPlusResolver({
						importStyle: "sass"
					})
				]
			})
		],
		server: {
			host: "0.0.0.0",
			port: viteEnv.VITE_PORT,
			open: viteEnv.VITE_OPEN,
			cors: true,
			// 代理跨域（mock 不需要配置跨域，直接能访问，这里只是个示例）
			proxy: {
				"/api": {
					// target: "https://www.fastmock.site/mock/f81e8333c1a9276214bcdbc170d9e0a0", // fastmock
					target: "https://mock.mengxuegu.com/mock/629d727e6163854a32e8307e", // easymock
					changeOrigin: true,
					rewrite: path => path.replace(/^\/api/, "")
				}
			}
		}
	};
});
