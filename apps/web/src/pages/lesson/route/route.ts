import type { RouteRecordRaw } from 'vue-router'
import { LessonPage } from '..'

export default <RouteRecordRaw>{
  path: '/lessons/:id',
  component: LessonPage,
}
