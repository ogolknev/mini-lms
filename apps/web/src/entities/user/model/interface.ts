import {type Student} from '@/entities/student/@x/user'

export interface User {
  documentId: string;
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  student?: Student;
}
