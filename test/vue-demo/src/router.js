import Router from 'vue-router'
import home from './home.vue'
import about from './about.vue'
import Vue from 'vue'
Vue.use(Router)


const route = new Router({
    routes: [{
            path: '/home',
            component: home
        },
        {
            path: '/about',
            component:  about
        },
        {
            path: '/',
            redirect: '/home'
        },

    ],
})

export default route