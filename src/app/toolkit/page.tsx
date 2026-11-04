'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  LESSONS,
  LEVELS,
  REVIEW_CHECKLIST,
  SPEC_TEMPLATES
} from '@/data/lessons';
import { useProgress } from '@/context/ProgressContext';

const KEY_CHECKLIST = 'lernweb:checklist';

export default function ToolkitPage() {
  const { isDone, toggleDone, resetProgress, getStats, showToast } = useProgress();
  const [activeTab, setActiveTab] = useState<'context' | 'design' | 'backlog'>('context');
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY_CHECKLIST);
      if (saved) setCheckedItems(JSON.parse(saved));
    } catch {
      // ignore
    }
  }, []);

  const toggleCheckItem = (id: string) => {
    setCheckedItems(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      try {
        localStorage.setItem(KEY_CHECKLIST, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const resetChecklist = () => {
    setCheckedItems([]);
    try {
      localStorage.removeItem(KEY_CHECKLIST);
    } catch {
      // ignore
    }
    showToast('ล้างเช็กลิสต์เรียบร้อยแล้ว');
  };

  const copyTemplate = async () => {
    const text = SPEC_TEMPLATES[activeTab].content;
    try {
      await navigator.clipboard.writeText(text);
      showToast(`คัดลอกเทมเพลต ${SPEC_TEMPLATES[activeTab].filename} แล้ว`);
    } catch {
      showToast('คัดลอกแล้ว');
    }
  };

  const totalStats = getStats();
  const totalCheckItems = REVIEW_CHECKLIST.reduce((acc, g) => acc + g.items.length, 0);

  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1>เครื่องมือและเทมเพลตสำหรับ Software Engineer</h1>
          <p>
            รวบรวมเทมเพลตการวางแผนงานก่อนสั่ง AI เขียนโค้ด เช็กลิสต์ตรวจสอบคุณภาพโค้ดก่อนนำขึ้นระบบจริง และสรุปความก้าวหน้าการเรียนของคุณ
          </p>
        </div>
      </section>

      {/* 1. Spec-Driven Development Templates */}
      <section className="tool-section" id="templates">
        <div className="container">
          <h2>1. เทมเพลตวางแผนงาน (Spec-Driven Development)</h2>
          <p>
            ก่อนสั่งให้ AI สร้างโปรเจกต์ขนาดใหญ่ การเขียนแผนลงในไฟล์ทั้ง 3 นี้ช่วยให้ได้โค้ดที่ตรงความต้องการและไม่หลุดขอบเขต
          </p>

          <div className="tpl-tabs" role="tablist">
            {(['context', 'design', 'backlog'] as const).map(key => (
              <button
                key={key}
                type="button"
                className={`tpl-tab ${activeTab === key ? 'is-active' : ''}`}
                onClick={() => setActiveTab(key)}
              >
                {SPEC_TEMPLATES[key].filename}
              </button>
            ))}
          </div>

          <div className="tpl-body">
            <button type="button" className="copy-btn" onClick={copyTemplate}>
              คัดลอกเทมเพลต
            </button>
            <pre>{SPEC_TEMPLATES[activeTab].content}</pre>
          </div>
        </div>
      </section>

      {/* 2. AI Code Review Checklist */}
      <section className="tool-section" id="checklist">
        <div className="container">
          <h2>2. เช็กลิสต์รีวิวโค้ดที่เขียนโดย AI</h2>
          <p>
            ใช้รายการด้านล่างตรวจทานโค้ดทุกครั้งก่อน merge หรือนำขึ้นใช้งานจริง ({checkedItems.length}/{totalCheckItems} ข้อ)
          </p>

          <div className="checklist">
            {REVIEW_CHECKLIST.map(group => (
              <div key={group.id} className="check-group">
                <h3>{group.title}</h3>
                {group.items.map(item => (
                  <label key={item.id}>
                    <input
                      type="checkbox"
                      checked={checkedItems.includes(item.id)}
                      onChange={() => toggleCheckItem(item.id)}
                    />
                    <span>{item.text}</span>
                  </label>
                ))}
              </div>
            ))}
          </div>

          <div className="check-actions">
            <button type="button" className="btn btn--outline" onClick={resetChecklist}>
              ล้างเครื่องหมายเช็กลิสต์ทั้งหมด
            </button>
          </div>
        </div>
      </section>

      {/* 3. Personal Learning Progress */}
      <section className="tool-section" id="progress">
        <div className="container">
          <h2>3. ความก้าวหน้าการเรียนของฉัน</h2>
          <p>
            ข้อมูลบันทึกไว้ในเบราว์เซอร์ของคุณโดยอัตโนมัติ สามารถกดเปลี่ยนสถานะแต่ละบทเรียนได้จากตารางด้านล่าง
          </p>

          <div className="stats">
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

          <div className="table-wrap" style={{ marginTop: 24 }}>
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: 70 }}>บทที่</th>
                  <th>หัวข้อบทเรียน</th>
                  <th style={{ width: 140 }}>ระดับ</th>
                  <th style={{ width: 160 }}>สถานะ</th>
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

          <div className="check-actions">
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
        </div>
      </section>
    </>
  );
}

