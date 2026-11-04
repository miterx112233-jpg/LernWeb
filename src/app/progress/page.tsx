'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LESSONS, LEVELS } from '@/data/lessons';
import { useProgress } from '@/context/ProgressContext';

export default function ProgressPage() {
  const { user, isSyncing, isDone, toggleDone, resetProgress, getStats, logout, showToast } =
    useProgress();
  const [allowGuestPreview, setAllowGuestPreview] = useState(false);
  const totalStats = getStats();

  // Protected Route Guard: ต้องเข้าสู่ระบบก่อนจึงจะดูความก้าวหน้ารายบุคคลได้
  if (!user && !allowGuestPreview) {
    return (
      <>
        <section className="page-head">
          <div className="container">
            <h1>ความก้าวหน้าการเรียนของฉัน</h1>
            <p>หน้าสำหรับสมาชิกเพื่อติดตามและซิงก์ความคืบหน้าการเรียนรายบุคคล</p>
          </div>
        </section>

        <section className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>
          <div className="auth-wrap">
            <div className="auth-card" style={{ textAlign: 'center', padding: '36px 28px' }}>
              <span className="tag tag--intermediate">🔒 Protected Route · เฉพาะสมาชิกที่เข้าสู่ระบบ</span>
              <h2 className="auth-card__title" style={{ marginTop: 14 }}>
                กรุณาเข้าสู่ระบบเพื่อดูความก้าวหน้าของคุณ
              </h2>
              <p className="auth-card__sub" style={{ maxWidth: 440, margin: '10px auto 0' }}>
                ระบบจะแยกเก็บข้อมูลบทเรียนที่เรียนจบแล้วตามบัญชีผู้ใช้แต่ละคน เพื่อให้แต่ละคนกลับมาเรียนต่อจากเดิมได้ทุกเมื่อ
              </p>

              <div
                className="hero__actions"
                style={{ justifyContent: 'center', marginTop: 24 }}
              >
                <Link className="btn btn--primary" href="/login">
                  เข้าสู่ระบบ / สมัครสมาชิก
                </Link>
                <button
                  type="button"
                  className="btn btn--outline"
                  onClick={() => setAllowGuestPreview(true)}
                >
                  ทดลองดูในโหมดผู้เยี่ยมชม (Guest)
                </button>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1>ความก้าวหน้าการเรียนของฉัน</h1>
          <p>
            {user
              ? `กำลังแสดงความคืบหน้าของบัญชี ${user.displayName} (${user.email})`
              : 'โหมดผู้เยี่ยมชมชั่วคราว (Guest Mode) — เข้าสู่ระบบเพื่อซิงก์ข้อมูลผูกกับบัญชีของคุณ'}
          </p>
        </div>
      </section>

      <section className="container" style={{ paddingTop: 32, paddingBottom: 64 }}>
        <div className="account-banner">
          {user ? (
            <>
              <div className="account-banner__info">
                <span className="nav__user-avatar" style={{ width: 36, height: 36, fontSize: '0.95rem' }}>
                  {user.displayName.charAt(0).toUpperCase()}
                </span>
                <div>
                  <div style={{ fontWeight: 700 }}>
                    {user.displayName}{' '}
                    <span className="tag tag--basic" style={{ marginLeft: 6 }}>
                      {user.mode === 'supabase' ? 'Supabase Cloud' : 'บัญชีรายบุคคล'}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.86rem', color: 'var(--text-2)' }}>
                    {user.email} {isSyncing ? '· กำลังซิงก์ข้อมูล...' : '· ซิงก์ข้อมูลล่าสุดแล้ว'}
                  </div>
                </div>
              </div>
              <div className="hero__actions" style={{ marginTop: 0 }}>
                <Link className="btn btn--outline" href="/login">
                  ตั้งค่าบัญชี
                </Link>
                <button type="button" className="btn btn--outline" onClick={() => logout()}>
                  ออกจากระบบ
                </button>
              </div>
            </>
          ) : (
            <>
              <div>
                <strong>คุณกำลังดูในโหมดผู้เยี่ยมชม (Guest Preview)</strong>
                <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: 'var(--text-2)' }}>
                  เข้าสู่ระบบเพื่อให้ระบบบันทึกความก้าวหน้าแยกตามชื่อบัญชีของคุณบน Supabase
                </p>
              </div>
              <Link className="btn btn--primary" href="/login">
                เข้าสู่ระบบ / สมัครสมาชิก
              </Link>
            </>
          )}
        </div>

        <div className="stats" style={{ marginTop: 22 }}>
          <div className="stat">
            <div className="stat__label">รวมทั้งหมด</div>
            <div className="stat__value">
              {totalStats.done}/{totalStats.total}
            </div>
            <div className="progress">
              <div className="progress__bar" style={{ width: `${totalStats.pct}%` }} />
            </div>
          </div>

          {LEVELS.map(lv => {
            const s = getStats(lv.id);
            return (
              <div key={lv.id} className="stat">
                <div className={`stat__label c-${lv.id}`}>{lv.name}</div>
                <div className="stat__value">
                  {s.done}/{s.total}
                </div>
                <div className="progress">
                  <div className="progress__bar" style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="table-wrap" style={{ marginTop: 28 }}>
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: 70 }}>บทที่</th>
                <th>หัวข้อบทเรียนใน Roadmap</th>
                <th style={{ width: 140 }}>ระดับ</th>
                <th style={{ width: 170 }}>สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {LESSONS.map(lesson => {
                const done = isDone(lesson.id);
                const lv = LEVELS.find(x => x.id === lesson.level);
                return (
                  <tr key={lesson.id}>
                    <td>{String(lesson.no).padStart(2, '0')}</td>
                    <td>
                      <Link className="link" href={`/lesson/${lesson.id}`}>
                        {lesson.title}
                      </Link>
                    </td>
                    <td>
                      <span className={`tag tag--${lesson.level}`}>{lv?.name}</span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className={`status ${done ? 'is-done' : ''}`}
                        style={{ background: 'none', border: 0, padding: 0 }}
                        onClick={() => toggleDone(lesson.id)}
                      >
                        {done ? '✓ เรียนจบแล้ว' : '○ ยังไม่ได้เรียน'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="check-actions" style={{ marginTop: 20 }}>
          <button
            type="button"
            className="btn btn--outline"
            onClick={() => {
              resetProgress();
              showToast('รีเซ็ตความก้าวหน้าการเรียนแล้ว');
            }}
          >
            รีเซ็ตความก้าวหน้าการเรียน
          </button>
        </div>
      </section>
    </>
  );
}
