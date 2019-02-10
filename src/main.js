import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'normalize.css';
import '@/assets/base.scss';

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App),
	async created() {
		await this.$store.dispatch('getData');
	},
}).$mount('#app');
