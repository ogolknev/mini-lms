import { isDemo, demoSessionKey } from '@/shared/demo/config'
import {
  createWebHistory,
  createWebHashHistory,
  createRouter,
  type RouteRecordRaw,
} from 'vue-router'

const routeModules = import.meta.glob<RouteModule>('@/pages/*/route/*.ts', { eager: true })

const routes = Object.values(routeModules).map((module) => module.default)

const router = createRouter({
  routes,
  history: isDemo
    ? createWebHashHistory(import.meta.env.BASE_URL)
    : createWebHistory(import.meta.env.BASE_URL),
})

type RouteModule = {
  default: RouteRecordRaw
}

if (isDemo) {
  router.beforeEach((to) => {
    if (to.path !== '/auth' && !sessionStorage.getItem(demoSessionKey)) return '/auth'
  })
}
export default router
