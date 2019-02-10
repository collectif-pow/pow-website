<template>
	<div class="page members">
		<Nav />
		<div class="content">
			<Member :member="member" v-for="member in members" />
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

import Nav from '@/components/Nav.vue';
import Member from '@/components/Member.vue';

export default {
	name: 'members',
	components: {
		Nav,
		Member,
	},
	computed: {
		...mapState({
			members: state => {
				const m = [];
				for (var i = 0; i < 7; i++) {
					m.push(state.members[0]);
				}
				return m;
			},
		}),
	},
};
</script>

<style scoped lang="scss">
@import '../assets/_variables';
.content {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
}
</style>
