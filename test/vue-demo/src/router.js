import Router from 'vue-router'

import Vue from 'vue'
Vue.use(Router)


const route = new Router({
    routes: [{
            path: '/home',
            component: ()=>import('./home.vue')
        },
        {
            path: '/about',
            component:  ()=>import('./about.vue')
        },
        {
            path: '/',
            redirect: '/home'
        },

    ],
})

export default route