import React from 'react';
import { notFound } from 'next/navigation';
import { ARTICLES } from '@/data/articles';
import ArticleViewer from '@/components/ArticleViewer';

export function generateStaticParams() {
  return ARTICLES.map(article => ({
    slug: article.slug
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = ARTICLES.find(a => a.slug === slug);
  if (!article) {
    return { title: 'ไม่พบบทความ — LernWeb' };
  }
  return {
    title: `${article.title} — LernWeb`,
    description: article.summary
  };
}

export default async function ArticleDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = ARTICLES.find(a => a.slug === slug);

  if (!article) {
    notFound();
  }

  return <ArticleViewer article={article} />;
}

