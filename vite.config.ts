import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// 支持jsx语法
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";
// Element-Plus按需引入
// import Components from "unplugin-vue-components/vite";
// import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { wrapperEnv } from "./src/utils/getEnv";
// 注入网页标题
import { createHtmlPlugin } from "vite-plugin-html";
// 生成 svg 雪碧图
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
// 打包分析插件
import { visualizer } from "rollup-plugin-visualizer";
// name 可以写在 script 标签上
import VueSetupExtend from "vite-plugin-vue-setup-extend";
// gzip压缩
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
	const env = loadEnv(mode, process.cwd());
	const viteEnv = wrapperEnv(env);
	// console.log(viteEnv);
	return {
		base: "./",
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
			// * vite 可以使用 jsx/tsx 语法
			vueJsx(),
			// Components({
			// 	dts: "src/typings/components.d.ts",
			// 	types: [{ from: "vue-router", names: ["RouterLink", "RouterView"] }],
			// 	resolvers: [
			// 		ElementPlusResolver({
			// 			importStyle: false
			// 		})
			// 	]
			// }),
			createHtmlPlugin({
				inject: {
					data: {
						title: viteEnv.VITE_GLOB_APP_TITLE
					}
				}
			}),
			// * 使用 svg 图标
			createSvgIconsPlugin({
				iconDirs: [resolve(process.cwd(), "src/assets/icons")],
				symbolId: "icon-[dir]-[name]"
			}),
			viteEnv.VITE_REPORT &&
				visualizer({
					gzipSize: true,
					brotliSize: true
				}),
			// * gzip compress
			viteEnv.VITE_BUILD_GZIP &&
				viteCompression({
					verbose: true,
					disable: false,
					threshold: 10240,
					algorithm: "gzip",
					ext: ".gz"
				}),
			VueSetupExtend()
		],
		// * 打包去除 console.log && debugger
		esbuild: {
			pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : []
		},
		build: {
			outDir: "dist",
			minify: "esbuild",
			// esbuild 打包更快，但是不能去除 console.log，terser打包慢，但能去除 console.log
			// minify: "terser",
			// terserOptions: {
			// 	compress: {
			// 		drop_console: viteEnv.VITE_DROP_CONSOLE,
			// 		drop_debugger: true
			// 	}
			// },
			chunkSizeWarningLimit: 1500,
			rollupOptions: {
				output: {
					// Static resource classification and packaging
					chunkFileNames: "assets/js/[name]-[hash].js",
					entryFileNames: "assets/js/[name]-[hash].js",
					assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
				}
			}
		},
		server: {
			host: "0.0.0.0",
			port: viteEnv.VITE_PORT,
			open: viteEnv.VITE_OPEN,
			cors: true,
			// 代理跨域（mock 不需要配置跨域，直接能访问，这里只是个示例）
			proxy: {
				"/iot/platformapi": {
					target: "http://192.168.1.82:7056/iot/platformapi",
					changeOrigin: true,
					rewrite: path => path.replace(/^\/iot\/platformapi/, "")
				}
			}
		}
	};
});
