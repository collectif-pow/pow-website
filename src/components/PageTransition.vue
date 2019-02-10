<template>
	<div>
		<svg width="100%" height="100%" :style="style">
			<rect x="0" :y="y" :width="width" height="100%" :fill="fill" />
		</svg>
	</div>
</template>

<script>
import anime from 'animejs';
const duration = 450;

export default {
	data() {
		return {
			width: 0,
			y: 0,
			visible: false,
			fill: 'white',
		};
	},
	computed: {
		style() {
			return this.visible ? 'visibility: visible' : 'visibility: hidden';
		},
	},
	methods: {
		beforeLeave(el) {
			el.style.opacity = 0;
			// reset values before enter animation
			this.width = 0;
			this.y = 0;
			this.visible = true;
		},
		leave(el, done) {
			const tl = anime.timeline();
			tl.add({
				targets: this,
				width: '100%',
				round: 1,
				easing: 'easeInOutQuart',
				duration: duration,
				complete: () => done && done(),
			});
		},
		beforeEnter(el) {
			// sets the opacity to 0 of the entering element
			el.style.opacity = 0;
			// scroll to the top of the #app (and html for ie11) container
			anime({
				targets: ['#app', 'html'],
				scrollTop: 0,
				easing: 'linear',
				duration: 0,
			});
		},
		enter(el, done) {
			const tl = anime.timeline();
			tl.add({
				targets: this,
				y: '100%',
				round: 1,
				easing: 'easeInOutQuart',
				duration: duration,
				complete: () => {
					this.visible = false;
					done();
				},
			}).add({
				targets: el,
				opacity: 1,
				easing: 'linear',
				duration: duration * 1.7,
				offset: `-=${duration * 1.2}`,
			});
		},
	},
};
</script>

<style scoped lang="scss">
@import '../assets/_variables';

div {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1;
	overflow: hidden;
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	padding: 0;
	@media (min-width: 768px) {
		padding: $padding;
	}
	svg {
		rect {
			will-change: y, height;
		}
	}
}
</style>
