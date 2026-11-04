'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { LESSONS, LevelId } from '@/data/lessons';

interface ProgressStats {
  done: number;
  total: number;
  pct: number;
}

interface ProgressContextType {
  completed: string[];
  theme: 'light' | 'dark';
  isDone: (id: string) => boolean;
  toggleDone: (id: string) => boolean;
  resetProgress: () => void;
  getStats: (level?: LevelId) => ProgressStats;
  toggleTheme: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const KEY_DONE = 'lernweb:completed';
const KEY_THEME = 'lernweb:theme';

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [completed, setCompleted] = useState<string[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedDone = localStorage.getItem(KEY_DONE);
      if (savedDone) setCompleted(JSON.parse(savedDone));
      const savedTheme = (localStorage.getItem(KEY_THEME) as 'light' | 'dark') || 'light';
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } catch {
      // ignore storage errors
    }
  }, []);

  const isDone = (id: string) => completed.includes(id);

  const toggleDone = (id: string) => {
    let added = false;
    setCompleted(prev => {
      const exists = prev.includes(id);
      added = !exists;
      const next = exists ? prev.filter(item => item !== id) : [...prev, id];
      try {
        localStorage.setItem(KEY_DONE, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
    return added;
  };

  const resetProgress = () => {
    setCompleted([]);
    try {
      localStorage.removeItem(KEY_DONE);
    } catch {
      // ignore
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

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(current => (current === msg ? null : current));
    }, 2000);
  };

  return (
    <ProgressContext.Provider
      value={{
        completed,
        theme,
        isDone,
        toggleDone,
        resetProgress,
        getStats,
        toggleTheme,
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

