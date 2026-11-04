export interface AppUser {
  id: string;
  email: string;
  displayName: string;
  accessToken?: string;
  mode: 'supabase' | 'local';
}

export interface UserProgressRow {
  user_id: string;
  email: string;
  display_name: string;
  completed_lessons: string[];
  last_lesson_id?: string | null;
  updated_at?: string;
}

const KEY_SESSION = 'lernweb:auth_session';
const KEY_LOCAL_USERS = 'lernweb:local_users';
const KEY_RUNTIME_SUPABASE = 'lernweb:supabase_config';

interface LocalUserAccount {
  id: string;
  email: string;
  displayName: string;
  passwordHash: string;
  completedLessons: string[];
  lastLessonId?: string;
}

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

const DEFAULT_SUPABASE_URL = 'https://jvkkofnutlesxnzeidka.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_p4J1MZD43IiOAqWce8f35Q_5cBrQmos';

/**
 * อ่านค่าตั้งค่า Supabase จาก .env.local หรือจากที่ผู้ใช้กรอกเชื่อมต่อหน้าเว็บ
 */
export function getSupabaseConfig(): SupabaseConfig | null {
  const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (
    envUrl &&
    envKey &&
    !envUrl.includes('your-project-id') &&
    !envKey.includes('your-supabase-anon')
  ) {
    return { url: envUrl.replace(/\/$/, ''), anonKey: envKey };
  }

  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(KEY_RUNTIME_SUPABASE);
      if (saved) {
        const parsed = JSON.parse(saved) as SupabaseConfig;
        if (parsed.url?.trim() && parsed.anonKey?.trim()) {
          return {
            url: parsed.url.trim().replace(/\/$/, ''),
            anonKey: parsed.anonKey.trim()
          };
        }
      }
    } catch {
      // ignore
    }
  }

  return {
    url: DEFAULT_SUPABASE_URL,
    anonKey: DEFAULT_SUPABASE_ANON_KEY
  };
}

export function saveRuntimeSupabaseConfig(config: SupabaseConfig | null) {
  if (typeof window === 'undefined') return;
  try {
    if (!config || !config.url.trim() || !config.anonKey.trim()) {
      localStorage.removeItem(KEY_RUNTIME_SUPABASE);
    } else {
      localStorage.setItem(
        KEY_RUNTIME_SUPABASE,
        JSON.stringify({
          url: config.url.trim().replace(/\/$/, ''),
          anonKey: config.anonKey.trim()
        })
      );
    }
  } catch {
    // ignore
  }
}

export function getSavedSession(): AppUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(KEY_SESSION);
    if (!raw) return null;
    return JSON.parse(raw) as AppUser;
  } catch {
    return null;
  }
}

export function setSavedSession(user: AppUser | null) {
  if (typeof window === 'undefined') return;
  try {
    if (!user) {
      localStorage.removeItem(KEY_SESSION);
    } else {
      localStorage.setItem(KEY_SESSION, JSON.stringify(user));
    }
  } catch {
    // ignore
  }
}

function getLocalUsers(): LocalUserAccount[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY_LOCAL_USERS);
    return raw ? (JSON.parse(raw) as LocalUserAccount[]) : [];
  } catch {
    return [];
  }
}

function saveLocalUsers(users: LocalUserAccount[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEY_LOCAL_USERS, JSON.stringify(users));
  } catch {
    // ignore
  }
}

/**
 * สมัครสมาชิกใหม่ (รองรับทั้ง Supabase Auth Cloud และโหมดบัญชีในเครื่องเมื่อยังไม่ใส่คีย์)
 */
export async function signUpUser(
  email: string,
  password: string,
  displayName: string
): Promise<{ user?: AppUser; error?: string; needsEmailConfirmation?: boolean }> {
  const cleanEmail = email.trim().toLowerCase();
  const cleanName = displayName.trim() || cleanEmail.split('@')[0];
  const cfg = getSupabaseConfig();

  if (cfg) {
    try {
      const res = await fetch(`${cfg.url}/auth/v1/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: cfg.anonKey
        },
        body: JSON.stringify({
          email: cleanEmail,
          password,
          data: { display_name: cleanName }
        })
      });

      const data = await res.json();
      if (!res.ok) {
        return { error: data.msg || data.error_description || data.message || 'สมัครสมาชิกไม่สำเร็จ' };
      }

      const supaUser = data.user || data;
      const accessToken = data.access_token;

      if (!accessToken) {
        return {
          needsEmailConfirmation: true,
          error: 'สมัครสมาชิกสำเร็จ! กรุณายืนยันอีเมลของคุณ (หรือปิด Confirm Email ใน Supabase Auth Settings เพื่อเข้าสู่ระบบทันที)'
        };
      }

      const appUser: AppUser = {
        id: supaUser.id,
        email: supaUser.email || cleanEmail,
        displayName: supaUser.user_metadata?.display_name || cleanName,
        accessToken,
        mode: 'supabase'
      };
      setSavedSession(appUser);
      await saveUserProgressToCloud(appUser, []);
      return { user: appUser };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'ไม่สามารถเชื่อมต่อ Supabase ได้';
      return { error: msg };
    }
  }

  // Fallback: Local Multi-User Account Mode
  const users = getLocalUsers();
  if (users.some(u => u.email === cleanEmail)) {
    return { error: 'อีเมลนี้มีในระบบแล้ว กรุณาเข้าสู่ระบบ' };
  }

  const newAccount: LocalUserAccount = {
    id: `local_${Date.now()}`,
    email: cleanEmail,
    displayName: cleanName,
    passwordHash: btoa(unescape(encodeURIComponent(password))),
    completedLessons: []
  };

  users.push(newAccount);
  saveLocalUsers(users);

  const appUser: AppUser = {
    id: newAccount.id,
    email: newAccount.email,
    displayName: newAccount.displayName,
    mode: 'local'
  };
  setSavedSession(appUser);
  return { user: appUser };
}

/**
 * เข้าสู่ระบบด้วย Email & Password
 */
export async function signInUser(
  email: string,
  password: string
): Promise<{ user?: AppUser; error?: string }> {
  const cleanEmail = email.trim().toLowerCase();
  const cfg = getSupabaseConfig();

  if (cfg) {
    try {
      const res = await fetch(`${cfg.url}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: cfg.anonKey
        },
        body: JSON.stringify({
          email: cleanEmail,
          password
        })
      });

      const data = await res.json();
      if (!res.ok) {
        return { error: data.error_description || data.msg || data.message || 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' };
      }

      const appUser: AppUser = {
        id: data.user.id,
        email: data.user.email || cleanEmail,
        displayName:
          data.user.user_metadata?.display_name ||
          (data.user.email || cleanEmail).split('@')[0],
        accessToken: data.access_token,
        mode: 'supabase'
      };
      setSavedSession(appUser);
      return { user: appUser };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'ไม่สามารถเชื่อมต่อ Supabase ได้';
      return { error: msg };
    }
  }

  // Fallback: Local Multi-User Account Mode
  const users = getLocalUsers();
  const encodedPw = btoa(unescape(encodeURIComponent(password)));
  const found = users.find(u => u.email === cleanEmail && u.passwordHash === encodedPw);

  if (!found) {
    return { error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง (หากยังไม่มีบัญชี กรุณากดสมัครสมาชิก)' };
  }

  const appUser: AppUser = {
    id: found.id,
    email: found.email,
    displayName: found.displayName,
    mode: 'local'
  };
  setSavedSession(appUser);
  return { user: appUser };
}

