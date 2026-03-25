import { type Video } from '@/entities/video/@x/course';
import { type Student } from '@/entities/student/@x/course';
import { type Media } from '@/entities/media/@x/course';

export interface Course {
  documentId: string;
  title: string;
  description: string;
  videos?: Video[];
  students?: Student[];
  preview?: Media;
}
