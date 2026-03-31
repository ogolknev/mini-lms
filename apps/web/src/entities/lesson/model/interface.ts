import type { Course } from "@/entities/course/@x/lesson";
import type { Media } from "@/entities/media/@x/lesson";

export interface Lesson {
  documentId: string;
  title: string;
  description: string;
  preview?: Media;
  position: number;
  content?: string;
  heroSrcType?: string;
  heroUrl?: string;
  course?: Course;
  attachments?: Media[];
}
