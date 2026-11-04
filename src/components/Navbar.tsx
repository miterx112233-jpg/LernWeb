'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LESSONS, LEVELS } from '@/data/lessons';
import { useProgress } from '@/context/ProgressContext';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useProgress();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

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

  const filteredLessons = query.trim()
    ? LESSONS.filter(l =>
        [l.title, l.summary, l.keyword, l.subtitle, l.category, l.level, ...l.topics]
          .join(' ')
          .toLowerCase()
          .includes(query.trim().toLowerCase())
      )
    : LESSONS;

  const isActive = (prefix: string) => {
    if (prefix === '/') return pathname === '/';
    return pathname.startsWith(prefix);
  };

  return (
    <>
      <header className="nav">
        <div className="container nav__inner">
          <Link className="logo" href="/" aria-label="LernWeb หน้าแรก">
            <svg className="logo__mark" viewBox="0 0 36 36" fill="none">
              <circle cx="15" cy="15" r="10" stroke="currentColor" strokeWidth="3.2" />
              <circle cx="15" cy="15" r="3.2" fill="currentColor" />
              <path d="M22.5 22.5L31 31" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
              <path d="M12 30L23 18" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
            </svg>
            <span>LernWeb</span>
          </Link>

          <nav className="nav__menu" aria-label="เมนูหลัก">
            {/* หลักสูตร Dropdown */}
            <div className="nav__item">
              <button
                type="button"
                className={`nav__link ${isActive('/lesson') ? 'is-active' : ''}`}
                aria-haspopup="true"
              >
                หลักสูตร
                <svg className="nav__chev" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="m3 4.5 3 3 3-3" />
                </svg>
              </button>
              <div className="dropdown">
                {LEVELS.map(lv => {
                  const lessonsInLevel = LESSONS.filter(l => l.level === lv.id);
                  return (
                    <Link key={lv.id} href={`/roadmap#${lv.id}`}>
                      <div className="dropdown__title">
                        {lv.name} <span className="muted">· {lv.title}</span>
                      </div>
                      <div className="dropdown__desc">
                        บทที่ {lessonsInLevel[0]?.no}–{lessonsInLevel[lessonsInLevel.length - 1]?.no} ({lessonsInLevel.length} บทเรียน)
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* แผนผัง Roadmap */}
            <div className="nav__item">
              <Link className={`nav__link ${isActive('/roadmap') ? 'is-active' : ''}`} href="/roadmap">
                แผนผังการเรียน
              </Link>
            </div>

            {/* ระดับความรู้ Dropdown */}
            <div className="nav__item">
              <button type="button" className="nav__link" aria-haspopup="true">
                ระดับความรู้
                <svg className="nav__chev" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="m3 4.5 3 3 3-3" />
                </svg>
              </button>
              <div className="dropdown">
                <Link href="/articles?level=basic">
                  <div className="dropdown__title">ระดับ 1: Basic</div>
                  <div className="dropdown__desc">ปูพื้นฐานคอมพิวเตอร์ เว็บ โลจิก และ Git</div>
                </Link>
                <Link href="/articles?level=intermediate">
                  <div className="dropdown__title">ระดับ 2: Intermediate</div>
                  <div className="dropdown__desc">Frontend, Backend API, Database และ Testing</div>
                </Link>
                <Link href="/articles?level=advanced">
                  <div className="dropdown__title">ระดับ 3: Advanced</div>
                  <div className="dropdown__desc">LLM, RAG, AI Agents และ System Design</div>
                </Link>
              </div>
            </div>

            {/* บทความ */}
            <div className="nav__item">
              <Link className={`nav__link ${isActive('/articles') ? 'is-active' : ''}`} href="/articles">
                บทความ
              </Link>
            </div>

            {/* เครื่องมือ SE Dropdown */}
            <div className="nav__item">
              <button
                type="button"
                className={`nav__link ${isActive('/toolkit') ? 'is-active' : ''}`}
                aria-haspopup="true"
              >
                เครื่องมือ SE
                <svg className="nav__chev" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="m3 4.5 3 3 3-3" />
                </svg>
              </button>
              <div className="dropdown">
                <Link href="/toolkit#templates">
                  <div className="dropdown__title">เทมเพลตวางแผนงาน</div>
                  <div className="dropdown__desc">cntext.md · Design.md · backlog.md</div>
                </Link>
                <Link href="/toolkit#checklist">
                  <div className="dropdown__title">เช็กลิสต์รีวิวโค้ดจาก AI</div>
                  <div className="dropdown__desc">ตรวจสอบความปลอดภัยและคุณภาพก่อนใช้งาน</div>
                </Link>
                <Link href="/toolkit#progress">
                  <div className="dropdown__title">ความก้าวหน้าการเรียน</div>
                  <div className="dropdown__desc">ดูสถิติบทเรียนที่เรียนจบแล้ว</div>
                </Link>
              </div>
            </div>

            {/* เกี่ยวกับเรา */}
            <div className="nav__item">
              <Link className="nav__link" href="/#about">
                ทำไมต้องมีพื้นฐาน
              </Link>
            </div>
          </nav>

          <div className="nav__actions">
            <button
              type="button"
              className="icon-btn"
              onClick={() => setSearchOpen(true)}
              aria-label="ค้นหาบทเรียน (Ctrl+K)"
              title="ค้นหาบทเรียน (Ctrl+K)"
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
        <Link href="/roadmap">แผนผังการเรียน (Roadmap)</Link>
        {LEVELS.map(lv => (
          <Link key={lv.id} className="sub" href={`/roadmap#${lv.id}`}>
            {lv.name} · {lv.title}
          </Link>
        ))}
        <Link href="/articles">บทความทั้งหมด</Link>
        <Link href="/toolkit">เครื่องมือ Software Engineer</Link>
        <Link className="sub" href="/toolkit#templates">
          เทมเพลตวางแผนงาน (Spec)
        </Link>
        <Link className="sub" href="/toolkit#checklist">
          เช็กลิสต์รีวิวโค้ดจาก AI
        </Link>
        <Link className="sub" href="/toolkit#progress">
          ความก้าวหน้าการเรียน
        </Link>
      </div>

      {/* หน้าต่างค้นหาด่วน */}
      <div
        className={`search-modal ${searchOpen ? 'is-open' : ''}`}
        onClick={e => {
          if (e.target === e.currentTarget) setSearchOpen(false);
        }}
      >
        <div className="search-box" role="dialog" aria-label="ค้นหาบทเรียน">
          <input
            ref={searchInputRef}
            className="search-box__input"
            placeholder="ค้นหาบทเรียน เช่น LLM, HTTP, SQL, Git, Testing..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && filteredLessons.length > 0) {
                router.push(`/lesson/${filteredLessons[0].id}`);
                setSearchOpen(false);
              }
            }}
          />
          <div className="search-results">
            {filteredLessons.length > 0 ? (
              filteredLessons.map(l => {
                const lv = LEVELS.find(item => item.id === l.level);
                return (
                  <Link
                    key={l.id}
                    href={`/lesson/${l.id}`}
                    onClick={() => setSearchOpen(false)}
                  >
                    <div className="title">
                      {String(l.no).padStart(2, '0')} · {l.title}
                    </div>
                    <div className="meta">
                      {lv?.name} · {l.category} · อ่าน {l.minutes} นาที
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="search-empty">ไม่พบบทเรียนที่ตรงกับคำค้น</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

