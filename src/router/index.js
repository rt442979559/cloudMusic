import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const Home = () => import('views/index/Home')
const Mine = () => import('views/mine/Mine')
const Videomv = () => import('views/videomv/Videomv')
const Search = () => import('views/search/Search')
const Index = () => import('views/index/Index')


const Rank = () => import('views/index/Rank')
const SongCate = () => import('views/index/SongCate')
const PlaylistDetail = () => import('views/songdetail/PlaylistDetail')

const TopPlayList = () => import('views/topplaylist/TopPlayList')


const routes = [
    {
        path: '',
        redirect: '/home',
    },
    {
        path: '/mine',
        component: Mine,
        //用meta属性来控制路由的显示和隐藏
        meta: {
            showNav: true
        }
    },
    {
        path: '/index',
        component: Index,
        redirect: '/home',
        meta: {
            showNav: true
        },
        children: [{
                path: '/home',
                component: Home,
                meta: {
                    showNav: true
                }
            },
            {
                path: '/songcate',
                component: SongCate,
                meta: {
                    showNav: true
                }
            },
            {
                path: '/rank',
                component: Rank,
                meta: {
                    showNav: true
                }
            },
        ]
    },

    {
        path: '/videomv',
        component: Videomv,
        meta: {
            showNav: true
        }
    },
    {
        path: '/playlistdetail/:id',
        component: PlaylistDetail,
    },
    //搜索
    {
        path:'/search',
        component:Search
    },
    //推荐歌单 => 更多
    {
        path:'/topplaylist',
        component:TopPlayList
    }
]

const router = new VueRouter({
    mode:  'hash',
    routes,
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default router