import type { RouteRecordRaw } from 'vue-router'
import { CoursePage } from '..'

export default <RouteRecordRaw>{
  path: '/courses/:id',
  component: CoursePage,
}
