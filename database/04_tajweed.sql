-- ═══════════════════════════════════════════════════════════════════════════════
-- ذِكرى - Thikra Platform Database Schema
-- Part 4: Tajweed Rules & Markers
-- ═══════════════════════════════════════════════════════════════════════════════

-- Tajweed Rule Categories
CREATE TABLE IF NOT EXISTS tajweed_categories (
    id TEXT PRIMARY KEY,
    name_ar TEXT NOT NULL,
    name_en TEXT NOT NULL,
    description_ar TEXT,
    description_en TEXT,
    sort_order INTEGER DEFAULT 0
);

-- Insert Categories
INSERT OR IGNORE INTO tajweed_categories (id, name_ar, name_en, sort_order) VALUES
('noon_sakinah', 'أحكام النون الساكنة والتنوين', 'Noon Sakinah & Tanween Rules', 1),
('meem_sakinah', 'أحكام الميم الساكنة', 'Meem Sakinah Rules', 2),
('madd', 'أحكام المدود', 'Madd (Elongation) Rules', 3),
('qalqalah', 'القلقلة', 'Qalqalah', 4),
('ghunnah', 'الغنة', 'Ghunnah (Nasalization)', 5),
('lam', 'أحكام اللام', 'Lam Rules', 6),
('raa', 'أحكام الراء', 'Raa Rules', 7),
('waqf', 'أحكام الوقف والابتداء', 'Stopping & Starting Rules', 8),
('hamzah', 'أحكام الهمزة', 'Hamzah Rules', 9),
('sifat', 'صفات الحروف', 'Letter Characteristics', 10);

-- Tajweed Rules
CREATE TABLE IF NOT EXISTS tajweed_rules (
    id TEXT PRIMARY KEY,
    category_id TEXT NOT NULL REFERENCES tajweed_categories(id),
    
    name_ar TEXT NOT NULL,
    name_en TEXT NOT NULL,
    description_ar TEXT,
    description_en TEXT,
    
    -- Visual
    color_code TEXT,
    icon TEXT,
    
    -- Learning
    explanation_ar TEXT,
    explanation_en TEXT,
    example_text TEXT,
    example_surah INTEGER,
    example_ayah INTEGER,
    audio_example_url TEXT,
    video_tutorial_url TEXT,
    
    difficulty_level INTEGER DEFAULT 1 CHECK (difficulty_level BETWEEN 1 AND 5),
    is_essential INTEGER DEFAULT 1,
    sort_order INTEGER DEFAULT 0
);

-- Insert Tajweed Rules
INSERT OR IGNORE INTO tajweed_rules (id, category_id, name_ar, name_en, color_code, difficulty_level) VALUES
-- Noon Sakinah Rules
('izhar_halqi', 'noon_sakinah', 'الإظهار الحلقي', 'Izhar Halqi', '#4CAF50', 1),
('idgham_bila_ghunnah', 'noon_sakinah', 'الإدغام بغير غنة', 'Idgham without Ghunnah', '#2196F3', 2),
('idgham_ma_ghunnah', 'noon_sakinah', 'الإدغام بغنة', 'Idgham with Ghunnah', '#9C27B0', 2),
('iqlab', 'noon_sakinah', 'الإقلاب', 'Iqlab', '#FF9800', 2),
('ikhfa_haqiqi', 'noon_sakinah', 'الإخفاء الحقيقي', 'Ikhfa Haqiqi', '#E91E63', 3),

-- Meem Sakinah Rules
('idgham_shafawi', 'meem_sakinah', 'الإدغام الشفوي', 'Idgham Shafawi', '#00BCD4', 2),
('ikhfa_shafawi', 'meem_sakinah', 'الإخفاء الشفوي', 'Ikhfa Shafawi', '#CDDC39', 2),
('izhar_shafawi', 'meem_sakinah', 'الإظهار الشفوي', 'Izhar Shafawi', '#8BC34A', 1),

