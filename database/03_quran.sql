-- ═══════════════════════════════════════════════════════════════════════════════
-- ذِكرى - Thikra Platform Database Schema
-- Part 3: Quran Data
-- ═══════════════════════════════════════════════════════════════════════════════

-- Surahs
CREATE TABLE IF NOT EXISTS surahs (
    number INTEGER PRIMARY KEY,
    name_ar TEXT NOT NULL,
    name_en TEXT NOT NULL,
    name_transliteration TEXT NOT NULL,
    revelation_type TEXT CHECK (revelation_type IN ('meccan', 'medinan')),
    revelation_order INTEGER,
    ayah_count INTEGER NOT NULL,
    word_count INTEGER NOT NULL,
    letter_count INTEGER NOT NULL,
    juz_start INTEGER,
    hizb_start INTEGER,
    ruku_count INTEGER,
    sajda_count INTEGER DEFAULT 0,
    description_ar TEXT,
    description_en TEXT
);

-- Ayahs
CREATE TABLE IF NOT EXISTS ayahs (
    id INTEGER PRIMARY KEY,
    surah_number INTEGER NOT NULL REFERENCES surahs(number),
    ayah_number INTEGER NOT NULL,
    
    text_uthmani TEXT NOT NULL,
    text_simple TEXT NOT NULL,
    text_imlaei TEXT,
    
    juz_number INTEGER NOT NULL,
    hizb_number INTEGER NOT NULL,
    rub_number INTEGER,
    manzil_number INTEGER,
    page_number INTEGER NOT NULL,
    
    word_count INTEGER,
    letter_count INTEGER,
    sajda_type TEXT CHECK (sajda_type IN (NULL, 'recommended', 'obligatory')),
    
    UNIQUE(surah_number, ayah_number)
);

CREATE INDEX idx_ayahs_surah ON ayahs(surah_number);
CREATE INDEX idx_ayahs_juz ON ayahs(juz_number);
CREATE INDEX idx_ayahs_page ON ayahs(page_number);

-- Words
CREATE TABLE IF NOT EXISTS words (
    id INTEGER PRIMARY KEY,
    ayah_id INTEGER NOT NULL REFERENCES ayahs(id),
    position INTEGER NOT NULL,
    text_uthmani TEXT NOT NULL,
    text_simple TEXT NOT NULL,
    transliteration TEXT,
    root TEXT,
    lemma TEXT,
    
    UNIQUE(ayah_id, position)
);

CREATE INDEX idx_words_ayah ON words(ayah_id);
CREATE INDEX idx_words_root ON words(root);

-- Translations
CREATE TABLE IF NOT EXISTS translations (
    id INTEGER PRIMARY KEY,
    language_code TEXT NOT NULL,
    language_name TEXT NOT NULL,
    translator_name TEXT NOT NULL,
    translator_name_native TEXT,
    is_default INTEGER DEFAULT 0,
    source TEXT
);

CREATE TABLE IF NOT EXISTS ayah_translations (
    ayah_id INTEGER NOT NULL REFERENCES ayahs(id),
    translation_id INTEGER NOT NULL REFERENCES translations(id),
    text TEXT NOT NULL,
    PRIMARY KEY (ayah_id, translation_id)
);

CREATE INDEX idx_ayah_trans ON ayah_translations(translation_id);

-- Tafsir
CREATE TABLE IF NOT EXISTS tafsir_sources (
    id INTEGER PRIMARY KEY,
    name_ar TEXT NOT NULL,
    name_en TEXT NOT NULL,
    author_ar TEXT,
    author_en TEXT,
    language_code TEXT DEFAULT 'ar',
    is_concise INTEGER DEFAULT 0,
    source_url TEXT
);

CREATE TABLE IF NOT EXISTS ayah_tafsir (
    ayah_id INTEGER NOT NULL REFERENCES ayahs(id),
    tafsir_id INTEGER NOT NULL REFERENCES tafsir_sources(id),
    text TEXT NOT NULL,
    PRIMARY KEY (ayah_id, tafsir_id)
);

-- Reciters
CREATE TABLE IF NOT EXISTS reciters (
    id INTEGER PRIMARY KEY,
    name_ar TEXT NOT NULL,
    name_en TEXT NOT NULL,
    style TEXT CHECK (style IN ('murattal', 'mujawwad', 'muallim')),
    country TEXT,
    photo_url TEXT,
    is_featured INTEGER DEFAULT 0
);

-- Recitation Files
CREATE TABLE IF NOT EXISTS recitation_files (
    id INTEGER PRIMARY KEY,
    reciter_id INTEGER NOT NULL REFERENCES reciters(id),
    surah_number INTEGER NOT NULL REFERENCES surahs(number),
    ayah_number INTEGER,
    file_url TEXT NOT NULL,
    duration_ms INTEGER,
    file_size_bytes INTEGER,
    audio_quality TEXT DEFAULT 'high',
    
    UNIQUE(reciter_id, surah_number, ayah_number)
);

CREATE INDEX idx_recitations_reciter ON recitation_files(reciter_id);
CREATE INDEX idx_recitations_surah ON recitation_files(surah_number);
