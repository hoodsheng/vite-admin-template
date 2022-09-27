<template>
	<div class="tool-bar-ri">
		<div class="header-icon">
			<ThemeSetting id="themeSetting" />
			<Fullscreen id="fullscreen" />
		</div>
		<span class="username">Geeker</span>
		<Avatar />
	</div>
</template>

<script setup lang="ts">
import Fullscreen from "./components/Fullscreen.vue";
import ThemeSetting from "./components/ThemeSetting.vue";
import Avatar from "./components/Avatar.vue";
</script>

<style scoped lang="scss">
.tool-bar-ri {
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 30px;
	.header-icon {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 50px;
		margin-right: 20px;
	}
	.username {
		margin: 0 20px 0 0;
		font-size: 15px;
	}
}
</style>
