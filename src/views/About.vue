<template>
	<div class="page about">
		<Nav />
		<div class="content">
			<div class="pic" :style="getBgImage()"></div>
			<div class="text">
				<div class="layer" v-html="about.description"></div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

import Nav from '@/components/Nav.vue';

export default {
	name: 'about',
	components: {
		Nav,
	},
	computed: {
		...mapState({
			about: state => state.about,
		}),
	},
	methods: {
		getBgImage() {
			return `background-image: url(${this.about.image.sizes.large})`;
		},
	},
};
</script>

<style scoped lang="scss">
@import '../assets/_variables';
.content {
	display: flex;
	.pic,
	.text {
		height: 100%;
		flex: 1;
	}
	.pic {
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		@media (max-width: 768px) {
			display: none;
		}
	}
	.text {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		padding: 0 30px 30px 30px;
		justify-content: center;
		margin-top: $menu-margin;
		.layer {
			position: relative;
			background-color: white;
			color: $darker-grey;
			left: -100px;
			top: -40px;
			padding: 30px;
			@media (max-width: 768px) {
				background-color: inherit;
				color: inherit;
				left: 0;
				right: 0;
				padding: 0;
			}
		}
	}
}
</style>
