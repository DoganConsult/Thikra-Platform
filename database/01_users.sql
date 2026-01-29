-- ═══════════════════════════════════════════════════════════════════════════════
-- ذِكرى - Thikra Platform Database Schema
-- Part 1: Users & Authentication
-- ═══════════════════════════════════════════════════════════════════════════════

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    email TEXT UNIQUE,
    phone TEXT UNIQUE,
    password_hash TEXT,
    email_verified INTEGER DEFAULT 0,
    phone_verified INTEGER DEFAULT 0,
    
    display_name TEXT NOT NULL,
    display_name_ar TEXT,
    avatar_url TEXT,
    date_of_birth DATE,
    age_group TEXT CHECK (age_group IN ('child', 'youth', 'adult', 'elder')),
    gender TEXT CHECK (gender IN ('male', 'female')),
    country TEXT,
    timezone TEXT DEFAULT 'UTC',
    
    preferred_language TEXT DEFAULT 'ar',
    preferred_reciter_id INTEGER,
    preferred_madhab TEXT CHECK (preferred_madhab IN ('hanafi', 'maliki', 'shafii', 'hanbali')),
    
    ui_theme TEXT DEFAULT 'light',
    font_size TEXT DEFAULT 'medium',
    notification_enabled INTEGER DEFAULT 1,
    daily_reminder_time TEXT DEFAULT '06:00',
    
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    last_active_at TEXT,
    is_active INTEGER DEFAULT 1
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_age_group ON users(age_group);

-- Sessions
CREATE TABLE IF NOT EXISTS user_sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash TEXT NOT NULL UNIQUE,
    device_type TEXT,
    ip_address TEXT,
    is_active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now')),
    expires_at TEXT NOT NULL
);

CREATE INDEX idx_sessions_user ON user_sessions(user_id);
CREATE INDEX idx_sessions_token ON user_sessions(token_hash);
