<template>
	<div class="page home">
		<Shape />
		<Nav />
		<div class="content">
			<section class="hero">
				<h1 class="title">
					Ici c'est POW
				</h1>
				<h2 class="tagline">
					Curieux, créatifs et rigolos
				</h2>
				<a class="scroll" @click="scroll('about')">À propos</a>
			</section>
			<section class="about" ref="about">
				<div v-html="about.description"></div>
				<a class="scroll" @click="scroll('projects')"
					>Nos derniers projets</a
				>
			</section>
			<section class="projects" ref="projects"></section>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

import Nav from '@/components/Nav.vue';
import Shape from '@/components/Shape.vue';

export default {
	name: 'home',
	components: {
		Nav,
		Shape,
	},
	computed: {
		...mapState({
			about: state => state.about,
		}),
	},
	methods: {
		scroll(ref) {
			window.scroll({
				top: this.$refs[ref].offsetTop,
				left: 0,
				behavior: 'smooth',
			});
		},
	},
};
</script>

<style scoped lang="scss">
@import '../assets/_variables';
.content {
	display: flex;
	flex-direction: column;
	width: 100%;
	section {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}
	.hero {
		.tagline {
			opacity: 0.75;
		}
	}
	.about {
		div {
			width: 100%;
			max-width: 800px;
			border-left: 2px solid rgba(255, 255, 255, 0.5);
			padding-left: 30px;
		}
	}
	.scroll {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		z-index: 1;
		bottom: 20px;
		font-size: 1em;
		text-transform: uppercase;
		letter-spacing: 8px;
		text-decoration: none;
		color: #ffffff;
		opacity: 0.75;
		cursor: pointer;
		&::before {
			position: absolute;
			content: '';
			bottom: 40px;
			transition: 0.3s;
			height: 32px;
			width: 0;
			border: 2px solid currentColor;
			border-top: none;
			border-right: none;
			color: #fff;
			opacity: 0.5;
		}
		&:hover {
			opacity: 1;
			&::before {
				bottom: 30px;
			}
		}
	}
}
</style>
