'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { LESSONS, LevelId } from '@/data/lessons';
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
  toggleDone: (id: string) => boolean;
  recordLastLesson: (id: string) => void;
  resetProgress: () => void;
  getStats: (level?: LevelId) => ProgressStats;
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
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedTheme = (localStorage.getItem(KEY_THEME) as 'light' | 'dark') || 'light';
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);

      const sessionUser = getSavedSession();
      if (sessionUser) {
        setUser(sessionUser);
        setIsSyncing(true);
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
      const remote = await fetchUserProgress(loggedInUser);
      setCompleted(remote.completedLessons);
      setLastLessonId(remote.lastLessonId || null);
    } finally {
      setIsSyncing(false);
    }
  };

  const logout = async () => {
    await signOutUser();
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
  };

  const isDone = (id: string) => completed.includes(id);

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
        toggleDone,
        recordLastLesson,
        resetProgress,
        getStats,
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
