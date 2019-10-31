<template>
	<div class="page projects">
		<Shape :step="step" />
		<Nav />
		<div class="content">
			<h1 class="title">
				Projets
			</h1>
			<div class="projects">
				<ProjectItem
					:project="project"
					:index="index"
					class="project"
					v-for="(project, index) in projects"
					v-ov="{
						callback: toggleVisible,
						threshold: 1,
						throttle: 300,
					}"
				/>
				<ProjectItem
					:project="project"
					:index="index"
					class="project"
					v-for="(project, index) in projects"
					v-ov="{
						callback: toggleVisible,
						threshold: 1,
						throttle: 300,
					}"
				/>
				<ProjectItem
					:project="project"
					:index="index"
					class="project"
					v-for="(project, index) in projects"
					v-ov="{
						callback: toggleVisible,
						threshold: 1,
						throttle: 300,
					}"
				/>
			</div>
			<Footer />
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

import Nav from '@/components/Nav.vue';
import Footer from '@/components/Footer.vue';
import Shape from '@/components/Shape.vue';
import ProjectItem from '@/components/ProjectItem.vue';

export default {
	name: 'projects',
	components: {
		Nav,
		Footer,
		Shape,
		ProjectItem,
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
			projects: state => state.projects,
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
	.projects {
		width: 100%;
		max-width: 800px;
		.project {
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
