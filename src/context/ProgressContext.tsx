'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CourseId, LESSONS, LevelId } from '@/data/lessons';
import { ALL_LESSONS, getCourseLessons, getLessonCourseId } from '@/data/courses';
import {
  AppUser,
  fetchUserProgress,
  getSavedSession,
  saveUserProgressToCloud,
  signOutUser
} from '@/lib/supabase';

interface ProgressStats {
  done: number;
  total: number;
  pct: number;
}

interface ProgressContextType {
  user: AppUser | null;
  isSyncing: boolean;
  completed: string[];
  lastLessonId: string | null;
  theme: 'light' | 'dark';
  isDone: (id: string) => boolean;
  isLessonUnlocked: (id: string) => boolean;
  toggleDone: (id: string) => boolean;
  recordLastLesson: (id: string) => void;
  resetProgress: () => void;
  getStats: (level?: LevelId) => ProgressStats;
  getCourseStats: (courseId: CourseId) => ProgressStats;
  toggleTheme: () => void;
  loginWithUser: (user: AppUser) => Promise<void>;
  logout: () => Promise<void>;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const KEY_GUEST_DONE = 'lernweb:completed';
const KEY_GUEST_LAST = 'lernweb:last_lesson';
const KEY_THEME = 'lernweb:theme';

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [completed, setCompleted] = useState<string[]>([]);
  const [lastLessonId, setLastLessonId] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedTheme = (localStorage.getItem(KEY_THEME) as 'light' | 'dark') || 'dark';
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);

      const sessionUser = getSavedSession();
      if (sessionUser) {
        setUser(sessionUser);
        setIsSyncing(true);
        const cachedDone = localStorage.getItem(`lernweb:completed:${sessionUser.id}`);
        if (cachedDone) {
          try {
            setCompleted(JSON.parse(cachedDone));
          } catch {
            // ignore
          }
        }
        const cachedLast = localStorage.getItem(`lernweb:last:${sessionUser.id}`);
        if (cachedLast) setLastLessonId(cachedLast);
        fetchUserProgress(sessionUser)
          .then(res => {
            setCompleted(res.completedLessons);
            if (res.lastLessonId) {
              setLastLessonId(res.lastLessonId);
            }
          })
          .finally(() => setIsSyncing(false));
      } else {
        const savedDone = localStorage.getItem(KEY_GUEST_DONE);
        if (savedDone) setCompleted(JSON.parse(savedDone));
        const savedLast = localStorage.getItem(KEY_GUEST_LAST);
        if (savedLast) setLastLessonId(savedLast);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(current => (current === msg ? null : current));
    }, 2400);
  };

  const loginWithUser = async (loggedInUser: AppUser) => {
    setUser(loggedInUser);
    setIsSyncing(true);
    try {
      const cachedDone = localStorage.getItem(`lernweb:completed:${loggedInUser.id}`);
      if (cachedDone) {
        try {
          setCompleted(JSON.parse(cachedDone));
        } catch {
          // ignore
        }
      }
      const cachedLast = localStorage.getItem(`lernweb:last:${loggedInUser.id}`);
      if (cachedLast) setLastLessonId(cachedLast);

      const remote = await fetchUserProgress(loggedInUser);
      setCompleted(remote.completedLessons);
      setLastLessonId(remote.lastLessonId || cachedLast || null);
    } finally {
      setIsSyncing(false);
    }
  };

  const logout = async () => {
    setUser(null);
    try {
      const guestDone = localStorage.getItem(KEY_GUEST_DONE);
      setCompleted(guestDone ? JSON.parse(guestDone) : []);
      const guestLast = localStorage.getItem(KEY_GUEST_LAST);
      setLastLessonId(guestLast || null);
    } catch {
      setCompleted([]);
      setLastLessonId(null);
    }
    showToast('ออกจากระบบเรียบร้อยแล้ว');
    await signOutUser();
  };

  const isDone = (id: string) => completed.includes(id);

  // ตรวจสอบว่าบทเรียนนี้ปลดล็อกหรือยัง (ต้องสอบผ่านบทก่อนหน้าครบทุกบทตามลำดับ "ภายในหลักสูตรเดียวกัน")
  const isLessonUnlocked = (id: string) => {
    const lesson = ALL_LESSONS.find(l => l.id === id);
    if (!lesson || lesson.no <= 1) return true;
    return getCourseLessons(getLessonCourseId(lesson))
      .filter(l => l.no < lesson.no)
      .every(l => completed.includes(l.id));
  };

  const recordLastLesson = (id: string) => {
    setLastLessonId(prev => {
      if (prev === id) return prev;
      try {
        if (user) {
          localStorage.setItem(`lernweb:last:${user.id}`, id);
          saveUserProgressToCloud(user, completed, id);
        } else {
          localStorage.setItem(KEY_GUEST_LAST, id);
        }
      } catch {
        // ignore
      }
      return id;
    });
  };

  const toggleDone = (id: string) => {
    const exists = completed.includes(id);
    const added = !exists;
    const next = exists ? completed.filter(item => item !== id) : [...completed, id];
    setCompleted(next);
    setLastLessonId(id);

    if (user) {
      setIsSyncing(true);
      try {
        localStorage.setItem(`lernweb:last:${user.id}`, id);
      } catch {
        // ignore
      }
      saveUserProgressToCloud(user, next, id).finally(() => setIsSyncing(false));
    } else {
      try {
        localStorage.setItem(KEY_GUEST_DONE, JSON.stringify(next));
        localStorage.setItem(KEY_GUEST_LAST, id);
      } catch {
        // ignore
      }
    }
    return added;
  };

  const resetProgress = () => {
    setCompleted([]);
    setLastLessonId(null);
    if (user) {
      setIsSyncing(true);
      try {
        localStorage.removeItem(`lernweb:last:${user.id}`);
      } catch {
        // ignore
      }
      saveUserProgressToCloud(user, []).finally(() => setIsSyncing(false));
    } else {
      try {
        localStorage.removeItem(KEY_GUEST_DONE);
        localStorage.removeItem(KEY_GUEST_LAST);
      } catch {
        // ignore
      }
    }
  };

  const getStats = (level?: LevelId): ProgressStats => {
    const list = level ? LESSONS.filter(l => l.level === level) : LESSONS;
    const done = list.filter(l => completed.includes(l.id)).length;
    const total = list.length;
    const pct = total ? Math.round((done / total) * 100) : 0;
    return { done, total, pct };
  };

  // สถิติแยกตามหลักสูตร (เช่น หลักสูตรที่ 2: AI Coding & Future Tech)
  const getCourseStats = (courseId: CourseId): ProgressStats => {
    const list = getCourseLessons(courseId);
    const done = list.filter(l => completed.includes(l.id)).length;
    const total = list.length;
    const pct = total ? Math.round((done / total) * 100) : 0;
    return { done, total, pct };
  };

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try {
        localStorage.setItem(KEY_THEME, next);
      } catch {
        // ignore
      }
      return next;
    });
  };

  return (
    <ProgressContext.Provider
      value={{
        user,
        isSyncing,
        completed,
        lastLessonId,
        theme,
        isDone,
        isLessonUnlocked,
        toggleDone,
        recordLastLesson,
        resetProgress,
        getStats,
        getCourseStats,
        toggleTheme,
        loginWithUser,
        logout,
        toastMessage,
        showToast
      }}
    >
      {children}
      <div className={`toast ${toastMessage ? 'is-show' : ''}`}>{toastMessage}</div>
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}
