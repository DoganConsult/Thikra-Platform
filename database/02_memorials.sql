-- ═══════════════════════════════════════════════════════════════════════════════
-- ذِكرى - Thikra Platform Database Schema
-- Part 2: Memorials (حدائق الذكرى)
-- ═══════════════════════════════════════════════════════════════════════════════

-- Memorials
CREATE TABLE IF NOT EXISTS memorials (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    created_by_user_id TEXT NOT NULL REFERENCES users(id),
    
    name TEXT NOT NULL,
    name_ar TEXT,
    relation TEXT,
    birth_date DATE,
    death_date DATE,
    death_hijri_date TEXT,
    photo_url TEXT,
    biography TEXT,
    
    is_public INTEGER DEFAULT 0,
    allow_contributions INTEGER DEFAULT 1,
    theme TEXT DEFAULT 'garden',
    custom_dua TEXT,
    
    -- Statistics
    total_khatmas INTEGER DEFAULT 0,
    total_surahs INTEGER DEFAULT 0,
    total_ayahs_read INTEGER DEFAULT 0,
    total_duas INTEGER DEFAULT 0,
    total_contributors INTEGER DEFAULT 0,
    
    slug TEXT UNIQUE,
    share_token TEXT UNIQUE,
    
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    is_active INTEGER DEFAULT 1
);

CREATE INDEX idx_memorials_user ON memorials(created_by_user_id);
CREATE INDEX idx_memorials_public ON memorials(is_public, is_active);
CREATE INDEX idx_memorials_slug ON memorials(slug);

-- Memorial Contributions
CREATE TABLE IF NOT EXISTS memorial_contributions (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    memorial_id TEXT NOT NULL REFERENCES memorials(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL REFERENCES users(id),
    
    contribution_type TEXT NOT NULL CHECK (contribution_type IN (
        'khatma', 'surah', 'ayah', 'juz', 'hizb',
        'dua', 'dhikr', 'salah', 'fasting', 'charity', 'hajj', 'umrah'
    )),
    
    surah_number INTEGER,
    ayah_start INTEGER,
    ayah_end INTEGER,
    juz_number INTEGER,
    quantity INTEGER DEFAULT 1,
    notes TEXT,
    is_anonymous INTEGER DEFAULT 0,
    
    contributed_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX idx_contributions_memorial ON memorial_contributions(memorial_id);
CREATE INDEX idx_contributions_user ON memorial_contributions(user_id);
CREATE INDEX idx_contributions_type ON memorial_contributions(contribution_type);
CREATE INDEX idx_contributions_date ON memorial_contributions(contributed_at);

-- Memorial Comments/Messages
CREATE TABLE IF NOT EXISTS memorial_messages (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    memorial_id TEXT NOT NULL REFERENCES memorials(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL REFERENCES users(id),
    
    message TEXT NOT NULL,
    is_dua INTEGER DEFAULT 0,
    is_anonymous INTEGER DEFAULT 0,
    is_approved INTEGER DEFAULT 1,
    
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX idx_messages_memorial ON memorial_messages(memorial_id);

-- Memorial Visitors (for statistics)
CREATE TABLE IF NOT EXISTS memorial_visits (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    memorial_id TEXT NOT NULL REFERENCES memorials(id) ON DELETE CASCADE,
    user_id TEXT REFERENCES users(id),
    visitor_ip TEXT,
    visited_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX idx_visits_memorial ON memorial_visits(memorial_id);
CREATE INDEX idx_visits_date ON memorial_visits(visited_at);