/**
 * ออกจากระบบ
 */
export async function signOutUser() {
  const current = getSavedSession();
  const cfg = getSupabaseConfig();

  if (cfg && current?.mode === 'supabase' && current.accessToken) {
    try {
      await fetch(`${cfg.url}/auth/v1/logout`, {
        method: 'POST',
        headers: {
          apikey: cfg.anonKey,
          Authorization: `Bearer ${current.accessToken}`
        }
      });
    } catch {
      // ignore network error on logout
    }
  }
  setSavedSession(null);
}

/**
 * ดึงความก้าวหน้าการเรียนของผู้ใช้ที่ล็อกอินอยู่
 */
export async function fetchUserProgress(
  user: AppUser
): Promise<{ completedLessons: string[]; lastLessonId?: string }> {
  const cfg = getSupabaseConfig();

  if (cfg && user.mode === 'supabase' && user.accessToken) {
    try {
      const res = await fetch(
        `${cfg.url}/rest/v1/user_progress?user_id=eq.${encodeURIComponent(user.id)}&select=completed_lessons,last_lesson_id`,
        {
          headers: {
            apikey: cfg.anonKey,
            Authorization: `Bearer ${user.accessToken}`
          }
        }
      );

      if (res.ok) {
        const rows = (await res.json()) as Array<{
          completed_lessons?: string[];
          last_lesson_id?: string;
        }>;
        if (rows.length > 0) {
          return {
            completedLessons: Array.isArray(rows[0].completed_lessons)
              ? rows[0].completed_lessons
              : [],
            lastLessonId: rows[0].last_lesson_id || undefined
          };
        }
      }
    } catch {
      // fallback to per-user local cache if table not created yet
    }
  }

  // ดึงจากบัญชี Local หรือ Cache รายบุคคล
  const users = getLocalUsers();
  const found = users.find(u => u.id === user.id || u.email === user.email);
  if (found) {
    return {
      completedLessons: found.completedLessons || [],
      lastLessonId: found.lastLessonId
    };
  }

  try {
    const raw = localStorage.getItem(`lernweb:completed:${user.id}`);
    return {
      completedLessons: raw ? (JSON.parse(raw) as string[]) : []
    };
  } catch {
    return { completedLessons: [] };
  }
}

/**
 * บันทึกความก้าวหน้าการเรียนของผู้ใช้ขึ้น Supabase Cloud (และสำรองไว้รายบัญชี)
 */
export async function saveUserProgressToCloud(
  user: AppUser,
  completedLessons: string[],
  lastLessonId?: string
): Promise<boolean> {
  // บันทึกลง Local Cache รายบุคคลเสมอเพื่อความเร็วแบบ Instant UI
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(`lernweb:completed:${user.id}`, JSON.stringify(completedLessons));
      const users = getLocalUsers();
      const idx = users.findIndex(u => u.id === user.id || u.email === user.email);
      if (idx !== -1) {
        users[idx].completedLessons = completedLessons;
        if (lastLessonId) users[idx].lastLessonId = lastLessonId;
        saveLocalUsers(users);
      }
    } catch {
      // ignore
    }
  }

  const cfg = getSupabaseConfig();
  if (cfg && user.mode === 'supabase' && user.accessToken) {
    try {
      const payload: UserProgressRow = {
        user_id: user.id,
        email: user.email,
        display_name: user.displayName,
        completed_lessons: completedLessons,
        ...(lastLessonId ? { last_lesson_id: lastLessonId } : {}),
        updated_at: new Date().toISOString()
      };

      const res = await fetch(`${cfg.url}/rest/v1/user_progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: cfg.anonKey,
          Authorization: `Bearer ${user.accessToken}`,
          Prefer: 'resolution=merge-duplicates'
        },
        body: JSON.stringify(payload)
      });

      return res.ok;
    } catch {
      return false;
    }
  }

  return true;
}

