/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * ذِكرى - Thikra SDK
 * Official JavaScript/TypeScript SDK for the Thikra Platform
 * 
 * بسم الله الرحمن الرحيم
 * هذا المشروع صدقة جارية لروح عمر ولكل من فقدناهم
 * ═══════════════════════════════════════════════════════════════════════════════
 */

// ─────────────────────────────────────────────────────────────────────────────
// Types & Interfaces
// ─────────────────────────────────────────────────────────────────────────────

export interface ThikraConfig {
    apiKey?: string;
    baseUrl?: string;
    language?: 'ar' | 'en';
    timeout?: number;
    retries?: number;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    meta?: {
        timestamp: string;
        requestId: string;
    };
    error?: {
        code: string;
        message: string;
        details?: Record<string, unknown>;
    };
}

// Quran Types
export interface Surah {
    number: number;
    nameAr: string;
    nameEn: string;
    nameTransliteration: string;
    revelationType: 'meccan' | 'medinan';
    ayahCount: number;
    wordCount: number;
    juzStart: number;
}

export interface Ayah {
    id: number;
    surahNumber: number;
    ayahNumber: number;
    textUthmani: string;
    textSimple: string;
    juzNumber: number;
    hizbNumber: number;
    pageNumber: number;
    translation?: string;
    tafsir?: string;
    audioUrl?: string;
    tajweedMarkers?: TajweedMarker[];
}

export interface TajweedMarker {
    ruleId: string;
    ruleName: string;
    ruleNameAr: string;
    startPosition: number;
    endPosition: number;
    colorCode: string;
}

export interface Reciter {
    id: number;
    nameAr: string;
    nameEn: string;
    style: 'murattal' | 'mujawwad' | 'muallim';
    photoUrl?: string;
}

// Memorial Types
export interface Memorial {
    id: string;
    name: string;
    nameAr?: string;
    relation: string;
    birthDate?: string;
    deathDate?: string;
    deathHijriDate?: string;
    photoUrl?: string;
    biography?: string;
    isPublic: boolean;
    allowContributions: boolean;
    theme: string;
    stats: MemorialStats;
    shareUrl: string;
    gardenUrl: string;
    createdAt: string;
}

export interface MemorialStats {
    totalKhatmas: number;
    totalSurahs: number;
    totalAyahsRead: number;
    totalDuas: number;
    totalContributors: number;
    totalVisits: number;
}

export interface Contribution {
    id: string;
    memorialId: string;
    userId: string;
    type: ContributionType;
    surahNumber?: number;
    ayahStart?: number;
    ayahEnd?: number;
    quantity: number;
    notes?: string;
    isAnonymous: boolean;
    contributedAt: string;
}

export type ContributionType = 
    | 'khatma' | 'surah' | 'ayah' | 'juz' | 'hizb'
    | 'dua' | 'dhikr' | 'salah' | 'fasting' | 'charity';

// Progress Types
export interface ProgressOverview {
    memorization: MemorizationStats;
    streak: StreakInfo;
    today: DailyProgress;
    achievements: Achievement[];
}

export interface MemorizationStats {
    totalAyahs: number;
    memorized: number;
    learning: number;
    reviewing: number;
    mastered: number;
    percentage: number;
    currentSurah: number;
    currentAyah: number;
    juzCompleted: number[];
}

export interface StreakInfo {
    current: number;
    longest: number;
    streakStartDate?: string;
    lastActivityDate?: string;
    freezesAvailable: number;
}

export interface DailyProgress {
    ayahsMemorized: number;
    ayahsReviewed: number;
    ayahsRead: number;
    timeSpentMinutes: number;
    sessionsCount: number;
    goalProgress: number;
}

export interface Achievement {
    id: string;
    nameAr: string;
    nameEn: string;
    descriptionAr?: string;
    descriptionEn?: string;
    icon: string;
    category: string;
    isCompleted: boolean;
    completedAt?: string;
    currentValue: number;
    targetValue: number;
    progress: number;
}

// Tajweed Types
export interface TajweedAnalysisResult {
    overallScore: number;
    accuracyScore: number;
    tajweedScore: number;
    fluencyScore: number;
    durationMs: number;
    mistakes: TajweedMistake[];
    wordByWord: WordAnalysis[];
    recommendations: string[];
}

