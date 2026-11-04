'use client';

import React from 'react';
import Link from 'next/link';
import { LESSONS, LEVELS } from '@/data/lessons';
import { useProgress } from '@/context/ProgressContext';

export default function ProgressPage() {
  const { isDone, toggleDone, resetProgress, getStats, showToast } = useProgress();
  const totalStats = getStats();

  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1>ความก้าวหน้าการเรียนของฉัน</h1>
          <p>
            ติดตามว่าคุณเรียนผ่านบทเรียนในแผนผัง Roadmap ไปแล้วกี่บท ข้อมูลบันทึกอยู่ในเบราว์เซอร์ของคุณโดยอัตโนมัติ
          </p>
        </div>
      </section>

      <section className="container" style={{ paddingTop: 32, paddingBottom: 64 }}>
        <div className="stats" style={{ marginTop: 0 }}>
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

