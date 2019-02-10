<template>
	<div class="page home">
		<Nav />
		<div class="content">
			<div class="title">
				Collectif POW
			</div>
		</div>
	</div>
</template>

<script>
import Nav from '@/components/Nav.vue';

export default {
	name: 'home',
	components: {
		Nav,
	},
};
</script>

<style scoped lang="scss">
@import '../assets/_variables';

.title {
	position: absolute;
	bottom: 10px;
	left: 0;
	writing-mode: vertical-lr;
	transform: rotate(180deg);
	height: 100%;
	font-weight: 700;
	font-size: 5em;
}
</style>
