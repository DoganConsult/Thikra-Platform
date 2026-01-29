-- ═══════════════════════════════════════════════════════════════════════════════
-- ذِكرى - Thikra Platform Database Schema
-- Part 7: Families & Social
-- ═══════════════════════════════════════════════════════════════════════════════

-- Families
CREATE TABLE IF NOT EXISTS families (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    
    name TEXT NOT NULL,
    name_ar TEXT,
    description TEXT,
    photo_url TEXT,
    
    created_by_user_id TEXT NOT NULL REFERENCES users(id),
    
    -- Invite System
    invite_code TEXT UNIQUE,
    invite_code_expires_at TEXT,
    max_members INTEGER DEFAULT 20,
    
    -- Shared Memorial
    shared_memorial_id TEXT REFERENCES memorials(id),
    
    -- Goals
    weekly_goal_ayahs INTEGER DEFAULT 100,
    monthly_goal_khatmas INTEGER DEFAULT 0,
    
    -- Settings
    is_public INTEGER DEFAULT 0,
    allow_challenges INTEGER DEFAULT 1,
    show_leaderboard INTEGER DEFAULT 1,
    
    -- Statistics
    total_ayahs_memorized INTEGER DEFAULT 0,
    total_khatmas INTEGER DEFAULT 0,
    current_week_ayahs INTEGER DEFAULT 0,
    
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    is_active INTEGER DEFAULT 1
);

CREATE INDEX idx_families_creator ON families(created_by_user_id);
CREATE INDEX idx_families_invite ON families(invite_code);

-- Family Members
CREATE TABLE IF NOT EXISTS family_members (
    family_id TEXT NOT NULL REFERENCES families(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'member', 'child')),
    nickname TEXT,
    
    -- Statistics within family
    total_ayahs INTEGER DEFAULT 0,
    current_week_ayahs INTEGER DEFAULT 0,
    current_streak INTEGER DEFAULT 0,
    
    -- Status
    joined_at TEXT DEFAULT (datetime('now')),
    is_active INTEGER DEFAULT 1,
    left_at TEXT,
    
    PRIMARY KEY (family_id, user_id)
);

CREATE INDEX idx_family_members_user ON family_members(user_id);

-- Family Challenges
CREATE TABLE IF NOT EXISTS family_challenges (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    family_id TEXT NOT NULL REFERENCES families(id) ON DELETE CASCADE,
    created_by_user_id TEXT NOT NULL REFERENCES users(id),
    
    title TEXT NOT NULL,
    title_ar TEXT,
    description TEXT,
    
    challenge_type TEXT NOT NULL CHECK (challenge_type IN (
        'ayahs_count', 'surah_completion', 'streak', 'tajweed_score', 'khatma'
    )),
    
    target_value INTEGER NOT NULL,
    target_surah INTEGER,
    
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    
    reward_description TEXT,
    
    -- Status
    is_active INTEGER DEFAULT 1,
    is_completed INTEGER DEFAULT 0,
    winner_user_id TEXT REFERENCES users(id),
    
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX idx_challenges_family ON family_challenges(family_id, is_active);

-- Challenge Participants
CREATE TABLE IF NOT EXISTS challenge_participants (
    challenge_id TEXT NOT NULL REFERENCES family_challenges(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    current_value INTEGER DEFAULT 0,
    rank INTEGER,
    is_completed INTEGER DEFAULT 0,
    completed_at TEXT,
    
    joined_at TEXT DEFAULT (datetime('now')),
    
    PRIMARY KEY (challenge_id, user_id)
);

-- Family Activity Feed
CREATE TABLE IF NOT EXISTS family_activity (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    family_id TEXT NOT NULL REFERENCES families(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL REFERENCES users(id),
    
    activity_type TEXT NOT NULL CHECK (activity_type IN (
        'joined', 'memorized_ayah', 'completed_surah', 'completed_juz',
        'achieved_streak', 'earned_achievement', 'contributed_memorial',
        'won_challenge', 'khatma_completed'
    )),
    
    activity_data TEXT, -- JSON with details
    
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX idx_family_activity ON family_activity(family_id, created_at);

-- Family Messages
CREATE TABLE IF NOT EXISTS family_messages (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    family_id TEXT NOT NULL REFERENCES families(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL REFERENCES users(id),
    
    message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'encouragement', 'dua', 'milestone')),
    message TEXT NOT NULL,
    
    created_at TEXT DEFAULT (datetime('now')),
    is_deleted INTEGER DEFAULT 0
);

CREATE INDEX idx_family_messages ON family_messages(family_id, created_at);
