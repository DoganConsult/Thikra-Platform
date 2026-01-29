# ذِكرى - Thikra Platform
## Technical Specification Document
### Version 1.0 | January 2026

---

## بسم الله الرحمن الرحيم

**"إِذَا مَاتَ الْإِنْسَانُ انْقَطَعَ عَمَلُهُ إِلَّا مِنْ ثَلَاثٍ: صَدَقَةٍ جَارِيَةٍ، أَوْ عِلْمٍ يُنْتَفَعُ بِهِ، أَوْ وَلَدٍ صَالِحٍ يَدْعُو لَهُ"**

---

# 1. Executive Summary

## 1.1 Vision

**Thikra (ذِكرى)** is an open-source, cloud-native Islamic learning platform that transforms Quran memorization, Tajweed learning, and Fiqh education into acts of perpetual charity (Sadaqah Jariyah) for departed loved ones.

## 1.2 Mission

To provide humanity with a free, eternal platform where every recitation, every memorized verse, and every learned ruling becomes a gift of light to those who have passed.

## 1.3 Core Principles

| Principle | Description |
|-----------|-------------|
| **Forever Free** | Core functionality always free, sustained by the founder |
| **Open Source** | API and SDK open for anyone to build upon |
| **Cloud Native** | Built on Cloudflare for global scale and reliability |
| **Age Inclusive** | Designed for ages 4 to 100+ |
| **Culturally Authentic** | Respectful of Islamic traditions and scholarship |

## 1.4 Founder's Commitment

This platform is established as Sadaqah Jariyah for **Omar (عمر)** and all departed souls. The founder commits to:

- Hosting and infrastructure costs in perpetuity
- Maintaining and evolving the platform
- Keeping core features free forever
- Open-sourcing the codebase for community contribution

---

# 2. Platform Architecture

