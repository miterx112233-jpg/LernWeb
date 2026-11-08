import React from 'react';
import { notFound } from 'next/navigation';
import { ALL_LESSONS as LESSONS } from '@/data/courses';
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
    return { title: 'ไม่พบบทเรียน — LernDev' };
  }
  const siteUrl = 'https://miterx112233-jpg.github.io/LernWeb';
  const ogImageUrl = `${siteUrl}/images/og-image.png`;

  return {
    title: `${lesson.title} — LernDev`,
    description: lesson.summary,
    openGraph: {
      title: `${lesson.title} — LernDev`,
      description: lesson.summary,
      url: `${siteUrl}/lesson/${lesson.id}/`,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: lesson.title }]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${lesson.title} — LernDev`,
      description: lesson.summary,
      images: [ogImageUrl]
    }
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

