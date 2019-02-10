<template>
	<div class="page residencies">
		<Nav />
		<div class="content"></div>
	</div>
</template>

<script>
import Nav from '@/components/Nav.vue';

export default {
	name: 'residencies',
	components: {
		Nav,
	},
};
</script>

<style scoped lang="scss">
@import '../assets/_variables';
</style>
