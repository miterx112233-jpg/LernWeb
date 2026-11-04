'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { LESSONS, LEVELS, LevelId } from '@/data/lessons';
import { useProgress } from '@/context/ProgressContext';
import { LessonCard } from '@/components/LessonBanner';

function ArticlesContent() {
  const searchParams = useSearchParams();
  const { isDone } = useProgress();
  const [levelFilter, setLevelFilter] = useState<'all' | LevelId>('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const lv = searchParams.get('level') as LevelId | null;
    if (lv && LEVELS.some(item => item.id === lv)) {
      setLevelFilter(lv);
    } else {
      setLevelFilter('all');
    }
  }, [searchParams]);

  const filtered = LESSONS.filter(lesson => {
    const matchLevel = levelFilter === 'all' || lesson.level === levelFilter;
    const q = query.trim().toLowerCase();
    const matchQuery =
      !q ||
      [lesson.title, lesson.summary, lesson.keyword, lesson.subtitle, lesson.category, ...lesson.topics]
        .join(' ')
        .toLowerCase()
        .includes(q);
    return matchLevel && matchQuery;
  });

  return (
    <section className="container" style={{ paddingTop: 28, paddingBottom: 64 }}>
      <div className="filters">
        <div className="tabs" role="tablist">
          <button
            type="button"
            className={`tab ${levelFilter === 'all' ? 'is-active' : ''}`}
            onClick={() => setLevelFilter('all')}
          >
            ทั้งหมด ({LESSONS.length})
          </button>
          {LEVELS.map(lv => (
            <button
              key={lv.id}
              type="button"
              className={`tab ${levelFilter === lv.id ? 'is-active' : ''}`}
              onClick={() => setLevelFilter(lv.id)}
            >
              {lv.name}
            </button>
          ))}
        </div>

        <label className="search-input" aria-label="ค้นหาบทความ">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            placeholder="ค้นหาชื่อเรื่อง หรือหัวข้อ เช่น LLM, SQL, Git..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </label>
      </div>

      {filtered.length > 0 ? (
        <div className="cards">
          {filtered.map(lesson => (
            <LessonCard key={lesson.id} lesson={lesson} isDone={isDone(lesson.id)} />
          ))}
        </div>
      ) : (
        <div className="empty">ไม่พบบทความที่ตรงกับเงื่อนไขการค้นหา</div>
      )}
    </section>
  );
}

export default function ArticlesPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1>บทความทั้งหมด</h1>
          <p>
            รวมบทความและบทเรียนทั้ง 12 เรื่อง เรียงตามลำดับพื้นฐานไปจนถึงขั้นสูง สามารถค้นหาตามคำสำคัญหรือเลือกดูตามระดับความรู้ได้
          </p>
        </div>
      </section>
      <Suspense fallback={<div className="container" style={{ padding: '40px 24px' }}>กำลังโหลดบทความ...</div>}>
        <ArticlesContent />
      </Suspense>
    </>
  );
}

