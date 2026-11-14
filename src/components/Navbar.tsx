'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LESSONS, LEVELS } from '@/data/lessons';
import { ALL_LESSONS } from '@/data/courses';
import { ARTICLES } from '@/data/articles';
import { GLOSSARY_ITEMS } from '@/data/glossary';
import { useProgress } from '@/context/ProgressContext';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isDone, isLessonUnlocked, lastLessonId, getStats, theme, toggleTheme, showToast } = useProgress();
  const totalStats = getStats();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const resumeLesson =
    (lastLessonId ? ALL_LESSONS.find(l => l.id === lastLessonId) : null) ||
    ALL_LESSONS.find(l => !isDone(l.id)) ||
    LESSONS[0];

  useEffect(() => {
    setMobileOpen(false);
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

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const cleanQ = query.trim().toLowerCase();
  const matchedLessons = cleanQ
    ? ALL_LESSONS.filter(
        l =>
          l.title.toLowerCase().includes(cleanQ) ||
          l.subtitle.toLowerCase().includes(cleanQ) ||
          l.category.toLowerCase().includes(cleanQ) ||
          l.topics.some(t => t.toLowerCase().includes(cleanQ))
      )
    : [];

  const matchedArticles = cleanQ
    ? ARTICLES.filter(
        a =>
          a.title.toLowerCase().includes(cleanQ) ||
          a.summary.toLowerCase().includes(cleanQ) ||
          a.category.toLowerCase().includes(cleanQ)
      )
    : [];

  const matchedGlossary = cleanQ
    ? GLOSSARY_ITEMS.filter(
        g =>
          g.term.toLowerCase().includes(cleanQ) ||
          g.shortDef.toLowerCase().includes(cleanQ) ||
          g.keywords.some(k => k.toLowerCase().includes(cleanQ))
      ).slice(0, 5)
    : [];

  return (
    <>
      <header className="nav">
        <div className="container nav__inner">
          <Link className="logo" href="/">
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

            {/* 2. แผนผังการเรียน (Roadmap) */}
            <div className="nav__item">
              <Link
                className={`nav__link ${isActive('/roadmap') || isActive('/lesson') ? 'is-active' : ''}`}
                href={user ? '/roadmap' : '/login'}
                title={user ? 'แผนผังการเรียน Software Engineer (12 บท)' : 'กรุณาเข้าสู่ระบบเพื่อเข้าใช้งานแผนผังการเรียน'}
              >
                {!user && <span aria-hidden="true" style={{ fontSize: 13, marginRight: 4 }}>🔒</span>}
                แผนผังการเรียน
              </Link>
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
        <Link href={user ? '/roadmap' : '/login'}>
          {user ? 'แผนผังการเรียน (Roadmap)' : '🔒 แผนผังการเรียน (เข้าสู่ระบบก่อน)'}
        </Link>
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
        <div className="search-box" role="dialog" aria-label="ค้นหาบทเรียน">
          <div className="search-input-wrap">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="ค้นหาบทเรียน บทความ หรือคำศัพท์เทคนิค... (พิมพ์ค้นหาได้ทันที)"
              aria-label="ช่องค้นหา"
            />
            {query && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setQuery('')}
                aria-label="ล้างคำค้น"
              >
                ✕
              </button>
            )}
          </div>

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
                  const unlocked = user ? isLessonUnlocked(l.id) : false;
                  return (
                    <Link
                      key={`lesson-${l.id}`}
                      href={user ? `/lesson/${l.id}` : '/login'}
                      style={user && !unlocked ? { opacity: 0.65 } : undefined}
                      onClick={e => {
                        if (user && !unlocked) {
                          e.preventDefault();
                          showToast(
                            `🔒 ต้องสอบผ่านบทที่ ${l.no - 1} ให้ได้คะแนน ≥ 80% ก่อนจึงจะเข้าบทที่ ${l.no} ได้`
                          );
                          return;
                        }
                        setSearchOpen(false);
                      }}
                    >
                      <div className="title">
                        [{!user || !unlocked ? '🔒 ' : ''}บทที่ {String(l.no).padStart(2, '0')}] {l.title}
                      </div>
                      <div className="meta">
                        ระดับ {lv?.name} · {l.category} · อ่าน {l.minutes} นาที
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