-- Madd Rules
('madd_tabii', 'madd', 'المد الطبيعي', 'Natural Madd', '#3F51B5', 1),
('madd_muttasil', 'madd', 'المد المتصل', 'Connected Madd', '#673AB7', 3),
('madd_munfasil', 'madd', 'المد المنفصل', 'Separated Madd', '#9E9E9E', 3),
('madd_lazim', 'madd', 'المد اللازم', 'Obligatory Madd', '#F44336', 4),
('madd_arid', 'madd', 'المد العارض للسكون', 'Temporary Madd', '#795548', 3),
('madd_leen', 'madd', 'مد اللين', 'Soft Madd', '#607D8B', 3),
('madd_badal', 'madd', 'مد البدل', 'Substitute Madd', '#009688', 3),
('madd_silah', 'madd', 'مد الصلة', 'Connection Madd', '#FFC107', 4),

-- Qalqalah
('qalqalah_sughra', 'qalqalah', 'القلقلة الصغرى', 'Minor Qalqalah', '#FF5722', 2),
('qalqalah_kubra', 'qalqalah', 'القلقلة الكبرى', 'Major Qalqalah', '#BF360C', 2),

-- Ghunnah
('ghunnah_mushadaddah', 'ghunnah', 'غنة المشدد', 'Ghunnah with Shaddah', '#880E4F', 2),

-- Lam Rules
('lam_shamsiyyah', 'lam', 'اللام الشمسية', 'Solar Lam', '#FDD835', 1),
('lam_qamariyyah', 'lam', 'اللام القمرية', 'Lunar Lam', '#1E88E5', 1),
('lam_jalalah_tafkhim', 'lam', 'لام لفظ الجلالة - تفخيم', 'Lam of Allah - Tafkhim', '#D84315', 3),
('lam_jalalah_tarqiq', 'lam', 'لام لفظ الجلالة - ترقيق', 'Lam of Allah - Tarqiq', '#43A047', 3),

-- Raa Rules
('raa_tafkhim', 'raa', 'الراء المفخمة', 'Heavy Raa', '#6D4C41', 3),
('raa_tarqiq', 'raa', 'الراء المرققة', 'Light Raa', '#26A69A', 3);

-- Ayah Tajweed Markers
CREATE TABLE IF NOT EXISTS ayah_tajweed_markers (
    id INTEGER PRIMARY KEY,
    ayah_id INTEGER NOT NULL REFERENCES ayahs(id),
    rule_id TEXT NOT NULL REFERENCES tajweed_rules(id),
    
    start_position INTEGER NOT NULL,
    end_position INTEGER NOT NULL,
    word_index INTEGER,
    word_text TEXT,
    
    UNIQUE(ayah_id, rule_id, start_position)
);

CREATE INDEX idx_tajweed_markers_ayah ON ayah_tajweed_markers(ayah_id);
CREATE INDEX idx_tajweed_markers_rule ON ayah_tajweed_markers(rule_id);

-- Tajweed Exercises
CREATE TABLE IF NOT EXISTS tajweed_exercises (
    id TEXT PRIMARY KEY,
    rule_id TEXT NOT NULL REFERENCES tajweed_rules(id),
    
    exercise_type TEXT CHECK (exercise_type IN ('listen', 'identify', 'recite', 'quiz')),
    title_ar TEXT NOT NULL,
    title_en TEXT NOT NULL,
    instructions_ar TEXT,
    instructions_en TEXT,
    
    ayah_id INTEGER REFERENCES ayahs(id),
    audio_url TEXT,
    correct_answer TEXT,
    options TEXT, -- JSON array for quiz
    
    difficulty_level INTEGER DEFAULT 1,
    points INTEGER DEFAULT 10,
    sort_order INTEGER DEFAULT 0
);

CREATE INDEX idx_exercises_rule ON tajweed_exercises(rule_id);
