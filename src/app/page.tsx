'use client';

import React from 'react';
import Link from 'next/link';
import { LESSONS, LEVELS } from '@/data/lessons';
import { ALL_LESSONS } from '@/data/courses';
import { ARTICLES } from '@/data/articles';
import { useProgress } from '@/context/ProgressContext';
import { ArticleBanner } from '@/components/ArticleViewer';

export default function HomePage() {
  const { user, lastLessonId, isDone, isLessonUnlocked, getStats, showToast } = useProgress();

  const totalStats = getStats();
  const lastVisitedLesson =
    lastLessonId && isLessonUnlocked(lastLessonId)
      ? ALL_LESSONS.find(l => l.id === lastLessonId)
      : null;
  const firstUncompletedLesson = LESSONS.find(l => !isDone(l.id)) || LESSONS[0];

  // หากบทล่าสุดที่เปิดดูยังเรียนไม่จบ ให้พาไปเรียนต่อบทนั้น แต่ถ้าเรียนจบแล้วให้พาไปบทถัดไปที่ยังไม่ได้เรียน
  const resumeLesson =
    lastVisitedLesson && !isDone(lastVisitedLesson.id)
      ? lastVisitedLesson
      : firstUncompletedLesson;

  const currentLevel = LEVELS.find(lv => lv.id === resumeLesson.level) || LEVELS[0];
  const levelStats = getStats(currentLevel.id);

  return (
    <>
      {/* 1. HERO SECTION — เกริ่นยุค AI */}
      <section className="container hero">
        <div>
          <p className="hero__eyebrow">คู่มือพื้นฐานสำหรับคนที่อยากเป็น Software Engineer</p>
          <h1 className="hero__title">
            AI เขียนโค้ดให้เราได้แล้ว
            <br />
            แต่คนที่ต้องเข้าใจ
            <br />
            <span className="hero__grad-cyan">ว่ามันถูกหรือผิด</span>
            <br />
            <span className="hero__grad-purple">ยังเป็นเรา</span>
          </h1>
          <p className="hero__p">
            ทุกวันนี้แค่พิมพ์บอกว่าอยากได้อะไร AI ก็เขียนโค้ดออกมาให้ได้เกือบทุกอย่าง
            แต่เวลาโค้ดพัง ระบบช้า หรือมีช่องโหว่ AI ไม่ได้รับผิดชอบแทนเรา
          </p>
          <p className="hero__p">
            เว็บนี้รวบรวมพื้นฐานที่ควรรู้ เรียงจากเรื่องง่ายไปเรื่องยาก
            เพื่อให้ใช้ AI ได้อย่างคนที่รู้ว่ากำลังทำอะไรอยู่
          </p>
          <div className="hero__cta">
            {user ? (
              <>
                <Link className="btn btn--primary" href={`/lesson/${resumeLesson.id}`}>
                  {resumeLesson.no > 1 || lastVisitedLesson
                    ? `เรียนต่อ บทที่ ${resumeLesson.no}`
                    : 'เริ่มจากบทแรก'}
                </Link>
                <Link className="btn btn--glass" href="/roadmap">
                  ดู Roadmap ทั้งหมด →
                </Link>
              </>
            ) : (
              <>
                <Link className="btn btn--primary" href="/login">
                  🔒 เข้าสู่ระบบเพื่อเริ่มเรียนตามแผนผัง
                </Link>
                <Link className="btn btn--glass" href="/articles">
                  อ่านบทความทั่วไปฟรี →
                </Link>
              </>
            )}
          </div>
        </div>

        {/* ภาพประกอบฝั่งขวา: หน้าจอ Code Review สไตล์ IDE พร้อมไฟ 3 ดวง */}
        <div className="review" aria-label="ตัวอย่างการรีวิวโค้ด">
          <div className="review__dots-bar" aria-hidden="true">
            <span className="review__dot review__dot--red" />
            <span className="review__dot review__dot--yellow" />
            <span className="review__dot review__dot--green" />
          </div>
          <div className="review__head">
            <span className="review__file">routes/login.js</span>
            <span className="muted">Pull request #42</span>
          </div>
          <div className="review__code">
            <div className="review__line">
              <span className="ln">12</span>
              <span className="code">
                <span className="syn-fn">app.post</span>(
                <span className="syn-str">&apos;/login&apos;</span>,{' '}
                <span className="syn-kw">async</span> (req, res) =&gt; {'{'}
              </span>
            </div>
            <div className="review__line">
              <span className="ln">13</span>
              <span className="code">
                {'  '}
                <span className="syn-kw">const</span> sql ={' '}
                <span className="syn-str">`SELECT * FROM users</span>
              </span>
            </div>
            <div className="review__line is-bad">
              <span className="ln">14</span>
              <span className="code">
                {'    '}
                <span className="syn-str">WHERE email = &apos;</span>
                <span className="syn-warn">{'${req.body.email}'}</span>
                <span className="syn-str">&apos;`;</span>
              </span>
            </div>
            <div className="review__line">
              <span className="ln">15</span>
              <span className="code">
                {'  '}
                <span className="syn-kw">const</span> user ={' '}
                <span className="syn-kw">await</span> db.<span className="syn-fn">query</span>(sql);
              </span>
            </div>
            <div className="review__line">
              <span className="ln">16</span>
              <span className="code">{'  ...'}</span>
            </div>
          </div>
          <div className="review__comment">
            <div className="avatar">พต</div>
            <div>
              <p style={{ fontSize: 13 }}>
                <b>พี่ต้น</b> <span className="muted">· reviewer</span>
              </p>
              <p className="text2" style={{ marginTop: 4, lineHeight: 1.75 }}>
                บรรทัด 14 เอาค่าจาก user ต่อลง SQL ตรงๆ แบบนี้โดน SQL Injection ได้นะ ลองเปลี่ยนไปใช้ parameterized query ดู
              </p>
            </div>
          </div>
          <div className="review__note">
            โค้ดชุดนี้ generate มาจาก AI · ถ้าไม่รู้เรื่อง Database กับ Security ก็จะไม่เห็นปัญหานี้ —{' '}
            <Link className="link" href="/lesson/database-systems">
              อ่านบทที่ 7
            </Link>
          </div>
        </div>
      </section>

      {/* 2. ทำไมยังต้องเรียนพื้นฐาน ในเมื่อมี AI แล้ว */}
      <section className="section section--alt" id="about">
        <div className="container why">
          <div>
            <h2 className="section-title">
              ทำไมยังต้องเรียนพื้นฐาน
              <br />
              ในเมื่อมี AI แล้ว
            </h2>
            <p className="section-sub" style={{ lineHeight: 1.8 }}>
              AI ช่วยให้เขียนโค้ดเร็วขึ้น แต่ไม่ได้ทำให้งานคิดและการตัดสินใจหายไป
            </p>
          </div>
          <ol className="why__list">
            <li>
              <span className="why__num">01</span>
              <div>
                <h3>สั่งงานได้ดี ต้องรู้ก่อนว่าจะสั่งอะไร</h3>
                <p>
                  ถ้าไม่รู้จัก API, state หรือ index ก็อธิบายสิ่งที่ต้องการได้ไม่ชัด ผลลัพธ์ที่ได้ก็ไม่ชัดตาม
                </p>
              </div>
            </li>
            <li>
              <span className="why__num">02</span>
              <div>
                <h3>อ่านโค้ดที่ได้มาแล้วรู้ว่ามีปัญหาตรงไหน</h3>
                <p>
                  AI ตอบผิดได้ด้วยน้ำเสียงที่มั่นใจมาก การรีวิวโค้ดเป็นทักษะที่สำคัญขึ้นกว่าเดิม
                </p>
              </div>
            </li>
            <li>
              <span className="why__num">03</span>
              <div>
                <h3>แก้ปัญหาเองได้เมื่อ AI วนอยู่ที่เดิม</h3>
                <p>
                  ระบบจริงซับซ้อนกว่าตัวอย่าง ความเข้าใจว่าข้อมูลวิ่งผ่านอะไรบ้างช่วยหาต้นเหตุได้เร็วกว่า
                </p>
              </div>
            </li>
            <li>
              <span className="why__num">04</span>
              <div>
                <h3>มองภาพรวมของระบบ ไม่ใช่แค่ทีละไฟล์</h3>
                <p>
                  การเลือกฐานข้อมูล วางโครงสร้าง หรือรองรับผู้ใช้จำนวนมาก ยังต้องอาศัยการตัดสินใจของคน
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* 3. ตารางแบ่งงานกันให้ชัด */}
      <section className="section">
        <div className="container">
          <div className="section-head" style={{ marginBottom: 24 }}>
            <div>
              <h2 className="section-title">แบ่งงานกันให้ชัด</h2>
              <p className="section-sub">ส่วนไหนให้ AI ช่วยได้ ส่วนไหนควรเข้าใจเอง</p>
            </div>
          </div>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: '50%' }}>ให้ AI ช่วยได้</th>
                  <th>ควรเข้าใจเอง</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>เขียนโค้ดซ้ำๆ เช่น CRUD, form, boilerplate</td>
                  <td>ข้อมูลวิ่งจาก browser ไป server และ database อย่างไร</td>
                </tr>
                <tr>
                  <td>อธิบายโค้ดที่อ่านไม่เข้าใจ</td>
                  <td>โค้ดไหนช้า ไม่ปลอดภัย หรือดูแลต่อยาก</td>
                </tr>
                <tr>
                  <td>ร่าง test case และเอกสาร</td>
                  <td>ควรเลือกเทคโนโลยีและโครงสร้างแบบไหนให้เหมาะกับงาน</td>
                </tr>
                <tr>
                  <td>เสนอวิธีแก้ปัญหาหลายแบบ</td>
                  <td>LLM ทำงานอย่างไร และมีข้อจำกัดอะไรบ้าง</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. บทเรียนปัจจุบันและความก้าวหน้า (ตามตัวอย่าง Image 1) */}
      <section className="section section--alt" id="progress">
        <div className="container">
          <div className="section-head" style={{ maxWidth: 860, margin: '0 auto 20px' }}>
            <div>
              <h2 className="section-title">บทเรียนปัจจุบันของคุณ</h2>
              <p className="section-sub">
                {user
                  ? 'ระบบบันทึกด่านที่คุณกำลังเรียนอยู่ เพื่อให้คุณกดเรียนต่อและทำแบบทดสอบได้ทันที'
                  : 'หลักสูตร Software Engineer 12 บทเรียน พร้อมแบบทดสอบท้ายบท 240 ข้อ'}
              </p>
            </div>
            <Link className="link" href={user ? '/roadmap' : '/login'}>
              {user ? 'ดูแผนผังทั้งหมด (Roadmap) →' : 'เข้าสู่ระบบเพื่อเปิด Roadmap →'}
            </Link>
          </div>

          {/* แถบสรุปความก้าวหน้ารวม (Top Progress Bar ตาม Image 1) */}
          <div
            style={{
              padding: '16px 22px',
              marginBottom: 24,
              borderRadius: 14,
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              maxWidth: 860,
              margin: '0 auto 24px'
            }}
          >
            {user ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 18 }} aria-hidden="true">📖</span>
                    <span style={{ fontWeight: 700, fontSize: 14.5, color: 'var(--text)' }}>
                      ความก้าวหน้ารวมทั้งหมด:
                    </span>
                    <span style={{ fontWeight: 800, fontSize: 14.5, color: 'var(--brand)', marginLeft: 4 }}>
                      {totalStats.done} / {totalStats.total} บทเรียน ({totalStats.pct}%)
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '4px 12px',
                      borderRadius: 999,
                      border: '1px solid var(--border)',
                      background: 'rgba(255, 255, 255, 0.04)',
                      fontSize: 12.5,
                      color: 'var(--text2)'
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <span>ลิงก์กับบัญชี <strong>{user.displayName}</strong></span>
                  </div>
                </div>
                <div className="progress" style={{ height: 6 }}>
                  <div className="progress__bar" style={{ width: `${totalStats.pct}%` }} />
                </div>
              </>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 18 }} aria-hidden="true">📖</span>
                    <span style={{ fontWeight: 700, fontSize: 14.5, color: 'var(--text)' }}>
                      หลักสูตร Software Engineer (12 บทเรียน)
                    </span>
                  </div>
                  <span className="muted" style={{ fontSize: 12.5 }}>
                    🔒 เข้าสู่ระบบฟรีเพื่อบันทึกผลการสอบรายบุคคล
                  </span>
                </div>
                <div className="progress" style={{ height: 6 }}>
                  <div className="progress__bar" style={{ width: `8%` }} />
                </div>
              </>
            )}
          </div>

          {/* การ์ดบทเรียนปัจจุบันแบบ Hero ตามตัวอย่าง Image 1 */}
          <div className="active-lesson-hero">
            {/* ประกายดาวนีออนด้านขวาบนตาม Image 1 */}
            <div
              style={{
                position: 'absolute',
                top: -30,
                right: -30,
                width: 260,
                height: 260,
                background: 'radial-gradient(circle, rgba(56, 189, 248, 0.22) 0%, rgba(139, 92, 246, 0.12) 40%, transparent 70%)',
                pointerEvents: 'none'
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 34,
                right: 38,
                color: '#38BDF8',
                opacity: 0.38,
                pointerEvents: 'none',
                filter: 'drop-shadow(0 0 12px rgba(56, 189, 248, 0.6))'
              }}
            >
              <svg width="72" height="72" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
              </svg>
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              {/* ป้ายแสดงระดับและสถิติของระดับนั้น */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, flexWrap: 'wrap' }}>
                <span
                  className={`tag tag--${resumeLesson.level}`}
                  style={{
                    fontSize: 12.5,
                    fontWeight: 700,
                    padding: '4px 12px',
                    borderRadius: 999,
                    letterSpacing: '0.4px'
                  }}
                >
                  {currentLevel.label}
                </span>
                <span style={{ fontSize: 13, color: 'var(--text2)', fontWeight: 500 }}>
                  {user ? `${levelStats.done}/${levelStats.total} บท (${levelStats.pct}%)` : 'บทเรียนเริ่มต้น'}
                </span>
                {user && isDone(resumeLesson.id) && (
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      padding: '2px 10px',
                      borderRadius: 999,
                      background: 'rgba(52, 211, 153, 0.15)',
                      color: '#34D399',
                      border: '1px solid rgba(52, 211, 153, 0.35)'
                    }}
                  >
                    ✓ สอบผ่านแล้ว (≥ 80%)
                  </span>
                )}
              </div>

              {/* หัวข้อบทเรียนขนาดใหญ่ตาม Image 1 */}
              <h3
                style={{
                  margin: '0 0 16px',
                  fontSize: 'clamp(24px, 4vw, 36px)',
                  fontWeight: 800,
                  color: 'var(--text)',
                  lineHeight: 1.35,
                  letterSpacing: '-0.5px'
                }}
              >
                <span style={{ color: '#38BDF8', marginRight: 12 }}>
                  {String(resumeLesson.no).padStart(2, '0')}
                </span>
                {resumeLesson.title}
              </h3>

              {/* คำอธิบายเนื้อหาบทเรียน */}
              <p
                style={{
                  margin: '0 0 28px',
                  fontSize: 15.5,
                  color: 'var(--text2)',
                  lineHeight: 1.75,
                  maxWidth: 680
                }}
              >
                {resumeLesson.summary || resumeLesson.why}
              </p>

              {/* ปุ่มเข้าสู่บทเรียนแบบ Gradient สวยงามตาม Image 1 */}
              <div>
                <Link
                  href={user ? `/lesson/${resumeLesson.id}` : '/login'}
                  className="active-lesson-btn"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
                  </svg>
                  <span>
                    {user
                      ? isDone(resumeLesson.id) && totalStats.done === totalStats.total
                        ? 'ทบทวนบทเรียนนี้ →'
                        : isDone(resumeLesson.id)
                        ? 'ทบทวนบทนี้ →'
                        : 'เข้าสู่บทเรียน →'
                      : 'เข้าสู่ระบบเพื่อเริ่มเรียนบทที่ 01 →'}
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* ลูกศรกลมชี้ลงตาม Image 1 */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid var(--border)',
                display: 'grid',
                placeItems: 'center',
                color: 'var(--muted)',
                fontSize: 14
              }}
            >
              ↓
            </div>
          </div>
        </div>
      </section>

      {/* 5. บทความแนะนำสไตล์ 9Expert (แยกจากบทเรียนใน Roadmap) */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 className="section-title">บทความล่าสุด</h2>
              <p className="section-sub">เกร็ดความรู้ กรณีศึกษา และแนวคิดการทำงานในสาย Software Engineer</p>
            </div>
            <Link className="link" href="/articles">
              ดูบทความทั้งหมด →
            </Link>
          </div>
          <div className="cards">
            {ARTICLES.map(article => (
              <Link key={article.slug} className="card" href={`/articles/${article.slug}`}>
                <ArticleBanner article={article} small />
                <div className="card__meta">
                  <span className="tag tag--intermediate">{article.category}</span>
                  <span>
                    {article.publishedAt} · อ่าน {article.minutes} นาที
                  </span>
                </div>
                <h3 className="card__title">{article.title}</h3>
                <p className="card__summary">{article.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

