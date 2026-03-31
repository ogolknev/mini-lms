import type { Lesson } from '@/entities/lesson/@x/course';
import { type Media } from '@/entities/media/@x/course';
import type { User } from '@/entities/user/@x/course';

export interface Course {
  documentId: string;
  title: string;
  description: string;
  lessons?: Lesson[];
  enrolled_users?: User[];
  preview?: Media;
}
