<template>
	<div class="project" :class="index % 2 ? 'right' : 'left'">
		<div
			class="picture"
			:style="{
				'background-image': `url(${
					project.featured_image.sizes.large
				})`,
			}"
		></div>
		<div class="infos">
			<h2 class="title">{{ project.title }}</h2>
			<p class="date" v-html="computeDate()"></p>
			<p class="tagline" v-html="project.tagline"></p>
			<a
				class="website"
				:href="project.website"
				target="_blank"
				v-if="project.website"
				>{{ project.website.split('//')[1] }}</a
			>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		project: Object,
		index: Number,
	},
	mounted() {
		console.log(this.project);
	},
	methods: {
		computeDate() {
			const d = this.project.date;
			return `${d.substr(4, 2)}/${d.substr(0, 4)}`;
		},
	},
};
</script>

<style scoped lang="scss">
@import '../assets/_variables';
.project {
	position: relative;
	display: flex;
	align-self: flex-start;
	width: 100%;
	padding: 30px;
	height: 300px;
	text-align: right;
	&::after {
		content: '';
		position: absolute;
		display: block;
		background: rgba(255, 255, 255, 0.5);
		width: 80%;
		height: 1px;
		margin: 40px auto 5px;
		bottom: 0;
	}
	&.right {
		flex-direction: row-reverse;
		align-self: flex-end;
		text-align: left;
	}
	.infos,
	.picture {
		padding: 10px;
	}
	.infos {
		flex: 2;
		display: flex;
		flex-direction: column;
		@media (max-width: 768px) {
			flex: 1;
		}
		h2,
		p {
			margin: 0;
		}
	}
	.picture {
		flex: 1;
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
	}
}
</style>
