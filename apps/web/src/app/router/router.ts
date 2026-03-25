import { createWebHistory, createRouter, type RouteRecordRaw } from 'vue-router'

const routeModules = import.meta.glob<RouteModule>('@/pages/*/route/*.ts', { eager: true })

const routes = Object.values(routeModules).map((module) => module.default)

export default createRouter({
  routes,
  history: createWebHistory(),
})

type RouteModule = {
  default: RouteRecordRaw
}
