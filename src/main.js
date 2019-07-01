import Vue from "vue";
import router from "./router";
import VueNoty from 'vuejs-noty';
import VueDisqus from 'vue-disqus';
import wysiwyg from 'vue-wysiwyg'

import App from "./App.vue";
import 'vuejs-noty/dist/vuejs-noty.css';
import "vue-wysiwyg/dist/vueWysiwyg.css";

Vue.use(VueNoty);
Vue.use(VueDisqus);
Vue.use(wysiwyg, {});
Vue.config.productionTip = false;

let isAuth = false;
const authData = localStorage.getItem('auth');
if (authData) {
	isAuth = true
}

new Vue({
	render: h => h(App),
	router,
	data: {
    auth: authData ? JSON.parse(authData) : {},
    isAuth: isAuth
	}
}).$mount("#app");
