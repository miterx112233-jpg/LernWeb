'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { LESSONS, LEVELS, LevelId } from '@/data/lessons';
import { COURSES } from '@/data/courses';
import { useProgress } from '@/context/ProgressContext';

const getRank = (pct: number) => {
  if (pct >= 100) return { title: '👑 Master Software Engineer', desc: 'ผู้พิชิตหลักสูตรสมบูรณ์แบบ', color: '#FBBF24' };
  if (pct >= 75) return { title: '🚀 Senior Architect in Training', desc: 'ระดับเชี่ยวชาญ ใกล้ครบทุกด่านแล้ว', color: '#C084FC' };
  if (pct >= 50) return { title: '⚡ Full-Stack Developer', desc: 'ระดับกลาง ลุยระบบหน้าบ้าน-หลังบ้าน', color: '#38BDF8' };
  if (pct >= 25) return { title: '🌱 Code Explorer', desc: 'ระดับเริ่มต้น รากฐานกำลังแน่นขึ้น', color: '#34D399' };
  return { title: '🔰 Tech Novice', desc: 'ผู้เริ่มต้น พร้อมลุยด่านแรก', color: '#94A3B8' };
};

export default function RoadmapPage() {
  const { user, isDone, isLessonUnlocked, getStats, showToast } = useProgress();
  const [filter, setFilter] = useState<'all' | LevelId>('all');

  useEffect(() => {
    const syncHash = () => {
      const h = window.location.hash.replace('#', '');
      if (LEVELS.some(lv => lv.id === h)) {
        setFilter(h as LevelId);
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
            <h1>หลักสูตร &amp; แผนผังการเรียน (Roadmap)</h1>
            <p>
              หลักสูตรพื้นฐาน Software Engineer ในยุค AI (12 บทเรียน) พร้อมแบบทดสอบท้ายบทและระบบบันทึกความก้าวหน้ารายบุคคล
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
                  กรุณาเข้าสู่ระบบก่อนเข้าใช้งานหลักสูตรและแผนผังการเรียน
                </h2>
                <p className="auth-card__sub" style={{ marginTop: 8, lineHeight: 1.75 }}>
                  หลักสูตรการเรียนพื้นฐาน Software Engineer (12 บทเรียน) และคลังข้อสอบท้ายบท 240 ข้อ
                  เปิดให้ใช้งานเฉพาะผู้ที่เข้าสู่ระบบ เพื่อให้ระบบบันทึกผลการสอบและความก้าวหน้าแยกตามบัญชีของคุณโดยอัตโนมัติ
                </p>
              </div>

              <div className="auth-summary-box" style={{ textAlign: 'left', marginBottom: 22 }}>
                <div style={{ fontWeight: 700, fontSize: 13.5, marginBottom: 8 }}>
                  สิ่งที่คุณจะได้รับเมื่อเข้าสู่ระบบ (ฟรี):
                </div>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.85 }}>
                  <li>📘 <strong>หลักสูตรเข้มข้น 12 บทเรียน:</strong> เรียงลำดับจาก Basic → Intermediate → Advanced</li>
                  <li>ทำแบบทดสอบท้ายบท (สุ่มจากคลัง 20 ข้อต่อบท) เพื่อปลดล็อกด่านและบันทึกสถานะเรียนจบ</li>
                  <li>ระบบ Gamification บันทึกคะแนน ฉายา และตราความสำเร็จส่วนบุคคล</li>
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

  const currentStats = getStats();
  const currentCourseInfo = COURSES[0];
  const visibleLevels = filter === 'all' ? LEVELS : LEVELS.filter(lv => lv.id === filter);
  const rank = getRank(currentStats.pct);

  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1>หลักสูตร &amp; แผนผังการเรียน (Roadmap)</h1>
          <p>
            เรียนรู้พื้นฐานวิศวกรรมซอฟต์แวร์ <strong>12 บทเรียน</strong> เรียงลำดับจากง่ายไปยาก —
            เพียงทำแบบทดสอบท้ายบทให้ได้คะแนน <strong>80% ขึ้นไป (อย่างน้อย 8/10 ข้อ)</strong> เพื่อปลดล็อกบทถัดไป
          </p>

          {/* การ์ดสถานะ Gamification Player Status & Quest Tracker */}
          <div className="quest-status-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 14,
                  background: 'var(--brand-soft)',
                  border: '1.5px solid var(--brand)',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: 24,
                  boxShadow: '0 0 16px var(--brand-glow)',
                  flexShrink: 0
                }}
              >
                🎮
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span className="quest-rank-badge" style={{ color: rank.color, borderColor: `${rank.color}55` }}>
                    {rank.title}
                  </span>
                  <span style={{ fontSize: 13, color: 'var(--text2)' }}>
                    • {rank.desc}
                  </span>
                </div>
                <div style={{ fontSize: 13.5, color: 'var(--text2)', marginTop: 4 }}>
                  ภารกิจหลัก: พิชิต {currentCourseInfo.name} ({currentStats.done}/{currentStats.total} ด่านสำเร็จ)
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 220, flex: 1, maxWidth: 360 }}>
              <div style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                  <span className="text2">EXP ความสำเร็จ ({currentStats.done}/{currentStats.total} ด่าน)</span>
                  <strong style={{ color: rank.color }}>{currentStats.pct}%</strong>
                </div>
                <div className="progress" style={{ height: 8 }}>
                  <div className="progress__bar" style={{ width: `${currentStats.pct}%`, background: rank.color }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container" style={{ paddingTop: 28, paddingBottom: 64 }}>
        <div className="tabs" role="tablist">
          <button
            type="button"
            className={`tab ${filter === 'all' ? 'is-active' : ''}`}
            onClick={() => {
              setFilter('all');
              window.history.replaceState(null, '', '#');
            }}
          >
            ทั้งหมด (12 บท)
          </button>
          {LEVELS.map(lv => (
            <button
              key={lv.id}
              type="button"
              className={`tab ${filter === lv.id ? 'is-active' : ''}`}
              onClick={() => {
                setFilter(lv.id);
                window.history.replaceState(null, '', `#${lv.id}`);
              }}
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
                  const unlocked = isLessonUnlocked(lesson.id);
                  const prevLesson = LESSONS.find(l => l.no === lesson.no - 1);

                  return (
                    <div
                      key={lesson.id}
                      className={`step ${done ? 'is-done' : unlocked ? 'is-current' : 'is-locked'}`}
                    >
                      <span className="step__dot">
                        {done ? '✓' : unlocked ? String(lesson.no).padStart(2, '0') : '🔒'}
                      </span>
                      <div className="step__card">
                        <div>
                          <div className="step__meta">
                            <span>บทที่ {lesson.no}</span>
                            <span>·</span>
                            <span>{lesson.category}</span>
                            <span>·</span>
                            <span>อ่าน {lesson.minutes} นาที</span>
                            {done && (
                              <span className="quest-badge-done">
                                ✓ พิชิตด่านนี้แล้ว
                              </span>
                            )}
                            {unlocked && !done && (
                              <span className="quest-badge-current">
                                <span className="quest-pulse-dot" />
                                ภารกิจปัจจุบัน (Active Quest)
                              </span>
                            )}
                            {!unlocked && (
                              <>
                                <span>·</span>
                                <span style={{ color: 'var(--adv)', fontWeight: 600 }}>
                                  🔒 ล็อกตามลำดับ
                                </span>
                              </>
                            )}
                          </div>
                          <h3 className="step__title">
                            {unlocked ? (
                              <Link href={`/lesson/${lesson.id}`}>{lesson.title}</Link>
                            ) : (
                              <button
                                type="button"
                                className="step__locked-title"
                                onClick={() =>
                                  showToast(
                                    `🔒 กรุณาเรียนและสอบผ่านบทที่ ${lesson.no - 1} ให้ได้คะแนน 80% ขึ้นไปก่อนครับ`
                                  )
                                }
                              >
                                {lesson.title}
                              </button>
                            )}
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
                            {done
                              ? '✓ ผ่านแล้ว (สอบได้ ≥ 80%)'
                              : unlocked
                              ? '● สอบท้ายบทให้ได้ ≥ 80% (8/10 ข้อ) เพื่อผ่าน'
                              : `🔒 ต้องผ่านบทที่ ${prevLesson?.no || lesson.no - 1} (≥ 80%) ก่อน`}
                          </span>
                          {unlocked ? (
                            <Link
                              className={`btn ${done ? 'btn--outline' : 'btn--primary'}`}
                              href={`/lesson/${lesson.id}`}
                            >
                              {done ? 'ทบทวนเนื้อหา' : 'เริ่มเรียนบทนี้ →'}
                            </Link>
                          ) : (
                            <button
                              type="button"
                              className="btn btn--outline"
                              style={{ opacity: 0.65 }}
                              onClick={() =>
                                showToast(
                                  `🔒 ต้องเรียนและสอบผ่านบทที่ ${lesson.no - 1} (คะแนน ≥ 80%) ก่อนจึงจะเข้าบทที่ ${lesson.no} ได้`
                                )
                              }
                            >
                              🔒 ยังไม่ปลดล็อก
                            </button>
                          )}
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
