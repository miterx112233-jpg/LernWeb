'use client';

import React from 'react';
import Link from 'next/link';
import { LESSONS, LEVELS } from '@/data/lessons';
import { ARTICLES } from '@/data/articles';
import { useProgress } from '@/context/ProgressContext';
import { ArticleBanner } from '@/components/ArticleViewer';

export default function HomePage() {
  const { isDone, getStats } = useProgress();

  const nextLesson = LESSONS.find(l => !isDone(l.id)) || LESSONS[0];

  return (
    <>
      {/* 1. HERO SECTION — เกริ่นยุค AI (โทนเรียบ ไม่ขายของ) */}
      <section className="container hero">
        <div>
          <p className="hero__eyebrow">คู่มือพื้นฐานสำหรับคนที่อยากเป็น Software Engineer</p>
          <h1 className="hero__title">
            AI เขียนโค้ดให้เราได้แล้ว
            <br />
            แต่คนที่ต้องเข้าใจ<span className="brand">ว่ามันถูกหรือผิด</span>
            <br />
            ยังเป็นเรา
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
            <Link className="btn btn--primary" href={`/lesson/${nextLesson.id}`}>
              {nextLesson.no > 1 ? `เรียนต่อ บทที่ ${nextLesson.no}` : 'เริ่มจากบทแรก'}
            </Link>
            <Link className="link" href="/roadmap">
              ดู Roadmap ทั้งหมด →
            </Link>
          </div>
        </div>

        {/* ภาพประกอบฝั่งขวา: หน้าจอ Code Review แบบ GitHub ธรรมดา */}
        <div className="review" aria-label="ตัวอย่างการรีวิวโค้ด">
          <div className="review__head">
            <span className="review__file">routes/login.js</span>
            <span className="muted">Pull request #42</span>
          </div>
          <div className="review__code">
            <div className="review__line">
              <span className="ln">12</span>
              <span className="code">{"app.post('/login', async (req, res) => {"}</span>
            </div>
            <div className="review__line">
              <span className="ln">13</span>
              <span className="code">{'  const sql = `SELECT * FROM users'}</span>
            </div>
            <div className="review__line is-bad">
              <span className="ln">14</span>
              <span className="code">{"    WHERE email = '${req.body.email}'`;"}</span>
            </div>
            <div className="review__line">
              <span className="ln">15</span>
              <span className="code">{'  const user = await db.query(sql);'}</span>
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

      {/* 4. เส้นทางการเรียน 3 ระดับ (Basic -> Intermediate -> Advanced) */}
      <section className="section section--alt">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 className="section-title">เส้นทางการเรียน</h2>
              <p className="section-sub">12 บท แบ่งเป็น 3 ระดับ แนะนำให้เรียนตามลำดับ</p>
            </div>
            <Link className="link" href="/roadmap">
              ดูแบบละเอียด →
            </Link>
          </div>
          <div className="levels">
            {LEVELS.map(lv => {
              const stats = getStats(lv.id);
              const lessons = LESSONS.filter(l => l.level === lv.id);
              return (
                <div key={lv.id} className="level-box">
                  <div className="level-box__head">
                    <p className={`level-box__label c-${lv.id}`}>{lv.label}</p>
                    <h3 className="level-box__title">{lv.title}</h3>
                    <p className="muted" style={{ fontSize: 13, marginTop: 4 }}>
                      เรียนแล้ว {stats.done}/{stats.total} บท
                    </p>
                  </div>
                  <ul>
                    {lessons.map(l => (
                      <li key={l.id}>
                        <Link href={`/lesson/${l.id}`}>
                          <span>
                            <span className="num">{String(l.no).padStart(2, '0')}</span>
                            {l.tagline}
                          </span>
                          {isDone(l.id) && (
                            <span className="check" title="เรียนแล้ว">
                              ✓
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
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

