<template>
	<div class="header">
		<div class="header-lf flx-center">
			<CollapseIcon id="collapseIcon" />
			<Breadcrumb id="breadcrumb" v-if="themeConfig.breadcrumb" />
		</div>
		<div class="header-ri flx-center">
			<div class="header-icon">
				<!-- Theme -->
				<Theme id="theme" />
				<!-- Full screen -->
				<Fullscreen id="fullscreen" />
			</div>
			<!-- User name -->
			<span class="username">Hood</span>
			<!-- Avatar -->
			<Avatar />
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import CollapseIcon from "./CollapseIcon.vue";
import Breadcrumb from "./Breadcrumb.vue";
import Fullscreen from "./Fullscreen.vue";
import Theme from "./Theme.vue";
import Avatar from "./Avatar.vue";
import { GlobalStore } from "@/store";

const globalStore = GlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);
</script>

<style scoped lang="scss">
.header {
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 55px;
	padding: 0 15px;
	background-color: #ffffff;
	border-bottom: 1px solid #f6f6f6;
	.header-lf {
		.collapse-icon {
			margin-right: 20px;
			font-size: 22px;
			cursor: pointer;
		}
	}
	.header-ri {
		margin: 0 30px;
		.header-icon {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-right: 22px;
			.icon-style {
				font-size: 20px;
				color: rgb(0 0 0 / 75%);
				cursor: pointer;
			}
		}
	}
}
</style>
