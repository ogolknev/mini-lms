import type { RouteRecordRaw } from 'vue-router'
import { VideoPage } from '..'

export default <RouteRecordRaw>{
  path: '/videos/:id',
  component: VideoPage,
}
