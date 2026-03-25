import { type Course } from '@/entities/course/@x/video'
import { type Media } from '@/entities/media/@x/video'

export interface Video {
  documentId: string
  title: string
  description?: string
  url?: string
  course?: Course
  preview?: Media
  order: number
  attachments?: Media[]
}
