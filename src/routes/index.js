import {createRouter, createWebHistory } from 'vue-router';
import AuthLayout from "../layouts/auth.vue"
import DefaultLayout from "../layouts/default.vue"
import UserView from "../views/User.vue"
import SignIn from '../views/Sign-in.vue';
import BookView from '../views/Book.vue';
import Home from '../views/Home.vue';
import SignUp from '../views/Sign-up.vue';
import BorrowList from '../views/BorrowList.vue'
const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/:catchAll(.*)',
      component: () => import('../views/404.vue')
    },
    {
      path: '/',
      name: 'Sign in',
      meta: {
        layout: 'AuthLayout'
      },
      component: AuthLayout,
      children:[
        {
          path: '/sign-in',
          name: 'Sign in',
          component: SignIn
        },
        {
          path: '/sign-up',
          name: 'Sign up',
          component: SignUp
        }
      ]
    },
    {
      path: '/',
      name: 'Trang chủ',
      meta: {
        layout: 'DefaultLayout'
      },
      component: DefaultLayout,
      children: [
        {
          path: '/',
          name: 'Home',
          component: Home
        },
        {
          path: '/book',
          name: 'Book',
          component: BookView
        },
        {
          path: '/user',
          name: 'User',
          component: UserView
        },
        {
          path: '/borrow-list',
          name: 'Borrow',
          component: BorrowList
        }
      ]
    }
  ]
})

// router.beforeEach(async (to) => {
//   const publicPages = ['/sign-in']
//   const authRequired = !publicPages.includes(to.path)
//   const auth = useAuthStore()

//   if (authRequired && !auth.user) {
//     notification.error({
//       message: 'Truy cập thất bại',
//       description: 'Vui lòng đăng nhập lại.',
//       duration: 2
//     })
//     auth.returnUrl = to.fullPath
//     return '/sign-in'
//   }

//   if (to.path === '/sign-in' && auth.user) {
//     return '/'
//   }
// })

export default router


