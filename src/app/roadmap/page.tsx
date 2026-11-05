'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { LESSONS, LEVELS, LevelId } from '@/data/lessons';
import { useProgress } from '@/context/ProgressContext';

export default function RoadmapPage() {
  const { isDone, toggleDone, getStats, showToast } = useProgress();
  const [filter, setFilter] = useState<'all' | LevelId>('all');

  useEffect(() => {
    const syncHash = () => {
      const h = window.location.hash.replace('#', '') as LevelId;
      if (LEVELS.some(lv => lv.id === h)) {
        setFilter(h);
      }
    };
    syncHash();
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, []);

  const totalStats = getStats();
  const visibleLevels = filter === 'all' ? LEVELS : LEVELS.filter(lv => lv.id === filter);

  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1>Roadmap การเรียน</h1>
          <p>
            เรียงลำดับจากพื้นฐาน (Basic) ไปสู่การพัฒนาระบบ (Intermediate) และงานระดับสูง (Advanced)
            แต่ละบทต่อยอดจากบทก่อนหน้า สามารถกดทำเครื่องหมายบทที่เรียนจบแล้วได้ทันที
          </p>
          <div className="roadmap-summary">
            <div className="progress">
              <div className="progress__bar" style={{ width: `${totalStats.pct}%` }} />
            </div>
            <span className="text2">
              เรียนจบแล้ว {totalStats.done} / {totalStats.total} บท ({totalStats.pct}%)
            </span>
          </div>
        </div>
      </section>

      <section className="container" style={{ paddingTop: 28, paddingBottom: 64 }}>
        <div className="tabs" role="tablist">
          <button
            type="button"
            className={`tab ${filter === 'all' ? 'is-active' : ''}`}
            onClick={() => setFilter('all')}
          >
            ทั้งหมด (12 บท)
          </button>
          {LEVELS.map(lv => (
            <button
              key={lv.id}
              type="button"
              className={`tab ${filter === lv.id ? 'is-active' : ''}`}
              onClick={() => setFilter(lv.id)}
            >
              {lv.name} · {lv.title}
            </button>
          ))}
        </div>

        {visibleLevels.map(lv => {
          const levelStats = getStats(lv.id);
          const lessons = LESSONS.filter(l => l.level === lv.id);
          return (
            <section key={lv.id} className="stage" id={lv.id}>
              <div className="stage__head">
                <span className={`stage__label c-${lv.id}`}>{lv.label}</span>
                <h2 className="stage__title">{lv.title}</h2>
                <span className="muted" style={{ fontSize: 14 }}>
                  {levelStats.done}/{levelStats.total} บท
                </span>
                <p className="stage__desc">{lv.desc}</p>
              </div>

              <div className="steps">
                {lessons.map(lesson => {
                  const done = isDone(lesson.id);
                  return (
                    <div key={lesson.id} className={`step ${done ? 'is-done' : ''}`}>
                      <span className="step__dot">
                        {done ? '✓' : String(lesson.no).padStart(2, '0')}
                      </span>
                      <div className="step__card">
                        <div>
                          <div className="step__meta">
                            <span>บทที่ {lesson.no}</span>
                            <span>·</span>
                            <span>{lesson.category}</span>
                            <span>·</span>
                            <span>อ่าน {lesson.minutes} นาที</span>
                          </div>
                          <h3 className="step__title">
                            <Link href={`/lesson/${lesson.id}`}>{lesson.title}</Link>
                          </h3>
                          <p className="step__why">
                            <strong>ทำไมต้องรู้:</strong> {lesson.why}
                          </p>
                          <div className="step__topics">
                            {lesson.topics.map(topic => (
                              <span key={topic}>{topic}</span>
                            ))}
                          </div>
                        </div>

                        <div className="step__side">
                          <span className={`status ${done ? 'is-done' : ''}`}>
                            {done ? '✓ เรียนจบแล้ว (ครบ 10 ข้อ)' : '○ ทำแบบทดสอบท้ายบทเพื่อผ่าน'}
                          </span>
                          <Link
                            className={`btn ${done ? 'btn--outline' : 'btn--primary'}`}
                            href={`/lesson/${lesson.id}`}
                          >
                            {done ? 'ทบทวนเนื้อหา' : 'เริ่มเรียน'}
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </section>
    </>
  );
}

