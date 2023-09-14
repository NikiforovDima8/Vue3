import MainPage from '@/pages/MainPage'
import { createRouter, createWebHistory } from 'vue-router'
import PostPage from '@/pages/PostPage'
import AboutPage from '@/pages/AboutPage'


const routes=[
    {
        path:'/',
        component:MainPage
    },
    {
        path:'/users',
        component:PostPage
    },
    {
        path:'/about',
        component:AboutPage
    }
]


const router=createRouter({
    routes,
    history:createWebHistory(process.env.BASE_URL)
})

export default router


