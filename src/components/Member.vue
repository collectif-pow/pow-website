<template>
	<div class="member">
		<img class="picture" :src="member.picture.sizes.large" alt="" />
		<div class="infos">
			<div class="layer">
				<div class="name">
					<span>{{ member.forename }}</span
					><br /><span>{{ member.name }}</span>
				</div>
				<div class="bio" v-html="member.bio"></div>
				<a
					class="website"
					:href="member.website"
					target="_blank"
					v-if="member.website"
					>{{ member.website }}</a
				>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		member: Object,
	},
};
</script>

<style scoped lang="scss">
@import '../assets/_variables';
.member {
	display: flex;
	.infos {
		display: flex;
		flex-direction: column;
		.layer {
			position: relative;
			top: 40px;
			left: -40px;
			padding: 30px;
			background-color: white;
			color: $darker-grey;
			.name {
			}
			.bio {
			}
			.website {
			}
		}
	}
	.picture {
		width: 200px;
		height: 200px;
	}
}
</style>
