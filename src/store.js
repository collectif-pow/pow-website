import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
	state: {
		projects: [],
		members: [],
		loading: true,
		about: {},
	},
	getters: {
		getProjectById: state => id => {
			return state.projects.find(
				project => project.id === parseInt(id, 10)
			);
		},
		getMemberById: state => id => {
			return state.members.find(member => member.id === parseInt(id, 10));
		},
	},
	mutations: {
		GET_PROJECTS(state, projects) {
			state.projects = projects;
		},
		GET_MEMBERS(state, members) {
			state.members = members;
		},
		GET_ABOUT(state, about) {
			state.about = about;
		},
		SET_LOADING(state, loading) {
			state.loading = loading;
		},
	},
	actions: {
		async getProjects({ commit }) {
			const projectUrl = 'https://wp.pow.cool/wp-json/wp/v2/project';
			const res = await fetch(projectUrl + '?per_page=100');
			const projects = await res.json();
			commit(
				'GET_PROJECTS',
				projects
					.map(project => {
						return {
							id: project.id,
							title: project.title.rendered,
							...project.acf,
						};
					})
					.sort(function(a, b) {
						const d = new Date(a.date);
						const t = new Date(b.date);
						return t - d;
					})
					.map(project => {
						const date = project.date;
						project.date = date
							.split('/')
							.filter((e, i) => i !== 1)
							.join('/');
						return project;
					})
			);
		},
		async getMembers({ commit }) {
			const memberUrl = 'https://wp.pow.cool/wp-json/wp/v2/member';
			const res = await fetch(memberUrl + '?per_page=100');
			const members = await res.json();
			commit(
				'GET_MEMBERS',
				members.map(member => {
					return {
						id: member.id,
						name: member.title.rendered,
						...member.acf,
					};
				})
			);
		},
		async getAbout({ commit }) {
			const aboutUrl = 'https://wp.pow.cool/wp-json/wp/v2/about';
			const res = await fetch(aboutUrl);
			const about = await res.json();
			commit('GET_ABOUT', {
				...about[0].acf,
			});
		},
		async getData({ commit }) {
			commit('SET_LOADING', true);
			await Promise.all([
				this.dispatch('getProjects'),
				this.dispatch('getMembers'),
				this.dispatch('getAbout'),
			]);
			setTimeout(() => commit('SET_LOADING', false), 2500);
		},
	},
});
