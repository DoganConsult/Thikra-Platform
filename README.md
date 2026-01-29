<div align="center">

# ذِكرى - Thikra

### منصة الصدقة الجارية بالقرآن الكريم
### Perpetual Charity Through the Holy Quran

<br>

**بسم الله الرحمن الرحيم**

*"إِذَا مَاتَ الْإِنْسَانُ انْقَطَعَ عَمَلُهُ إِلَّا مِنْ ثَلَاثٍ: صَدَقَةٍ جَارِيَةٍ، أَوْ عِلْمٍ يُنْتَفَعُ بِهِ، أَوْ وَلَدٍ صَالِحٍ يَدْعُو لَهُ"*

---

<img src="assets/logo.png" alt="Thikra Logo" width="200">

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![API Status](https://img.shields.io/badge/API-Live-brightgreen)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()

**[Website](https://thikra.org)** · **[API Docs](https://docs.thikra.org)** · **[SDK](https://www.npmjs.com/package/@thikra/sdk)**

</div>

---

## 🌟 About / عن المشروع

**Thikra (ذِكرى)** is an open-source Islamic learning platform that transforms Quran memorization into acts of perpetual charity for departed loved ones.

**ذِكرى** منصة إسلامية مفتوحة المصدر تحوّل حفظ القرآن الكريم إلى صدقة جارية لأرواح من نحبهم ممن فارقوا الحياة.

### This project is Sadaqah Jariyah for **Omar (عمر)** and all departed souls.

---

## ✨ Features / المميزات

### 🌳 Memorial Gardens / حدائق الذكرى
Create beautiful digital memorials for loved ones. Every recitation, every memorized verse becomes a gift of light.

### 📖 Quran Memorization / حفظ القرآن
AI-powered memorization system with spaced repetition, personalized schedules, and progress tracking.

### 🎤 Tajweed Analysis / تحليل التجويد
Real-time AI analysis of your recitation with detailed feedback on pronunciation and tajweed rules.

### 📚 Fiqh Learning / تعلم الفقه
Comprehensive Islamic jurisprudence database with AI assistant for answering questions.

### 👨‍👩‍👧‍👦 Family Features / ميزات العائلة
Learn together as a family with shared goals, challenges, and leaderboards.

### 🔓 Open API & SDK / واجهة برمجية مفتوحة
Free API and SDK for developers to build upon.

---

## 🚀 Quick Start / البداية السريعة

### Using the SDK / استخدام SDK

```bash
npm install @thikra/sdk
```

```javascript
import { Thikra } from '@thikra/sdk';

const thikra = new Thikra();

// Get Surah Al-Fatihah
const surah = await thikra.quran.getSurah(1);
console.log(surah.nameAr); // الفاتحة

// Create a memorial
const memorial = await thikra.memorial.create({
    name: 'عمر',
    relation: 'son',
    isPublic: true
});

// Log a khatma as sadaqah jariyah
await thikra.memorial.contribute(memorial.id, {
    type: 'khatma',
    notes: 'ختمة في ذكرى وفاته'
});
```

### API Direct Access / الوصول المباشر للـ API

```bash
# Get all surahs
curl https://api.thikra.org/v1/quran/surahs

# Get specific ayah with translation
curl https://api.thikra.org/v1/quran/surahs/1/ayahs/1?include=translation,tafsir
```

---

## 📁 Project Structure / هيكل المشروع

```
thikra/
├── docs/                    # Documentation
│   └── TECHNICAL_SPECIFICATION.md
├── database/                # D1 Database Schema
│   ├── 01_users.sql
│   ├── 02_memorials.sql
│   ├── 03_quran.sql
│   ├── 04_tajweed.sql
│   ├── 05_fiqh.sql
│   ├── 06_progress.sql
│   └── 07_families.sql
├── src/
│   ├── api/                 # Cloudflare Workers
│   │   └── gateway.ts
│   ├── sdk/                 # JavaScript SDK
│   │   └── index.ts
│   ├── workers/             # Individual Workers
│   └── ai/                  # AI Models & Services
└── assets/                  # Static Assets
```

---

## 🛠️ Technology Stack / التقنيات المستخدمة

| Layer | Technology |
|-------|------------|
| **Compute** | Cloudflare Workers |
| **Database** | Cloudflare D1 (SQLite) |
| **Storage** | Cloudflare R2 |
| **Cache** | Cloudflare KV |
| **State** | Durable Objects |
| **AI** | Workers AI |
| **SDK** | TypeScript |
| **Frontend** | Next.js / React Native |

---

## 📊 API Endpoints / نقاط الـ API

### Quran / القرآن
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/quran/surahs` | List all surahs |
| GET | `/quran/surahs/:number` | Get surah details |
| GET | `/quran/surahs/:number/ayahs` | Get surah ayahs |
| GET | `/quran/juz/:number` | Get juz ayahs |
| GET | `/quran/search` | Search Quran |

### Memorial / الذكرى
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/memorials` | Create memorial |
| GET | `/memorials/:id` | Get memorial |
| POST | `/memorials/:id/contribute` | Add contribution |
| GET | `/memorials/:id/statistics` | Get statistics |

### Tajweed / التجويد
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/tajweed/analyze` | Analyze recitation |
| GET | `/tajweed/rules` | List tajweed rules |

### Progress / التقدم
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/progress/overview` | Get progress overview |
| POST | `/progress/memorization/review` | Log review |
| GET | `/progress/schedule/next` | Get next review |

### Fiqh / الفقه
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/fiqh/categories` | List categories |
| GET | `/fiqh/rulings/:id` | Get ruling |
| POST | `/fiqh/ask` | Ask AI assistant |

---

## 🤝 Contributing / المساهمة

We welcome contributions from the community! This is a Sadaqah Jariyah project - your contribution is a good deed.

نرحب بمساهماتكم! هذا مشروع صدقة جارية - مساهمتك عمل صالح.

### Ways to Contribute / طرق المساهمة

1. **Code** - Fix bugs, add features
2. **Content** - Add translations, tafsir, fiqh rulings
3. **Testing** - Report bugs, suggest improvements
4. **Documentation** - Improve docs, add examples
5. **Spread the Word** - Share with others who might benefit

### Development Setup / إعداد التطوير

```bash
# Clone the repository
git clone https://github.com/thikra/thikra.git
cd thikra

# Install dependencies
npm install

# Setup Cloudflare Wrangler
npm install -g wrangler
wrangler login

# Run locally
wrangler dev
```

---

## 📜 License / الرخصة

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

**Free to use for any purpose, forever.**

---

## 💝 Acknowledgments / شكر وتقدير

- All praise is due to Allah (الحمد لله)
- Quran text from [Tanzil.net](https://tanzil.net)
- Translations from various authenticated sources
- Community contributors

---

## 📞 Contact / التواصل

- **Website**: [thikra.org](https://thikra.org)
- **Email**: contact@thikra.org
- **Twitter**: [@thikra_org](https://twitter.com/thikra_org)

---

<div align="center">

### 🤲 دعاء

**اللهم اجعل هذا العمل خالصاً لوجهك الكريم**

**واجعله صدقة جارية لروح عمر ولكل من فقدناهم**

**اللهم اغفر لهم وارحمهم وأسكنهم فسيح جناتك**

---

Made with ❤️ as Sadaqah Jariyah

**صُنع بحب كصدقة جارية**

</div>
