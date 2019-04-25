<template>
	<div class="page projects">
		<Nav />
		<div class="content"></div>
	</div>
</template>

<script>
import Nav from '@/components/Nav.vue';

export default {
	name: 'projects',
	components: {
		Nav,
	},
};
</script>

<style scoped lang="scss">
@import '../assets/_variables';
</style>
