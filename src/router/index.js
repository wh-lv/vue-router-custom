import Vue from 'vue'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import VueRouter from './router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: About
    }
]

export default new VueRouter({
    routes
})