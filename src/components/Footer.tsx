'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [showFab, setShowFab] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowFab(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <footer className="footer">
        <div className="container footer__inner">
          <div>
            <Link className="logo" href="/" style={{ fontSize: 20 }}>
              <svg className="logo__mark" viewBox="0 0 36 36" fill="none" style={{ width: 26, height: 26 }}>
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
            <p className="footer__about">
              คลังความรู้และ Roadmap พื้นฐานสำหรับ Software Engineer ในยุคที่มี AI เป็นผู้ช่วย เรียงลำดับจาก Basic ไปจนถึง Advanced
            </p>
          </div>
          <div>
            <h4>เมนูหลัก</h4>
            <ul>
              <li><Link href="/roadmap">แผนผังการเรียน (Roadmap)</Link></li>
              <li><Link href="/articles">บทความทั้งหมด</Link></li>
              <li><Link href="/glossary">คลังคำศัพท์เทคนิค</Link></li>
            </ul>
          </div>
          <div>
            <h4>หลักสูตรการเรียน</h4>
            <ul>
              <li>
                <Link href="/roadmap#core">
                  หลักสูตรที่ 1: พื้นฐานวิศวกรรมซอฟต์แวร์ยุค AI (12 บท)
                </Link>
              </li>
              <li>
                <Link href="/roadmap#ai-future">
                  หลักสูตรที่ 2: Vibe Coding &amp; การปรับตัวในโลก AI Coding (4 บท)
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__copy">© 2026 LernDev · Never Stop Learning</div>
      </footer>

      {showFab && (
        <button
          type="button"
          className="fab"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="เลื่อนกลับขึ้นด้านบน"
          title="เลื่อนกลับขึ้นด้านบน"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
            <path d="m6 15 6-6 6 6" />
          </svg>
        </button>
      )}
    </>
  );
}

