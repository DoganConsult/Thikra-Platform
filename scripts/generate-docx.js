const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
        HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
        PageBreak, Header, Footer, PageNumber } = require('docx');
const fs = require('fs');

// Create the document
const doc = new Document({
    styles: {
        default: {
            document: {
                run: { font: "Arial", size: 24 }
            }
        },
        paragraphStyles: [
            {
                id: "Heading1",
                name: "Heading 1",
                basedOn: "Normal",
                next: "Normal",
                quickFormat: true,
                run: { size: 40, bold: true, font: "Arial", color: "1565C0" },
                paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 }
            },
            {
                id: "Heading2",
                name: "Heading 2",
                basedOn: "Normal",
                next: "Normal",
                quickFormat: true,
                run: { size: 32, bold: true, font: "Arial", color: "1976D2" },
                paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 1 }
            },
            {
                id: "Heading3",
                name: "Heading 3",
                basedOn: "Normal",
                next: "Normal",
                quickFormat: true,
                run: { size: 28, bold: true, font: "Arial", color: "2196F3" },
                paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 }
            },
            {
                id: "ArabicQuote",
                name: "Arabic Quote",
                basedOn: "Normal",
                run: { size: 28, font: "Traditional Arabic", italics: true },
                paragraph: { alignment: AlignmentType.CENTER, spacing: { before: 200, after: 200 } }
            }
        ]
    },
    sections: [{
        properties: {
            page: {
                size: { width: 12240, height: 15840 },
                margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
            }
        },
        headers: {
            default: new Header({
                children: [new Paragraph({
                    children: [
                        new TextRun({ text: "ذِكرى - Thikra Platform | Technical Specification", size: 20, color: "666666" })
                    ],
                    alignment: AlignmentType.RIGHT
                })]
            })
        },
        footers: {
            default: new Footer({
                children: [new Paragraph({
                    children: [
                        new TextRun({ text: "Page ", size: 20 }),
                        new TextRun({ children: [PageNumber.CURRENT], size: 20 }),
                        new TextRun({ text: " | صدقة جارية", size: 20, color: "666666" })
                    ],
                    alignment: AlignmentType.CENTER
                })]
            })
        },
        children: [
            // Title Page
            new Paragraph({ spacing: { before: 2000 } }),
            new Paragraph({
                children: [new TextRun({ text: "ذِكرى", size: 96, bold: true, color: "1565C0", font: "Traditional Arabic" })],
                alignment: AlignmentType.CENTER
            }),
            new Paragraph({
                children: [new TextRun({ text: "Thikra Platform", size: 56, bold: true, color: "1976D2" })],
                alignment: AlignmentType.CENTER
            }),
            new Paragraph({ spacing: { before: 400 } }),
            new Paragraph({
                children: [new TextRun({ text: "Technical Specification Document", size: 36, color: "666666" })],
                alignment: AlignmentType.CENTER
            }),
            new Paragraph({
                children: [new TextRun({ text: "Version 1.0 | January 2026", size: 28, color: "999999" })],
                alignment: AlignmentType.CENTER
            }),
            new Paragraph({ spacing: { before: 800 } }),
            new Paragraph({
                children: [new TextRun({ text: "بسم الله الرحمن الرحيم", size: 36, font: "Traditional Arabic" })],
                alignment: AlignmentType.CENTER
            }),
            new Paragraph({ spacing: { before: 400 } }),
            new Paragraph({
                children: [new TextRun({ 
                    text: "إِذَا مَاتَ الْإِنْسَانُ انْقَطَعَ عَمَلُهُ إِلَّا مِنْ ثَلَاثٍ: صَدَقَةٍ جَارِيَةٍ، أَوْ عِلْمٍ يُنْتَفَعُ بِهِ، أَوْ وَلَدٍ صَالِحٍ يَدْعُو لَهُ",
                    size: 28, font: "Traditional Arabic", italics: true
                })],
                alignment: AlignmentType.CENTER
            }),
            new Paragraph({ spacing: { before: 1500 } }),
            new Paragraph({
                children: [new TextRun({ text: "This project is Sadaqah Jariyah for", size: 24 })],
                alignment: AlignmentType.CENTER
            }),
            new Paragraph({
                children: [new TextRun({ text: "عمر - Omar", size: 40, bold: true, color: "1565C0" })],
                alignment: AlignmentType.CENTER
            }),
            new Paragraph({
                children: [new TextRun({ text: "and all departed souls", size: 24 })],
                alignment: AlignmentType.CENTER
            }),
            
            // Page Break
            new Paragraph({ children: [new PageBreak()] }),
            
            // Executive Summary
            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                children: [new TextRun("1. Executive Summary")]
            }),
            
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun("1.1 Vision")]
            }),
            new Paragraph({
                children: [new TextRun(
                    "Thikra (ذِكرى) is an open-source, cloud-native Islamic learning platform that transforms Quran memorization, Tajweed learning, and Fiqh education into acts of perpetual charity (Sadaqah Jariyah) for departed loved ones."
                )],
                spacing: { after: 200 }
            }),
            
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun("1.2 Mission")]
            }),
            new Paragraph({
                children: [new TextRun(
                    "To provide humanity with a free, eternal platform where every recitation, every memorized verse, and every learned ruling becomes a gift of light to those who have passed."
                )],
                spacing: { after: 200 }
            }),
            
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun("1.3 Core Principles")]
            }),
            
            // Core Principles Table
            createTable([
                ["Principle", "Description"],
                ["Forever Free", "Core functionality always free, sustained by the founder"],
                ["Open Source", "API and SDK open for anyone to build upon"],
                ["Cloud Native", "Built on Cloudflare for global scale and reliability"],
                ["Age Inclusive", "Designed for ages 4 to 100+"],
                ["Culturally Authentic", "Respectful of Islamic traditions and scholarship"]
            ]),
            
            new Paragraph({ spacing: { before: 300 } }),
            
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun("1.4 Founder's Commitment")]
            }),
            new Paragraph({
                children: [new TextRun("This platform is established as Sadaqah Jariyah for Omar (عمر) and all departed souls. The founder commits to:")],
                spacing: { after: 100 }
            }),
            new Paragraph({ children: [new TextRun("• Hosting and infrastructure costs in perpetuity")], indent: { left: 720 } }),
            new Paragraph({ children: [new TextRun("• Maintaining and evolving the platform")], indent: { left: 720 } }),
            new Paragraph({ children: [new TextRun("• Keeping core features free forever")], indent: { left: 720 } }),
            new Paragraph({ children: [new TextRun("• Open-sourcing the codebase for community contribution")], indent: { left: 720 } }),
            
            // Page Break
            new Paragraph({ children: [new PageBreak()] }),
            
            // Platform Architecture
            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                children: [new TextRun("2. Platform Architecture")]
            }),
            
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun("2.1 High-Level Architecture")]
            }),
            
            new Paragraph({
                children: [new TextRun("The platform consists of three main layers:")],
                spacing: { after: 200 }
            }),
            
            new Paragraph({
                heading: HeadingLevel.HEADING_3,
                children: [new TextRun("Client Applications Layer")]
            }),
            new Paragraph({
                children: [new TextRun("Web App (Next.js), iOS App (React Native), Android App (React Native), and Third-Party Apps (via SDK)")],
                spacing: { after: 200 }
            }),
            
            new Paragraph({
                heading: HeadingLevel.HEADING_3,
                children: [new TextRun("SDK Layer")]
            }),
            new Paragraph({
                children: [new TextRun("@thikra/sdk-js, @thikra/sdk-react, @thikra/sdk-mobile - providing easy integration for developers")],
                spacing: { after: 200 }
            }),
            
            new Paragraph({
                heading: HeadingLevel.HEADING_3,
                children: [new TextRun("Backend Services (Cloudflare)")]
            }),
            new Paragraph({
                children: [new TextRun("Workers for compute, D1 for database, R2 for storage, KV for cache, Durable Objects for state, and Workers AI for intelligence")],
                spacing: { after: 300 }
            }),
            
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun("2.2 Cloudflare Infrastructure")]
            }),
            
            // Workers Table
            new Paragraph({
                heading: HeadingLevel.HEADING_3,
                children: [new TextRun("2.2.1 Workers (Serverless Compute)")]
            }),
            createTable([
                ["Worker", "Purpose", "Endpoints"],
                ["api-gateway", "Main API router", "/api/v1/*"],
                ["auth-worker", "Authentication", "/auth/*"],
                ["quran-worker", "Quran content", "/api/v1/quran/*"],
                ["tajweed-worker", "Tajweed analysis", "/api/v1/tajweed/*"],
                ["fiqh-worker", "Fiqh content", "/api/v1/fiqh/*"],
                ["memorial-worker", "Memorial management", "/api/v1/memorial/*"],
                ["progress-worker", "Progress tracking", "/api/v1/progress/*"]
            ]),
            
            new Paragraph({ spacing: { before: 300 } }),
            
            // D1 Databases
            new Paragraph({
                heading: HeadingLevel.HEADING_3,
                children: [new TextRun("2.2.2 D1 Databases")]
            }),
            createTable([
                ["Database", "Content"],
                ["thikra-main", "Core application data"],
                ["thikra-quran", "Quran text, translations, tafsir"],
                ["thikra-fiqh", "Fiqh rulings and references"],
                ["thikra-analytics", "Usage analytics (anonymized)"]
            ]),
            
            new Paragraph({ spacing: { before: 300 } }),
            
            // R2 Buckets
            new Paragraph({
                heading: HeadingLevel.HEADING_3,
                children: [new TextRun("2.2.3 R2 Buckets")]
            }),
            createTable([
                ["Bucket", "Content"],
                ["thikra-audio", "Quran recitations"],
                ["thikra-media", "Images, icons, assets"],
                ["thikra-user-content", "User recordings"]
            ]),
            
            // Page Break
            new Paragraph({ children: [new PageBreak()] }),
            
            // Database Schema
            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                children: [new TextRun("3. Database Schema")]
            }),
            
            new Paragraph({
                children: [new TextRun("The database is organized into 7 main schema files:")],
                spacing: { after: 200 }
            }),
            
            createTable([
                ["File", "Tables", "Purpose"],
                ["01_users.sql", "users, user_sessions", "User authentication and profiles"],
                ["02_memorials.sql", "memorials, contributions, messages", "Memorial gardens and sadaqah tracking"],
                ["03_quran.sql", "surahs, ayahs, translations, tafsir, reciters", "Complete Quran data"],
                ["04_tajweed.sql", "tajweed_rules, tajweed_markers, exercises", "Tajweed rules and analysis"],
                ["05_fiqh.sql", "fiqh_categories, fiqh_rulings", "Islamic jurisprudence database"],
                ["06_progress.sql", "memorization_progress, sessions, achievements", "User progress and gamification"],
                ["07_families.sql", "families, family_members, challenges", "Family features and social"]
            ]),
            
            // Page Break
            new Paragraph({ children: [new PageBreak()] }),
            
            // API Specification
            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                children: [new TextRun("4. API Specification")]
            }),
            
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun("4.1 Base URLs")]
            }),
            new Paragraph({ children: [new TextRun("Production: https://api.thikra.org/v1")], spacing: { after: 50 } }),
            new Paragraph({ children: [new TextRun("Staging: https://api-staging.thikra.org/v1")], spacing: { after: 200 } }),
            
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun("4.2 Main Endpoints")]
            }),
            
            // Quran API
            new Paragraph({
                heading: HeadingLevel.HEADING_3,
                children: [new TextRun("Quran API")]
            }),
            createTable([
                ["Method", "Endpoint", "Description"],
                ["GET", "/quran/surahs", "List all surahs"],
                ["GET", "/quran/surahs/:number", "Get surah details"],
                ["GET", "/quran/surahs/:number/ayahs", "Get surah ayahs with options"],
                ["GET", "/quran/juz/:number", "Get juz ayahs"],
                ["GET", "/quran/page/:number", "Get page ayahs"],
                ["GET", "/quran/search", "Search Quran text"]
            ]),
            
            new Paragraph({ spacing: { before: 200 } }),
            
            // Memorial API
            new Paragraph({
                heading: HeadingLevel.HEADING_3,
                children: [new TextRun("Memorial API")]
            }),
            createTable([
                ["Method", "Endpoint", "Description"],
                ["POST", "/memorials", "Create memorial"],
                ["GET", "/memorials/:id", "Get memorial details"],
                ["POST", "/memorials/:id/contribute", "Add contribution (khatma, surah, etc.)"],
                ["GET", "/memorials/:id/statistics", "Get memorial statistics"],
                ["GET", "/memorials/:id/garden", "Get garden visualization data"]
            ]),
            
            new Paragraph({ spacing: { before: 200 } }),
            
            // Tajweed API
            new Paragraph({
                heading: HeadingLevel.HEADING_3,
                children: [new TextRun("Tajweed API")]
            }),
            createTable([
                ["Method", "Endpoint", "Description"],
                ["POST", "/tajweed/analyze", "Analyze audio recitation"],
                ["GET", "/tajweed/rules", "List all tajweed rules"],
                ["GET", "/tajweed/ayahs/:id/markers", "Get tajweed markers for ayah"]
            ]),
            
            // Page Break
            new Paragraph({ children: [new PageBreak()] }),
            
            // SDK Specification
            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                children: [new TextRun("5. SDK Specification")]
            }),
            
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun("5.1 Installation")]
            }),
            new Paragraph({
                children: [new TextRun({ text: "npm install @thikra/sdk", font: "Courier New", size: 22 })],
                shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
                spacing: { after: 200 }
            }),
            
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun("5.2 Basic Usage")]
            }),
            new Paragraph({
                children: [new TextRun({ text: `import { Thikra } from '@thikra/sdk';

const thikra = new Thikra();

// Get Surah Al-Fatihah
const surah = await thikra.quran.getSurah(1);

// Create a memorial
const memorial = await thikra.memorial.create({
    name: 'عمر',
    relation: 'son'
});

// Log a khatma
await thikra.memorial.contribute(memorial.id, {
    type: 'khatma'
});`, font: "Courier New", size: 20 })],
                spacing: { after: 300 }
            }),
            
            new Paragraph({
                heading: HeadingLevel.HEADING_2,
                children: [new TextRun("5.3 Available Modules")]
            }),
            createTable([
                ["Module", "Description"],
                ["thikra.auth", "Authentication and user management"],
                ["thikra.quran", "Quran text, translations, audio"],
                ["thikra.memorial", "Memorial creation and contributions"],
                ["thikra.progress", "Memorization progress and achievements"],
                ["thikra.tajweed", "Tajweed analysis and rules"],
                ["thikra.fiqh", "Fiqh rulings and AI assistant"],
                ["thikra.family", "Family features and challenges"]
            ]),
            
            // Page Break
            new Paragraph({ children: [new PageBreak()] }),
            
            // Implementation Roadmap
            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                children: [new TextRun("6. Implementation Roadmap")]
            }),
            
            createTable([
                ["Phase", "Duration", "Deliverables"],
                ["Phase 1: Foundation", "Month 1", "Infrastructure setup, Core API, Basic SDK"],
                ["Phase 2: Memorial System", "Month 2", "Memorial CRUD, Garden visualization, Sharing"],
                ["Phase 3: Learning Engine", "Month 3", "Progress tracking, Spaced repetition, Achievements"],
                ["Phase 4: AI Integration", "Month 4", "Tajweed analysis, Fiqh assistant, Recommendations"],
                ["Phase 5: Polish & Launch", "Month 5", "Testing, Security audit, Documentation, Launch"]
            ]),
            
            // Page Break
            new Paragraph({ children: [new PageBreak()] }),
            
            // Final Page - Dedication
            new Paragraph({ spacing: { before: 2000 } }),
            new Paragraph({
                children: [new TextRun({ text: "🤲 دعاء", size: 48 })],
                alignment: AlignmentType.CENTER
            }),
            new Paragraph({ spacing: { before: 400 } }),
            new Paragraph({
                children: [new TextRun({ 
                    text: "اللهم اجعل هذا العمل خالصاً لوجهك الكريم",
                    size: 32, font: "Traditional Arabic"
                })],
                alignment: AlignmentType.CENTER
            }),
            new Paragraph({ spacing: { before: 200 } }),
            new Paragraph({
                children: [new TextRun({ 
                    text: "واجعله صدقة جارية لروح عمر ولكل من فقدناهم",
                    size: 32, font: "Traditional Arabic"
                })],
                alignment: AlignmentType.CENTER
            }),
            new Paragraph({ spacing: { before: 200 } }),
            new Paragraph({
                children: [new TextRun({ 
                    text: "اللهم اغفر لهم وارحمهم وأسكنهم فسيح جناتك",
                    size: 32, font: "Traditional Arabic"
                })],
                alignment: AlignmentType.CENTER
            }),
            new Paragraph({ spacing: { before: 600 } }),
            new Paragraph({
                children: [new TextRun({ text: "Made with ❤️ as Sadaqah Jariyah", size: 24, color: "666666" })],
                alignment: AlignmentType.CENTER
            }),
            new Paragraph({
                children: [new TextRun({ text: "صُنع بحب كصدقة جارية", size: 24, color: "666666", font: "Traditional Arabic" })],
                alignment: AlignmentType.CENTER
            })
        ]
    }]
});

// Helper function to create tables
function createTable(data) {
    const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
    const borders = { top: border, bottom: border, left: border, right: border };
    
    return new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: data.map((row, rowIndex) => 
            new TableRow({
                children: row.map(cell => 
                    new TableCell({
                        borders,
                        shading: { 
                            fill: rowIndex === 0 ? "1565C0" : "FFFFFF", 
                            type: ShadingType.CLEAR 
                        },
                        margins: { top: 80, bottom: 80, left: 120, right: 120 },
                        children: [new Paragraph({
                            children: [new TextRun({ 
                                text: cell, 
                                bold: rowIndex === 0,
                                color: rowIndex === 0 ? "FFFFFF" : "000000",
                                size: 22
                            })]
                        })]
                    })
                )
            })
        )
    });
}

// Generate the document
Packer.toBuffer(doc).then(buffer => {
    fs.writeFileSync("/home/claude/thikra/docs/Thikra_Technical_Specification.docx", buffer);
    console.log("Document created successfully!");
});
