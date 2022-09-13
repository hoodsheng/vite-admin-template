import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// Element-Plus按需引入
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
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
	]
});