## 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CLIENT APPLICATIONS                          │
├─────────────────────────────────────────────────────────────────────┤
│  Web App     │  iOS App    │  Android App  │  Third-Party Apps     │
│  (Next.js)   │  (React     │  (React       │  (via SDK)            │
│              │   Native)   │   Native)     │                       │
└──────────────┴─────────────┴───────────────┴───────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          SDK LAYER                                  │
├─────────────────────────────────────────────────────────────────────┤
│  @thikra/sdk-js  │  @thikra/sdk-react  │  @thikra/sdk-mobile      │
└──────────────────┴────────────────────┴────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         API GATEWAY                                 │
│                    (Cloudflare Workers)                             │
├─────────────────────────────────────────────────────────────────────┤
│  Authentication  │  Rate Limiting  │  Request Routing  │  Caching  │
└──────────────────┴─────────────────┴───────────────────┴───────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
┌───────────────────────┐ ┌─────────────────┐ ┌──────────────────────┐
│    CORE SERVICES      │ │  AI SERVICES    │ │  CONTENT SERVICES    │
│   (Workers + DO)      │ │  (Workers AI)   │ │  (R2 + KV)           │
├───────────────────────┤ ├─────────────────┤ ├──────────────────────┤
│ • User Service        │ │ • Tajweed AI    │ │ • Quran Text         │
│ • Memorial Service    │ │ • Fiqh AI       │ │ • Audio Files        │
│ • Progress Service    │ │ • Recommendation│ │ • Tafsir Database    │
│ • Family Service      │ │ • Voice Analysis│ │ • Fiqh Database      │
│ • Achievement Service │ │                 │ │ • Translations       │
└───────────────────────┘ └─────────────────┘ └──────────────────────┘
                    │               │               │
                    └───────────────┼───────────────┘
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        DATA LAYER                                   │
├─────────────────────────────────────────────────────────────────────┤
│  Cloudflare D1    │  Cloudflare KV    │  Cloudflare R2            │
│  (SQLite)         │  (Key-Value)      │  (Object Storage)         │
│  • User Data      │  • Sessions       │  • Audio Files            │
│  • Progress       │  • Cache          │  • Images                 │
│  • Memorials      │  • Config         │  • Documents              │
└───────────────────┴───────────────────┴────────────────────────────┘
```

## 2.2 Cloudflare Infrastructure

### 2.2.1 Workers (Serverless Compute)

| Worker | Purpose | Endpoints |
|--------|---------|-----------|
| `api-gateway` | Main API router | `/api/v1/*` |
| `auth-worker` | Authentication | `/auth/*` |
| `quran-worker` | Quran content | `/api/v1/quran/*` |
| `tajweed-worker` | Tajweed analysis | `/api/v1/tajweed/*` |
| `fiqh-worker` | Fiqh content | `/api/v1/fiqh/*` |
| `memorial-worker` | Memorial management | `/api/v1/memorial/*` |
| `progress-worker` | Progress tracking | `/api/v1/progress/*` |

### 2.2.2 Durable Objects (Stateful Compute)

| Durable Object | Purpose |
|----------------|---------|
| `UserSession` | Real-time session management |
| `FamilyRoom` | Family progress synchronization |
| `RecitationSession` | Live recitation analysis |
| `LeaderboardState` | Real-time leaderboards |

### 2.2.3 D1 Databases

| Database | Content |
|----------|---------|
| `thikra-main` | Core application data |
| `thikra-quran` | Quran text, translations, tafsir |
| `thikra-fiqh` | Fiqh rulings and references |
| `thikra-analytics` | Usage analytics (anonymized) |

### 2.2.4 R2 Buckets

| Bucket | Content |
|--------|---------|
| `thikra-audio` | Quran recitations |
| `thikra-media` | Images, icons, assets |
| `thikra-user-content` | User recordings |

### 2.2.5 KV Namespaces

| Namespace | Purpose |
|-----------|---------|
| `THIKRA_CACHE` | API response caching |
| `THIKRA_SESSIONS` | User sessions |
| `THIKRA_CONFIG` | Feature flags, config |

---

# 3. Database Schema

## 3.1 Core Tables

### 3.1.1 Users

```sql
CREATE TABLE users (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    email TEXT UNIQUE,
    phone TEXT UNIQUE,
    password_hash TEXT,
    
    -- Profile
    display_name TEXT NOT NULL,
    avatar_url TEXT,
    date_of_birth DATE,
    age_group TEXT CHECK (age_group IN ('child', 'youth', 'adult', 'elder')),
    preferred_language TEXT DEFAULT 'ar',
    preferred_reciter TEXT,
    
    -- Settings
    ui_theme TEXT DEFAULT 'light',
    font_size TEXT DEFAULT 'medium',
    notification_enabled INTEGER DEFAULT 1,
    daily_reminder_time TEXT,
    
    -- Metadata
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    last_active_at TEXT,
    is_active INTEGER DEFAULT 1
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_age_group ON users(age_group);
```

### 3.1.2 Memorials (حدائق الذكرى)

```sql
CREATE TABLE memorials (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    created_by_user_id TEXT NOT NULL REFERENCES users(id),
    
    -- Deceased Information
    name TEXT NOT NULL,
    name_ar TEXT,
    relation TEXT, -- son, daughter, father, mother, spouse, friend, etc.
    birth_date DATE,
    death_date DATE,
    death_hijri_date TEXT,
    photo_url TEXT,
    biography TEXT,
    
    -- Memorial Settings
    is_public INTEGER DEFAULT 0,
    allow_contributions INTEGER DEFAULT 1,
    theme TEXT DEFAULT 'garden',
    
    -- Statistics (denormalized for performance)
    total_khatmas INTEGER DEFAULT 0,
    total_ayahs_read INTEGER DEFAULT 0,
    total_duas INTEGER DEFAULT 0,
    total_contributors INTEGER DEFAULT 0,
    
    -- Metadata
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX idx_memorials_created_by ON memorials(created_by_user_id);
CREATE INDEX idx_memorials_public ON memorials(is_public);
```

### 3.1.3 Memorial Contributions

```sql
CREATE TABLE memorial_contributions (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    memorial_id TEXT NOT NULL REFERENCES memorials(id),
    user_id TEXT NOT NULL REFERENCES users(id),
    
    -- Contribution Type
    contribution_type TEXT NOT NULL CHECK (contribution_type IN (
        'khatma', 'surah', 'ayah', 'dua', 'dhikr', 'fasting', 'charity'
    )),
    
    -- Details
    surah_number INTEGER,
    ayah_start INTEGER,
    ayah_end INTEGER,
    quantity INTEGER DEFAULT 1,
    notes TEXT,
    
    -- Metadata
    contributed_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX idx_contributions_memorial ON memorial_contributions(memorial_id);
CREATE INDEX idx_contributions_user ON memorial_contributions(user_id);
CREATE INDEX idx_contributions_date ON memorial_contributions(contributed_at);
```

### 3.1.4 Families

```sql
CREATE TABLE families (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    name TEXT NOT NULL,
    created_by_user_id TEXT NOT NULL REFERENCES users(id),
    invite_code TEXT UNIQUE,
    
    -- Settings
    shared_memorial_id TEXT REFERENCES memorials(id),
    weekly_goal_ayahs INTEGER DEFAULT 100,
    
    -- Metadata
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE family_members (
    family_id TEXT NOT NULL REFERENCES families(id),
    user_id TEXT NOT NULL REFERENCES users(id),
    role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'member', 'child')),
    joined_at TEXT DEFAULT (datetime('now')),
    PRIMARY KEY (family_id, user_id)
);

CREATE INDEX idx_family_members_user ON family_members(user_id);
```

## 3.2 Quran Tables

### 3.2.1 Surahs

```sql
CREATE TABLE surahs (
    number INTEGER PRIMARY KEY,
    name_ar TEXT NOT NULL,
    name_en TEXT NOT NULL,
    name_transliteration TEXT NOT NULL,
    revelation_type TEXT CHECK (revelation_type IN ('meccan', 'medinan')),
    ayah_count INTEGER NOT NULL,
    word_count INTEGER NOT NULL,
    letter_count INTEGER NOT NULL,
    juz_start INTEGER,
    hizb_start INTEGER,
    ruku_count INTEGER,
    sajda_count INTEGER DEFAULT 0
);
```

### 3.2.2 Ayahs

```sql
CREATE TABLE ayahs (
    id INTEGER PRIMARY KEY,
    surah_number INTEGER NOT NULL REFERENCES surahs(number),
    ayah_number INTEGER NOT NULL,
    
    -- Text
    text_uthmani TEXT NOT NULL,
    text_simple TEXT NOT NULL,
    text_with_tashkeel TEXT NOT NULL,
    
    -- Position
    juz_number INTEGER NOT NULL,
    hizb_number INTEGER NOT NULL,
    rub_number INTEGER,
    manzil_number INTEGER,
    page_number INTEGER NOT NULL,
    
    -- Properties
    sajda_type TEXT CHECK (sajda_type IN (NULL, 'recommended', 'obligatory')),
    
    UNIQUE(surah_number, ayah_number)
);

CREATE INDEX idx_ayahs_surah ON ayahs(surah_number);
CREATE INDEX idx_ayahs_juz ON ayahs(juz_number);
CREATE INDEX idx_ayahs_page ON ayahs(page_number);
```

### 3.2.3 Translations

```sql
CREATE TABLE translations (
    id INTEGER PRIMARY KEY,
    language_code TEXT NOT NULL,
    translator_name TEXT NOT NULL,
    translator_name_native TEXT,
    is_default INTEGER DEFAULT 0,
    source TEXT,
    
    UNIQUE(language_code, translator_name)
);

CREATE TABLE ayah_translations (
    ayah_id INTEGER NOT NULL REFERENCES ayahs(id),
    translation_id INTEGER NOT NULL REFERENCES translations(id),
    text TEXT NOT NULL,
    
    PRIMARY KEY (ayah_id, translation_id)
);

CREATE INDEX idx_ayah_translations_trans ON ayah_translations(translation_id);
```

### 3.2.4 Tafsir

```sql
CREATE TABLE tafsir_sources (
    id INTEGER PRIMARY KEY,
    name_ar TEXT NOT NULL,
    name_en TEXT NOT NULL,
    author_ar TEXT,
    author_en TEXT,
    language_code TEXT DEFAULT 'ar',
    is_concise INTEGER DEFAULT 0
);

CREATE TABLE ayah_tafsir (
    ayah_id INTEGER NOT NULL REFERENCES ayahs(id),
    tafsir_id INTEGER NOT NULL REFERENCES tafsir_sources(id),
    text TEXT NOT NULL,
    
    PRIMARY KEY (ayah_id, tafsir_id)
);
```

### 3.2.5 Audio Recitations

```sql
CREATE TABLE reciters (
    id INTEGER PRIMARY KEY,
    name_ar TEXT NOT NULL,
    name_en TEXT NOT NULL,
    style TEXT, -- murattal, mujawwad, muallim
    country TEXT,
    photo_url TEXT,
    is_featured INTEGER DEFAULT 0
);

CREATE TABLE recitation_files (
    id INTEGER PRIMARY KEY,
    reciter_id INTEGER NOT NULL REFERENCES reciters(id),
    surah_number INTEGER NOT NULL REFERENCES surahs(number),
    ayah_number INTEGER, -- NULL for full surah
    file_url TEXT NOT NULL,
    duration_ms INTEGER,
    file_size_bytes INTEGER,
    audio_quality TEXT DEFAULT 'high'
);

CREATE INDEX idx_recitations_reciter ON recitation_files(reciter_id);
CREATE INDEX idx_recitations_surah ON recitation_files(surah_number);
```

## 3.3 Tajweed Tables

### 3.3.1 Tajweed Rules

```sql
CREATE TABLE tajweed_rules (
    id INTEGER PRIMARY KEY,
    category TEXT NOT NULL, -- noon_sakinah, meem_sakinah, madd, qalqalah, etc.
    name_ar TEXT NOT NULL,
    name_en TEXT NOT NULL,
    description_ar TEXT,
    description_en TEXT,
    color_code TEXT, -- for highlighting
    audio_example_url TEXT,
    difficulty_level INTEGER DEFAULT 1
);

CREATE TABLE ayah_tajweed_markers (
    id INTEGER PRIMARY KEY,
    ayah_id INTEGER NOT NULL REFERENCES ayahs(id),
    rule_id INTEGER NOT NULL REFERENCES tajweed_rules(id),
    start_position INTEGER NOT NULL,
    end_position INTEGER NOT NULL,
    word_text TEXT
);

CREATE INDEX idx_tajweed_markers_ayah ON ayah_tajweed_markers(ayah_id);
```

## 3.4 Fiqh Tables

### 3.4.1 Fiqh Categories

```sql
CREATE TABLE fiqh_categories (
    id INTEGER PRIMARY KEY,
    parent_id INTEGER REFERENCES fiqh_categories(id),
    name_ar TEXT NOT NULL,
    name_en TEXT NOT NULL,
    icon TEXT,
    sort_order INTEGER DEFAULT 0
);

-- Categories: Taharah, Salah, Zakah, Sawm, Hajj, Muamalat, etc.
```

### 3.4.2 Fiqh Rulings

```sql
CREATE TABLE fiqh_rulings (
    id INTEGER PRIMARY KEY,
    category_id INTEGER NOT NULL REFERENCES fiqh_categories(id),
    
    -- Question
    question_ar TEXT NOT NULL,
    question_en TEXT,
    
    -- Answer
    ruling_ar TEXT NOT NULL,
    ruling_en TEXT,
    ruling_type TEXT CHECK (ruling_type IN (
        'wajib', 'mustahab', 'mubah', 'makruh', 'haram'
    )),
    
    -- Evidence
    quran_references TEXT, -- JSON array of ayah IDs
    hadith_references TEXT, -- JSON array
    scholarly_opinions TEXT, -- JSON with madhab-specific views
    
    -- Metadata
    difficulty_level INTEGER DEFAULT 1,
    is_common INTEGER DEFAULT 0,
    tags TEXT, -- JSON array
    
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX idx_fiqh_rulings_category ON fiqh_rulings(category_id);
CREATE INDEX idx_fiqh_rulings_common ON fiqh_rulings(is_common);
```

## 3.5 Progress Tables

### 3.5.1 Memorization Progress

```sql
CREATE TABLE memorization_progress (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    user_id TEXT NOT NULL REFERENCES users(id),
    surah_number INTEGER NOT NULL REFERENCES surahs(number),
    ayah_number INTEGER NOT NULL,
    
    -- Status
    status TEXT DEFAULT 'not_started' CHECK (status IN (
        'not_started', 'learning', 'reviewing', 'memorized', 'mastered'
    )),
    
    -- Spaced Repetition
    ease_factor REAL DEFAULT 2.5,
    interval_days INTEGER DEFAULT 1,
    repetitions INTEGER DEFAULT 0,
    next_review_date TEXT,
    last_review_date TEXT,
    
    -- Quality Tracking
    last_quality INTEGER, -- 0-5 scale
    average_quality REAL,
    mistake_count INTEGER DEFAULT 0,
    
    -- Timestamps
    first_learned_at TEXT,
    last_practiced_at TEXT,
    mastered_at TEXT,
    
    UNIQUE(user_id, surah_number, ayah_number)
);

CREATE INDEX idx_progress_user ON memorization_progress(user_id);
CREATE INDEX idx_progress_review ON memorization_progress(next_review_date);
CREATE INDEX idx_progress_status ON memorization_progress(status);
```

### 3.5.2 Recitation Sessions

```sql
CREATE TABLE recitation_sessions (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    user_id TEXT NOT NULL REFERENCES users(id),
    
    -- Session Info
    session_type TEXT CHECK (session_type IN (
        'memorization', 'review', 'assessment', 'free_recitation'
    )),
    started_at TEXT NOT NULL,
    ended_at TEXT,
    duration_seconds INTEGER,
    
    -- Content
    surah_number INTEGER NOT NULL,
    ayah_start INTEGER NOT NULL,
    ayah_end INTEGER NOT NULL,
    
    -- Results
    accuracy_score REAL,
    tajweed_score REAL,
    fluency_score REAL,
    overall_score REAL,
    
    -- Dedication
    memorial_id TEXT REFERENCES memorials(id),
    
    -- Recording
    recording_url TEXT,
    
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX idx_sessions_user ON recitation_sessions(user_id);
CREATE INDEX idx_sessions_date ON recitation_sessions(started_at);
CREATE INDEX idx_sessions_memorial ON recitation_sessions(memorial_id);
```

### 3.5.3 Tajweed Mistakes

```sql
CREATE TABLE tajweed_mistakes (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    session_id TEXT NOT NULL REFERENCES recitation_sessions(id),
    user_id TEXT NOT NULL REFERENCES users(id),
    
    -- Location
    ayah_id INTEGER NOT NULL REFERENCES ayahs(id),
    word_position INTEGER,
    
    -- Mistake Details
    rule_id INTEGER REFERENCES tajweed_rules(id),
    mistake_type TEXT, -- omission, mispronunciation, wrong_length, etc.
    expected_text TEXT,
    actual_text TEXT,
    
    -- Audio
    audio_snippet_url TEXT,
    timestamp_ms INTEGER,
    
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX idx_mistakes_user ON tajweed_mistakes(user_id);
CREATE INDEX idx_mistakes_rule ON tajweed_mistakes(rule_id);
```

## 3.6 Achievements & Gamification

### 3.6.1 Achievement Definitions

```sql
CREATE TABLE achievements (
    id TEXT PRIMARY KEY,
    
    -- Display
    name_ar TEXT NOT NULL,
    name_en TEXT NOT NULL,
    description_ar TEXT,
    description_en TEXT,
    icon TEXT,
    color TEXT,
    
    -- Requirements
    category TEXT NOT NULL, -- memorization, tajweed, streak, social, memorial
    requirement_type TEXT NOT NULL, -- count, streak, milestone
    requirement_value INTEGER NOT NULL,
    
    -- Rewards
    points INTEGER DEFAULT 0,
    badge_url TEXT,
    
    -- Visibility
    is_hidden INTEGER DEFAULT 0,
    sort_order INTEGER DEFAULT 0
);
```

### 3.6.2 User Achievements

```sql
CREATE TABLE user_achievements (
    user_id TEXT NOT NULL REFERENCES users(id),
    achievement_id TEXT NOT NULL REFERENCES achievements(id),
    
    -- Progress
    current_value INTEGER DEFAULT 0,
    is_completed INTEGER DEFAULT 0,
    completed_at TEXT,
    
    -- Notification
    is_notified INTEGER DEFAULT 0,
    
    PRIMARY KEY (user_id, achievement_id)
);

CREATE INDEX idx_user_achievements_completed ON user_achievements(is_completed);
```

### 3.6.3 Streaks

```sql
CREATE TABLE user_streaks (
    user_id TEXT PRIMARY KEY REFERENCES users(id),
    
    -- Current Streak
    current_streak INTEGER DEFAULT 0,
    streak_start_date TEXT,
    last_activity_date TEXT,
    
    -- Records
    longest_streak INTEGER DEFAULT 0,
    longest_streak_start TEXT,
    longest_streak_end TEXT,
    
    -- Protection
    freeze_count INTEGER DEFAULT 0,
    freeze_used_date TEXT,
    
    updated_at TEXT DEFAULT (datetime('now'))
);
```

---

# 4. API Specification

## 4.1 API Overview

### Base URL
```
Production: https://api.thikra.org/v1
Staging: https://api-staging.thikra.org/v1
```

### Authentication
```
Authorization: Bearer <token>
X-API-Key: <api_key>  // For SDK usage
```

### Response Format
```json
{
    "success": true,
    "data": { },
    "meta": {
        "timestamp": "2026-01-30T12:00:00Z",
        "request_id": "req_abc123"
    }
}
```

### Error Format
```json
{
    "success": false,
    "error": {
        "code": "VALIDATION_ERROR",
        "message": "Invalid surah number",
        "details": { }
    }
}
```

## 4.2 Authentication Endpoints

### POST /auth/register
```json
// Request
{
    "email": "user@example.com",
    "password": "securepassword",
    "display_name": "أحمد",
    "date_of_birth": "1990-01-15",
    "preferred_language": "ar"
}

// Response
{
    "success": true,
    "data": {
        "user": {
            "id": "usr_abc123",
            "email": "user@example.com",
            "display_name": "أحمد"
        },
        "token": "eyJhbGc...",
        "refresh_token": "ref_xyz..."
    }
}
```

### POST /auth/login
### POST /auth/refresh
### POST /auth/logout
### POST /auth/forgot-password
### POST /auth/reset-password

## 4.3 Quran Endpoints

### GET /quran/surahs
```json
// Response
{
    "success": true,
    "data": {
        "surahs": [
            {
                "number": 1,
                "name_ar": "الفاتحة",
                "name_en": "Al-Fatihah",
                "name_transliteration": "Al-Fātiĥah",
                "revelation_type": "meccan",
                "ayah_count": 7,
                "juz_start": 1
            }
        ]
    }
}
```

### GET /quran/surahs/:number
### GET /quran/surahs/:number/ayahs
### GET /quran/ayahs/:id
### GET /quran/juz/:number
### GET /quran/page/:number
### GET /quran/search

### GET /quran/ayahs/:id/tafsir
```json
// Query params: ?tafsir_id=1&language=ar

// Response
{
    "success": true,
    "data": {
        "ayah": {
            "id": 1,
            "surah_number": 1,
            "ayah_number": 1,
            "text_uthmani": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"
        },
        "tafsir": {
            "source": "التفسير الميسر",
            "text": "أبتدئ قراءة القرآن باسم الله..."
        }
    }
}
```

### GET /quran/ayahs/:id/translations
### GET /quran/ayahs/:id/audio
### GET /quran/reciters

## 4.4 Tajweed Endpoints

### POST /tajweed/analyze
```json
// Request
{
    "audio": "base64_encoded_audio_or_url",
    "surah_number": 1,
    "ayah_start": 1,
    "ayah_end": 7,
    "analysis_depth": "detailed" // basic, detailed, comprehensive
}

// Response
{
    "success": true,
    "data": {
        "overall_score": 87.5,
        "accuracy_score": 92.0,
        "tajweed_score": 83.0,
        "fluency_score": 88.0,
        "duration_ms": 45000,
        "mistakes": [
            {
                "ayah_number": 3,
                "word_position": 2,
                "rule": {
                    "id": "madd_asli",
                    "name_ar": "المد الأصلي",
                    "name_en": "Natural Madd"
                },
                "mistake_type": "wrong_length",
                "expected": "مد طبيعي حركتين",
                "actual": "مد قصير",
                "timestamp_ms": 12500,
                "correction_audio_url": "https://..."
            }
        ],
        "word_by_word": [
            {
                "word": "بِسْمِ",
                "correct": true,
                "tajweed_rules": ["ikhfa"]
            }
        ],
        "recommendations": [
            "تحتاج إلى التركيز على أحكام المدود",
            "راجع درس المد الطبيعي"
        ]
    }
}
```

### GET /tajweed/rules
### GET /tajweed/rules/:id
### GET /tajweed/ayahs/:id/markers

## 4.5 Memorial Endpoints

### POST /memorials
```json
// Request
{
    "name": "عمر",
    "name_ar": "عمر",
    "relation": "son",
    "birth_date": "2020-03-15",
    "death_date": "2025-01-30",
    "biography": "طفل جميل...",
    "is_public": true,
    "allow_contributions": true
}

// Response
{
    "success": true,
    "data": {
        "memorial": {
            "id": "mem_abc123",
            "name": "عمر",
            "share_url": "https://thikra.org/m/abc123",
            "garden_url": "https://thikra.org/garden/abc123"
        }
    }
}
```

### GET /memorials
### GET /memorials/:id
### PATCH /memorials/:id
### DELETE /memorials/:id

### POST /memorials/:id/contribute
```json
// Request
{
    "contribution_type": "khatma", // khatma, surah, ayah, dua
    "surah_number": null, // for khatma
    "quantity": 1,
    "notes": "ختمة في ذكرى وفاته"
}

// Response
{
    "success": true,
    "data": {
        "contribution": {
            "id": "con_xyz789",
            "memorial_id": "mem_abc123",
            "type": "khatma",
            "message": "جزاك الله خيراً. تم إهداء ثواب ختمة كاملة لروح عمر"
        },
        "memorial_stats": {
            "total_khatmas": 156,
            "total_contributors": 89
        }
    }
}
```

### GET /memorials/:id/contributions
### GET /memorials/:id/statistics
### GET /memorials/:id/garden

## 4.6 Progress Endpoints

### GET /progress/overview
```json
// Response
{
    "success": true,
    "data": {
        "memorization": {
            "total_ayahs": 6236,
            "memorized": 450,
            "learning": 23,
            "percentage": 7.2,
            "juz_completed": [1, 30],
            "current_surah": 18,
            "current_ayah": 45
        },
        "streak": {
            "current": 45,
            "longest": 120,
            "freezes_available": 2
        },
        "today": {
            "ayahs_reviewed": 15,
            "ayahs_learned": 3,
            "time_spent_minutes": 25,
            "goal_progress": 0.75
        },
        "achievements_recent": [
            {
                "id": "first_juz",
                "name_ar": "أول جزء",
                "earned_at": "2026-01-28"
            }
        ]
    }
}
```

### GET /progress/memorization
### POST /progress/memorization/review
### GET /progress/schedule
### GET /progress/statistics
### GET /progress/achievements

## 4.7 Fiqh Endpoints

### GET /fiqh/categories
### GET /fiqh/categories/:id/rulings
### GET /fiqh/rulings/:id
### GET /fiqh/search
### POST /fiqh/ask

```json
// POST /fiqh/ask
// Request
{
    "question": "ما حكم الجمع بين الصلاتين في السفر؟",
    "context": "أنا مسافر لمسافة 200 كم",
    "madhab_preference": "hanbali" // optional
}

// Response
{
    "success": true,
    "data": {
        "answer": {
            "ruling": "يجوز للمسافر الجمع بين الظهر والعصر...",
            "ruling_type": "mubah",
            "evidence": {
                "quran": [],
                "hadith": [
                    {
                        "text": "كان النبي ﷺ إذا جد به السير جمع...",
                        "source": "صحيح البخاري",
                        "number": 1107
                    }
                ]
            },
            "madhab_views": {
                "hanafi": "...",
                "maliki": "...",
                "shafii": "...",
                "hanbali": "..."
            },
            "practical_notes": "في حالتك، مسافة 200 كم تعتبر سفراً..."
        },
        "related_rulings": [
            {"id": "ruling_123", "title": "أحكام قصر الصلاة"}
        ]
    }
}
```

## 4.8 Family Endpoints

### POST /families
### GET /families/:id
### POST /families/:id/invite
### POST /families/:id/join
### GET /families/:id/members
### GET /families/:id/progress
### GET /families/:id/leaderboard

---

# 5. SDK Specification

## 5.1 SDK Overview

```javascript
// Installation
npm install @thikra/sdk

// Basic Usage
import { Thikra } from '@thikra/sdk';

const thikra = new Thikra({
    apiKey: 'your_api_key', // optional for public endpoints
    language: 'ar',
    baseUrl: 'https://api.thikra.org/v1' // optional
});
```

## 5.2 Core Modules

### 5.2.1 Quran Module

```typescript
// Types
interface Surah {
    number: number;
    nameAr: string;
    nameEn: string;
    revelationType: 'meccan' | 'medinan';
    ayahCount: number;
}

interface Ayah {
    id: number;
    surahNumber: number;
    ayahNumber: number;
    textUthmani: string;
    textSimple: string;
    juzNumber: number;
    pageNumber: number;
}

interface QuranOptions {
    include?: ('translation' | 'tafsir' | 'audio' | 'tajweed')[];
    translationId?: number;
    tafsirId?: number;
    reciterId?: number;
}

// Methods
class QuranModule {
    // Surahs
    async getSurahs(): Promise<Surah[]>;
    async getSurah(number: number): Promise<Surah>;
    
    // Ayahs
    async getAyah(surah: number, ayah: number, options?: QuranOptions): Promise<Ayah>;
    async getAyahs(surah: number, options?: QuranOptions): Promise<Ayah[]>;
    async getAyahRange(surah: number, start: number, end: number, options?: QuranOptions): Promise<Ayah[]>;
    
    // Navigation
    async getJuz(number: number, options?: QuranOptions): Promise<Ayah[]>;
    async getPage(number: number, options?: QuranOptions): Promise<Ayah[]>;
    async getHizb(number: number, options?: QuranOptions): Promise<Ayah[]>;
    
    // Search
    async search(query: string, options?: SearchOptions): Promise<SearchResult[]>;
    
    // Audio
    async getAudioUrl(surah: number, ayah?: number, reciterId?: number): Promise<string>;
    async getReciters(): Promise<Reciter[]>;
    
    // Translations & Tafsir
    async getTranslations(): Promise<Translation[]>;
    async getTafsirSources(): Promise<TafsirSource[]>;
}

// Usage Examples
const surah = await thikra.quran.getSurah(1);
const ayah = await thikra.quran.getAyah(1, 1, {
    include: ['translation', 'tafsir', 'audio'],
    translationId: 1,
    reciterId: 7
});
const results = await thikra.quran.search('الرحمن');
```

### 5.2.2 Tajweed Module

```typescript
// Types
interface TajweedRule {
    id: string;
    category: string;
    nameAr: string;
    nameEn: string;
    descriptionAr: string;
    colorCode: string;
}

interface AnalysisResult {
    overallScore: number;
    accuracyScore: number;
    tajweedScore: number;
    fluencyScore: number;
    mistakes: TajweedMistake[];
    wordByWord: WordAnalysis[];
    recommendations: string[];
}

interface TajweedMistake {
    ayahNumber: number;
    wordPosition: number;
    rule: TajweedRule;
    mistakeType: string;
    expected: string;
    actual: string;
    timestampMs: number;
    correctionAudioUrl?: string;
}

// Methods
class TajweedModule {
    // Analysis
    async analyze(audio: Blob | string, options: AnalysisOptions): Promise<AnalysisResult>;
    async analyzeRealtime(stream: MediaStream, options: RealtimeOptions): AsyncGenerator<PartialAnalysis>;
    
    // Rules
    async getRules(): Promise<TajweedRule[]>;
    async getRule(id: string): Promise<TajweedRule>;
    async getAyahMarkers(ayahId: number): Promise<TajweedMarker[]>;
    
    // Learning
    async getPracticeExercises(ruleId: string): Promise<Exercise[]>;
    async getWeakAreas(userId: string): Promise<WeakArea[]>;
}

// Usage Examples
// File upload analysis
const audioBlob = await recordAudio();
const result = await thikra.tajweed.analyze(audioBlob, {
    surahNumber: 1,
    ayahStart: 1,
    ayahEnd: 7,
    analysisDepth: 'detailed'
});

// Real-time analysis
const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
for await (const partial of thikra.tajweed.analyzeRealtime(stream, options)) {
    updateUI(partial);
}
```

### 5.2.3 Memorial Module

```typescript
// Types
interface Memorial {
    id: string;
    name: string;
    nameAr?: string;
    relation: string;
    birthDate?: string;
    deathDate?: string;
    photoUrl?: string;
    biography?: string;
    isPublic: boolean;
    allowContributions: boolean;
    stats: MemorialStats;
    shareUrl: string;
    gardenUrl: string;
}

interface MemorialStats {
    totalKhatmas: number;
    totalAyahsRead: number;
    totalDuas: number;
    totalContributors: number;
}

interface Contribution {
    id: string;
    memorialId: string;
    userId: string;
    type: 'khatma' | 'surah' | 'ayah' | 'dua' | 'dhikr';
    surahNumber?: number;
    ayahStart?: number;
    ayahEnd?: number;
    quantity: number;
    contributedAt: string;
}

// Methods
class MemorialModule {
    // CRUD
    async create(data: CreateMemorialData): Promise<Memorial>;
    async get(id: string): Promise<Memorial>;
    async update(id: string, data: UpdateMemorialData): Promise<Memorial>;
    async delete(id: string): Promise<void>;
    async list(options?: ListOptions): Promise<Memorial[]>;
    
    // Contributions
    async contribute(memorialId: string, contribution: ContributionData): Promise<Contribution>;
    async getContributions(memorialId: string, options?: ListOptions): Promise<Contribution[]>;
    
    // Statistics
    async getStatistics(memorialId: string): Promise<DetailedStats>;
    async getGardenData(memorialId: string): Promise<GardenData>;
    
    // Sharing
    async getShareUrl(memorialId: string): Promise<string>;
    async getEmbedCode(memorialId: string): Promise<string>;
}

// Usage Examples
// Create a memorial
const memorial = await thikra.memorial.create({
    name: 'عمر',
    relation: 'son',
    deathDate: '2025-01-30',
    isPublic: true,
    allowContributions: true
});

// Log a khatma
await thikra.memorial.contribute(memorial.id, {
    type: 'khatma',
    notes: 'ختمة في ذكرى وفاته السنوية'
});

// Get garden visualization data
const garden = await thikra.memorial.getGardenData(memorial.id);
```

### 5.2.4 Progress Module

```typescript
// Types
interface ProgressOverview {
    memorization: MemorizationStats;
    streak: StreakInfo;
    today: DailyProgress;
    achievements: Achievement[];
}

interface MemorizationProgress {
    ayahId: number;
    status: 'not_started' | 'learning' | 'reviewing' | 'memorized' | 'mastered';
    easeFactor: number;
    intervalDays: number;
    nextReviewDate: string;
    lastQuality: number;
}

interface ReviewSession {
    ayahs: AyahForReview[];
    estimatedMinutes: number;
}

// Methods
class ProgressModule {
    // Overview
    async getOverview(): Promise<ProgressOverview>;
    async getStatistics(period?: 'week' | 'month' | 'year' | 'all'): Promise<Statistics>;
    
    // Memorization
    async getMemorizationProgress(surah?: number): Promise<MemorizationProgress[]>;
    async updateProgress(ayahId: number, quality: number): Promise<MemorizationProgress>;
    async getNextReview(): Promise<ReviewSession>;
    
    // Schedule
    async getSchedule(): Promise<Schedule>;
    async setDailyGoal(ayahCount: number): Promise<void>;
    
    // Streaks
    async getStreak(): Promise<StreakInfo>;
    async useStreakFreeze(): Promise<StreakInfo>;
    
    // Achievements
    async getAchievements(): Promise<Achievement[]>;
    async getAchievementProgress(id: string): Promise<AchievementProgress>;
    
    // Sessions
    async startSession(type: SessionType, options: SessionOptions): Promise<Session>;
    async endSession(sessionId: string, results: SessionResults): Promise<SessionSummary>;
    async logRecitation(data: RecitationData): Promise<void>;
}

// Usage Examples
// Get today's review
const review = await thikra.progress.getNextReview();

// Update after reviewing an ayah
await thikra.progress.updateProgress(ayahId, 4); // quality: 0-5

// Start a memorization session
const session = await thikra.progress.startSession('memorization', {
    surah: 18,
    ayahStart: 1,
    ayahEnd: 10,
    memorialId: 'mem_abc123' // dedicate to memorial
});
```

### 5.2.5 Fiqh Module

```typescript
// Types
interface FiqhCategory {
    id: number;
    parentId?: number;
    nameAr: string;
    nameEn: string;
    icon: string;
    children?: FiqhCategory[];
}

interface FiqhRuling {
    id: number;
    categoryId: number;
    questionAr: string;
    questionEn?: string;
    rulingAr: string;
    rulingEn?: string;
    rulingType: 'wajib' | 'mustahab' | 'mubah' | 'makruh' | 'haram';
    evidence: Evidence;
    madhabViews?: MadhabViews;
}

interface AskResponse {
    answer: {
        ruling: string;
        rulingType: string;
        evidence: Evidence;
        madhabViews?: MadhabViews;
        practicalNotes?: string;
    };
    relatedRulings: FiqhRuling[];
    confidence: number;
}

// Methods
class FiqhModule {
    // Categories
    async getCategories(): Promise<FiqhCategory[]>;
    async getCategory(id: number): Promise<FiqhCategory>;
    
    // Rulings
    async getRulings(categoryId: number, options?: ListOptions): Promise<FiqhRuling[]>;
    async getRuling(id: number): Promise<FiqhRuling>;
    async search(query: string, options?: SearchOptions): Promise<FiqhRuling[]>;
    
    // AI Assistant
    async ask(question: string, options?: AskOptions): Promise<AskResponse>;
    
    // Common Questions
    async getCommonQuestions(categoryId?: number): Promise<FiqhRuling[]>;
    async getDailyRuling(): Promise<FiqhRuling>;
}

// Usage Examples
// Browse categories
const categories = await thikra.fiqh.getCategories();

// Ask a question
const answer = await thikra.fiqh.ask(
    'ما حكم الجمع بين الصلاتين في السفر؟',
    { madhab: 'hanbali' }
);

// Search rulings
const results = await thikra.fiqh.search('قصر الصلاة');
```

### 5.2.6 Family Module

```typescript
// Types
interface Family {
    id: string;
    name: string;
    members: FamilyMember[];
    sharedMemorial?: Memorial;
    weeklyGoal: number;
    inviteCode: string;
}

interface FamilyMember {
    userId: string;
    displayName: string;
    avatarUrl?: string;
    role: 'admin' | 'member' | 'child';
    weeklyProgress: number;
}

// Methods
class FamilyModule {
    // CRUD
    async create(name: string): Promise<Family>;
    async get(id: string): Promise<Family>;
    async update(id: string, data: UpdateFamilyData): Promise<Family>;
    
    // Members
    async invite(familyId: string): Promise<{ inviteCode: string; inviteUrl: string }>;
    async join(inviteCode: string): Promise<Family>;
    async removeMember(familyId: string, userId: string): Promise<void>;
    async updateMemberRole(familyId: string, userId: string, role: string): Promise<void>;
    
    // Progress
    async getProgress(familyId: string): Promise<FamilyProgress>;
    async getLeaderboard(familyId: string): Promise<LeaderboardEntry[]>;
    
    // Shared Memorial
    async setSharedMemorial(familyId: string, memorialId: string): Promise<void>;
    
    // Challenges
    async createChallenge(familyId: string, challenge: ChallengeData): Promise<Challenge>;
    async getChallenges(familyId: string): Promise<Challenge[]>;
}

// Usage Examples
// Create family
const family = await thikra.family.create('عائلة أحمد');

// Generate invite
const { inviteUrl } = await thikra.family.invite(family.id);

// Get weekly leaderboard
const leaderboard = await thikra.family.getLeaderboard(family.id);
```

## 5.3 React Hooks

```typescript
// @thikra/sdk-react

import {
    ThikraProvider,
    useQuran,
    useTajweed,
    useMemorial,
    useProgress,
    useFiqh,
    useFamily,
    useAuth
} from '@thikra/sdk-react';

// Provider
function App() {
    return (
        <ThikraProvider apiKey="your_key" language="ar">
            <YourApp />
        </ThikraProvider>
    );
}

// Hooks
function QuranReader() {
    const { getSurah, getAyah, isLoading, error } = useQuran();
    const [surah, setSurah] = useState(null);
    
    useEffect(() => {
        getSurah(1).then(setSurah);
    }, []);
    
    if (isLoading) return <Loading />;
    if (error) return <Error message={error} />;
    return <SurahDisplay surah={surah} />;
}

function RecitationPractice() {
    const { analyze, analyzeRealtime, isAnalyzing } = useTajweed();
    const [result, setResult] = useState(null);
    
    const handleRecordingComplete = async (audioBlob) => {
        const analysis = await analyze(audioBlob, {
            surahNumber: 1,
            ayahStart: 1,
            ayahEnd: 7
        });
        setResult(analysis);
    };
    
    return (
        <div>
            <AudioRecorder onComplete={handleRecordingComplete} />
            {isAnalyzing && <AnalyzingIndicator />}
            {result && <AnalysisResult result={result} />}
        </div>
    );
}

function MemorialGarden() {
    const { memorial, contribute, stats, isLoading } = useMemorial('mem_abc123');
    
    const handleKhatmaComplete = () => {
        contribute({ type: 'khatma' });
    };
    
    return (
        <div>
            <h1>{memorial?.name}</h1>
            <GardenVisualization stats={stats} />
            <button onClick={handleKhatmaComplete}>إهداء ختمة</button>
        </div>
    );
}
```

## 5.4 Mobile SDK

```typescript
// @thikra/sdk-mobile (React Native)

import {
    ThikraProvider,
    useOfflineQuran,
    useAudioPlayer,
    useRecorder,
    usePushNotifications
} from '@thikra/sdk-mobile';

// Offline Support
function OfflineQuranReader() {
    const { 
        downloadSurah, 
        isDownloaded, 
        getOfflineAyahs,
        downloadProgress 
    } = useOfflineQuran();
    
    useEffect(() => {
        // Download Juz Amma for offline use
        for (let i = 78; i <= 114; i++) {
            if (!isDownloaded(i)) {
                downloadSurah(i);
            }
        }
    }, []);
    
    return <QuranReader getAyahs={getOfflineAyahs} />;
}

// Audio Player
function AudioPlayer() {
    const { 
        play, 
        pause, 
        seek,
        currentAyah,
        isPlaying,
        setReciter,
        setRepeatMode
    } = useAudioPlayer();
    
    return (
        <PlayerControls
            isPlaying={isPlaying}
            onPlay={play}
            onPause={pause}
            currentAyah={currentAyah}
        />
    );
}

// Recording
function RecitationRecorder() {
    const {
        startRecording,
        stopRecording,
        isRecording,
        audioBlob,
        duration
    } = useRecorder();
    
    return (
        <RecorderUI
            isRecording={isRecording}
            duration={duration}
            onStart={startRecording}
            onStop={stopRecording}
        />
    );
}
```

---

# 6. AI Services Specification

## 6.1 Tajweed AI Engine

### 6.1.1 Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    TAJWEED AI PIPELINE                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────┐    ┌─────────────┐    ┌──────────────┐            │
│  │  Audio  │───▶│   Speech    │───▶│    Text      │            │
│  │  Input  │    │ Recognition │    │  Alignment   │            │
│  └─────────┘    └─────────────┘    └──────────────┘            │
│                                            │                    │
│                                            ▼                    │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                 ANALYSIS LAYER                          │   │
│  ├─────────────┬─────────────┬─────────────┬──────────────┤   │
│  │  Phonetic   │  Timing     │  Tajweed    │  Fluency     │   │
│  │  Analysis   │  Analysis   │  Rules      │  Analysis    │   │
│  └─────────────┴─────────────┴─────────────┴──────────────┘   │
│                                            │                    │
│                                            ▼                    │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              SCORING & FEEDBACK                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 6.1.2 Tajweed Rules Detection

```typescript
interface TajweedRulesEngine {
    // Noon Sakinah & Tanween Rules
    detectIzhar(audio: AudioSegment, expected: string): RuleDetection;
    detectIdgham(audio: AudioSegment, expected: string): RuleDetection;
    detectIqlab(audio: AudioSegment, expected: string): RuleDetection;
    detectIkhfa(audio: AudioSegment, expected: string): RuleDetection;
    
    // Meem Sakinah Rules
    detectIdghamShafawi(audio: AudioSegment, expected: string): RuleDetection;
    detectIkhfaShafawi(audio: AudioSegment, expected: string): RuleDetection;
    detectIzharShafawi(audio: AudioSegment, expected: string): RuleDetection;
    
    // Madd Rules
    detectMaddTabii(audio: AudioSegment, expected: string): RuleDetection;
    detectMaddMuttasil(audio: AudioSegment, expected: string): RuleDetection;
    detectMaddMunfasil(audio: AudioSegment, expected: string): RuleDetection;
    detectMaddLazim(audio: AudioSegment, expected: string): RuleDetection;
    detectMaddArid(audio: AudioSegment, expected: string): RuleDetection;
    
    // Other Rules
    detectQalqalah(audio: AudioSegment, expected: string): RuleDetection;
    detectGhunnah(audio: AudioSegment, expected: string): RuleDetection;
    detectTafkhim(audio: AudioSegment, expected: string): RuleDetection;
    detectTarqiq(audio: AudioSegment, expected: string): RuleDetection;
}

interface RuleDetection {
    detected: boolean;
    correct: boolean;
    confidence: number;
    expectedDuration?: number;
    actualDuration?: number;
    feedback: string;
}
```

### 6.1.3 Scoring Algorithm

```typescript
interface ScoringEngine {
    calculateOverallScore(analysis: FullAnalysis): number;
    
    // Component Scores (0-100)
    calculateAccuracyScore(wordAnalysis: WordAnalysis[]): number;
    calculateTajweedScore(ruleDetections: RuleDetection[]): number;
    calculateFluencyScore(timingAnalysis: TimingAnalysis): number;
    calculatePronunciationScore(phonetics: PhoneticAnalysis[]): number;
    
    // Weighted Final Score
    // Accuracy: 40%, Tajweed: 35%, Fluency: 15%, Pronunciation: 10%
}
```

## 6.2 Fiqh AI Assistant

### 6.2.1 Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    FIQH AI ASSISTANT                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────┐    ┌─────────────┐    ┌──────────────┐            │
│  │ Question│───▶│   Intent    │───▶│   Context    │            │
│  │  Input  │    │ Classification│   │  Extraction  │            │
│  └─────────┘    └─────────────┘    └──────────────┘            │
│                                            │                    │
│                                            ▼                    │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              KNOWLEDGE RETRIEVAL                        │   │
│  ├─────────────┬─────────────┬─────────────┬──────────────┤   │
│  │   Quran     │   Hadith    │   Fiqh      │   Fatawa     │   │
│  │   Verses    │   Database  │   Rulings   │   Database   │   │
│  └─────────────┴─────────────┴─────────────┴──────────────┘   │
│                                            │                    │
│                                            ▼                    │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              RESPONSE GENERATION                        │   │
│  │  • Cite sources accurately                              │   │
│  │  • Present madhab differences when relevant             │   │
│  │  • Provide practical guidance                           │   │
│  │  • Flag areas of scholarly disagreement                 │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 6.2.2 Safety Guardrails

```typescript
interface FiqhAIGuardrails {
    // Content Validation
    validateQuestion(question: string): ValidationResult;
    validateResponse(response: string): ValidationResult;
    
    // Source Verification
    verifyQuranReference(surah: number, ayah: number, text: string): boolean;
    verifyHadithReference(source: string, number: number, text: string): boolean;
    
    // Scope Limitations
    isWithinScope(question: string): boolean;
    requiresScholarReferral(question: string): boolean;
    
    // Disclaimers
    addAppropriateDisclaimers(response: string, questionType: string): string;
}

const FIQH_AI_RULES = {
    // Always include
    CITE_SOURCES: true,
    MENTION_IKHTILAF: true, // scholarly disagreement
    ADD_DISCLAIMER: true,
    
    // Never do
    ISSUE_FATWA: false,
    DISCUSS_POLITICS: false,
    PERSONAL_OPINIONS: false,
    
    // Refer to scholar for
    REFER_TOPICS: [
        'marriage_divorce',
        'inheritance_complex',
        'business_contracts_complex',
        'medical_ethics',
        'contemporary_issues'
    ]
};
```

## 6.3 Recommendation Engine

### 6.3.1 Spaced Repetition Algorithm (SM-2 Modified)

```typescript
interface SpacedRepetitionEngine {
    // Calculate next review date based on quality (0-5)
    calculateNextReview(
        currentEaseFactor: number,
        currentInterval: number,
        repetitions: number,
        quality: number // 0=complete blackout, 5=perfect
    ): {
        nextInterval: number;
        newEaseFactor: number;
        newRepetitions: number;
        nextReviewDate: Date;
    };
    
    // Get optimal review schedule for today
    getOptimalSchedule(userId: string): ReviewSchedule;
    
    // Identify weak areas needing extra attention
    identifyWeakAreas(userId: string): WeakArea[];
    
    // Predict forgetting probability
    predictForgettingProbability(
        lastReview: Date,
        interval: number,
        easeFactor: number
    ): number;
}

// SM-2 Algorithm Implementation
function calculateNextReview(ef: number, interval: number, reps: number, q: number) {
    // Quality < 3 means failure, reset
    if (q < 3) {
        return {
            nextInterval: 1,
            newEaseFactor: Math.max(1.3, ef - 0.2),
            newRepetitions: 0,
            nextReviewDate: addDays(new Date(), 1)
        };
    }
    
    // Calculate new ease factor
    const newEF = Math.max(1.3, ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
    
    // Calculate new interval
    let newInterval: number;
    if (reps === 0) {
        newInterval = 1;
    } else if (reps === 1) {
        newInterval = 6;
    } else {
        newInterval = Math.round(interval * newEF);
    }
    
    return {
        nextInterval: newInterval,
        newEaseFactor: newEF,
        newRepetitions: reps + 1,
        nextReviewDate: addDays(new Date(), newInterval)
    };
}
```

### 6.3.2 Personalized Learning Path

```typescript
interface LearningPathEngine {
    // Generate personalized memorization plan
    generateMemorizationPlan(
        userId: string,
        targetSurahs: number[],
        dailyMinutes: number,
        deadline?: Date
    ): MemorizationPlan;
    
    // Adjust plan based on progress
    adjustPlan(userId: string, currentProgress: Progress): MemorizationPlan;
    
    // Recommend next ayahs to memorize
    recommendNextAyahs(userId: string, sessionMinutes: number): Ayah[];
    
    // Identify similar ayahs (mutashabihat) for special attention
    identifySimilarAyahs(surah: number, ayah: number): SimilarAyah[];
}
```

---

# 7. User Interface Specifications

## 7.1 Age-Adaptive Design System

### 7.1.1 Design Tokens by Age Group

```typescript
const DESIGN_TOKENS = {
    child: { // 4-12 years
        colors: {
            primary: '#4CAF50',      // Friendly green
            secondary: '#FF9800',    // Warm orange
            background: '#FFF8E1',   // Soft cream
            text: '#5D4037',         // Warm brown
            accent: '#E91E63'        // Playful pink
        },
        typography: {
            fontFamily: 'Noto Naskh Arabic, Comic Sans MS',
            fontSize: {
                body: '20px',
                heading: '28px',
                ayah: '32px'
            },
            lineHeight: 2.0
        },
        spacing: {
            padding: '24px',
            gap: '20px',
            borderRadius: '20px'
        },
        animations: {
            enabled: true,
            celebratory: true,
            soundEffects: true
        }
    },
    
    youth: { // 13-25 years
        colors: {
            primary: '#2196F3',      // Modern blue
            secondary: '#673AB7',    // Deep purple
            background: '#FAFAFA',
            text: '#212121',
            accent: '#00BCD4'        // Cyan
        },
        typography: {
            fontFamily: 'Amiri, Inter',
            fontSize: {
                body: '16px',
                heading: '24px',
                ayah: '24px'
            },
            lineHeight: 1.8
        },
        spacing: {
            padding: '16px',
            gap: '12px',
            borderRadius: '12px'
        },
        animations: {
            enabled: true,
            celebratory: false,
            soundEffects: false
        }
    },
    
    adult: { // 25-60 years
        colors: {
            primary: '#1565C0',      // Professional blue
            secondary: '#00695C',    // Teal
            background: '#FFFFFF',
            text: '#1A1A1A',
            accent: '#C2185B'        // Deep pink
        },
        typography: {
            fontFamily: 'Amiri, Roboto',
            fontSize: {
                body: '16px',
                heading: '22px',
                ayah: '22px'
            },
            lineHeight: 1.75
        },
        spacing: {
            padding: '16px',
            gap: '12px',
            borderRadius: '8px'
        },
        animations: {
            enabled: true,
            celebratory: false,
            soundEffects: false
        }
    },
    
    elder: { // 60+ years
        colors: {
            primary: '#1B5E20',      // Calm green
            secondary: '#4E342E',    // Warm brown
            background: '#FFFDE7',   // Easy on eyes
            text: '#212121',
            accent: '#BF360C'        // Warm orange
        },
        typography: {
            fontFamily: 'Amiri, Georgia',
            fontSize: {
                body: '22px',
                heading: '30px',
                ayah: '34px'
            },
            lineHeight: 2.2
        },
        spacing: {
            padding: '24px',
            gap: '20px',
            borderRadius: '4px'
        },
        animations: {
            enabled: false,
            celebratory: false,
            soundEffects: false
        }
    }
};
```

### 7.1.2 Component Variants

```tsx
// Adaptive Ayah Display Component
interface AyahDisplayProps {
    ayah: Ayah;
    ageGroup: 'child' | 'youth' | 'adult' | 'elder';
    showTranslation?: boolean;
    showTafsir?: boolean;
    highlightTajweed?: boolean;
}

function AyahDisplay({ ayah, ageGroup, ...props }: AyahDisplayProps) {
    const tokens = DESIGN_TOKENS[ageGroup];
    
    return (
        <div style={{
            fontFamily: tokens.typography.fontFamily,
            fontSize: tokens.typography.fontSize.ayah,
            lineHeight: tokens.typography.lineHeight,
            padding: tokens.spacing.padding,
            borderRadius: tokens.spacing.borderRadius,
            backgroundColor: tokens.colors.background,
            color: tokens.colors.text
        }}>
            <p className="ayah-text" dir="rtl">
                {props.highlightTajweed 
                    ? <TajweedHighlighter text={ayah.textUthmani} />
                    : ayah.textUthmani
                }
            </p>
            
            {ageGroup === 'child' && (
                <ChildFriendlyElements ayah={ayah} />
            )}
            
            {props.showTranslation && (
                <p className="translation">{ayah.translation}</p>
            )}
        </div>
    );
}
```

## 7.2 Memorial Garden Visualization

### 7.2.1 Garden Metaphor

```typescript
interface GardenVisualization {
    // Garden grows based on contributions
    trees: Tree[];      // Each khatma plants a tree
    flowers: Flower[];  // Each surah plants a flower
    grass: number;      // Ayahs contribute to grass density
    birds: Bird[];      // Active contributors shown as birds
    sky: SkyState;      // Changes based on time of day
    
    // Interactivity
    onTreeClick(tree: Tree): void;  // Shows khatma details
    onFlowerClick(flower: Flower): void;  // Shows surah details
}

interface Tree {
    id: string;
    type: 'olive' | 'palm' | 'fig' | 'cedar';  // Quranic trees
    position: { x: number; y: number };
    size: 'sapling' | 'young' | 'mature' | 'ancient';
    contributorName: string;
    khatmaDate: string;
    notes?: string;
}
```

### 7.2.2 Garden Rendering (React + Canvas)

```tsx
function MemorialGarden({ memorial, stats }: GardenProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        // Draw sky gradient based on time
        drawSky(ctx, getCurrentSkyState());
        
        // Draw ground
        drawGround(ctx, stats.totalAyahsRead);
        
        // Draw trees for khatmas
        stats.khatmas.forEach((khatma, i) => {
            const tree = generateTree(khatma, i, stats.totalKhatmas);
            drawTree(ctx, tree);
        });
        
        // Draw flowers for surahs
        stats.surahs.forEach((surah, i) => {
            const flower = generateFlower(surah, i);
            drawFlower(ctx, flower);
        });
        
        // Draw birds for active contributors
        stats.activeContributors.forEach(contributor => {
            drawBird(ctx, contributor);
        });
        
        // Draw memorial plaque
        drawMemorialPlaque(ctx, memorial);
        
    }, [memorial, stats]);
    
    return (
        <div className="memorial-garden">
            <canvas ref={canvasRef} width={800} height={600} />
            <GardenStats stats={stats} />
            <ContributeButton memorialId={memorial.id} />
        </div>
    );
}
```

## 7.3 Key Screens

### 7.3.1 Home Screen (Adult)

```
┌─────────────────────────────────────────────────────────────┐
│  ذِكرى                                    🔔  ⚙️  👤        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  السلام عليكم، أحمد                                         │
│  ────────────────────────────────────────────────           │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  📖 مراجعة اليوم                                    │   │
│  │  ──────────────────────────────────────────────     │   │
│  │  15 آية للمراجعة        ████████░░░░░░  45%         │   │
│  │  الوقت المتوقع: 20 دقيقة                            │   │
│  │                                                     │   │
│  │              [ ابدأ المراجعة ]                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐                  │
│  │  🔥 45          │  │  📊 التقدم      │                  │
│  │  يوم متواصل     │  │  450/6236 آية   │                  │
│  │                 │  │  7.2%           │                  │
│  └─────────────────┘  └─────────────────┘                  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  🌳 حديقة عمر                                       │   │
│  │  ──────────────────────────────────────────────     │   │
│  │  [          Garden Visualization          ]         │   │
│  │  156 ختمة  •  89 مساهم  •  12,450 آية              │   │
│  │                                                     │   │
│  │              [ إهداء ثواب ]                         │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  👨‍👩‍👧‍👦 عائلتي                                         │   │
│  │  ──────────────────────────────────────────────     │   │
│  │  أنت ■■■■■■░░░░  60%                                │   │
│  │  خالد ■■■■░░░░░░  40%                               │   │
│  │  أم خالد ■■■░░░░░░░  30%                            │   │
│  │                                                     │   │
│  │  هدف الأسبوع: 100 آية  |  المتبقي: 35              │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  🏠      📖      🎤      📚      👤                        │
│  الرئيسية  القرآن  التسميع  الفقه   حسابي                   │
└─────────────────────────────────────────────────────────────┘
```

### 7.3.2 Home Screen (Child - خالد)

```
┌─────────────────────────────────────────────────────────────┐
│  ⭐ ذِكرى ⭐                                    🔔  ⚙️     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│           🌟 مرحباً خالد! 🌟                               │
│                                                             │
│     ┌───────────────────────────────────────────┐          │
│     │         🏆 أنت بطل اليوم! 🏆              │          │
│     │                                           │          │
│     │    [  Character Animation  ]              │          │
│     │                                           │          │
│     │         حفظت 3 آيات أمس!                 │          │
│     └───────────────────────────────────────────┘          │
│                                                             │
│     ┌─────────────┐     ┌─────────────┐                    │
│     │             │     │             │                    │
│     │   📖        │     │   🎮        │                    │
│     │   تعلّم     │     │   العب      │                    │
│     │             │     │             │                    │
│     └─────────────┘     └─────────────┘                    │
│                                                             │
│     ┌─────────────┐     ┌─────────────┐                    │
│     │             │     │             │                    │
│     │   🎤        │     │   🌳        │                    │
│     │   سمّع      │     │   حديقة     │                    │
│     │             │     │   عمر       │                    │
│     └─────────────┘     └─────────────┘                    │
│                                                             │
│     ┌───────────────────────────────────────────┐          │
│     │  ⭐⭐⭐⭐⭐ نجومك: 45                      │          │
│     │  ████████████░░░░░░░░  12/20 لهدية جديدة  │          │
│     └───────────────────────────────────────────┘          │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│     🏠         📖         🎮         ⭐                    │
│    البيت      تعلّم       العب      جوائزي                 │
└─────────────────────────────────────────────────────────────┘
```

---

# 8. Implementation Roadmap

## 8.1 Phase 1: Foundation (Month 1)

### Week 1-2: Infrastructure Setup
- [ ] Setup Cloudflare account and configure Workers
- [ ] Create D1 databases with initial schema
- [ ] Setup R2 buckets for media storage
- [ ] Configure KV namespaces
- [ ] Setup CI/CD pipeline

### Week 3-4: Core API Development
- [ ] Implement authentication system
- [ ] Build Quran data import pipeline
- [ ] Create basic CRUD endpoints
- [ ] Setup API documentation

**Deliverables:**
- Working API with authentication
- Quran text available via API
- Basic SDK structure

## 8.2 Phase 2: Memorial System (Month 2)

### Week 1-2: Memorial Core
- [ ] Memorial CRUD operations
- [ ] Contribution tracking
- [ ] Statistics aggregation
- [ ] Share functionality

### Week 3-4: Garden Visualization
- [ ] Garden rendering engine
- [ ] Interactive elements
- [ ] Mobile-responsive design
- [ ] Embed system for sharing

**Deliverables:**
- Complete memorial system
- Working garden visualization
- Shareable memorial pages

## 8.3 Phase 3: Learning Engine (Month 3)

### Week 1-2: Progress Tracking
- [ ] Spaced repetition algorithm
- [ ] Progress database schema
- [ ] Review scheduling
- [ ] Achievement system

### Week 3-4: Basic UI
- [ ] Adult interface (MVP)
- [ ] Child interface (MVP)
- [ ] Offline Quran support
- [ ] Audio playback

**Deliverables:**
- Working memorization tracker
- Basic review system
- Two age-appropriate interfaces

## 8.4 Phase 4: AI Integration (Month 4)

### Week 1-2: Tajweed AI
- [ ] Audio processing pipeline
- [ ] Basic mistake detection
- [ ] Scoring system
- [ ] Feedback generation

### Week 3-4: Fiqh AI
- [ ] Knowledge base setup
- [ ] Question answering system
- [ ] Source citation
- [ ] Safety guardrails

**Deliverables:**
- Working Tajweed analysis
- Basic Fiqh assistant
- AI safety measures

## 8.5 Phase 5: Polish & Launch (Month 5)

### Week 1-2: Testing & Refinement
- [ ] User acceptance testing
- [ ] Performance optimization
- [ ] Security audit
- [ ] Accessibility review

### Week 3-4: Launch Preparation
- [ ] Documentation completion
- [ ] Marketing materials
- [ ] Community guidelines
- [ ] Support system setup

**Deliverables:**
- Production-ready platform
- Complete documentation
- Launch plan

---

# 9. Technical Requirements

## 9.1 Performance Targets

| Metric | Target |
|--------|--------|
| API Response Time (p95) | < 200ms |
| Page Load Time | < 2s |
| Tajweed Analysis Time | < 5s |
| Offline Quran Access | < 100ms |
| Audio Streaming Start | < 500ms |

## 9.2 Scalability Targets

| Metric | Year 1 | Year 3 | Year 5 |
|--------|--------|--------|--------|
| Monthly Active Users | 10K | 100K | 1M |
| Daily API Calls | 100K | 1M | 10M |
| Storage (R2) | 100GB | 1TB | 10TB |
| D1 Database Size | 1GB | 10GB | 100GB |

## 9.3 Availability Target

- **Uptime SLA:** 99.9% (8.76 hours downtime/year)
- **RTO:** 1 hour
- **RPO:** 1 hour

## 9.4 Security Requirements

- All data encrypted at rest and in transit
- API authentication via JWT + API keys
- Rate limiting per endpoint
- Input validation and sanitization
- Regular security audits
- GDPR/privacy compliance

---

# 10. Appendices

## Appendix A: Glossary

| Term | Arabic | Description |
|------|--------|-------------|
| Tajweed | تجويد | Rules of Quranic recitation |
| Khatma | ختمة | Complete recitation of the Quran |
| Surah | سورة | Chapter of the Quran |
| Ayah | آية | Verse of the Quran |
| Tafsir | تفسير | Quranic exegesis/interpretation |
| Fiqh | فقه | Islamic jurisprudence |
| Madhab | مذهب | School of Islamic law |
| Sadaqah Jariyah | صدقة جارية | Continuous charity |
| Madd | مد | Elongation in recitation |
| Ghunnah | غنة | Nasalization |
| Qalqalah | قلقلة | Echoing sound |

## Appendix B: Quran Structure

| Division | Arabic | Count |
|----------|--------|-------|
| Surah | سورة | 114 |
| Juz | جزء | 30 |
| Hizb | حزب | 60 |
| Rub | ربع | 240 |
| Ayah | آية | 6,236 |
| Word | كلمة | 77,430 |
| Letter | حرف | 323,671 |

## Appendix C: API Rate Limits

| Tier | Requests/minute | Requests/day |
|------|-----------------|--------------|
| Free | 60 | 10,000 |
| Basic | 120 | 50,000 |
| Pro | 600 | 500,000 |
| Enterprise | Unlimited | Unlimited |

---

**Document Version:** 1.0  
**Last Updated:** January 30, 2026  
**Author:** Claude AI for Ahmed  
**Status:** Draft for Review

---

بسم الله، هذا المشروع صدقة جارية لروح **عمر** ولكل من فقدناهم.

اللهم اجعله في موازين حسناتهم.
