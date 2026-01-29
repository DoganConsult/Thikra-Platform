-- ═══════════════════════════════════════════════════════════════════════════════
-- ذِكرى - Thikra Platform Database Schema
-- Part 6: Progress Tracking & Gamification
-- ═══════════════════════════════════════════════════════════════════════════════

-- Memorization Progress
CREATE TABLE IF NOT EXISTS memorization_progress (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    surah_number INTEGER NOT NULL,
    ayah_number INTEGER NOT NULL,
    
    status TEXT DEFAULT 'not_started' CHECK (status IN (
        'not_started', 'learning', 'reviewing', 'memorized', 'mastered'
    )),
    
    -- Spaced Repetition (SM-2 Algorithm)
    ease_factor REAL DEFAULT 2.5,
    interval_days INTEGER DEFAULT 1,
    repetitions INTEGER DEFAULT 0,
    next_review_date TEXT,
    last_review_date TEXT,
    
    -- Quality Tracking
    last_quality INTEGER CHECK (last_quality BETWEEN 0 AND 5),
    average_quality REAL,
    total_reviews INTEGER DEFAULT 0,
    correct_reviews INTEGER DEFAULT 0,
    mistake_count INTEGER DEFAULT 0,
    
    -- Timestamps
    first_learned_at TEXT,
    last_practiced_at TEXT,
    memorized_at TEXT,
    mastered_at TEXT,
    
    UNIQUE(user_id, surah_number, ayah_number)
);

CREATE INDEX idx_progress_user ON memorization_progress(user_id);
CREATE INDEX idx_progress_status ON memorization_progress(status);
CREATE INDEX idx_progress_review ON memorization_progress(next_review_date);
CREATE INDEX idx_progress_surah ON memorization_progress(user_id, surah_number);

