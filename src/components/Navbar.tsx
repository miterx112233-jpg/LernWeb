'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LESSONS, LEVELS } from '@/data/lessons';
import { ARTICLES } from '@/data/articles';
import { GLOSSARY_ITEMS } from '@/data/glossary';
import { useProgress } from '@/context/ProgressContext';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isDone, lastLessonId, getStats, theme, toggleTheme } = useProgress();
  const totalStats = getStats();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [roadmapMenuOpen, setRoadmapMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const resumeLesson =
    (lastLessonId ? LESSONS.find(l => l.id === lastLessonId) : null) ||
    LESSONS.find(l => !isDone(l.id)) ||
    LESSONS[0];

  useEffect(() => {
    setMobileOpen(false);
    setRoadmapMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setMobileOpen(false);
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 20);
    } else {
      setQuery('');
    }
  }, [searchOpen]);

  const q = query.trim().toLowerCase();
  const matchedLessons = q
    ? LESSONS.filter(l =>
        [l.title, l.summary, l.keyword, l.subtitle, l.category, l.level, ...l.topics]
          .join(' ')
          .toLowerCase()
          .includes(q)
      )
    : LESSONS;

  const matchedArticles = q
    ? ARTICLES.filter(a =>
        [a.title, a.summary, a.keyword, a.subtitle, a.category]
          .join(' ')
          .toLowerCase()
          .includes(q)
      )
    : ARTICLES;

  const matchedGlossary = q
    ? GLOSSARY_ITEMS.filter(g =>
        [g.term, g.shortDef, g.fullDef, ...g.keywords]
          .join(' ')
          .toLowerCase()
          .includes(q)
      )
    : [];

  const isActive = (prefix: string) => {
    if (prefix === '/') return pathname === '/';
    return pathname.startsWith(prefix);
  };

  return (
    <>
      <header className="nav">
        <div className="container nav__inner">
          <Link className="logo" href="/" aria-label="LernDev หน้าแรก">
            <svg className="logo__mark" viewBox="0 0 36 36" fill="none">
              <rect x="2" y="2" width="32" height="32" rx="8" fill="currentColor" />
              <path
                d="M10 13L16 18L10 23"
                stroke="#FFFFFF"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M18 23H26" stroke="#5CE6A0" strokeWidth="2.8" strokeLinecap="round" />
            </svg>
            <span>LernDev</span>
          </Link>

          <nav className="nav__menu" aria-label="เมนูหลัก">
            {/* 1. หน้าแรก */}
            <div className="nav__item">
              <Link className={`nav__link ${isActive('/') ? 'is-active' : ''}`} href="/">
                หน้าแรก
              </Link>
            </div>

            {/* 2. แผนผังการเรียน (Mega-Dropdown 3 ระดับ เข้าถึงทั้ง 12 บทเรียนได้โดยตรงแบบไม่ซ้ำซ้อน) */}
            <div
              className={`nav__item ${roadmapMenuOpen ? 'is-open' : ''}`}
              onMouseEnter={() => setRoadmapMenuOpen(true)}
              onMouseLeave={() => setRoadmapMenuOpen(false)}
            >
              <Link
                className={`nav__link ${isActive('/roadmap') || isActive('/lesson') ? 'is-active' : ''}`}
                href="/roadmap"
                onClick={() => setRoadmapMenuOpen(false)}
              >
                แผนผังการเรียน
                <svg className="nav__chev" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="m3 4.5 3 3 3-3" />
                </svg>
              </Link>
              <div className="dropdown dropdown--mega">
                <div className="mega-grid">
                  {LEVELS.map(lv => {
                    const lessonsInLevel = LESSONS.filter(l => l.level === lv.id);
                    const lvStats = getStats(lv.id);
                    return (
                      <div key={lv.id} className="mega-col">
                        <Link
                          href={`/roadmap#${lv.id}`}
                          className="mega-col__head"
                          onClick={() => setRoadmapMenuOpen(false)}
                        >
                          <span className={`tag tag--${lv.id}`}>
                            ระดับ {lv.no} · {lv.name}
                          </span>
                          <span className="mega-col__stat">
                            {lvStats.done}/{lvStats.total}
                          </span>
                        </Link>
                        <div className="mega-col__list">
                          {lessonsInLevel.map(lesson => {
                            const done = isDone(lesson.id);
                            const current = pathname === `/lesson/${lesson.id}`;
                            const shortTitle = lesson.title.replace(/\s*\([^)]*\)\s*$/, '');
                            return (
                              <Link
                                key={lesson.id}
                                href={`/lesson/${lesson.id}`}
                                className={`mega-lesson ${done ? 'is-done' : ''} ${current ? 'is-current' : ''}`}
                                onClick={() => setRoadmapMenuOpen(false)}
                              >
                                <span className="mega-lesson__num">
                                  {done ? '✓' : String(lesson.no).padStart(2, '0')}
                                </span>
                                <span className="mega-lesson__title">{shortTitle}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mega-foot">
                  <Link
                    href="/roadmap"
                    className="mega-foot__link"
                    onClick={() => setRoadmapMenuOpen(false)}
                  >
                    ดูตารางเปรียบเทียบทั้ง 3 ระดับในหน้า Roadmap →
                  </Link>
                  {resumeLesson && (
                    <Link
                      href={`/lesson/${resumeLesson.id}`}
                      className="mega-foot__resume"
                      onClick={() => setRoadmapMenuOpen(false)}
                    >
                      เรียนต่อบทที่ {String(resumeLesson.no).padStart(2, '0')} →
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* 3. บทความ (เนื้อหาแยกจากบทเรียนหลัก) */}
            <div className="nav__item">
              <Link className={`nav__link ${isActive('/articles') ? 'is-active' : ''}`} href="/articles">
                บทความ
              </Link>
            </div>

            {/* 4. คลังคำศัพท์เทคนิค (Glossary) */}
            <div className="nav__item">
              <Link className={`nav__link ${isActive('/glossary') ? 'is-active' : ''}`} href="/glossary">
                คลังคำศัพท์
              </Link>
            </div>
          </nav>

          <div className="nav__actions">
            <button
              type="button"
              className="icon-btn"
              onClick={() => setSearchOpen(true)}
              aria-label="ค้นหา (Ctrl+K)"
              title="ค้นหาบทเรียนและบทความ (Ctrl+K)"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </button>

            <button
              type="button"
              className="theme-switch"
              onClick={toggleTheme}
              aria-label="สลับโหมดสี"
              title="สลับโหมดสว่าง / มืด"
            >
              <span className="theme-switch__knob">
                {theme === 'dark' ? (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
                  </svg>
                ) : (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                  </svg>
                )}
              </span>
            </button>

            <Link
              href="/login"
              className={`nav__user-btn ${user ? 'is-logged-in' : ''}`}
              title={user ? `บัญชี: ${user.email}` : 'เข้าสู่ระบบเพื่อบันทึกความก้าวหน้ารายบุคคล'}
            >
              {user ? (
                <>
                  <span className="nav__user-avatar">
                    {user.displayName.charAt(0).toUpperCase()}
                  </span>
                  <span className="nav__user-name">{user.displayName}</span>
                  <span className="nav__user-stat">
                    {totalStats.done}/{totalStats.total}
                  </span>
                </>
              ) : (
                <span>เข้าสู่ระบบ</span>
              )}
            </Link>

            <button
              type="button"
              className="icon-btn nav__burger"
              onClick={() => setMobileOpen(prev => !prev)}
              aria-label="เปิดเมนู"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* เมนูสำหรับหน้าจอมือถือ */}
      <div className={`mobile-menu ${mobileOpen ? 'is-open' : ''}`}>
        <Link href="/">หน้าแรก</Link>
        <Link href="/roadmap">แผนผังการเรียน (Roadmap 12 บท)</Link>
        {LEVELS.map(lv => (
          <Link key={lv.id} className="sub" href={`/roadmap#${lv.id}`}>
            ระดับที่ {lv.no}: {lv.name} · {lv.title}
          </Link>
        ))}
        <Link href="/articles">บทความและเกร็ดความรู้</Link>
        <Link href="/glossary">คลังคำศัพท์เทคนิค (Glossary)</Link>
        <Link href="/login">
          {user ? `บัญชีของฉัน (${user.displayName})` : 'เข้าสู่ระบบ / สมัครสมาชิก'}
        </Link>
      </div>

      {/* หน้าต่างค้นหาด่วน (ค้นได้ทั้งบทเรียนและบทความ) */}
      <div
        className={`search-modal ${searchOpen ? 'is-open' : ''}`}
        onClick={e => {
          if (e.target === e.currentTarget) setSearchOpen(false);
        }}
      >
        <div className="search-box" role="dialog" aria-label="ค้นหาบทเรียนและบทความ">
          <input
            ref={searchInputRef}
            className="search-box__input"
            placeholder="ค้นหาบทเรียนหรือบทความ เช่น LLM, HTTP, SQL, Git..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                if (matchedLessons.length > 0) {
                  router.push(`/lesson/${matchedLessons[0].id}`);
                  setSearchOpen(false);
                } else if (matchedArticles.length > 0) {
                  router.push(`/articles/${matchedArticles[0].slug}`);
                  setSearchOpen(false);
                }
              }
            }}
          />
          <div className="search-results">
            {matchedLessons.length === 0 &&
            matchedArticles.length === 0 &&
            matchedGlossary.length === 0 ? (
              <div className="search-empty">ไม่พบเนื้อหาที่ตรงกับคำค้น</div>
            ) : (
              <>
                {matchedGlossary.map(g => (
                  <Link
                    key={`glossary-${g.slug}`}
                    href={`/glossary#${g.slug}`}
                    onClick={() => setSearchOpen(false)}
                  >
                    <div className="title">[คำศัพท์] {g.term}</div>
                    <div className="meta">{g.shortDef}</div>
                  </Link>
                ))}
                {matchedLessons.map(l => {
                  const lv = LEVELS.find(item => item.id === l.level);
                  return (
                    <Link
                      key={`lesson-${l.id}`}
                      href={`/lesson/${l.id}`}
                      onClick={() => setSearchOpen(false)}
                    >
                      <div className="title">
                        [บทเรียน {String(l.no).padStart(2, '0')}] {l.title}
                      </div>
                      <div className="meta">
                        Roadmap ระดับ {lv?.name} · {l.category} · อ่าน {l.minutes} นาที
                      </div>
                    </Link>
                  );
                })}
                {matchedArticles.map(a => (
                  <Link
                    key={`article-${a.slug}`}
                    href={`/articles/${a.slug}`}
                    onClick={() => setSearchOpen(false)}
                  >
                    <div className="title">[บทความ] {a.title}</div>
                    <div className="meta">
                      หมวด {a.category} · อ่าน {a.minutes} นาที
                    </div>
                  </Link>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
