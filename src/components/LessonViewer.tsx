'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { LEVELS, LESSON_VIDEOS, Lesson, QuizItem } from '@/data/lessons';
import { getCourseInfo, getCourseLessons, getLessonCourseId } from '@/data/courses';
import { buildExamQuestions } from '@/data/quizPool';
import { enrichHtmlWithGlossary } from '@/data/glossary';
import { useProgress } from '@/context/ProgressContext';
import { LessonBanner } from '@/components/LessonBanner';
import { fireNeonConfetti } from '@/lib/confetti';

interface LessonViewerProps {
  lesson: Lesson;
}

/**
 * แปลงลิงก์ YouTube ทุกรูปแบบ (watch?v=..., youtu.be/..., shorts/..., embed/...)
 * ให้เป็นรหัส Video ID อัตโนมัติ
 */
function extractYouTubeId(rawUrl: string): string | null {
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  const match = trimmed.match(
    /(?:youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

export default function LessonViewer({ lesson }: LessonViewerProps) {
  const { user, isDone, isLessonUnlocked, toggleDone, recordLastLesson, getCourseStats, showToast } = useProgress();
  const [activeId, setActiveId] = useState<string>(lesson.sections[0]?.id || '');
  const [examQuestions, setExamQuestions] = useState<QuizItem[]>(() => lesson.quiz || []);
  const [examSetLabel, setExamSetLabel] = useState<string>('ชุดที่ 1 (มาตรฐาน)');
  const [examAttempt, setExamAttempt] = useState<number>(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [currentQuizIdx, setCurrentQuizIdx] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showQuizSummary, setShowQuizSummary] = useState<boolean>(false);
  const [showCelebrationModal, setShowCelebrationModal] = useState<boolean>(false);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'wrong' | 'correct'>('all');
  const [activeVideoIdx, setActiveVideoIdx] = useState<number>(0);

  const courseId = getLessonCourseId(lesson);
  const courseInfo = getCourseInfo(courseId);
  const courseLessons = getCourseLessons(courseId);
  const roadmapHref = courseId === 'ai-future' ? '/roadmap#ai-future' : '/roadmap';

  const lv = LEVELS.find(item => item.id === lesson.level);
  const done = isDone(lesson.id);
  const stats = getCourseStats(courseId);

  const videoList = (lesson.videos || LESSON_VIDEOS[lesson.id] || []).filter(v =>
    Boolean(extractYouTubeId(v.url))
  );
  const currentVideo = videoList[activeVideoIdx] || videoList[0];
  const currentYoutubeId = currentVideo ? extractYouTubeId(currentVideo.url) : null;

  const prevLesson = courseLessons.find(l => l.no === lesson.no - 1);
  const nextLesson = courseLessons.find(l => l.no === lesson.no + 1);

  const totalQ = examQuestions?.length || 0;
  const correctCount = examQuestions.reduce((acc, item, idx) => {
    return acc + (quizAnswers[idx] === item.answer ? 1 : 0);
  }, 0);
  const scorePct = totalQ > 0 ? Math.round((correctCount / totalQ) * 100) : 0;

  // Scroll-Spy สำหรับกล่องสารบัญ (Sticky TOC ด้านขวาตามต้นแบบ 9Expert)
  useEffect(() => {
    const ids: string[] = [];
    lesson.sections.forEach(sec => {
      ids.push(sec.id);
      sec.sub?.forEach(s => ids.push(s.id));
    });
    if (videoList.length > 0) {
      ids.push('lesson-video');
    }
    if (lesson.quiz && lesson.quiz.length > 0) {
      ids.push('lesson-quiz');
    }

    const onScroll = () => {
      const offset = 120;
      let current = ids[0] || '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset) {
            current = id;
          }
        }
      }
      setActiveId(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lesson, videoList.length]);

  useEffect(() => {
    const initial = buildExamQuestions(lesson, 0, []);
    setExamQuestions(initial.questions);
    setExamSetLabel(initial.setLabel);
    setExamAttempt(0);
    setQuizAnswers({});
    setCurrentQuizIdx(0);
    setIsSubmitted(false);
    setShowQuizSummary(false);
    setReviewFilter('all');
    setActiveVideoIdx(0);
    if (user && isLessonUnlocked(lesson.id)) {
      recordLastLesson(lesson.id);
    }
  }, [lesson.id, user]);

  // ล็อกเนื้อหาบทเรียนในแผนการเรียน: ต้องเข้าสู่ระบบก่อนจึงจะเข้าเรียนและทำข้อสอบได้
  if (!user) {
    return (
      <div className="container lesson">
        <Link className="breadcrumb" href="/">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="m15 18-6-6 6-6" />
          </svg>
          กลับไปยังหน้าแรก
        </Link>

        <div className="auth-minimal" style={{ margin: '28px auto 64px' }}>
          <div className="auth-card auth-card--minimal" style={{ textAlign: 'center' }}>
            <div className="auth-brand" style={{ marginBottom: 18 }}>
              <div className="auth-brand__icon" aria-hidden="true">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <rect x="4" y="11" width="16" height="10" rx="2" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                </svg>
              </div>
              <span className={`tag tag--${lesson.level}`} style={{ marginBottom: 10 }}>
                🔒 บทที่ {String(lesson.no).padStart(2, '0')} · ระดับ {lv?.name}
              </span>
              <h1 className="auth-card__title" style={{ fontSize: '1.3rem' }}>
                {lesson.title}
              </h1>
              <p className="auth-card__sub" style={{ marginTop: 10, lineHeight: 1.75 }}>
                บทเรียนในแผนผังการเรียน (Roadmap) และระบบแบบทดสอบท้ายบทเปิดให้เฉพาะสมาชิกที่เข้าสู่ระบบ
                กรุณาเข้าสู่ระบบหรือสมัครสมาชิกฟรีก่อนเริ่มเรียนบทนี้
              </p>
            </div>

            <div className="auth-summary-box" style={{ textAlign: 'left', marginBottom: 22 }}>
              <div style={{ fontWeight: 700, fontSize: 13.5, marginBottom: 6 }}>
                ทำไมต้องเรียนบทนี้:
              </div>
              <p style={{ margin: 0, fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.75 }}>
                {lesson.why}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Link className="btn btn--primary auth-submit-btn" href="/login">
                เข้าสู่ระบบ / สมัครสมาชิกเพื่อเข้าเรียน →
              </Link>
              <Link className="btn btn--outline" style={{ justifyContent: 'center' }} href="/articles">
                อ่านบทความทั่วไป (ไม่ต้องล็อกอิน)
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ล็อกตามลำดับการเรียน: ต้องสอบผ่านบทก่อนหน้าให้ได้คะแนน >= 80% จึงจะเข้าเรียนบทนี้ได้
  if (!isLessonUnlocked(lesson.id)) {
    const requiredLesson = courseLessons.find(l => !isDone(l.id)) || courseLessons[0];
    return (
      <div className="container lesson">
        <Link className="breadcrumb" href={roadmapHref}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="m15 18-6-6 6-6" />
          </svg>
          กลับไปยังแผนผังหลักสูตร ({courseInfo.shortName})
        </Link>

        <div className="auth-minimal" style={{ margin: '28px auto 64px' }}>
          <div className="auth-card auth-card--minimal" style={{ textAlign: 'center' }}>
            <div className="auth-brand" style={{ marginBottom: 18 }}>
              <div className="auth-brand__icon" aria-hidden="true">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <rect x="4" y="11" width="16" height="10" rx="2" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                </svg>
              </div>
              <span className="tag tag--advanced" style={{ marginBottom: 10 }}>
                🔒 ล็อกตามลำดับการเรียน · หลักสูตรที่ {courseInfo.no} บทที่ {String(lesson.no).padStart(2, '0')}
              </span>
              <h1 className="auth-card__title" style={{ fontSize: '1.3rem' }}>
                {lesson.title}
              </h1>
              <p className="auth-card__sub" style={{ marginTop: 10, lineHeight: 1.75 }}>
                เพื่อปูพื้นฐานอย่างเป็นลำดับขั้นตอนในหลักสูตร <strong>{courseInfo.name}</strong> คุณต้องเรียนและทำแบบทดสอบท้ายบทของ{' '}
                <strong>
                  บทที่ {requiredLesson.no}: {requiredLesson.title}
                </strong>{' '}
                ให้ได้คะแนนอย่างน้อย <strong>80% (8/10 ข้อขึ้นไป)</strong> ก่อน จึงจะปลดล็อกบทเรียนนี้ได้
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Link
                className="btn btn--primary auth-submit-btn"
                href={`/lesson/${requiredLesson.id}`}
              >
                ไปเรียนบทที่ {String(requiredLesson.no).padStart(2, '0')}: {requiredLesson.keyword} →
              </Link>
              <Link className="btn btn--outline" style={{ justifyContent: 'center' }} href={roadmapHref}>
                ดูลำดับบทเรียนในหลักสูตร
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderTocList = () => (
    <ul className="toc__list">
      {lesson.sections.map(sec => (
        <li key={sec.id}>
          <a
            href={`#${sec.id}`}
            className={activeId === sec.id ? 'is-active' : ''}
          >
            {sec.h}
          </a>
          {sec.sub && sec.sub.length > 0 && (
            <ul className="sub">
              {sec.sub.map(s => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={activeId === s.id ? 'is-active' : ''}
                  >
                    {s.h}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
      {videoList.length > 0 && (
        <li>
          <a
            href="#lesson-video"
            className={activeId === 'lesson-video' ? 'is-active' : ''}
          >
            วิดีโอประกอบการเรียน ({videoList.length} คลิป)
          </a>
        </li>
      )}
      {lesson.quiz && lesson.quiz.length > 0 && (
        <li>
          <a
            href="#lesson-quiz"
            className={activeId === 'lesson-quiz' ? 'is-active' : ''}
          >
            แบบทดสอบท้ายบท ({lesson.quiz.length} ข้อ)
          </a>
        </li>
      )}
    </ul>
  );

  return (
    <div className="container lesson">
      {/* ลิงก์ย้อนกลับด้านบนสุด */}
      <Link className="breadcrumb" href={roadmapHref}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="m15 18-6-6 6-6" />
        </svg>
        กลับไปยัง {courseInfo.icon} หลักสูตรที่ {courseInfo.no}: {courseInfo.shortName}
      </Link>

      {/* โครงสร้าง 2 คอลัมน์: เนื้อหาหลักซ้าย + สารบัญเกาะติดหน้าจอด้านขวา */}
      <div className="lesson__layout">
        <article>
          {/* แบนเนอร์หัวข้อบทเรียนสไตล์ 9Expert */}
          <LessonBanner lesson={lesson} />

          <p className="lesson__caption">บทความโดย: LernDev Team · หลักสูตรที่ {courseInfo.no}</p>

          <h1 className="lesson__title">{lesson.title}</h1>

          <div className="lesson__info">
            <span className={`tag tag--${lesson.level}`}>{lv?.name}</span>
            <span>บทที่ {lesson.no} จาก {courseLessons.length}</span>
            <span>·</span>
            <span>หมวด {lesson.category}</span>
            <span>·</span>
            <span>เวลาอ่านประมาณ {lesson.minutes} นาที</span>
            {done && (
              <>
                <span>·</span>
                <span style={{ color: 'var(--basic)', fontWeight: 600 }}>✓ เรียนจบแล้ว</span>
              </>
            )}
          </div>

          {/* สารบัญแบบพับได้สำหรับหน้าจอมือถือ */}
          <details className="toc-mobile">
            <summary>สารบัญบทเรียน</summary>
            {renderTocList()}
          </details>

          {/* เนื้อหาบทเรียน (พร้อมลิงก์คำศัพท์เทคนิคอัตโนมัติไปยังคลังคำศัพท์) */}
          <div className="prose">
            {lesson.sections.map(sec => {
              const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
              const processLessonHtml = (rawHtml: string) => {
                let html = rawHtml;
                if (basePath) {
                  html = html
                    .replace(/href="\/lesson\//g, `href="${basePath}/lesson/`)
                    .replace(/href="\/articles\//g, `href="${basePath}/articles/`)
                    .replace(/href="\/roadmap/g, `href="${basePath}/roadmap`);
                }
                return enrichHtmlWithGlossary(html);
              };
              return (
                <section key={sec.id}>
                  <h2 id={sec.id}>{sec.h}</h2>
                  <div dangerouslySetInnerHTML={{ __html: processLessonHtml(sec.html) }} />
                  {sec.sub?.map(s => (
                    <div key={s.id}>
                      <h3 id={s.id}>{s.h}</h3>
                      <div dangerouslySetInnerHTML={{ __html: processLessonHtml(s.html) }} />
                    </div>
                  ))}
                </section>
              );
            })}

            {/* วิดีโอประกอบจาก YouTube (รองรับหลายคลิปแบบ Playlist) */}
            {currentYoutubeId && currentVideo && (
              <section>
                <h2 id="lesson-video">
                  วิดีโอประกอบความเข้าใจ ({videoList.length} คลิป)
                </h2>
                <div className="video-box">
                  <div className="video-frame">
                    <iframe
                      key={currentYoutubeId}
                      src={`https://www.youtube-nocookie.com/embed/${currentYoutubeId}`}
                      title={currentVideo.title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="video-meta">
                    <div>
                      <div className="video-meta__title">
                        คลิปที่ {activeVideoIdx + 1}: {currentVideo.title}
                      </div>
                      {(currentVideo.channel || currentVideo.duration) && (
                        <div className="video-meta__sub">
                          {currentVideo.channel && <span>ช่อง: {currentVideo.channel}</span>}
                          {currentVideo.duration && <span> · ความยาว {currentVideo.duration}</span>}
                        </div>
                      )}
                    </div>
                    <a
                      href={`https://www.youtube.com/watch?v=${currentYoutubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--outline"
                      style={{ fontSize: 13.5, padding: '6px 12px', textDecoration: 'none' }}
                    >
                      ดูบน YouTube ↗
                    </a>
                  </div>

                  {/* รายการเลือกคลิป (แสดงเมื่อมีมากกว่า 1 คลิปในบทเรียนนั้น) */}
                  {videoList.length > 1 && (
                    <div className="video-playlist" role="listbox" aria-label="รายการคลิปวิดีโอในบทเรียนนี้">
                      {videoList.map((vid, idx) => {
                        const isPlaying = idx === activeVideoIdx;
                        return (
                          <button
                            key={`${vid.url}-${idx}`}
                            type="button"
                            className={`video-playlist__item ${isPlaying ? 'is-active' : ''}`}
                            onClick={() => setActiveVideoIdx(idx)}
                          >
                            <span className="video-playlist__num">
                              {isPlaying ? '▶' : String(idx + 1).padStart(2, '0')}
                            </span>
                            <span className="video-playlist__title">{vid.title}</span>
                            {isPlaying && (
                              <span className="video-playlist__badge">กำลังเลือก</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>

          {/* แบบทดสอบท้ายบท (Exam Mode: ตอบทีละข้อ ย้อนแก้ข้อเก่าได้ ส่งตรวจและเฉลยตอนท้าย + สุ่มชุดข้อสอบใหม่ได้) */}
          {examQuestions && examQuestions.length > 0 && (() => {
            const answeredCount = Object.keys(quizAnswers).length;
            const allAnswered = answeredCount === totalQ;
            const wrongCount = totalQ - correctCount;
            const activeItem = examQuestions[currentQuizIdx] || examQuestions[0];
            const chosen = quizAnswers[currentQuizIdx];
            const answered = chosen !== undefined;
            const isCorrect = chosen === activeItem.answer;

            // หาข้อไกลสุดที่เปิดให้กดเข้าไปทำได้ (ต้องตอบข้อก่อนหน้าก่อนจึงจะไปข้อถัดไปได้ แต่ย้อนกลับไปข้อเก่าได้เสมอ)
            let maxUnlockedIdx = 0;
            for (let i = 0; i < totalQ; i++) {
              if (quizAnswers[i] !== undefined) {
                maxUnlockedIdx = Math.min(totalQ - 1, i + 1);
              } else {
                maxUnlockedIdx = i;
                break;
              }
            }

            const startNewExamSet = () => {
              const nextAttempt = examAttempt + 1;
              const prevQs = examQuestions.map(q => q.q);
              const nextExam = buildExamQuestions(lesson, nextAttempt, prevQs);
              setExamQuestions(nextExam.questions);
              setExamSetLabel(nextExam.setLabel);
              setExamAttempt(nextAttempt);
              setQuizAnswers({});
              setCurrentQuizIdx(0);
              setIsSubmitted(false);
              setShowQuizSummary(false);
              setReviewFilter('all');
              showToast(`สุ่มข้อสอบชุดใหม่ (${nextExam.setLabel}) เรียบร้อยแล้ว`);
            };

            const handleSubmitExam = () => {
              if (!allAnswered) {
                showToast(`กรุณาตอบคำถามให้ครบทั้ง ${totalQ} ข้อก่อนส่งข้อสอบ`);
                return;
              }
              setIsSubmitted(true);
              setShowQuizSummary(true);
              setReviewFilter('all');
              const passed = scorePct >= 80;
              if (passed) {
                if (!done) {
                  toggleDone(lesson.id);
                }
                fireNeonConfetti({ count: 160, originY: 0.55 });
                setShowCelebrationModal(true);
                showToast(
                  `🎉 ยอดเยี่ยม! คุณได้ ${correctCount}/${totalQ} คะแนน (${scorePct}% ≥ 80%) ผ่านบทที่ ${lesson.no} และปลดล็อกบทถัดไปเรียบร้อยแล้ว`
                );
              } else {
                showToast(
                  `ได้ ${correctCount}/${totalQ} คะแนน (${scorePct}%) — ต้องได้ 80% ขึ้นไป (อย่างน้อย 8 ข้อ) เพื่อปลดล็อกบทถัดไป`
                );
              }
            };

            return (
              <section id="lesson-quiz" className="quiz-card" aria-label="คำถามทบทวนความเข้าใจ">
                {/* ส่วนหัวของการ์ดแบบทดสอบ */}
                <div className="quiz-card__head">
                  <div>
                    <h2 className="quiz-card__title">แบบทดสอบท้ายบทเรียน ({totalQ} ข้อ)</h2>
                  </div>
                  <div className="quiz-card__stats">
                    {isSubmitted ? (
                      <span className="quiz-score-pill">
                        ผลคะแนน <strong>{correctCount}</strong>/{totalQ} ({scorePct}%)
                      </span>
                    ) : (
                      <span className="quiz-score-pill">
                        เลือกคำตอบแล้ว <strong>{answeredCount}</strong>/{totalQ} ข้อ
                      </span>
                    )}
                  </div>
                </div>

                {/* แถบปุ่มหมายเลขข้อ 1–10 (ย้อนกลับไปแก้ข้อเก่าได้ก่อนส่ง / หลังส่งแสดงสีเขียว-แดงตามผลตรวจ) */}
                <div className="quiz-stepper" role="tablist" aria-label="เลือกข้อคำถาม">
                  {examQuestions.map((qItem, idx) => {
                    const ans = quizAnswers[idx];
                    const isAns = ans !== undefined;
                    const right = isAns && ans === qItem.answer;
                    const active = !showQuizSummary && idx === currentQuizIdx;
                    const isLockedStep = !isSubmitted && idx > maxUnlockedIdx;

                    let stepStateClass = '';
                    if (isSubmitted) {
                      stepStateClass = right ? 'is-correct' : 'is-wrong';
                    } else if (isAns) {
                      stepStateClass = 'is-answered';
                    }

                    return (
                      <button
                        key={idx}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        disabled={isLockedStep}
                        className={`quiz-step ${active ? 'is-current' : ''} ${stepStateClass}`}
                        onClick={() => {
                          if (isLockedStep) return;
                          setShowQuizSummary(false);
                          setCurrentQuizIdx(idx);
                        }}
                        title={
                          isLockedStep
                            ? `กรุณาตอบข้อที่ ${maxUnlockedIdx + 1} ก่อนจึงจะไปข้อถัดไปได้`
                            : `ข้อที่ ${idx + 1}`
                        }
                      >
                        {isSubmitted ? (right ? '✓' : '✕') : idx + 1}
                      </button>
                    );
                  })}
                  {isSubmitted && (
                    <button
                      type="button"
                      className={`quiz-step quiz-step--sum ${showQuizSummary ? 'is-current' : ''}`}
                      onClick={() => setShowQuizSummary(true)}
                    >
                      ใบสรุปผล &amp; เฉลย ({correctCount}/{totalQ})
                    </button>
                  )}
                </div>

                {/* หน้าสรุปคะแนนพร้อมเฉลยละเอียดทุกข้อ (แสดงเมื่อกดส่งข้อสอบแล้ว) */}
                {isSubmitted && showQuizSummary ? (
                  <div className="quiz-summary">
                    <div
                      className="quiz-summary__badge"
                      style={
                        scorePct >= 80
                          ? { background: 'var(--basic-soft)', color: 'var(--basic)' }
                          : { background: 'var(--adv-soft)', color: 'var(--adv)' }
                      }
                    >
                      {scorePct >= 80
                        ? `🏆 ผ่านเกณฑ์ (${scorePct}% ≥ 80%) — ปลดล็อกบทถัดไปแล้ว!`
                        : `⚠️ ยังไม่ผ่านเกณฑ์ 80% (ต้องตอบถูกอย่างน้อย 8/${totalQ} ข้อ เพื่อปลดล็อกบทถัดไป)`}
                    </div>
                    <div className="quiz-summary__score">
                      {correctCount} <span>/ {totalQ} คะแนน ({scorePct}%)</span>
                    </div>
                    <p className="quiz-summary__desc">
                      ตอบถูก <strong style={{ color: 'var(--basic)' }}>{correctCount} ข้อ</strong> · ตอบผิด{' '}
                      <strong style={{ color: '#C9353A' }}>{wrongCount} ข้อ</strong> · เกณฑ์ผ่านคือ{' '}
                      <strong>80% (8 ข้อขึ้นไป)</strong>
                    </p>

                    <div className="quiz-summary__actions">
                      {scorePct >= 80 && nextLesson ? (
                        <>
                          <Link className="btn btn--primary" href={`/lesson/${nextLesson.id}`}>
                            ไปเรียนบทถัดไป (บทที่ {nextLesson.no}) →
                          </Link>
                          <button type="button" className="btn btn--outline" onClick={startNewExamSet}>
                            สุ่มทำแบบทดสอบชุดใหม่
                          </button>
                        </>
                      ) : (
                        <button type="button" className="btn btn--primary" onClick={startNewExamSet}>
                          🔄 สุ่มข้อสอบชุดใหม่เพื่อสอบให้ผ่าน 80%
                        </button>
                      )}
                      <button
                        type="button"
                        className="btn btn--outline"
                        onClick={() => {
                          setShowQuizSummary(false);
                          setCurrentQuizIdx(0);
                        }}
                      >
                        เปิดดูทีละข้อ (1–{totalQ})
                      </button>
                    </div>

                    {/* ตัวกรองและรายการเฉลยละเอียดทุกข้อ */}
                    <div className="quiz-review">
                      <div className="quiz-review__head">
                        <h3 className="quiz-review__title">เฉลยและคำอธิบายละเอียด</h3>
                        <div className="tabs" style={{ margin: 0 }}>
                          <button
                            type="button"
                            className={`tab ${reviewFilter === 'all' ? 'is-active' : ''}`}
                            onClick={() => setReviewFilter('all')}
                          >
                            ทั้งหมด ({totalQ})
                          </button>
                          <button
                            type="button"
                            className={`tab ${reviewFilter === 'wrong' ? 'is-active' : ''}`}
                            onClick={() => setReviewFilter('wrong')}
                          >
                            เฉพาะข้อที่ผิด ({wrongCount})
                          </button>
                          <button
                            type="button"
                            className={`tab ${reviewFilter === 'correct' ? 'is-active' : ''}`}
                            onClick={() => setReviewFilter('correct')}
                          >
                            เฉพาะข้อที่ถูก ({correctCount})
                          </button>
                        </div>
                      </div>

                      <div className="quiz-review__list">
                        {examQuestions.map((item, idx) => {
                          const userAns = quizAnswers[idx];
                          const right = userAns === item.answer;
                          if (reviewFilter === 'wrong' && right) return null;
                          if (reviewFilter === 'correct' && !right) return null;

                          const userLetter = userAns !== undefined ? String.fromCharCode(65 + userAns) : '-';
                          const correctLetter = String.fromCharCode(65 + item.answer);

                          return (
                            <div
                              key={idx}
                              className={`quiz-review__item ${right ? 'is-correct' : 'is-wrong'}`}
                            >
                              <div className="quiz-review__item-top">
                                <span className="quiz-review__num">ข้อที่ {idx + 1}</span>
                                <span className={`quiz-review__status ${right ? 'is-correct' : 'is-wrong'}`}>
                                  {right ? '✓ ตอบถูก' : '✕ ตอบผิด'}
                                </span>
                              </div>
                              <p className="quiz-review__q">{item.q}</p>

                              {/* แสดงตัวเลือกทั้งหมด A, B, C พร้อมเปรียบเทียบข้อที่เลือกกับข้อที่ถูก */}
                              <div className="quiz-review__options">
                                {item.options.map((optText, optIdx) => {
                                  const optLetter = String.fromCharCode(65 + optIdx);
                                  const isCorrectOpt = optIdx === item.answer;
                                  const isUserOpt = optIdx === userAns;

                                  let optClass = 'quiz-review__opt';
                                  if (isCorrectOpt) optClass += ' is-correct';
                                  else if (isUserOpt && !right) optClass += ' is-wrong';

                                  return (
                                    <div key={optIdx} className={optClass}>
                                      <span className="quiz-review__opt-letter">{optLetter}</span>
                                      <span className="quiz-review__opt-text">{optText}</span>
                                      {isCorrectOpt && isUserOpt && (
                                        <span className="quiz-review__opt-tag is-correct">
                                          ✓ คุณเลือกข้อนี้ (ถูกต้อง)
                                        </span>
                                      )}
                                      {isCorrectOpt && !isUserOpt && (
                                        <span className="quiz-review__opt-tag is-correct">
                                          ✓ คำตอบที่ถูกต้อง
                                        </span>
                                      )}
                                      {!isCorrectOpt && isUserOpt && (
                                        <span className="quiz-review__opt-tag is-wrong">
                                          ✕ คุณเลือกข้อนี้ (ผิด)
                                        </span>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>

                              {/* กล่องอธิบายละเอียดว่าทำไมถึงถูกและทำไมถึงผิด */}
                              <div className={`quiz-review__explain-box ${right ? 'is-correct' : 'is-wrong'}`}>
                                {right ? (
                                  <>
                                    <div className="quiz-review__explain-head is-correct">
                                      ✅ ทำไมข้อ {correctLetter} จึงถูกต้อง:
                                    </div>
                                    <p className="quiz-review__explain-body">{item.explain}</p>
                                  </>
                                ) : (
                                  <>
                                    <div className="quiz-review__explain-head is-wrong">
                                      ❌ ทำไมข้อ {userLetter} ที่คุณเลือกจึงผิด:
                                    </div>
                                    <p className="quiz-review__explain-body" style={{ marginBottom: 10 }}>
                                      ตัวเลือก <strong>&ldquo;{userAns !== undefined ? item.options[userAns] : '-'}&rdquo;</strong>{' '}
                                      ไม่ใช่คำตอบที่ถูกต้องสำหรับโจทย์ข้อนี้ เนื่องจากไม่ตรงกับหลักการทำงานจริง (ดูเหตุผลที่ถูกต้องด้านล่าง)
                                    </p>
                                    <div className="quiz-review__explain-head is-correct">
                                      ✅ ทำไมข้อ {correctLetter} (&ldquo;{item.options[item.answer]}&rdquo;) จึงถูกต้อง:
                                    </div>
                                    <p className="quiz-review__explain-body">{item.explain}</p>
                                  </>
                                )}
                              </div>
                            </div>
                          );
                        })}
                        {reviewFilter === 'wrong' && wrongCount === 0 && (
                          <div className="empty" style={{ padding: '24px 0' }}>
                            🎉 ยอดเยี่ยม! คุณตอบถูกครบทุกข้อ ไม่มีข้อที่ตอบผิดเลย
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="quiz-stage">
                    <div className="quiz-stage__meta">
                      <span>
                        คำถามข้อที่ {currentQuizIdx + 1} จาก {totalQ}
                      </span>
                      <span>
                        {isSubmitted
                          ? 'โหมดดูเฉลยรายข้อ'
                          : 'เลือกคำตอบเพื่อไปข้อถัดไป (ย้อนกลับมาแก้ข้อเก่าได้ก่อนกดส่งข้อสอบ)'}
                      </span>
                    </div>

                    <h3 className="quiz-stage__q">{activeItem.q}</h3>

                    <div className="quiz-options">
                      {activeItem.options.map((opt, optIdx) => {
                        const letter = String.fromCharCode(65 + optIdx); // A, B, C
                        let stateClass = '';
                        if (isSubmitted) {
                          if (optIdx === activeItem.answer) stateClass = 'is-correct';
                          else if (optIdx === chosen) stateClass = 'is-wrong';
                        } else if (optIdx === chosen) {
                          stateClass = 'is-selected';
                        }
                        return (
                          <button
                            key={optIdx}
                            type="button"
                            className={`quiz-option ${stateClass}`}
                            disabled={isSubmitted}
                            onClick={() => {
                              if (isSubmitted) return;
                              setQuizAnswers(prev => ({ ...prev, [currentQuizIdx]: optIdx }));
                            }}
                          >
                            <span className="quiz-option__letter">{letter}</span>
                            <span className="quiz-option__text">{opt}</span>
                            {!isSubmitted && optIdx === chosen && (
                              <span className="quiz-option__mark is-selected">เลือกข้อนี้</span>
                            )}
                            {isSubmitted && optIdx === activeItem.answer && (
                              <span className="quiz-option__mark">✓ เฉลย</span>
                            )}
                            {isSubmitted && optIdx === chosen && optIdx !== activeItem.answer && (
                              <span className="quiz-option__mark">✕ ที่เลือก</span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* แสดงคำอธิบายเฉลยเฉพาะหลังจากกดส่งข้อสอบแล้วเท่านั้น */}
                    {isSubmitted && (
                      <div className={`quiz-feedback ${isCorrect ? 'is-correct' : 'is-wrong'}`}>
                        {isCorrect ? (
                          <>
                            <div className="quiz-feedback__title">
                              ✅ ตอบถูกต้อง! — ทำไมข้อ {String.fromCharCode(65 + activeItem.answer)} จึงถูก:
                            </div>
                            <p className="quiz-feedback__text">{activeItem.explain}</p>
                          </>
                        ) : (
                          <>
                            <div className="quiz-feedback__title">
                              ❌ ข้อนี้คุณตอบผิด (คุณเลือกข้อ {chosen !== undefined ? String.fromCharCode(65 + chosen) : '-'})
                            </div>
                            <p className="quiz-feedback__text" style={{ marginBottom: 8 }}>
                              <strong>ทำไมข้อที่เลือกจึงผิด:</strong> ตัวเลือก{' '}
                              <strong>&ldquo;{chosen !== undefined ? activeItem.options[chosen] : '-'}&rdquo;</strong>{' '}
                              ไม่ตรงกับหลักการที่โจทย์ถาม
                            </p>
                            <p className="quiz-feedback__text">
                              <strong>
                                ✅ ทำไมข้อ {String.fromCharCode(65 + activeItem.answer)} (&ldquo;
                                {activeItem.options[activeItem.answer]}&rdquo;) จึงถูก:
                              </strong>{' '}
                              {activeItem.explain}
                            </p>
                          </>
                        )}
                      </div>
                    )}

                    {/* แถบปุ่มควบคุม: ย้อนกลับไปแก้ข้อเก่าได้ / ต้องตอบข้อปัจจุบันก่อนจึงจะไปข้อถัดไปได้ / ข้อสุดท้ายกดส่งข้อสอบ */}
                    <div className="quiz-nav">
                      <button
                        type="button"
                        className="btn btn--outline"
                        disabled={currentQuizIdx === 0}
                        onClick={() => setCurrentQuizIdx(prev => Math.max(0, prev - 1))}
                      >
                        ← ย้อนกลับข้อก่อนหน้า
                      </button>

                      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                        {!isSubmitted && allAnswered && currentQuizIdx < totalQ - 1 && (
                          <button
                            type="button"
                            className="btn btn--outline"
                            onClick={handleSubmitExam}
                          >
                            ส่งข้อสอบทันที ({answeredCount}/{totalQ})
                          </button>
                        )}

                        {currentQuizIdx < totalQ - 1 ? (
                          <button
                            type="button"
                            className="btn btn--primary"
                            disabled={!isSubmitted && !answered}
                            onClick={() => setCurrentQuizIdx(prev => Math.min(totalQ - 1, prev + 1))}
                          >
                            {answered || isSubmitted
                              ? `ข้อถัดไป (${currentQuizIdx + 2}/${totalQ}) →`
                              : 'กรุณาเลือกคำตอบก่อนไปข้อถัดไป'}
                          </button>
                        ) : isSubmitted ? (
                          <button
                            type="button"
                            className="btn btn--primary"
                            onClick={() => setShowQuizSummary(true)}
                          >
                            กลับไปหน้าใบสรุปผลคะแนน ({correctCount}/{totalQ}) →
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="btn btn--primary"
                            disabled={!allAnswered}
                            onClick={handleSubmitExam}
                          >
                            {allAnswered
                              ? `✓ ส่งข้อสอบและดูเฉลย (${answeredCount}/${totalQ} ข้อ)`
                              : `กรุณาตอบให้ครบก่อนส่ง (${answeredCount}/${totalQ} ข้อ)`}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </section>
            );
          })()}

          {/* สถานะการเรียนจบบทนี้ (ต้องทำแบบทดสอบและได้คะแนน >= 80% จึงจะผ่านและปลดล็อกบทถัดไป) */}
          <div className="lesson__complete">
            {done ? (
              <div className="btn btn--done" style={{ cursor: 'default' }}>
                ✓ ผ่านบทเรียนนี้แล้ว (สอบได้คะแนน ≥ 80%)
              </div>
            ) : (
              <a
                href="#lesson-quiz"
                className="btn btn--outline"
                onClick={() =>
                  showToast(
                    `กรุณาทำแบบทดสอบท้ายบทให้ได้คะแนนอย่างน้อย 80% (8/${examQuestions.length} ข้อ) เพื่อผ่านและปลดล็อกบทถัดไป`
                  )
                }
              >
                🔒 ต้องทำแบบทดสอบท้ายบทให้ได้คะแนน ≥ 80% (8/{examQuestions.length} ข้อ) เพื่อปลดล็อกบทถัดไป
              </a>
            )}
            <Link className="link" href={roadmapHref}>
              ดูตำแหน่งในหลักสูตร →
            </Link>
          </div>

          {/* ปุ่มเปลี่ยนบทเรียนก่อนหน้า / ถัดไป (ล็อกบทถัดไปจนกว่าจะสอบผ่านบทปัจจุบัน >= 80%) */}
          <nav className="pager" aria-label="บทเรียนก่อนหน้าและถัดไป">
            {prevLesson ? (
              <Link href={`/lesson/${prevLesson.id}`}>
                <div className="dir">← บทก่อนหน้า (บทที่ {prevLesson.no})</div>
                <div className="t">{prevLesson.subtitle}</div>
              </Link>
            ) : (
              <div />
            )}
            {nextLesson &&
              (done ? (
                <Link className="next" href={`/lesson/${nextLesson.id}`}>
                  <div className="dir">บทถัดไป (บทที่ {nextLesson.no}) →</div>
                  <div className="t">{nextLesson.subtitle}</div>
                </Link>
              ) : (
                <button
                  type="button"
                  className="next is-locked"
                  onClick={() => {
                    showToast(
                      `🔒 ข้ามบทไม่ได้! ต้องทำแบบทดสอบท้ายบทที่ ${lesson.no} ให้ได้คะแนน ≥ 80% (8/10 ข้อ) ก่อน`
                    );
                    document.getElementById('lesson-quiz')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <div className="dir">🔒 บทถัดไป (บทที่ {nextLesson.no}) — ยังไม่ปลดล็อก</div>
                  <div className="t">{nextLesson.subtitle}</div>
                  <div style={{ fontSize: 12, color: 'var(--adv)', marginTop: 4, fontWeight: 600 }}>
                    ต้องสอบบทที่ {lesson.no} ให้ได้คะแนน ≥ 80% ก่อน
                  </div>
                </button>
              ))}
          </nav>
        </article>

        {/* คอลัมน์ขวา: กล่องสารบัญเกาะติดหน้าจอ (Sticky TOC ตามภาพต้นแบบ 9Expert) */}
        <aside className="toc" aria-label="สารบัญบทความ">
          <div className="toc__box">
            <div className="toc__title">สารบัญ</div>
            {renderTocList()}
          </div>

          <div className="toc__progress">
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
              <span className="muted">ความคืบหน้าหลักสูตรที่ {courseInfo.no}</span>
              <strong>
                {stats.done}/{stats.total} บท
              </strong>
            </div>
            <div className="progress">
              <div className="progress__bar" style={{ width: `${stats.pct}%` }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
              <Link className="link" href={roadmapHref} style={{ fontSize: 13 }}>
                ดูแผนผังหลักสูตร →
              </Link>
              <Link className="link" href="/glossary" style={{ fontSize: 13 }}>
                คลังคำศัพท์ →
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {/* หน้าต่างเฉลิมฉลองเมื่อสอบผ่าน (Stage Complete Celebration Modal) */}
      {showCelebrationModal && (
        <div
          className="celebration-backdrop"
          onClick={e => {
            if (e.target === e.currentTarget) setShowCelebrationModal(false);
          }}
        >
          <div className="celebration-card" role="dialog" aria-modal="true" aria-label="ยินดีด้วย! คุณผ่านด่านแล้ว">
            <button
              type="button"
              className="celebration-close"
              onClick={() => setShowCelebrationModal(false)}
              aria-label="ปิดหน้าต่าง"
            >
              ✕
            </button>

            <div className="celebration-trophy-wrap">
              <div className="celebration-trophy-aura" />
              <div className="celebration-trophy-icon">🏆</div>
            </div>

            <div className="celebration-badge">STAGE COMPLETE!</div>
            <h3 className="celebration-title">ยินดีด้วย! คุณผ่านด่านแล้ว</h3>
            <p className="celebration-sub">
              คุณทำแบบทดสอบ <strong>บทที่ {lesson.no}: {lesson.title}</strong> ผ่านเกณฑ์แล้ว
            </p>

            <div className="celebration-score-pill">
              <span className="celebration-score-num">
                {correctCount} / {totalQ}
              </span>
              <span className="celebration-score-pct">({scorePct}%)</span>
            </div>

            <p className="celebration-msg">
              {nextLesson
                ? `✨ ยอดเยี่ยมมาก! ระบบได้ปลดล็อกบทถัดไป: บทที่ ${nextLesson.no} (${nextLesson.subtitle}) ให้คุณแล้ว`
                : `🎉 ยอดเยี่ยมที่สุด! คุณได้พิชิตครบทุกบทในหลักสูตรที่ ${courseInfo.no} เรียบร้อยแล้ว`}
            </p>

            <div className="celebration-actions">
              {nextLesson ? (
                <Link
                  className="btn btn--primary celebration-next-btn"
                  href={`/lesson/${nextLesson.id}`}
                  onClick={() => setShowCelebrationModal(false)}
                >
                  🚀 ไปลุยบทที่ {nextLesson.no} ต่อทันที →
                </Link>
              ) : (
                <Link
                  className="btn btn--primary celebration-next-btn"
                  href={roadmapHref}
                  onClick={() => setShowCelebrationModal(false)}
                >
                  🏆 ดูความสำเร็จใน Roadmap →
                </Link>
              )}
              <button
                type="button"
                className="btn btn--outline"
                onClick={() => {
                  setShowCelebrationModal(false);
                  document.getElementById('lesson-quiz')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                ดูใบสรุปผลและเฉลยละเอียด
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
