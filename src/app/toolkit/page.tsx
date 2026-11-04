'use client';

import React, { useEffect, useState } from 'react';
import {
  REVIEW_CHECKLIST,
  SPEC_TEMPLATES
} from '@/data/lessons';
import { useProgress } from '@/context/ProgressContext';

const KEY_CHECKLIST = 'lernweb:checklist';

export default function ToolkitPage() {
  const { showToast } = useProgress();
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

  const totalCheckItems = REVIEW_CHECKLIST.reduce((acc, g) => acc + g.items.length, 0);

  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1>เครื่องมือและเทมเพลตสำหรับ Software Engineer</h1>
          <p>
            รวบรวมเทมเพลตการวางแผนงานก่อนสั่ง AI เขียนโค้ด และเช็กลิสต์ตรวจสอบคุณภาพโค้ดก่อนนำขึ้นระบบจริง
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
    </>
  );
}
