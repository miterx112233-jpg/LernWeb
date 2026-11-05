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
    return { title: 'ไม่พบบทความ — LernDev' };
  }
  const siteUrl = 'https://miterx112233-jpg.github.io/LernWeb';
  const imgUrl = article.coverImage
    ? `${siteUrl}${article.coverImage}`
    : `${siteUrl}/images/og-image.png`;

  return {
    title: `${article.title} — LernDev`,
    description: article.summary,
    openGraph: {
      title: `${article.title} — LernDev`,
      description: article.summary,
      url: `${siteUrl}/articles/${article.slug}/`,
      images: [{ url: imgUrl, width: 1200, height: 630, alt: article.title }]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${article.title} — LernDev`,
      description: article.summary,
      images: [imgUrl]
    }
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

