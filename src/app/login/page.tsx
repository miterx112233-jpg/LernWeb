'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProgress } from '@/context/ProgressContext';
import { signInUser, signUpUser } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const { user, loginWithUser, logout, getStats, showToast } = useProgress();

  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
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
          showToast(`ยินดีต้อนรับคุณ ${res.user.displayName}!`);
          router.push('/progress');
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
          router.push('/progress');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const stats = getStats();

  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1>เข้าสู่ระบบ / สมัครสมาชิก</h1>
          <p>
            เข้าสู่ระบบเพื่อบันทึกและติดตามความก้าวหน้าการเรียนแต่ละบทเรียนตามบัญชีของคุณ
          </p>
        </div>
      </section>

      <section className="container" style={{ paddingTop: 36, paddingBottom: 72 }}>
        <div className="auth-wrap">
          {user ? (
            <div className="auth-card">
              <div className="auth-badge-row">
                <span className="tag tag--basic">● เข้าสู่ระบบแล้ว</span>
              </div>

              <h2 className="auth-card__title" style={{ marginTop: 14 }}>
                สวัสดีคุณ {user.displayName}
              </h2>
              <p className="auth-card__sub">{user.email}</p>

              <div className="auth-summary-box">
                <div>
                  <div className="stat__label">ความก้าวหน้าของคุณ</div>
                  <div className="stat__value">
                    {stats.done}/{stats.total} บทเรียน ({stats.pct}%)
                  </div>
                </div>
                <div className="progress" style={{ marginTop: 10 }}>
                  <div className="progress__bar" style={{ width: `${stats.pct}%` }} />
                </div>
              </div>

              <div className="hero__actions" style={{ marginTop: 22 }}>
                <Link className="btn btn--primary" href="/progress">
                  ดูตารางความก้าวหน้าของฉัน
                </Link>
                <Link className="btn btn--outline" href="/roadmap">
                  ไปหน้าแผนผังการเรียน
                </Link>
                <button
                  type="button"
                  className="btn btn--outline"
                  onClick={() => logout()}
                >
                  ออกจากระบบ
                </button>
              </div>
            </div>
          ) : (
            <div className="auth-card">
              <div className="auth-tabs" style={{ marginTop: 0 }}>
                <button
                  type="button"
                  className={`auth-tab ${tab === 'signin' ? 'is-active' : ''}`}
                  onClick={() => {
                    setTab('signin');
                    setErrorMsg(null);
                  }}
                >
                  เข้าสู่ระบบ
                </button>
                <button
                  type="button"
                  className={`auth-tab ${tab === 'signup' ? 'is-active' : ''}`}
                  onClick={() => {
                    setTab('signup');
                    setErrorMsg(null);
                  }}
                >
                  สมัครสมาชิกใหม่
                </button>
              </div>

              <form onSubmit={handleSubmit} className="auth-form">
                {tab === 'signup' && (
                  <div className="auth-field">
                    <label htmlFor="displayName">ชื่อที่ใช้แสดง</label>
                    <input
                      id="displayName"
                      type="text"
                      className="auth-input"
                      placeholder="เช่น Somchai"
                      value={displayName}
                      onChange={e => setDisplayName(e.target.value)}
                    />
                  </div>
                )}

                <div className="auth-field">
                  <label htmlFor="email">อีเมล</label>
                  <input
                    id="email"
                    type="email"
                    className="auth-input"
                    placeholder="you@example.com"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>

                <div className="auth-field">
                  <label htmlFor="password">รหัสผ่าน (อย่างน้อย 6 ตัวอักษร)</label>
                  <input
                    id="password"
                    type="password"
                    className="auth-input"
                    placeholder="••••••••"
                    required
                    minLength={6}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>

                {errorMsg && <div className="auth-error">{errorMsg}</div>}

                <button
                  type="submit"
                  className="btn btn--primary"
                  style={{ width: '100%', justifyContent: 'center', marginTop: 6 }}
                  disabled={loading}
                >
                  {loading
                    ? 'กำลังดำเนินการ...'
                    : tab === 'signin'
                    ? 'เข้าสู่ระบบ'
                    : 'สมัครสมาชิก'}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
