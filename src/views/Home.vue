<template>
	<div class="page home">
		<Shape :step="step" />
		<Nav />
		<full-page ref="fullpage" :options="fpOptions" class="content">
			<section class="hero">
				<h1 class="title">
					Ici c'est <span class="pow" ref="pow">POW</span>
				</h1>
				<h2 class="tagline" v-html="about.tagline"></h2>
				<a class="scroll" @click="scroll('about')">À propos</a>
			</section>
			<section class="about" ref="about">
				<div
					class="text"
					v-ov="{
						callback: toggleVisible,
						threshold: 1,
						throttle: 300,
					}"
					v-html="about.description"
				></div>
				<a class="scroll" @click="scroll('projects')"
					>Nos derniers projets</a
				>
			</section>
			<section class="projects" ref="projects">
				<Slider :slides="projects" />
				<Footer />
			</section>
		</full-page>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import charming from 'charming';

import Nav from '@/components/Nav.vue';
import Footer from '@/components/Footer.vue';
import Shape from '@/components/Shape.vue';
import Slider from '@/components/Slider.vue';

export default {
	name: 'home',
	components: {
		Nav,
		Footer,
		Shape,
		Slider,
	},
	data() {
		return {
			step: 0,
			fpOptions: {
				licenseKey: '6C7F8D07-557D4FC4-8DF0F791-5714BE41',
				navigation: false,
				sectionSelector: 'section',
				slideSelector: '.nope',
				onLeave: this.incStep,
			},
		};
	},
	mounted() {
		setTimeout(() => {
			this.incStep();
		}, 1000);
		this.wobble();
		charming(this.$refs.pow);
	},
	beforeDestroy() {
		clearInterval(this.interval);
	},
	computed: {
		...mapState({
			about: state => state.about,
			projects: state => [
				state.projects[0],
				state.projects[0],
				state.projects[0],
			],
		}),
	},
	methods: {
		incStep() {
			clearInterval(this.interval);
			this.step++;
			this.wobble();
		},
		wobble() {
			this.interval = setInterval(() => {
				this.step++;
			}, 8000);
		},
		scroll() {
			this.incStep();
			this.$refs.fullpage.api.moveSectionDown();
		},
		toggleVisible(isVisible, entry) {
			if (isVisible) entry.target.classList.add('visible');
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
	z-index: 1;
	section {
		/deep/ .fp-tableCell {
			position: relative;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: 100vh;
			height: calc(var(--vh, 1vh) * 100);
		}
	}
	.hero {
		.title {
			.pow {
				/deep/ span {
					display: inline-block;
					color: rgba(255, 0, 0, 0.75);
					transform: translateY(-20px);
					opacity: 0;
					animation: translateUp 0.5s 0.2s;
					animation-fill-mode: forwards;
					&:first-child,
					&:last-child {
						transform: translateY(20px);
						animation: translateDown 0.5s 0.2s;
						animation-fill-mode: forwards;
					}
				}
			}
		}
		.tagline {
			opacity: 0.75;
		}
	}
	.about {
		@media (max-width: 768px) {
			padding: 0 30px;
		}
		.text {
			width: 100%;
			max-width: 800px;
			border-left: 2px solid rgba(255, 255, 255, 0);
			padding-left: 30px;
			@include long-transition;
			@media (max-width: 768px) {
				border-left: none !important;
				padding-left: 0;
			}
			/deep/ * {
				opacity: 0;
				transform: translateY(20px);
				@include long-transition;
			}
			&.visible {
				border-left: 2px solid rgba(255, 255, 255, 0.5);
				/deep/ * {
					opacity: 1;
					transform: translateY(0);
				}
			}
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
		user-select: none;
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
@keyframes translateDown {
	0% {
		transform: translateY(20px);
		opacity: 0;
	}
	100% {
		transform: translateY(0);
		opacity: 1;
	}
}

@keyframes translateUp {
	0% {
		transform: translateY(-20px);
		opacity: 0;
	}
	100% {
		transform: translateY(0);
		opacity: 1;
	}
}
</style>
