import React from 'react';
import { notFound } from 'next/navigation';
import { LESSONS } from '@/data/lessons';
import LessonViewer from '@/components/LessonViewer';

export function generateStaticParams() {
  return LESSONS.map(lesson => ({
    slug: lesson.id
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = LESSONS.find(l => l.id === slug);
  if (!lesson) {
    return { title: 'ไม่พบบทเรียน — LernWeb' };
  }
  return {
    title: `${lesson.title} — LernWeb`,
    description: lesson.summary
  };
}

export default async function LessonPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = LESSONS.find(l => l.id === slug);

  if (!lesson) {
    notFound();
  }

  return <LessonViewer lesson={lesson} />;
}

