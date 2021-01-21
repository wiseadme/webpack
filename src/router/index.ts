import { createRouter, createWebHistory, Router } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import AppLayout from '@/layouts/AppLayout'

import { lStorage } from '@/utils'

const routes: any = [
  {
    path: '/auth',
    component: AuthLayout,
    redirect: '/auth',
    children: [
      {
        path: 'create',
        component: () => import('@/pages/AuthPage.vue'),
      },
      {
        path: 'login',
        component: () => import('@/pages/AuthPage.vue'),
      }
    ]
  },
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: 'dictionaries/categories',
        component: () => import('@/pages/nomenclature/CategoryPage.vue'),
        name: 'categories'
      },
      {
        path: 'dictionaries/groups',
        component: () => import('@/pages/nomenclature/GroupsPage'),
        name: 'groups'
      },
      {
        path: 'orders/create',
        component: () => import('@/pages/order/CreateOrderPage'),
        name: 'orders-create'
      },
      {
        path: 'orders/my-orders',
        component: () => import(/* webpackChunkName: ""*/ '@/pages/order/MyOrdersPage'),
        name: 'my-orders'
      },
      {
        path: 'orders/my-orders/:id',
        component: () => import('@/pages/order/EditOrderPage'),
        name: 'my-order'
      },
      {
        path: 'orders/orders-map/order/:id',
        component: () => import('@/pages/order/OrdersMapPage'),
        name: 'orders-map'
      }
    ]
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
}) as Router

router.beforeEach((to, _, next) => {
  if (!lStorage.get('user') && !to.path.match(/auth/)) {
    next('/auth/login')
  } else {
    next(true)
  }
})