export interface TajweedMistake {
    ayahNumber: number;
    wordPosition: number;
    rule: TajweedRule;
    mistakeType: string;
    expected: string;
    actual: string;
    timestampMs: number;
    correctionAudioUrl?: string;
}

export interface TajweedRule {
    id: string;
    category: string;
    nameAr: string;
    nameEn: string;
    descriptionAr?: string;
    descriptionEn?: string;
    colorCode: string;
}

export interface WordAnalysis {
    word: string;
    position: number;
    isCorrect: boolean;
    tajweedRules: string[];
    score: number;
}

// Fiqh Types
export interface FiqhCategory {
    id: number;
    parentId?: number;
    nameAr: string;
    nameEn: string;
    icon?: string;
    children?: FiqhCategory[];
}

export interface FiqhRuling {
    id: number;
    categoryId: number;
    questionAr: string;
    questionEn?: string;
    rulingAr: string;
    rulingEn?: string;
    rulingType: 'wajib' | 'mustahab' | 'mubah' | 'makruh' | 'haram' | 'varies';
    evidence: {
        quran: QuranReference[];
        hadith: HadithReference[];
    };
    madhabViews?: MadhabViews;
}

export interface QuranReference {
    surah: number;
    ayah: number;
    text: string;
}

export interface HadithReference {
    text: string;
    source: string;
    number?: number;
    grade?: string;
}

export interface MadhabViews {
    hanafi?: string;
    maliki?: string;
    shafii?: string;
    hanbali?: string;
}

// Family Types
export interface Family {
    id: string;
    name: string;
    nameAr?: string;
    photoUrl?: string;
    members: FamilyMember[];
    sharedMemorial?: Memorial;
    weeklyGoal: number;
    inviteCode: string;
    stats: FamilyStats;
}

export interface FamilyMember {
    userId: string;
    displayName: string;
    avatarUrl?: string;
    role: 'admin' | 'member' | 'child';
    totalAyahs: number;
    currentWeekAyahs: number;
    currentStreak: number;
}

export interface FamilyStats {
    totalAyahsMemorized: number;
    totalKhatmas: number;
    currentWeekAyahs: number;
    memberCount: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// HTTP Client
// ─────────────────────────────────────────────────────────────────────────────

class HttpClient {
    private baseUrl: string;
    private apiKey?: string;
    private token?: string;
    private timeout: number;
    private retries: number;

    constructor(config: ThikraConfig) {
        this.baseUrl = config.baseUrl || 'https://api.thikra.org/v1';
        this.apiKey = config.apiKey;
        this.timeout = config.timeout || 30000;
        this.retries = config.retries || 3;
    }

    setToken(token: string) {
        this.token = token;
    }

    clearToken() {
        this.token = undefined;
    }

    private async request<T>(
        method: string,
        path: string,
        body?: unknown,
        options?: RequestInit
    ): Promise<ApiResponse<T>> {
        const url = `${this.baseUrl}${path}`;
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        if (this.apiKey) {
            headers['X-API-Key'] = this.apiKey;
        }

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        let lastError: Error | null = null;
        
        for (let attempt = 0; attempt < this.retries; attempt++) {
            try {
                const response = await fetch(url, {
                    method,
                    headers,
                    body: body ? JSON.stringify(body) : undefined,
                    signal: controller.signal,
                    ...options,
                });

                clearTimeout(timeoutId);

                const data = await response.json();

                if (!response.ok) {
                    throw new ThikraError(
                        data.error?.message || 'Request failed',
                        data.error?.code || 'UNKNOWN_ERROR',
                        response.status
                    );
                }

                return data as ApiResponse<T>;
            } catch (error) {
                lastError = error as Error;
                if (attempt < this.retries - 1) {
                    await this.delay(Math.pow(2, attempt) * 1000);
                }
            }
        }

        throw lastError;
    }

    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    get<T>(path: string): Promise<ApiResponse<T>> {
        return this.request<T>('GET', path);
    }

    post<T>(path: string, body?: unknown): Promise<ApiResponse<T>> {
        return this.request<T>('POST', path, body);
    }

    patch<T>(path: string, body?: unknown): Promise<ApiResponse<T>> {
        return this.request<T>('PATCH', path, body);
    }

