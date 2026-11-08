import { CourseId, Lesson, LESSONS } from './lessons';
import { AI_FUTURE_LESSONS } from './aiFutureCourse';

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
   รายการหลักสูตรทั้งหมดในเว็บไซต์ (แต่ละหลักสูตรปลดล็อกบทเรียนตามลำดับแยกกันอิสระ)
   ===================================================================== */
export const COURSES: CourseInfo[] = [
  {
    id: 'core',
    no: 1,
    icon: '📘',
    name: 'พื้นฐาน Software Engineer ในยุค AI',
    shortName: 'Software Engineer (12 บท)',
    desc: 'เรียงจาก Basic → Intermediate → Advanced ครอบคลุมเว็บ, Git, Frontend, Backend, Database, Testing, LLM, RAG, Agent และ System Design',
    href: '/roadmap'
  },
  {
    id: 'ai-future',
    no: 2,
    icon: '🚀',
    name: 'AI Coding & Future Tech: เมื่อภาษามนุษย์กลายเป็นภาษาโปรแกรม',
    shortName: 'AI Coding & Future Tech (4 บท)',
    desc: 'Vibe Coding, ทักษะแก่นแท้ยุค AI, ความปลอดภัยของโค้ดที่ AI สร้าง และ 7 อาชีพสายเทคแห่งอนาคต — เรียนได้ทันทีโดยไม่ต้องจบหลักสูตรที่ 1',
    href: '/roadmap#ai-future'
  }
];

export const ALL_LESSONS: Lesson[] = [...LESSONS, ...AI_FUTURE_LESSONS];

export function getLessonCourseId(lesson: Lesson): CourseId {
  return lesson.course ?? 'core';
}

export function getCourseLessons(courseId: CourseId): Lesson[] {
  return courseId === 'ai-future' ? AI_FUTURE_LESSONS : LESSONS;
}

export function getCourseInfo(courseId: CourseId): CourseInfo {
  return COURSES.find(c => c.id === courseId) || COURSES[0];
}

