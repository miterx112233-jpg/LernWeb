import { CourseId, Lesson, LESSONS } from './lessons';

export interface CourseInfo {
  id: CourseId;
  no: number;
  icon: string;
  name: string;
  shortName: string;
  desc: string;
  href: string;
}

/* =====================================================================
   รายการหลักสูตรทั้งหมดในเว็บไซต์
   ===================================================================== */
export const COURSES: CourseInfo[] = [
  {
    id: 'core',
    no: 1,
    icon: '📘',
    name: 'พื้นฐานวิศวกรรมซอฟต์แวร์ยุค AI (12 บท)',
    shortName: 'พื้นฐานวิศวกรรมซอฟต์แวร์ยุค AI (12 บท)',
    desc: 'เรียงจาก Basic → Intermediate → Advanced ครอบคลุมเว็บ, Git, Frontend, Backend, Database, Testing, LLM, RAG, Agent และ System Design',
    href: '/roadmap'
  }
];

export const ALL_LESSONS: Lesson[] = [...LESSONS];

export function getLessonCourseId(lesson: Lesson): CourseId {
  return 'core';
}

export function getCourseLessons(courseId?: CourseId): Lesson[] {
  return LESSONS;
}

export function getCourseInfo(courseId?: CourseId): CourseInfo {
  return COURSES[0];
}
