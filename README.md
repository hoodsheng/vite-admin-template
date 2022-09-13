# Vue 3 + TypeScript + Vite + Element-Plus

## 1. 项目规范

- [项目规范](https://github.com/HalseySpicy/Geeker-Admin/blob/master/STANDARD.md)

## 3 nprogress 的全局配置与使用

### 3.1 创建 nprogress 全局声明文件 plugins.d.ts

```ts
declare module "nprogress";
```

### 3.2 创建 nprogress.ts 并配置

[配置链接](https://github.com/rstacruz/nprogress)

```ts
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({
  easing: "ease", // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: true, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 初始化时的最小百分比
});
export default NProgress;
```

### 3.3 使用 nprogress

```ts
import NProgress from "@/utils/nprogress/nprogress";

NProgress.start();

NProgress.done();
```
