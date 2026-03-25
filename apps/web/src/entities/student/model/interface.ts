import { type Course } from '@/entities/course/@x/student';
import { type User } from '@/entities/user/@x/student';

export interface Student {
  documentId: string;
  name: string;
  courses?: Course[];
  user?: User;
}
