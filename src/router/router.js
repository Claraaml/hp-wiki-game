import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'layout',
        component: () => import(/*webpackChunkName: "Layout"*/'@/layouts/PrincipalLayout'),
        children: [
            {
                path: '',
                name: 'home',
                component: () => import(/*webpackChunkName: "Home"*/'../components/Home')
            },
            {
                path: 'wiki',
                name: 'wiki',
                component: () => import(/*webpackChunkName: "Wiki"*/'../modules/wiki/views/WikiView'),
                children: [
                    {
                        path: '',
                        name: 'wiki-table',
                        component: () => import(/*webpackChunkName: "Table"*/'../modules/wiki/components/Table')
                    },
                    {
                        path: ':id',
                        name: 'wiki-detail',
                        component: () => import(/*webpackChunkName: "Detail"*/'../modules/wiki/components/Detail')
                    }
                ]
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import(/* webpackChunkName: "NoPageFound" "*/ '@/components/NoPageFound')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})


export default router
