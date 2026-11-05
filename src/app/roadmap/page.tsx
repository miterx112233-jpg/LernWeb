'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { LESSONS, LEVELS, LevelId } from '@/data/lessons';
import { useProgress } from '@/context/ProgressContext';

export default function RoadmapPage() {
  const { user, isDone, getStats } = useProgress();
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

  // ล็อกแผนผังการเรียน: ต้องเข้าสู่ระบบก่อนจึงจะเข้าถึง Roadmap ได้
  if (!user) {
    return (
      <>
        <section className="page-head">
          <div className="container">
            <h1>Roadmap การเรียน</h1>
            <p>
              แผนผังการเรียน 12 บทเรียนหลัก (Basic → Intermediate → Advanced) พร้อมระบบทำแบบทดสอบท้ายบทและบันทึกความก้าวหน้ารายบุคคล
            </p>
          </div>
        </section>

        <section className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>
          <div className="auth-minimal">
            <div className="auth-card auth-card--minimal" style={{ textAlign: 'center' }}>
              <div className="auth-brand" style={{ marginBottom: 18 }}>
                <div className="auth-brand__icon" aria-hidden="true">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <rect x="4" y="11" width="16" height="10" rx="2" />
                    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                  </svg>
                </div>
                <span className="tag tag--intermediate" style={{ marginBottom: 10 }}>
                  🔒 เฉพาะสมาชิกที่เข้าสู่ระบบ
                </span>
                <h2 className="auth-card__title">
                  กรุณาเข้าสู่ระบบก่อนเข้าใช้งานแผนผังการเรียน
                </h2>
                <p className="auth-card__sub" style={{ marginTop: 8, lineHeight: 1.75 }}>
                  แผนผังการเรียนทั้ง 3 ระดับ (12 บทเรียน) และคลังข้อสอบท้ายบท 240 ข้อ
                  เปิดให้ใช้งานเฉพาะผู้ที่เข้าสู่ระบบ เพื่อให้ระบบบันทึกผลการสอบและความก้าวหน้าแยกตามบัญชีของคุณโดยอัตโนมัติ
                </p>
              </div>

              <div className="auth-summary-box" style={{ textAlign: 'left', marginBottom: 22 }}>
                <div style={{ fontWeight: 700, fontSize: 13.5, marginBottom: 8 }}>
                  สิ่งที่คุณจะได้รับเมื่อเข้าสู่ระบบ (ฟรี):
                </div>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.85 }}>
                  <li>ปลดล็อกแผนผังการเรียนครบทั้ง 3 ระดับ: <strong>Basic · Intermediate · Advanced</strong></li>
                  <li>เข้าเรียนเนื้อหาเจาะลึกทั้ง 12 บท พร้อมวิดีโอประกอบและคลังคำศัพท์อัตโนมัติ</li>
                  <li>ทำแบบทดสอบท้ายบท (สุ่มจากคลัง 20 ข้อต่อบท) เพื่อบันทึกสถานะเรียนจบ</li>
                </ul>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <Link className="btn btn--primary auth-submit-btn" href="/login">
                  เข้าสู่ระบบ / สมัครสมาชิกฟรี →
                </Link>
                <Link className="btn btn--outline" style={{ justifyContent: 'center' }} href="/articles">
                  อ่านบทความทั่วไป (ไม่ต้องล็อกอิน)
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

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

