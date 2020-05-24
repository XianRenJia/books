import Vue from 'vue'
import App from './App'
import request from './request'
import store from './store';


Vue.config.productionTip = false

Vue.prototype.$request = request;
Vue.prototype.$store = store;

App.mpType = 'app'

Vue.prototype.$toast = function(title){
	uni.showToast({
		title:`您点了` + title,
		icon:'none'
	})
}

const app = new Vue({
    ...App
})
app.$mount()
