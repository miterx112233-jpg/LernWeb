import React from 'react';
import Link from 'next/link';
import { Lesson, LEVELS } from '@/data/lessons';

interface LessonBannerProps {
  lesson: Lesson;
  small?: boolean;
}

function renderIllustration(lesson: Lesson) {
  if (lesson.id === 'llm' || lesson.level === 'advanced') {
    // Isometric Tech Platform & Server Nodes (สไตล์ภาพประกอบ 9Expert)
    return (
      <svg viewBox="0 0 220 180" fill="none">
        {/* Isometric Base Platform */}
        <polygon points="110,105 200,140 110,175 20,140" fill="#133B6E" stroke="#38BDF8" strokeWidth="1.5" />
        <polygon points="20,140 110,175 110,183 20,148" fill="#0A2246" />
        <polygon points="200,140 110,175 110,183 200,148" fill="#071833" />
        {/* Server Racks Left */}
        <rect x="38" y="88" width="28" height="44" rx="2" fill="#1E3A5F" stroke="#60A5FA" strokeWidth="1.2" />
        <line x1="43" y1="97" x2="61" y2="97" stroke="#5CE6A0" strokeWidth="2" />
        <line x1="43" y1="106" x2="61" y2="106" stroke="#5CE6A0" strokeWidth="2" />
        <line x1="43" y1="115" x2="61" y2="115" stroke="#38BDF8" strokeWidth="2" />
        {/* Central Core / Knowledge Cube */}
        <polygon points="115,38 158,58 115,78 72,58" fill="#38BDF8" fillOpacity="0.25" stroke="#38BDF8" strokeWidth="1.6" />
        <polygon points="72,58 115,78 115,126 72,106" fill="#1E40AF" fillOpacity="0.55" stroke="#60A5FA" strokeWidth="1.4" />
        <polygon points="158,58 115,78 115,126 158,106" fill="#0F2952" fillOpacity="0.8" stroke="#38BDF8" strokeWidth="1.4" />
        {/* Network Nodes inside Core */}
        <circle cx="115" cy="58" r="4" fill="#5CE6A0" />
        <circle cx="96" cy="78" r="3.5" fill="#F59E0B" />
        <circle cx="134" cy="78" r="3.5" fill="#5CE6A0" />
        <circle cx="115" cy="98" r="4" fill="#38BDF8" />
        <path d="M115 58L96 78L115 98L134 78Z" stroke="#E0F2FE" strokeWidth="1.2" />
        {/* Data Screen Right */}
        <rect x="164" y="70" width="34" height="48" rx="3" fill="#0F2952" stroke="#5CE6A0" strokeWidth="1.3" />
        <line x1="170" y1="80" x2="192" y2="80" stroke="#F59E0B" strokeWidth="2" />
        <line x1="170" y1="89" x2="188" y2="89" stroke="#93C5FD" strokeWidth="1.5" />
        <line x1="170" y1="97" x2="192" y2="97" stroke="#93C5FD" strokeWidth="1.5" />
      </svg>
    );
  }

  if (lesson.level === 'intermediate') {
    return (
      <svg viewBox="0 0 200 160" fill="none">
        <polygon points="100,24 170,56 100,88 30,56" fill="#1E40AF" fillOpacity="0.4" stroke="#60A5FA" strokeWidth="1.6" />
        <polygon points="100,56 170,88 100,120 30,88" fill="#0F2952" fillOpacity="0.7" stroke="#38BDF8" strokeWidth="1.6" />
        <polygon points="100,88 170,120 100,152 30,120" fill="#0A1E3C" stroke="#5CE6A0" strokeWidth="1.6" />
        <circle cx="100" cy="56" r="4" fill="#F59E0B" />
        <circle cx="100" cy="88" r="4" fill="#5CE6A0" />
        <circle cx="100" cy="120" r="4" fill="#38BDF8" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 200 160" fill="none">
      <rect x="24" y="28" width="152" height="104" rx="6" fill="#0B2244" stroke="#60A5FA" strokeWidth="1.6" />
      <line x1="24" y1="48" x2="176" y2="48" stroke="#38BDF8" strokeWidth="1.4" />
      <circle cx="38" cy="38" r="3" fill="#F87171" />
      <circle cx="48" cy="38" r="3" fill="#FBBF24" />
      <circle cx="58" cy="38" r="3" fill="#4ADE80" />
      <line x1="42" y1="68" x2="96" y2="68" stroke="#F59E0B" strokeWidth="3" />
      <line x1="42" y1="84" x2="144" y2="84" stroke="#5CE6A0" strokeWidth="2.5" />
      <line x1="42" y1="100" x2="122" y2="100" stroke="#93C5FD" strokeWidth="2.5" />
    </svg>
  );
}

export function LessonBanner({ lesson, small = false }: LessonBannerProps) {
  return (
    <div className={`banner ${small ? 'banner--sm' : ''}`}>
      <div className="banner__grid" />
      <span className="banner__cat">
        <span className="banner__cat-dot" />
        {lesson.category}
      </span>
      <span className="banner__logo">LernDev</span>
      <div className="banner__text">
        <div className="banner__key">{lesson.keyword}</div>
        <div className="banner__sub">{lesson.subtitle}</div>
        <div className="banner__tagline">{lesson.tagline}</div>
      </div>
      <div className="banner__art">{renderIllustration(lesson)}</div>
      <span className="banner__by">บทความโดย: LernDev Training</span>
      <span className="banner__slogan">
        Never Stop
        <br />
        Learning
      </span>
    </div>
  );
}

interface LessonCardProps {
  lesson: Lesson;
  isDone?: boolean;
}

export function LessonCard({ lesson, isDone = false }: LessonCardProps) {
  const lv = LEVELS.find(item => item.id === lesson.level);
  return (
    <Link className="card" href={`/lesson/${lesson.id}`}>
      <LessonBanner lesson={lesson} small />
      <div className="card__meta">
        <span className={`tag tag--${lesson.level}`}>{lv?.name}</span>
        <span>
          บทที่ {lesson.no} · อ่าน {lesson.minutes} นาที
        </span>
        {isDone && <span className="card__done">✓ เรียนแล้ว</span>}
      </div>
      <h3 className="card__title">{lesson.title}</h3>
      <p className="card__summary">{lesson.summary}</p>
    </Link>
  );
}

