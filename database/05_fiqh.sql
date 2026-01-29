-- ═══════════════════════════════════════════════════════════════════════════════
-- ذِكرى - Thikra Platform Database Schema
-- Part 5: Fiqh (Islamic Jurisprudence)
-- ═══════════════════════════════════════════════════════════════════════════════

-- Fiqh Categories
CREATE TABLE IF NOT EXISTS fiqh_categories (
    id INTEGER PRIMARY KEY,
    parent_id INTEGER REFERENCES fiqh_categories(id),
    
    name_ar TEXT NOT NULL,
    name_en TEXT NOT NULL,
    description_ar TEXT,
    description_en TEXT,
    
    icon TEXT,
    color TEXT,
    sort_order INTEGER DEFAULT 0
);

-- Insert Main Categories
INSERT OR IGNORE INTO fiqh_categories (id, name_ar, name_en, icon, sort_order) VALUES
(1, 'الطهارة', 'Purification', '💧', 1),
(2, 'الصلاة', 'Prayer', '🕌', 2),
(3, 'الزكاة', 'Zakat', '💰', 3),
(4, 'الصيام', 'Fasting', '🌙', 4),
(5, 'الحج والعمرة', 'Hajj & Umrah', '🕋', 5),
(6, 'الجنائز', 'Funerals', '⚰️', 6),
(7, 'الأيمان والنذور', 'Oaths & Vows', '🤝', 7),
(8, 'الأطعمة والأشربة', 'Food & Drink', '🍽️', 8),
(9, 'اللباس والزينة', 'Clothing & Adornment', '👔', 9),
(10, 'النكاح', 'Marriage', '💍', 10),
(11, 'البيوع والمعاملات', 'Transactions', '📝', 11),
(12, 'الأذكار والأدعية', 'Dhikr & Dua', '📿', 12);

-- Fiqh Sub-Categories
INSERT OR IGNORE INTO fiqh_categories (id, parent_id, name_ar, name_en, sort_order) VALUES
-- Taharah
(101, 1, 'أحكام المياه', 'Rulings on Water', 1),
(102, 1, 'الوضوء', 'Wudu', 2),
(103, 1, 'الغسل', 'Ghusl', 3),
(104, 1, 'التيمم', 'Tayammum', 4),
(105, 1, 'النجاسات', 'Impurities', 5),
(106, 1, 'الحيض والنفاس', 'Menstruation & Postpartum', 6),

-- Salah
(201, 2, 'شروط الصلاة', 'Conditions of Prayer', 1),
(202, 2, 'أركان الصلاة', 'Pillars of Prayer', 2),
(203, 2, 'واجبات الصلاة', 'Obligations of Prayer', 3),
(204, 2, 'سنن الصلاة', 'Sunnahs of Prayer', 4),
(205, 2, 'مبطلات الصلاة', 'Invalidators of Prayer', 5),
(206, 2, 'صلاة الجماعة', 'Congregational Prayer', 6),
(207, 2, 'صلاة الجمعة', 'Friday Prayer', 7),
(208, 2, 'صلاة العيدين', 'Eid Prayers', 8),
(209, 2, 'صلاة الجنازة', 'Funeral Prayer', 9),
(210, 2, 'صلاة المسافر', 'Traveler''s Prayer', 10),
(211, 2, 'سجود السهو', 'Prostration of Forgetfulness', 11),
(212, 2, 'النوافل', 'Voluntary Prayers', 12);

-- Fiqh Rulings
CREATE TABLE IF NOT EXISTS fiqh_rulings (
    id INTEGER PRIMARY KEY,
    category_id INTEGER NOT NULL REFERENCES fiqh_categories(id),
    
    -- Question
    question_ar TEXT NOT NULL,
    question_en TEXT,
    question_keywords TEXT, -- JSON array for search
    
    -- Answer
    ruling_ar TEXT NOT NULL,
    ruling_en TEXT,
    ruling_type TEXT CHECK (ruling_type IN (
        'wajib', 'mustahab', 'mubah', 'makruh', 'haram', 'varies'
    )),
    ruling_summary_ar TEXT,
    ruling_summary_en TEXT,
    
    -- Evidence
    quran_references TEXT, -- JSON: [{surah, ayah, text}]
    hadith_references TEXT, -- JSON: [{text, source, number, grade}]
    ijma_reference TEXT,
    qiyas_explanation TEXT,
    
    -- Madhab Views
    hanafi_view TEXT,
    maliki_view TEXT,
    shafii_view TEXT,
    hanbali_view TEXT,
    preferred_view TEXT, -- Which madhab's view is mentioned as primary
    
    -- Metadata
    difficulty_level INTEGER DEFAULT 1 CHECK (difficulty_level BETWEEN 1 AND 3),
    is_common INTEGER DEFAULT 0,
    is_essential INTEGER DEFAULT 0,
    is_contemporary INTEGER DEFAULT 0,
    tags TEXT, -- JSON array
    
    -- Sources
    source_books TEXT, -- JSON array
    scholar_attribution TEXT,
    fatwa_number TEXT,
    
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    is_active INTEGER DEFAULT 1,
    view_count INTEGER DEFAULT 0
);

CREATE INDEX idx_fiqh_category ON fiqh_rulings(category_id);
CREATE INDEX idx_fiqh_type ON fiqh_rulings(ruling_type);
CREATE INDEX idx_fiqh_common ON fiqh_rulings(is_common);
CREATE INDEX idx_fiqh_essential ON fiqh_rulings(is_essential);

-- Fiqh Search Index (for full-text search)
CREATE VIRTUAL TABLE IF NOT EXISTS fiqh_rulings_fts USING fts5(
    question_ar,
    ruling_ar,
    question_en,
    ruling_en,
    content='fiqh_rulings',
    content_rowid='id'
);

-- Related Rulings
CREATE TABLE IF NOT EXISTS fiqh_related_rulings (
    ruling_id INTEGER NOT NULL REFERENCES fiqh_rulings(id),
    related_ruling_id INTEGER NOT NULL REFERENCES fiqh_rulings(id),
    relation_type TEXT DEFAULT 'related', -- related, prerequisite, followup
    PRIMARY KEY (ruling_id, related_ruling_id)
);

-- User Fiqh Bookmarks
CREATE TABLE IF NOT EXISTS user_fiqh_bookmarks (
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    ruling_id INTEGER NOT NULL REFERENCES fiqh_rulings(id),
    notes TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    PRIMARY KEY (user_id, ruling_id)
);

-- Fiqh Q&A History (for AI assistant)
CREATE TABLE IF NOT EXISTS fiqh_qa_history (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    user_id TEXT REFERENCES users(id),
    
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    matched_ruling_id INTEGER REFERENCES fiqh_rulings(id),
    confidence_score REAL,
    
    is_helpful INTEGER, -- user feedback
    feedback_text TEXT,
    
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX idx_fiqh_qa_user ON fiqh_qa_history(user_id);