    delete<T>(path: string): Promise<ApiResponse<T>> {
        return this.request<T>('DELETE', path);
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Error Class
// ─────────────────────────────────────────────────────────────────────────────

export class ThikraError extends Error {
    code: string;
    status: number;

    constructor(message: string, code: string, status: number = 500) {
        super(message);
        this.name = 'ThikraError';
        this.code = code;
        this.status = status;
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Quran Module
// ─────────────────────────────────────────────────────────────────────────────

export class QuranModule {
    constructor(private http: HttpClient) {}

    async getSurahs(): Promise<Surah[]> {
        const response = await this.http.get<{ surahs: Surah[] }>('/quran/surahs');
        return response.data.surahs;
    }

    async getSurah(number: number): Promise<Surah> {
        const response = await this.http.get<{ surah: Surah }>(`/quran/surahs/${number}`);
        return response.data.surah;
    }

    async getAyah(
        surah: number,
        ayah: number,
        options?: {
            include?: ('translation' | 'tafsir' | 'audio' | 'tajweed')[];
            translationId?: number;
            tafsirId?: number;
            reciterId?: number;
        }
    ): Promise<Ayah> {
        const params = new URLSearchParams();
        if (options?.include) params.set('include', options.include.join(','));
        if (options?.translationId) params.set('translation_id', String(options.translationId));
        if (options?.tafsirId) params.set('tafsir_id', String(options.tafsirId));
        if (options?.reciterId) params.set('reciter_id', String(options.reciterId));

        const query = params.toString() ? `?${params}` : '';
        const response = await this.http.get<{ ayah: Ayah }>(`/quran/surahs/${surah}/ayahs/${ayah}${query}`);
        return response.data.ayah;
    }

    async getAyahs(
        surah: number,
        options?: {
            include?: ('translation' | 'tafsir' | 'audio' | 'tajweed')[];
            translationId?: number;
        }
    ): Promise<Ayah[]> {
        const params = new URLSearchParams();
        if (options?.include) params.set('include', options.include.join(','));
        if (options?.translationId) params.set('translation_id', String(options.translationId));

        const query = params.toString() ? `?${params}` : '';
        const response = await this.http.get<{ ayahs: Ayah[] }>(`/quran/surahs/${surah}/ayahs${query}`);
        return response.data.ayahs;
    }

    async getJuz(number: number): Promise<Ayah[]> {
        const response = await this.http.get<{ ayahs: Ayah[] }>(`/quran/juz/${number}`);
        return response.data.ayahs;
    }

    async getPage(number: number): Promise<Ayah[]> {
        const response = await this.http.get<{ ayahs: Ayah[] }>(`/quran/page/${number}`);
        return response.data.ayahs;
    }

    async search(query: string, options?: { limit?: number; surah?: number }): Promise<Ayah[]> {
        const params = new URLSearchParams({ q: query });
        if (options?.limit) params.set('limit', String(options.limit));
        if (options?.surah) params.set('surah', String(options.surah));

        const response = await this.http.get<{ results: Ayah[] }>(`/quran/search?${params}`);
        return response.data.results;
    }

    async getReciters(): Promise<Reciter[]> {
        const response = await this.http.get<{ reciters: Reciter[] }>('/quran/reciters');
        return response.data.reciters;
    }

    async getAudioUrl(surah: number, ayah?: number, reciterId?: number): Promise<string> {
        const params = new URLSearchParams();
        if (ayah) params.set('ayah', String(ayah));
        if (reciterId) params.set('reciter_id', String(reciterId));

        const query = params.toString() ? `?${params}` : '';
        const response = await this.http.get<{ url: string }>(`/quran/surahs/${surah}/audio${query}`);
        return response.data.url;
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Memorial Module
// ─────────────────────────────────────────────────────────────────────────────

export class MemorialModule {
    constructor(private http: HttpClient) {}

    async create(data: {
        name: string;
        nameAr?: string;
        relation: string;
        birthDate?: string;
        deathDate?: string;
        biography?: string;
        isPublic?: boolean;
        allowContributions?: boolean;
        theme?: string;
    }): Promise<Memorial> {
        const response = await this.http.post<{ memorial: Memorial }>('/memorials', data);
        return response.data.memorial;
    }

    async get(id: string): Promise<Memorial> {
        const response = await this.http.get<{ memorial: Memorial }>(`/memorials/${id}`);
        return response.data.memorial;
    }

    async update(id: string, data: Partial<Memorial>): Promise<Memorial> {
        const response = await this.http.patch<{ memorial: Memorial }>(`/memorials/${id}`, data);
        return response.data.memorial;
    }

    async delete(id: string): Promise<void> {
        await this.http.delete(`/memorials/${id}`);
    }

    async list(options?: { page?: number; limit?: number }): Promise<Memorial[]> {
        const params = new URLSearchParams();
        if (options?.page) params.set('page', String(options.page));
        if (options?.limit) params.set('limit', String(options.limit));

        const query = params.toString() ? `?${params}` : '';
        const response = await this.http.get<{ memorials: Memorial[] }>(`/memorials${query}`);
        return response.data.memorials;
    }

    async contribute(
        memorialId: string,
        contribution: {
            type: ContributionType;
            surahNumber?: number;
            ayahStart?: number;
            ayahEnd?: number;
            juzNumber?: number;
            quantity?: number;
            notes?: string;
            isAnonymous?: boolean;
        }
    ): Promise<Contribution> {
        const response = await this.http.post<{ contribution: Contribution }>(
            `/memorials/${memorialId}/contribute`,
            contribution
        );
        return response.data.contribution;
    }

    async getContributions(
        memorialId: string,
        options?: { page?: number; limit?: number; type?: ContributionType }
    ): Promise<Contribution[]> {
        const params = new URLSearchParams();
        if (options?.page) params.set('page', String(options.page));
        if (options?.limit) params.set('limit', String(options.limit));
        if (options?.type) params.set('type', options.type);

        const query = params.toString() ? `?${params}` : '';
        const response = await this.http.get<{ contributions: Contribution[] }>(
            `/memorials/${memorialId}/contributions${query}`
        );
        return response.data.contributions;
    }

    async getStatistics(memorialId: string): Promise<MemorialStats & { timeline: unknown[] }> {
        const response = await this.http.get<{ stats: MemorialStats & { timeline: unknown[] } }>(
            `/memorials/${memorialId}/statistics`
        );
        return response.data.stats;
    }

    async getShareUrl(memorialId: string): Promise<string> {
        const response = await this.http.get<{ shareUrl: string }>(`/memorials/${memorialId}/share`);
        return response.data.shareUrl;
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Progress Module
// ─────────────────────────────────────────────────────────────────────────────

export class ProgressModule {
    constructor(private http: HttpClient) {}

    async getOverview(): Promise<ProgressOverview> {
        const response = await this.http.get<ProgressOverview>('/progress/overview');
        return response.data;
    }

    async getMemorizationProgress(surah?: number): Promise<unknown[]> {
        const query = surah ? `?surah=${surah}` : '';
        const response = await this.http.get<{ progress: unknown[] }>(`/progress/memorization${query}`);
        return response.data.progress;
    }

    async updateProgress(
        surahNumber: number,
        ayahNumber: number,
        quality: number // 0-5 SM-2 scale
    ): Promise<unknown> {
        const response = await this.http.post('/progress/memorization/review', {
            surahNumber,
            ayahNumber,
            quality,
        });
        return response.data;
    }

    async getNextReview(): Promise<{ ayahs: Ayah[]; estimatedMinutes: number }> {
        const response = await this.http.get<{ ayahs: Ayah[]; estimatedMinutes: number }>(
            '/progress/schedule/next'
        );
        return response.data;
    }

    async getStreak(): Promise<StreakInfo> {
        const response = await this.http.get<{ streak: StreakInfo }>('/progress/streak');
        return response.data.streak;
    }

    async useStreakFreeze(): Promise<StreakInfo> {
        const response = await this.http.post<{ streak: StreakInfo }>('/progress/streak/freeze');
        return response.data.streak;
    }

    async getAchievements(): Promise<Achievement[]> {
        const response = await this.http.get<{ achievements: Achievement[] }>('/progress/achievements');
        return response.data.achievements;
    }

    async startSession(
        type: 'new_memorization' | 'review' | 'assessment' | 'free_recitation',
        options: {
            surah: number;
            ayahStart: number;
            ayahEnd: number;
            memorialId?: string;
        }
    ): Promise<{ sessionId: string }> {
        const response = await this.http.post<{ sessionId: string }>('/progress/sessions', {
            type,
            ...options,
        });
        return response.data;
    }

    async endSession(
        sessionId: string,
        results: {
            completed: boolean;
            score?: number;
        }
    ): Promise<unknown> {
        const response = await this.http.post(`/progress/sessions/${sessionId}/end`, results);
        return response.data;
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Tajweed Module
// ─────────────────────────────────────────────────────────────────────────────

export class TajweedModule {
    constructor(private http: HttpClient) {}

    async analyze(
        audio: Blob | string,
        options: {
            surahNumber: number;
            ayahStart: number;
            ayahEnd: number;
            analysisDepth?: 'basic' | 'detailed' | 'comprehensive';
        }
    ): Promise<TajweedAnalysisResult> {
        const formData = new FormData();
        
        if (audio instanceof Blob) {
            formData.append('audio', audio);
        } else {
            formData.append('audioUrl', audio);
        }
        
        formData.append('surahNumber', String(options.surahNumber));
        formData.append('ayahStart', String(options.ayahStart));
        formData.append('ayahEnd', String(options.ayahEnd));
        formData.append('analysisDepth', options.analysisDepth || 'detailed');

        const response = await fetch(`${this.getBaseUrl()}/tajweed/analyze`, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        return data.data as TajweedAnalysisResult;
    }

    private getBaseUrl(): string {
        return 'https://api.thikra.org/v1';
    }

    async getRules(): Promise<TajweedRule[]> {
        const response = await this.http.get<{ rules: TajweedRule[] }>('/tajweed/rules');
        return response.data.rules;
    }

    async getRule(id: string): Promise<TajweedRule> {
        const response = await this.http.get<{ rule: TajweedRule }>(`/tajweed/rules/${id}`);
        return response.data.rule;
    }

    async getAyahMarkers(ayahId: number): Promise<TajweedMarker[]> {
        const response = await this.http.get<{ markers: TajweedMarker[] }>(
            `/tajweed/ayahs/${ayahId}/markers`
        );
        return response.data.markers;
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Fiqh Module
// ─────────────────────────────────────────────────────────────────────────────

export class FiqhModule {
    constructor(private http: HttpClient) {}

    async getCategories(): Promise<FiqhCategory[]> {
        const response = await this.http.get<{ categories: FiqhCategory[] }>('/fiqh/categories');
        return response.data.categories;
    }

    async getCategory(id: number): Promise<FiqhCategory> {
        const response = await this.http.get<{ category: FiqhCategory }>(`/fiqh/categories/${id}`);
        return response.data.category;
    }

    async getRulings(
        categoryId: number,
        options?: { page?: number; limit?: number }
    ): Promise<FiqhRuling[]> {
        const params = new URLSearchParams();
        if (options?.page) params.set('page', String(options.page));
        if (options?.limit) params.set('limit', String(options.limit));

        const query = params.toString() ? `?${params}` : '';
        const response = await this.http.get<{ rulings: FiqhRuling[] }>(
            `/fiqh/categories/${categoryId}/rulings${query}`
        );
        return response.data.rulings;
    }

    async getRuling(id: number): Promise<FiqhRuling> {
        const response = await this.http.get<{ ruling: FiqhRuling }>(`/fiqh/rulings/${id}`);
        return response.data.ruling;
    }

    async search(query: string, options?: { limit?: number }): Promise<FiqhRuling[]> {
        const params = new URLSearchParams({ q: query });
        if (options?.limit) params.set('limit', String(options.limit));

        const response = await this.http.get<{ results: FiqhRuling[] }>(`/fiqh/search?${params}`);
        return response.data.results;
    }

    async ask(
        question: string,
        options?: { madhab?: 'hanafi' | 'maliki' | 'shafii' | 'hanbali' }
    ): Promise<{
        answer: string;
        rulingType?: string;
        evidence: { quran: QuranReference[]; hadith: HadithReference[] };
        relatedRulings: FiqhRuling[];
        confidence: number;
    }> {
        const response = await this.http.post<{
            answer: {
                ruling: string;
                rulingType?: string;
                evidence: { quran: QuranReference[]; hadith: HadithReference[] };
            };
            relatedRulings: FiqhRuling[];
            confidence: number;
        }>('/fiqh/ask', { question, ...options });
        
        return {
            answer: response.data.answer.ruling,
            rulingType: response.data.answer.rulingType,
            evidence: response.data.answer.evidence,
            relatedRulings: response.data.relatedRulings,
            confidence: response.data.confidence,
        };
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Family Module
// ─────────────────────────────────────────────────────────────────────────────

export class FamilyModule {
    constructor(private http: HttpClient) {}

    async create(name: string, nameAr?: string): Promise<Family> {
        const response = await this.http.post<{ family: Family }>('/families', { name, nameAr });
        return response.data.family;
    }

    async get(id: string): Promise<Family> {
        const response = await this.http.get<{ family: Family }>(`/families/${id}`);
        return response.data.family;
    }

    async invite(familyId: string): Promise<{ inviteCode: string; inviteUrl: string }> {
        const response = await this.http.post<{ inviteCode: string; inviteUrl: string }>(
            `/families/${familyId}/invite`
        );
        return response.data;
    }

    async join(inviteCode: string): Promise<Family> {
        const response = await this.http.post<{ family: Family }>('/families/join', { inviteCode });
        return response.data.family;
    }

    async getMembers(familyId: string): Promise<FamilyMember[]> {
        const response = await this.http.get<{ members: FamilyMember[] }>(`/families/${familyId}/members`);
        return response.data.members;
    }

    async getLeaderboard(familyId: string): Promise<FamilyMember[]> {
        const response = await this.http.get<{ leaderboard: FamilyMember[] }>(
            `/families/${familyId}/leaderboard`
        );
        return response.data.leaderboard;
    }

    async setSharedMemorial(familyId: string, memorialId: string): Promise<void> {
        await this.http.post(`/families/${familyId}/memorial`, { memorialId });
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Auth Module
// ─────────────────────────────────────────────────────────────────────────────

export class AuthModule {
    constructor(private http: HttpClient) {}

    async register(data: {
        email?: string;
        phone?: string;
        password: string;
        displayName: string;
        dateOfBirth?: string;
        preferredLanguage?: 'ar' | 'en';
    }): Promise<{ user: unknown; token: string; refreshToken: string }> {
        const response = await this.http.post<{
            user: unknown;
            token: string;
            refreshToken: string;
        }>('/auth/register', data);
        
        this.http.setToken(response.data.token);
        return response.data;
    }

    async login(data: {
        email?: string;
        phone?: string;
        password: string;
    }): Promise<{ user: unknown; token: string; refreshToken: string }> {
        const response = await this.http.post<{
            user: unknown;
            token: string;
            refreshToken: string;
        }>('/auth/login', data);
        
        this.http.setToken(response.data.token);
        return response.data;
    }

    async logout(): Promise<void> {
        await this.http.post('/auth/logout');
        this.http.clearToken();
    }

    async refreshToken(refreshToken: string): Promise<{ token: string; refreshToken: string }> {
        const response = await this.http.post<{
            token: string;
            refreshToken: string;
        }>('/auth/refresh', { refreshToken });
        
        this.http.setToken(response.data.token);
        return response.data;
    }

    setToken(token: string): void {
        this.http.setToken(token);
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Thikra Class
// ─────────────────────────────────────────────────────────────────────────────

export class Thikra {
    private http: HttpClient;
    
    public auth: AuthModule;
    public quran: QuranModule;
    public memorial: MemorialModule;
    public progress: ProgressModule;
    public tajweed: TajweedModule;
    public fiqh: FiqhModule;
    public family: FamilyModule;

    constructor(config: ThikraConfig = {}) {
        this.http = new HttpClient(config);
        
        this.auth = new AuthModule(this.http);
        this.quran = new QuranModule(this.http);
        this.memorial = new MemorialModule(this.http);
        this.progress = new ProgressModule(this.http);
        this.tajweed = new TajweedModule(this.http);
        this.fiqh = new FiqhModule(this.http);
        this.family = new FamilyModule(this.http);
    }

    /**
     * Set authentication token for subsequent requests
     */
    setToken(token: string): void {
        this.auth.setToken(token);
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Default Export
// ─────────────────────────────────────────────────────────────────────────────

export default Thikra;
