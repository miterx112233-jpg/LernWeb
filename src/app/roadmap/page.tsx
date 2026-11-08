'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CourseId, LESSONS, LEVELS, LevelId } from '@/data/lessons';
import { COURSES, getCourseLessons } from '@/data/courses';
import { useProgress } from '@/context/ProgressContext';

export default function RoadmapPage() {
  const { user, isDone, isLessonUnlocked, getStats, getCourseStats, showToast } = useProgress();
  const [activeCourse, setActiveCourse] = useState<CourseId>('core');
  const [filter, setFilter] = useState<'all' | LevelId>('all');

  useEffect(() => {
    const syncHash = () => {
      const h = window.location.hash.replace('#', '');
      if (h === 'ai-future') {
        setActiveCourse('ai-future');
      } else if (h === 'core') {
        setActiveCourse('core');
      } else if (LEVELS.some(lv => lv.id === h)) {
        setActiveCourse('core');
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
              ครบทั้ง <strong>2 หลักสูตรหลัก</strong>: พื้นฐาน Software Engineer (12 บท) และ AI Coding &amp; Future Tech (4 บท) พร้อมแบบทดสอบท้ายบทและระบบบันทึกความก้าวหน้ารายบุคคล
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
                  หลักสูตรการเรียนทั้งหมด (รวม 16 บทเรียน) และคลังข้อสอบท้ายบท 320 ข้อ
                  เปิดให้ใช้งานเฉพาะผู้ที่เข้าสู่ระบบ เพื่อให้ระบบบันทึกผลการสอบและความก้าวหน้าแยกตามบัญชีของคุณโดยอัตโนมัติ
                </p>
              </div>

              <div className="auth-summary-box" style={{ textAlign: 'left', marginBottom: 22 }}>
                <div style={{ fontWeight: 700, fontSize: 13.5, marginBottom: 8 }}>
                  สิ่งที่คุณจะได้รับเมื่อเข้าสู่ระบบ (ฟรี):
                </div>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.85 }}>
                  <li>📘 <strong>หลักสูตรที่ 1:</strong> พื้นฐาน Software Engineer ในยุค AI (12 บท · Basic → Intermediate → Advanced)</li>
                  <li>🚀 <strong>หลักสูตรที่ 2 (ใหม่):</strong> AI Coding &amp; Future Tech — เมื่อภาษามนุษย์กลายเป็นภาษาโปรแกรม (4 บท · เรียนได้ทันที)</li>
                  <li>ทำแบบทดสอบท้ายบท (สุ่มจากคลัง 20 ข้อต่อบท) เพื่อปลดล็อกด่านและบันทึกสถานะเรียนจบ</li>
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

  const currentStats = getCourseStats(activeCourse);
  const currentCourseInfo = COURSES.find(c => c.id === activeCourse) || COURSES[0];
  const visibleLevels = filter === 'all' ? LEVELS : LEVELS.filter(lv => lv.id === filter);
  const aiFutureLessons = getCourseLessons('ai-future');

  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1>หลักสูตร &amp; แผนผังการเรียน (Roadmap)</h1>
          <p>
            เลือกเรียนได้ทั้ง <strong>2 หลักสูตร</strong> โดยแต่ละหลักสูตรปลดล็อกบทเรียนแยกกันอย่างอิสระ —
            เพียงทำแบบทดสอบท้ายบทให้ได้คะแนน <strong>80% ขึ้นไป (อย่างน้อย 8/10 ข้อ)</strong> เพื่อปลดล็อกบทถัดไปในหลักสูตรนั้น
          </p>

          {/* แถบการ์ดเลือกหลักสูตร (Course Switcher) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 14,
              marginTop: 22
            }}
          >
            {COURSES.map(course => {
              const st = getCourseStats(course.id);
              const isSelected = activeCourse === course.id;
              return (
                <button
                  key={course.id}
                  type="button"
                  onClick={() => {
                    setActiveCourse(course.id);
                    window.history.replaceState(null, '', course.id === 'ai-future' ? '#ai-future' : '#core');
                  }}
                  style={{
                    textAlign: 'left',
                    padding: '18px 20px',
                    borderRadius: 14,
                    border: isSelected ? '2px solid var(--brand)' : '1.5px solid var(--border)',
                    background: isSelected ? 'var(--brand-soft)' : 'var(--surface)',
                    cursor: 'pointer',
                    transition: 'all 0.18s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: 10
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <span
                        className={`tag ${course.id === 'ai-future' ? 'tag--advanced' : 'tag--basic'}`}
                        style={{ fontSize: 12 }}
                      >
                        {course.icon} หลักสูตรที่ {course.no} {course.id === 'ai-future' ? '· ใหม่!' : ''}
                      </span>
                      <span style={{ fontSize: 12.5, fontWeight: 700, color: isSelected ? 'var(--brand)' : 'var(--text2)' }}>
                        {isSelected ? '● กำลังแสดงหลักสูตรนี้' : 'คลิกเพื่อสลับหลักสูตร →'}
                      </span>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 16.5, color: 'var(--text)', lineHeight: 1.4 }}>
                      หลักสูตรที่ {course.no}: {course.name}
                    </div>
                    <p style={{ margin: '6px 0 0', fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.6 }}>
                      {course.desc}
                    </p>
                  </div>

                  <div style={{ marginTop: 4 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, marginBottom: 5 }}>
                      <span className="text2">ความคืบหน้าหลักสูตรที่ {course.no}</span>
                      <strong style={{ color: 'var(--text)' }}>
                        {st.done}/{st.total} บท ({st.pct}%)
                      </strong>
                    </div>
                    <div className="progress" style={{ height: 7 }}>
                      <div className="progress__bar" style={{ width: `${st.pct}%` }} />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="roadmap-summary" style={{ marginTop: 18 }}>
            <div className="progress">
              <div className="progress__bar" style={{ width: `${currentStats.pct}%` }} />
            </div>
            <span className="text2">
              {currentCourseInfo.icon} หลักสูตรที่ {currentCourseInfo.no}: เรียนจบแล้ว {currentStats.done} / {currentStats.total} บท ({currentStats.pct}%)
            </span>
          </div>
        </div>
      </section>

      <section className="container" style={{ paddingTop: 28, paddingBottom: 64 }}>
        {activeCourse === 'core' ? (
          <>
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
          </>
        ) : (
          <section className="stage" id="ai-future" style={{ paddingTop: 12 }}>
            <div className="stage__head">
              <span className="stage__label c-advanced">หลักสูตรที่ 2 · VIBE CODING &amp; AI CODING</span>
              <h2 className="stage__title">หลักสูตรที่ 2: Vibe Coding &amp; การปรับตัวในโลก AI Coding (4 บท)</h2>
              <span className="muted" style={{ fontSize: 14 }}>
                {currentStats.done}/{currentStats.total} บท
              </span>
              <p className="stage__desc">
                เรียนรู้ตั้งแต่แนวคิด Vibe Coding, ทักษะการคิดและเขียน Requirement ที่ AI แทนไม่ได้, ความปลอดภัยของโค้ดที่สร้างด้วย AI ไปจนถึง 7 อาชีพเทคโนโลยีแห่งอนาคตและการเตรียมตัวตามช่วงวัย (เริ่มเรียนบทที่ 1 ได้ทันทีโดยไม่ต้องรอจบหลักสูตรแรก)
              </p>
            </div>

            <div className="steps">
              {aiFutureLessons.map(lesson => {
                const done = isDone(lesson.id);
                const unlocked = isLessonUnlocked(lesson.id);
                const prevLesson = aiFutureLessons.find(l => l.no === lesson.no - 1);

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
                          <span>หลักสูตรที่ 2 · บทที่ {lesson.no}</span>
                          <span>·</span>
                          <span>{lesson.category}</span>
                          <span>·</span>
                          <span>อ่าน {lesson.minutes} นาที</span>
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
                                  `🔒 กรุณาเรียนและสอบผ่านบทที่ ${lesson.no - 1} ของหลักสูตรที่ 2 ให้ได้คะแนน 80% ขึ้นไปก่อนครับ`
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
        )}
      </section>
    </>
  );
}
