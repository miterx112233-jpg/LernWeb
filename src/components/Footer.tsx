'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { LEVELS } from '@/data/lessons';

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
                <circle cx="15" cy="15" r="10" stroke="currentColor" strokeWidth="3.2" />
                <circle cx="15" cy="15" r="3.2" fill="currentColor" />
                <path d="M22.5 22.5L31 31" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
                <path d="M12 30L23 18" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
              </svg>
              <span>LernWeb</span>
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
              <li><Link href="/progress">เช็คความก้าวหน้า</Link></li>
            </ul>
          </div>
          <div>
            <h4>ระดับการเรียน</h4>
            <ul>
              {LEVELS.map(lv => (
                <li key={lv.id}>
                  <Link href={`/roadmap#${lv.id}`}>
                    {lv.name} · {lv.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer__copy">© 2026 LernWeb · Never Stop Learning</div>
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

