'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { LESSONS, LEVELS, LESSON_VIDEOS, Lesson } from '@/data/lessons';
import { useProgress } from '@/context/ProgressContext';
import { LessonBanner } from '@/components/LessonBanner';

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
  const { isDone, toggleDone, getStats, showToast } = useProgress();
  const [activeId, setActiveId] = useState<string>(lesson.sections[0]?.id || '');
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [activeVideoIdx, setActiveVideoIdx] = useState<number>(0);

  const lv = LEVELS.find(item => item.id === lesson.level);
  const done = isDone(lesson.id);
  const stats = getStats();

  const videoList = (lesson.videos || LESSON_VIDEOS[lesson.id] || []).filter(v =>
    Boolean(extractYouTubeId(v.url))
  );
  const currentVideo = videoList[activeVideoIdx] || videoList[0];
  const currentYoutubeId = currentVideo ? extractYouTubeId(currentVideo.url) : null;

  const prevLesson = LESSONS.find(l => l.no === lesson.no - 1);
  const nextLesson = LESSONS.find(l => l.no === lesson.no + 1);

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
    setQuizAnswers({});
    setActiveVideoIdx(0);
  }, [lesson.id]);

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
    </ul>
  );

  return (
    <div className="container lesson">
      {/* ลิงก์ย้อนกลับด้านบนสุด */}
      <Link className="breadcrumb" href="/roadmap">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="m15 18-6-6 6-6" />
        </svg>
        กลับไปยังแผนผังการเรียน (Roadmap)
      </Link>

      {/* โครงสร้าง 2 คอลัมน์: เนื้อหาหลักซ้าย + สารบัญเกาะติดหน้าจอด้านขวา */}
      <div className="lesson__layout">
        <article>
          {/* แบนเนอร์หัวข้อบทเรียนสไตล์ 9Expert */}
          <LessonBanner lesson={lesson} />

          <p className="lesson__caption">บทความโดย: LernWeb Team</p>

          <h1 className="lesson__title">{lesson.title}</h1>

          <div className="lesson__info">
            <span className={`tag tag--${lesson.level}`}>{lv?.name}</span>
            <span>บทที่ {lesson.no} จาก 12</span>
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

          {/* เนื้อหาบทเรียน */}
          <div className="prose">
            {lesson.sections.map(sec => (
              <section key={sec.id}>
                <h2 id={sec.id}>{sec.h}</h2>
                <div dangerouslySetInnerHTML={{ __html: sec.html }} />
                {sec.sub?.map(s => (
                  <div key={s.id}>
                    <h3 id={s.id}>{s.h}</h3>
                    <div dangerouslySetInnerHTML={{ __html: s.html }} />
                  </div>
                ))}
              </section>
            ))}

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

          {/* แบบทดสอบเช็คความเข้าใจท้ายบท */}
          {lesson.quiz && lesson.quiz.length > 0 && (
            <section className="quiz" aria-label="คำถามทบทวนความเข้าใจ">
              <h2>เช็คความเข้าใจท้ายบท</h2>
              <p className="text2" style={{ fontSize: 14.5 }}>
                ลองตอบคำถามสั้นๆ เพื่อทบทวนประเด็นสำคัญในบทนี้
              </p>

              {lesson.quiz.map((item, qIdx) => {
                const chosen = quizAnswers[qIdx];
                const answered = chosen !== undefined;
                return (
                  <div key={qIdx} className="quiz__q">
                    <p>
                      ข้อที่ {qIdx + 1}: {item.q}
                    </p>
                    {item.options.map((opt, optIdx) => {
                      let stateClass = '';
                      if (answered) {
                        if (optIdx === item.answer) stateClass = 'is-correct';
                        else if (optIdx === chosen) stateClass = 'is-wrong';
                      }
                      return (
                        <button
                          key={optIdx}
                          type="button"
                          className={`quiz__opt ${stateClass}`}
                          disabled={answered}
                          onClick={() =>
                            setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }))
                          }
                        >
                          {opt}
                        </button>
                      );
                    })}
                    {answered && (
                      <p className="quiz__explain">
                        {chosen === item.answer ? '✓ ถูกต้อง — ' : 'คำอธิบาย: '}
                        {item.explain}
                      </p>
                    )}
                  </div>
                );
              })}
            </section>
          )}

          {/* ปุ่มบันทึกว่าเรียนจบแล้ว */}
          <div className="lesson__complete">
            <button
              type="button"
              className={`btn ${done ? 'btn--done' : 'btn--primary'}`}
              onClick={() => {
                const marked = toggleDone(lesson.id);
                showToast(
                  marked
                    ? `บันทึกว่าเรียนจบบทที่ ${lesson.no} แล้ว`
                    : `ยกเลิกสถานะเรียนจบบทที่ ${lesson.no}`
                );
              }}
            >
              {done ? '✓ เรียนจบบทนี้แล้ว (กดเพื่อยกเลิก)' : 'ทำเครื่องหมายว่าเรียนจบบทนี้แล้ว'}
            </button>
            <Link className="link" href="/roadmap">
              ดูตำแหน่งใน Roadmap →
            </Link>
          </div>

          {/* ปุ่มเปลี่ยนบทเรียนก่อนหน้า / ถัดไป */}
          <nav className="pager" aria-label="บทเรียนก่อนหน้าและถัดไป">
            {prevLesson ? (
              <Link href={`/lesson/${prevLesson.id}`}>
                <div className="dir">← บทก่อนหน้า (บทที่ {prevLesson.no})</div>
                <div className="t">{prevLesson.subtitle}</div>
              </Link>
            ) : (
              <div />
            )}
            {nextLesson && (
              <Link className="next" href={`/lesson/${nextLesson.id}`}>
                <div className="dir">บทถัดไป (บทที่ {nextLesson.no}) →</div>
                <div className="t">{nextLesson.subtitle}</div>
              </Link>
            )}
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
              <span className="muted">ความคืบหน้ารวม</span>
              <strong>
                {stats.done}/{stats.total} บท
              </strong>
            </div>
            <div className="progress">
              <div className="progress__bar" style={{ width: `${stats.pct}%` }} />
            </div>
            <Link className="link" href="/roadmap" style={{ fontSize: 13 }}>
              ดูแผนผังทั้งหมด →
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
