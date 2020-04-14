import Vue from 'vue'
import Router from 'vue-router'

const BasicLayout = () => import('@/layouts/Basic')
const UserLayout = () => import('@/layouts/User')
const NotFound = () => import('@/layouts/NotFound')

const Dashboard = () => import('@/views/Dashboard')
const Login = () => import('@/views/Login')
const Security = () => import('@/views/Security')
const ArticleList = () => import('@/views/Article/List.vue')
const ArticleEditor = () => import('@/views/Article/Editor.vue')
const Category = () => import('@/views/Category/List')
const Comment = () => import('@/views/Comment/List')
const Message = () => import('@/views/Message/List')
const Tag = () => import('@/views/Tag')

const SiteConfig = () => import('@/views/Configuration/SiteConfig')
const ProjectIntro = () => import('@/views/Configuration/ProjectIntro')
const Author = () => import('@/views/Configuration/Author')
const component = {
  // functional:true,
  render(h) {
    return h('router-view')
  },
}

export const basicRoutes = [


  {
    name: 'dashboard',
    path: 'dashboard',
    component: Dashboard,
    meta: {
      icon: 'el-icon-s-home',
      title: '首页',
    },
  },
  {
    name: 'configuration',
    path: 'configuration',
    component,
    meta: {
      title: '项目配置',
      icon: 'el-icon-s-operation',
    },
    children: [
      {
        name: 'project-intro',
        path: 'project-intro',
        component: ProjectIntro,
        meta: {
          // breadcrumb
          icon: 'el-icon-more',
          title: '项目简介',
        },
      },
      {
        name: 'author',
        path: 'author',
        component: Author,
        meta: {
          icon: 'el-icon-user',
          title: '作者简介',
        },
      },
      {
        name: 'site-config',
        path: 'site-config',
        component: SiteConfig,
        meta: {
          icon: 'el-icon-s-platform',
          title: '网站设置',
        },
      },
    ],
  },


  {
    name: 'article',
    path: 'articles',
    component,
    meta: {
      title: '文章管理',
      icon: 'el-icon-document',
    },
    children: [
      {
        name: 'articles',
        path: '',
        component: ArticleList,
        meta: {
          title: '文章列表',
          icon: 'el-icon-s-data',
        },
      },
      {
        name: 'ArticleEditor',
        path: ':id/edit',
        component: ArticleEditor,
        meta: {
          notMenu: true,
          title: '编辑文章',
          icon: 'el-icon-document-checked',
        },
      },
      {
        name: 'ArticleCreator',
        path: 'create',
        component: ArticleEditor,
        meta: {
          title: '新增文章',
          icon: 'el-icon-document-add',
        },
      },
      {
        name: 'article-comments',
        path: ':articleID/comments',
        component: Comment,
        meta: {
          notMenu: true,
          title: '文章评论',
          icon: 'el-icon-s-comment',
        },
      },
    ],
  },
  {
    name: 'categories',
    path: 'categories',
    component: Category,
    meta: {
      title: '分类管理',
      icon: 'el-icon-folder',
    },
  },
  {
    name: 'tags',
    path: 'tags',
    component: Tag,
    meta: {
      title: '标签管理',
      icon: 'el-icon-collection-tag'
    },
  },
  {
    name: 'comments',
    path: 'comments',
    component: Comment,
    meta: {
      title: '文章评论',
      icon: 'el-icon-s-comment'
    },
  },
  {
    name: 'messages',
    path: 'messages',
    component: Message,
    meta: {
      title: '留言墙',
      icon: 'el-icon-message',
    },
  }, {
    name: 'security',
    path: 'settings/security',
    component: Security,
    meta: {
      title: '账户设置',
      icon: 'el-icon-setting',
    },
  },

]

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/index.html',
      redirect: '/auth/login',
      meta: { notMenu: true, }

    },
    {
      path: '/auth',
      component: UserLayout,
      children: [
        {
          name: 'login',
          path: 'login',
          component: Login,
        },
      ],
    },
    {
      path: '/',
      component: BasicLayout,
      children: [
        {
          path: '',
          redirect: 'dashboard',
        },
        ...basicRoutes,
      ],
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
})

router.beforeEach((to, from, next) => {
  console.log('from.path', from.path)
  console.log('to.path', to.path)
  if (to.path === '/auth/login') {
    return next()
  }
  const accessToken = localStorage.getItem('accessToken')

  return accessToken ? next() : next('/auth/login')
})

export default router