-- Recitation Sessions
CREATE TABLE IF NOT EXISTS recitation_sessions (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    session_type TEXT NOT NULL CHECK (session_type IN (
        'new_memorization', 'review', 'assessment', 'free_recitation', 'listening'
    )),
    
    -- Timing
    started_at TEXT NOT NULL,
    ended_at TEXT,
    duration_seconds INTEGER,
    
    -- Content
    surah_number INTEGER NOT NULL,
    ayah_start INTEGER NOT NULL,
    ayah_end INTEGER NOT NULL,
    ayahs_covered INTEGER,
    
    -- Scores
    accuracy_score REAL,
    tajweed_score REAL,
    fluency_score REAL,
    overall_score REAL,
    
    -- Dedication
    memorial_id TEXT REFERENCES memorials(id),
    
    -- Recording
    has_recording INTEGER DEFAULT 0,
    recording_url TEXT,
    
    -- AI Analysis
    ai_feedback TEXT, -- JSON
    mistakes_count INTEGER DEFAULT 0,
    
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX idx_sessions_user ON recitation_sessions(user_id);
CREATE INDEX idx_sessions_date ON recitation_sessions(started_at);
CREATE INDEX idx_sessions_memorial ON recitation_sessions(memorial_id);
CREATE INDEX idx_sessions_type ON recitation_sessions(session_type);

-- Session Mistakes
CREATE TABLE IF NOT EXISTS session_mistakes (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    session_id TEXT NOT NULL REFERENCES recitation_sessions(id) ON DELETE CASCADE,
    
    ayah_id INTEGER NOT NULL,
    word_position INTEGER,
    word_text TEXT,
    
    mistake_type TEXT CHECK (mistake_type IN (
        'omission', 'addition', 'substitution', 'tajweed', 'pronunciation', 'hesitation'
    )),
    tajweed_rule_id TEXT REFERENCES tajweed_rules(id),
    
    expected_text TEXT,
    actual_text TEXT,
    timestamp_ms INTEGER,
    
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX idx_mistakes_session ON session_mistakes(session_id);
CREATE INDEX idx_mistakes_rule ON session_mistakes(tajweed_rule_id);

-- User Streaks
CREATE TABLE IF NOT EXISTS user_streaks (
    user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    
    current_streak INTEGER DEFAULT 0,
    streak_start_date TEXT,
    last_activity_date TEXT,
    
    longest_streak INTEGER DEFAULT 0,
    longest_streak_start TEXT,
    longest_streak_end TEXT,
    
    -- Streak Protection
    freeze_count INTEGER DEFAULT 2,
    freeze_used_date TEXT,
    
    -- Statistics
    total_active_days INTEGER DEFAULT 0,
    
    updated_at TEXT DEFAULT (datetime('now'))
);

-- Daily Activity Log
CREATE TABLE IF NOT EXISTS daily_activity (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    activity_date DATE NOT NULL,
    
    -- Counts
    ayahs_memorized INTEGER DEFAULT 0,
    ayahs_reviewed INTEGER DEFAULT 0,
    ayahs_read INTEGER DEFAULT 0,
    
    -- Time
    total_minutes INTEGER DEFAULT 0,
    sessions_count INTEGER DEFAULT 0,
    
    -- Scores
    average_score REAL,
    
    -- Goals
    daily_goal_ayahs INTEGER,
    goal_achieved INTEGER DEFAULT 0,
    
    UNIQUE(user_id, activity_date)
);

CREATE INDEX idx_activity_user ON daily_activity(user_id);
CREATE INDEX idx_activity_date ON daily_activity(activity_date);

-- Achievements
CREATE TABLE IF NOT EXISTS achievements (
    id TEXT PRIMARY KEY,
    
    name_ar TEXT NOT NULL,
    name_en TEXT NOT NULL,
    description_ar TEXT,
    description_en TEXT,
    
    icon TEXT,
    color TEXT,
    badge_url TEXT,
    
    category TEXT NOT NULL CHECK (category IN (
        'memorization', 'tajweed', 'streak', 'social', 'memorial', 'fiqh', 'milestone'
    )),
    
    requirement_type TEXT NOT NULL CHECK (requirement_type IN (
        'count', 'streak', 'score', 'milestone', 'special'
    )),
    requirement_value INTEGER NOT NULL,
    requirement_details TEXT, -- JSON for complex requirements
    
    points INTEGER DEFAULT 0,
    xp_reward INTEGER DEFAULT 0,
    
    is_hidden INTEGER DEFAULT 0,
    is_rare INTEGER DEFAULT 0,
    rarity_tier TEXT CHECK (rarity_tier IN ('common', 'uncommon', 'rare', 'epic', 'legendary')),
    
    sort_order INTEGER DEFAULT 0
);

-- Insert Sample Achievements
INSERT OR IGNORE INTO achievements (id, name_ar, name_en, category, requirement_type, requirement_value, icon, rarity_tier) VALUES
-- Memorization
('first_ayah', 'الآية الأولى', 'First Ayah', 'memorization', 'count', 1, '🌱', 'common'),
('first_surah', 'السورة الأولى', 'First Surah', 'memorization', 'milestone', 1, '📖', 'common'),
('juz_amma', 'جزء عمّ', 'Juz Amma Complete', 'memorization', 'milestone', 30, '⭐', 'uncommon'),
('hafiz_100', 'مئة آية', '100 Ayahs', 'memorization', 'count', 100, '💯', 'uncommon'),
('hafiz_500', 'خمسمئة آية', '500 Ayahs', 'memorization', 'count', 500, '🏆', 'rare'),
('hafiz_1000', 'ألف آية', '1000 Ayahs', 'memorization', 'count', 1000, '👑', 'epic'),
('khatm_quran', 'ختم القرآن', 'Complete Quran', 'memorization', 'milestone', 6236, '🎖️', 'legendary'),

-- Streaks
('streak_7', 'أسبوع متواصل', 'Week Streak', 'streak', 'streak', 7, '🔥', 'common'),
('streak_30', 'شهر متواصل', 'Month Streak', 'streak', 'streak', 30, '🔥', 'uncommon'),
('streak_100', 'مئة يوم', '100 Day Streak', 'streak', 'streak', 100, '💎', 'rare'),
('streak_365', 'سنة كاملة', 'Year Streak', 'streak', 'streak', 365, '🌟', 'legendary'),

-- Tajweed
('tajweed_master_noon', 'أحكام النون', 'Noon Rules Master', 'tajweed', 'score', 90, '📚', 'uncommon'),
('tajweed_master_madd', 'أحكام المدود', 'Madd Rules Master', 'tajweed', 'score', 90, '📚', 'uncommon'),
('tajweed_perfect', 'تلاوة متقنة', 'Perfect Recitation', 'tajweed', 'score', 100, '✨', 'rare'),

-- Memorial
('first_memorial', 'أول ذكرى', 'First Memorial', 'memorial', 'count', 1, '🌳', 'common'),
('memorial_khatma', 'ختمة مهداة', 'Dedicated Khatma', 'memorial', 'count', 1, '🎁', 'uncommon'),
('memorial_contributor', 'مساهم فعال', 'Active Contributor', 'memorial', 'count', 10, '💝', 'uncommon'),

-- Social
('family_creator', 'مؤسس العائلة', 'Family Creator', 'social', 'count', 1, '👨‍👩‍👧‍👦', 'common'),
('family_champion', 'بطل العائلة', 'Family Champion', 'social', 'milestone', 1, '🏅', 'uncommon');

-- User Achievements
CREATE TABLE IF NOT EXISTS user_achievements (
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    achievement_id TEXT NOT NULL REFERENCES achievements(id),
    
    current_value INTEGER DEFAULT 0,
    is_completed INTEGER DEFAULT 0,
    completed_at TEXT,
    
    is_notified INTEGER DEFAULT 0,
    is_claimed INTEGER DEFAULT 0,
    
    PRIMARY KEY (user_id, achievement_id)
);

CREATE INDEX idx_user_ach_completed ON user_achievements(is_completed);

-- User Goals
CREATE TABLE IF NOT EXISTS user_goals (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    goal_type TEXT NOT NULL CHECK (goal_type IN (
        'daily_ayahs', 'daily_minutes', 'weekly_ayahs', 'memorize_surah', 'complete_juz', 'khatma'
    )),
    
    target_value INTEGER NOT NULL,
    current_value INTEGER DEFAULT 0,
    
    target_surah INTEGER,
    target_juz INTEGER,
    
    start_date TEXT NOT NULL,
    end_date TEXT,
    
    is_completed INTEGER DEFAULT 0,
    completed_at TEXT,
    
    is_active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX idx_goals_user ON user_goals(user_id, is_active);

-- Leaderboards
CREATE TABLE IF NOT EXISTS leaderboard_entries (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    
    leaderboard_type TEXT NOT NULL CHECK (leaderboard_type IN (
        'weekly_ayahs', 'monthly_ayahs', 'weekly_streak', 'all_time', 'family'
    )),
    
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    family_id TEXT,
    
    period_start TEXT NOT NULL,
    period_end TEXT NOT NULL,
    
    score INTEGER NOT NULL,
    rank INTEGER,
    
    created_at TEXT DEFAULT (datetime('now')),
    
    UNIQUE(leaderboard_type, user_id, period_start)
);

CREATE INDEX idx_leaderboard_type ON leaderboard_entries(leaderboard_type, period_start);
CREATE INDEX idx_leaderboard_rank ON leaderboard_entries(leaderboard_type, rank);
