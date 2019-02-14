// import Vue from 'vue'
// import Router from 'vue-router'
//
// import My from '@/pages/users/My'
// import Edit from '@/pages/articles/Edit'
// import Article from '@/pages/articles/Article'
// import Catologue from '@/pages/articles/Catologue'
//
// import Index from '@/pages/Index'
// import Topic from '@/pages/indexs/Topic'
// import IndexIndex from '@/pages/indexs/Index'
//
// import Feedback from '@/pages/other/Feedback'
//
// import Users from '@/pages/admin/Users'
// import TypeManage from '@/pages/admin/contents/TypeManage'
// import CatologueManage from '@/pages/admin/contents/CatologueManage'
// import ArticleManage from '@/pages/admin/contents/ArticleManage'
// import CommentManage from '@/pages/admin/contents/CommentManage'
// import FeedBackManage from '@/pages/admin/contents/FeedBackManage'
import store from '../store'
// 我的 其他
const Login = r => require.ensure([], () => r(require('@/pages/other/Login')), 'Login')
const User = r => require.ensure([], () => r(require('@/pages/users/User')), 'User')
const Feedback = r => require.ensure([], () => r(require('@/pages/other/Feedback')), 'Feedback')

// 首页
const Index = r => require.ensure([], () => r(require('@/pages/Index')), 'Index')
const Topic = r => require.ensure([], () => r(require('@/pages/indexs/Topic')), 'Topic')
const IndexIndex = r => require.ensure([], () => r(require('@/pages/indexs/Index')), 'IndexIndex')

// 文章
const Edit = r => require.ensure([], () => r(require('@/pages/articles/Edit')), 'Edit')
const Article = r => require.ensure([], () => r(require('@/pages/articles/Article')), 'Article')
const Catologue = r => require.ensure([], () => r(require('@/pages/articles/Catologue')), 'Catologue')

// 管理员
const Users = r => require.ensure([], () => r(require('@/pages/admin/Users')), 'Users')
const TypeManage = r => require.ensure([], () => r(require('@/pages/admin/contents/TypeManage')), 'TypeManage')
const CatologueManage = r => require.ensure([], () => r(require('@/pages/admin/contents/CatologueManage')), 'CatologueManage')
const ArticleManage = r => require.ensure([], () => r(require('@/pages/admin/contents/ArticleManage')), 'ArticleManage')
const CommentManage = r => require.ensure([], () => r(require('@/pages/admin/contents/CommentManage')), 'CommentManage')
const FeedBackManage = r => require.ensure([], () => r(require('@/pages/admin/contents/FeedBackManage')), 'FeedBackManage')

// Vue.use(Router)

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/article/edit',
      name: 'Edit',
      component: Edit,
      meta: {keepAlive: true, user: true}
    },
    {
      path: '/article/edit/:id',
      name: 'EditById',
      component: Edit,
      meta: {keepAlive: true, user: true}
    },
    {
      path: '/catologue/:type',
      name: 'Catologue',
      component: Catologue,
      meta: { keepAlive: true }
    },
    {
      path: '/article/read/:id',
      name: 'Article',
      component: Article,
      meta: { keepAlive: true }
    },
    {
      path: '/user/:id',
      name: 'User',
      component: User,
      meta: {keepAlive: true, user: true}
    },
    {
      path: '/other/feedback',
      name: 'Feedback',
      component: Feedback,
      meta: {keepAlive: true, user: true}
    },
    {
      path: '/admin/users',
      name: 'Users',
      component: Users,
      meta: {keepAlive: true, user: true, admin: true}
    },
    {
      path: '/admin/typeManage',
      name: 'TypeManage',
      component: TypeManage,
      meta: {keepAlive: true, user: true, admin: true}
    },
    {
      path: '/admin/catologueManage',
      name: 'CatologueManage',
      component: CatologueManage,
      meta: {keepAlive: true, user: true, admin: true}
    },
    {
      path: '/admin/articleManage',
      name: 'ArticleManage',
      component: ArticleManage,
      meta: {keepAlive: true, user: true, admin: true}
    },
    {
      path: '/admin/commentManage',
      name: 'CommentManage',
      component: CommentManage,
      meta: {keepAlive: true, user: true, admin: true}
    },
    {
      path: '/admin/feedbackManage',
      name: 'FeedBackManage',
      component: FeedBackManage,
      meta: {keepAlive: true, user: true, admin: true}
    },
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '/index',
          name: 'IndexIndex',
          component: IndexIndex,
          meta: {keepAlive: true}
        },
        {
          path: '/index/:catologue/:page',
          name: 'Topic',
          component: Topic,
          meta: {keepAlive: true}
        }

      ],
      redirect: '/index'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.user) {
    // 用户登陆
    if (!store.state.user) {
      alert('请先登陆')
      next('/index')
      return
    }

    // 管理员
    if (to.meta.admin && !store.state.user.admin) {
      alert('你无权进入!')
      next(false)
      return
    }
  }

  // 未匹配 重定向到上级 或者 /
  if (to.matched.length === 0) {
    from.name ? next({ name: from.name }) : next('/index')
  } else {
    next()
  }
})

export default router
