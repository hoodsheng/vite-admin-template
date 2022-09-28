import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
// Element-Plus按需引入
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { wrapperEnv } from "./src/utils/getEnv";
// 用于生成 svg 雪碧图
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
// 注入网页标题
import { createHtmlPlugin } from "vite-plugin-html";

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
	const env = loadEnv(mode, process.cwd());
	const viteEnv = wrapperEnv(env);
	// console.log(viteEnv);
	return {
		// 别名配置
		resolve: {
			alias: {
				"@": resolve(__dirname, "./src")
			}
		},
		// 全局css扩展
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@use "./src/styles/var.scss" as *;`
				}
			}
		},
		// 插件扩展
		plugins: [
			vue(),
			Components({
				dts: "src/typings/components.d.ts",
				types: [{ from: "vue-router", names: ["RouterLink", "RouterView"] }],
				resolvers: [
					ElementPlusResolver({
						importStyle: "sass"
					})
				]
			}),
			// * 使用 svg 图标
			createSvgIconsPlugin({
				iconDirs: [resolve(process.cwd(), "src/assets/icons")],
				symbolId: "icon-[dir]-[name]"
			}),
			createHtmlPlugin({
				inject: {
					data: {
						title: viteEnv.VITE_GLOB_APP_TITLE
					}
				}
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
