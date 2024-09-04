import { createRouter, createWebHistory } from 'vue-router';

import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import MainPage from "../views/MainPage.vue";
import Starred from "../views/Starred.vue";

const routes = [
	{
		path: '/',
		component: SignIn
	},
  {
		path: '/Register',
		component: SignUp
	},
  {
		path: '/Dashboard',
		component: MainPage
	},
	{
		path: '/Starred',
		component: Starred
	}
]

const router = createRouter({
	history: createWebHistory('/'),
	routes
});

export default router;