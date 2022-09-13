<template>
	<router-view></router-view>
</template>

<script setup lang="ts">
import { useTheme } from "@/hooks/useTheme";

useTheme();
</script>
