<template>
	<div class="page members">
		<Shape :step="step" />
		<Nav />
		<div class="content">
			<h1 class="title">
				Membres
			</h1>
			<div class="members">
				<Member
					:member="member"
					:index="index"
					class="project"
					v-for="(member, index) in members"
					v-ov="{
						callback: toggleVisible,
						threshold: 1,
						throttle: 300,
					}"
				/>
			</div>
			<Footer />
		</div>
		<svg height="0" width="0">
			<defs>
				<clipPath id="clip" clipPathUnits="userSpaceOnUse">
					<path
						transform="translate(300,300) scale(1)"
						d="M116.7,-12.2C116.7,42,58.3,84,-12.5,84C-83.3,84,-166.7,42,-166.7,-12.2C-166.7,-66.3,-83.3,-132.7,-12.5,-132.7C58.3,-132.7,116.7,-66.3,116.7,-12.2Z"
					/>
				</clipPath>
			</defs>
		</svg>
	</div>
</template>

<script>
import { mapState } from 'vuex';

import Nav from '@/components/Nav.vue';
import Footer from '@/components/Footer.vue';
import Shape from '@/components/Shape.vue';
import Member from '@/components/Member.vue';

export default {
	name: 'members',
	components: {
		Nav,
		Footer,
		Shape,
		Member,
	},
	data() {
		return {
			step: 0,
		};
	},
	mounted() {
		setTimeout(() => {
			this.incStep();
		}, 1000);
		this.wobble();
	},
	computed: {
		...mapState({
			members: state =>
				state.members.sort((a, b) => a.name.localeCompare(b.name)),
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
	align-items: center;
	justify-content: center;
	width: 100%;
	z-index: 1;
	.title {
		text-align: center;
	}
	.members {
		width: 100%;
		max-width: 800px;
		.member {
			opacity: 0;
			transform: translateY(20px);
			@include long-transition;
			&.visible {
				opacity: 1;
				transform: translateY(0);
			}
		}
	}
}
</style>
