'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LESSONS, LEVELS } from '@/data/lessons';
import { useProgress } from '@/context/ProgressContext';
import { signInUser, signUpUser } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const { user, isDone, loginWithUser, logout, getStats, getCourseStats, showToast } = useProgress();

  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.trim() || !password.trim()) {
      setErrorMsg('กรุณากรอกอีเมลและรหัสผ่านให้ครบถ้วน');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร');
      return;
    }

    setLoading(true);
    try {
      if (tab === 'signup') {
        const res = await signUpUser(email, password, displayName);
        if (res.error) {
          setErrorMsg(res.error);
          return;
        }
        if (res.user) {
          await loginWithUser(res.user);
          showToast(`ยินดีต้อนรับคุณ ${res.user.displayName}! ปลดล็อกแผนผังการเรียนเรียบร้อยแล้ว`);
          router.push('/');
        }
      } else {
        const res = await signInUser(email, password);
        if (res.error) {
          setErrorMsg(res.error);
          return;
        }
        if (res.user) {
          await loginWithUser(res.user);
          showToast(`เข้าสู่ระบบในชื่อ ${res.user.displayName} เรียบร้อยแล้ว`);
          router.push('/');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const stats = getStats();
  const nextLesson = LESSONS.find(l => !isDone(l.id)) || LESSONS[0];

  return (
    <section className="auth-stage">
      <div className="container">
        <div className="auth-minimal">
          {user ? (
            <div className="auth-card auth-card--minimal">
              <div className="auth-profile-head">
                <div className="auth-profile-avatar">
                  {user.displayName.charAt(0).toUpperCase()}
                </div>
                <div className="auth-profile-meta">
                  <div className="auth-profile-status">● บัญชีผู้เรียนของคุณ</div>
                  <h1 className="auth-card__title">{user.displayName}</h1>
                  <p className="auth-card__sub">{user.email}</p>
                </div>
              </div>

              {/* หลักสูตรที่ 1 */}
              <div className="auth-summary-box">
                <div className="auth-summary-row">
                  <span className="stat__label">หลักสูตร: พื้นฐานวิศวกรรมซอฟต์แวร์ยุค AI</span>
                  <strong className="auth-summary-pct">
                    {stats.done}/{stats.total} บท ({stats.pct}%)
                  </strong>
                </div>
                <div className="progress" style={{ marginTop: 8 }}>
                  <div className="progress__bar" style={{ width: `${stats.pct}%` }} />
                </div>

                <div className="auth-level-mini">
                  {LEVELS.map(lv => {
                    const lvStat = getStats(lv.id);
                    return (
                      <div key={lv.id} className="auth-level-mini__item">
                        <span className={`c-${lv.id}`} style={{ fontWeight: 700, fontSize: 12 }}>
                          {lv.name}
                        </span>
                        <strong style={{ fontSize: 13.5, color: 'var(--text)' }}>
                          {lvStat.done}/{lvStat.total} บท
                        </strong>
                      </div>
                    );
                  })}
                </div>
              </div>

              {nextLesson && (
                <Link
                  href={`/lesson/${nextLesson.id}`}
                  className="auth-next-lesson"
                >
                  <div>
                    <div className="auth-next-lesson__label">
                      {stats.done === stats.total
                        ? 'ทบทวนบทเรียน'
                        : 'เรียนต่อบทถัดไป'}
                    </div>
                    <div className="auth-next-lesson__title">
                      บทที่ {String(nextLesson.no).padStart(2, '0')}: {nextLesson.tagline}
                    </div>
                  </div>
                  <span aria-hidden="true">→</span>
                </Link>
              )}

              <div className="auth-profile-actions">
                <Link className="btn btn--primary" style={{ width: '100%', justifyContent: 'center' }} href="/roadmap">
                  เปิดแผนผังการเรียน (Roadmap) →
                </Link>
                <button
                  type="button"
                  className="btn btn--outline"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={async () => {
                    await logout();
                    router.push('/');
                  }}
                >
                  ออกจากระบบ
                </button>
              </div>
            </div>
          ) : (
            <div className="auth-card auth-card--minimal">
              <div className="auth-brand">
                <div className="auth-brand__icon" aria-hidden="true">
                  <svg width="26" height="26" viewBox="0 0 36 36" fill="none">
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
                </div>
                <h1 className="auth-card__title">
                  {tab === 'signin' ? 'ยินดีต้อนรับสู่ LernDev' : 'สร้างบัญชีผู้เรียนใหม่'}
                </h1>
                <p className="auth-card__sub">
                  {tab === 'signin'
                    ? 'กรอกอีเมลและรหัสผ่านเพื่อดูความก้าวหน้าการเรียนของคุณ'
                    : 'สมัครสมาชิกฟรีเพื่อเริ่มบันทึกความคืบหน้าหลักสูตร Software Engineer (12 บทเรียน)'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="auth-form">
                {tab === 'signup' && (
                  <div className="auth-field">
                    <label htmlFor="displayName">ชื่อที่ใช้แสดง</label>
                    <div className="auth-input-wrap">
                      <span className="auth-input-icon" aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="8" r="4" />
                          <path d="M4 20c1.8-3.6 5-5.5 8-5.5s6.2 1.9 8 5.5" />
                        </svg>
                      </span>
                      <input
                        id="displayName"
                        type="text"
                        className="auth-input auth-input--with-icon"
                        placeholder="เช่น Somchai"
                        value={displayName}
                        onChange={e => setDisplayName(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                <div className="auth-field">
                  <label htmlFor="email">อีเมล</label>
                  <div className="auth-input-wrap">
                    <span className="auth-input-icon" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <path d="m3 7 9 6 9-6" />
                      </svg>
                    </span>
                    <input
                      id="email"
                      type="email"
                      className="auth-input auth-input--with-icon"
                      placeholder="you@example.com"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="auth-field">
                  <label htmlFor="password">รหัสผ่าน</label>
                  <div className="auth-input-wrap">
                    <span className="auth-input-icon" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="4" y="11" width="16" height="10" rx="2" />
                        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                      </svg>
                    </span>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      className="auth-input auth-input--with-icon auth-input--with-toggle"
                      placeholder="อย่างน้อย 6 ตัวอักษร"
                      required
                      minLength={6}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="auth-pw-toggle"
                      onClick={() => setShowPassword(prev => !prev)}
                      tabIndex={-1}
                    >
                      {showPassword ? 'ซ่อน' : 'แสดง'}
                    </button>
                  </div>
                </div>

                {errorMsg && <div className="auth-error">{errorMsg}</div>}

                <button
                  type="submit"
                  className="btn btn--primary auth-submit-btn"
                  disabled={loading}
                >
                  {loading
                    ? 'กำลังดำเนินการ...'
                    : tab === 'signin'
                    ? 'เข้าสู่ระบบ →'
                    : 'สร้างบัญชีผู้เรียน →'}
                </button>
              </form>

              <div className="auth-switch-foot">
                {tab === 'signin' ? (
                  <>
                    ยังไม่มีบัญชีผู้เรียนใช่ไหม?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setTab('signup');
                        setErrorMsg(null);
                      }}
                    >
                      สมัครสมาชิกฟรี
                    </button>
                  </>
                ) : (
                  <>
                    มีบัญชีอยู่แล้วใช่ไหม?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setTab('signin');
                        setErrorMsg(null);
                      }}
                    >
                      เข้าสู่ระบบ
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
