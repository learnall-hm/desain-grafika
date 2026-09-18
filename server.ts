import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "25mb" }));

// Lazy Gemini client helper
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return geminiClient;
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// AI Design Generation API - Enhanced for high creativity and precision
app.post("/api/gemini/generate-design", async (req, res) => {
  const {
    prompt,
    category = "social_post",
    language = "id",
    style = "creative",
    themeColor,
    customWishes,
  } = req.body || {};

  const canvasWidth = Number(req.body.canvasWidth || req.body.dimensions?.width || 800);
  const canvasHeight = Number(req.body.canvasHeight || req.body.dimensions?.height || 800);

  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ success: false, error: "Prompt ide desain diperlukan" });
  }

  try {
    const ai = getGeminiClient();

    if (!ai) {
      const fallbackDesign = createFallbackDesign(prompt, category, canvasWidth, canvasHeight, language);
      return res.json({
        success: true,
        design: fallbackDesign,
        title: fallbackDesign.title,
        background: fallbackDesign.background,
        elements: fallbackDesign.elements,
        dimensions: { width: canvasWidth, height: canvasHeight },
        source: "procedural",
      });
    }

    const systemInstruction = `You are a world-renowned Creative Director and Master Graphic Designer at an award-winning digital agency.
You have extraordinary creative flair, visual harmony, precise typographical hierarchy, and rapid responsiveness to exact consumer wishes.

Canvas Dimensions: ${canvasWidth} x ${canvasHeight} pixels.
Category: "${category}".
Desired Style: "${style}" (e.g., modern, minimalist, educational infographic, pop art, corporate luxury, vibrant tech, playful).
${themeColor ? `Consumer Preferred Color / Theme: "${themeColor}"` : ""}
${customWishes ? `Consumer Specific Desires: "${customWishes}"` : ""}
Language for all text elements MUST be in: ${language} (id=Indonesian, en=English, zh=Chinese, ja=Japanese, ar=Arabic, es=Spanish).

Your tasks:
1. Strictly follow all consumer desires and prompt specifications rapidly and precisely.
2. Formulate a rich, balanced visual composition with 5 to 10 deliberate elements:
   - Geometric cards or containers with soft rounded corners (borderRadius: 12-24) to frame key ideas.
   - Distinctive typography hierarchy (Bold Headline, engaging Subtitle, informative bullet/feature highlights, and strong CTA).
   - Decorative visual accents (accent bars, geometric chips, badge pills, aesthetic tags).
   - High contrast, WCAG compliant colors with a sophisticated palette.

Return ONLY valid JSON (no markdown fences, no markdown ticks, no extra text):
{
  "title": "Creative title of design",
  "category": "${category}",
  "background": {
    "type": "solid" | "gradient",
    "color": "#HEX",
    "gradientColors": ["#HEX", "#HEX"],
    "gradientDirection": "to right" | "to bottom" | "135deg"
  },
  "palette": ["#HEX1", "#HEX2", "#HEX3", "#HEX4", "#HEX5"],
  "designTips": "Brief creative rationale in ${language}",
  "elements": [
    {
      "id": "elem-1",
      "type": "shape",
      "shapeType": "rectangle" | "circle" | "badge" | "star" | "triangle",
      "x": number,
      "y": number,
      "width": number,
      "height": number,
      "fill": "#HEX",
      "opacity": number,
      "borderRadius": number
    },
    {
      "id": "elem-2",
      "type": "text",
      "text": "String content",
      "x": number,
      "y": number,
      "fontSize": number,
      "fontWeight": "400" | "600" | "700" | "800" | "900",
      "fontFamily": "Outfit" | "Plus Jakarta Sans" | "sans-serif" | "serif",
      "fill": "#HEX",
      "align": "left" | "center" | "right",
      "width": number
    },
    {
      "id": "elem-3",
      "type": "badge" | "button",
      "text": "Badge or CTA Text",
      "x": number,
      "y": number,
      "width": number,
      "height": number,
      "fill": "#HEX",
      "textColor": "#HEX",
      "borderRadius": number
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Create highly creative, consumer-tailored graphic design for: ${prompt}. Category: ${category}. Dimensions: ${canvasWidth}x${canvasHeight}px. Additional desires: ${customWishes || "Make it eye-catching and modern."}`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    let raw = response.text ? response.text.trim() : "{}";
    if (raw.startsWith("```json")) raw = raw.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    else if (raw.startsWith("```")) raw = raw.replace(/^```\s*/, "").replace(/\s*```$/, "");

    let parsedData: any;
    try {
      parsedData = JSON.parse(raw);
    } catch {
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Invalid JSON from Gemini");
      }
    }

    const normalizedDesign = {
      title: parsedData.title || prompt.slice(0, 40),
      category: parsedData.category || category,
      width: canvasWidth,
      height: canvasHeight,
      background: parsedData.background || { type: "solid", color: "#0f172a" },
      palette: parsedData.palette || ["#0f172a", "#6366f1", "#ec4899", "#ffffff"],
      designTips: parsedData.designTips || "Tata letak dioptimalkan untuk dampak visual maksimal.",
      elements: (parsedData.elements && Array.isArray(parsedData.elements) ? parsedData.elements : []).map((el: any, idx: number) => ({
        ...el,
        id: el.id || `elem-ai-${Date.now()}-${idx}`,
        type: el.type || "text",
        x: typeof el.x === "number" ? el.x : 40,
        y: typeof el.y === "number" ? el.y : 40 + idx * 60,
        width: typeof el.width === "number" ? el.width : (el.type === "text" ? Math.min(600, canvasWidth - 80) : 120),
        height: typeof el.height === "number" ? el.height : (el.type === "text" ? 50 : 40),
        fill: el.fill || (el.type === "text" ? "#ffffff" : "#6366f1"),
        opacity: typeof el.opacity === "number" ? el.opacity : 1,
        zIndex: idx + 1,
      })),
    };

    return res.json({
      success: true,
      design: normalizedDesign,
      title: normalizedDesign.title,
      background: normalizedDesign.background,
      elements: normalizedDesign.elements,
      dimensions: { width: canvasWidth, height: canvasHeight },
      source: "gemini",
    });
  } catch (err: any) {
    console.error("Gemini design generation error:", err);
    const fallbackDesign = createFallbackDesign(prompt, category, canvasWidth, canvasHeight, language);
    return res.json({
      success: true,
      design: fallbackDesign,
      title: fallbackDesign.title,
      background: fallbackDesign.background,
      elements: fallbackDesign.elements,
      dimensions: { width: canvasWidth, height: canvasHeight },
      source: "fallback",
      notice: err?.message || "Generated with procedural design engine",
    });
  }
});

// AI Material Summarizer & Infographic/Slide Generator
// "mampu merangkum materi yang diinginkan secara luas"
app.post("/api/gemini/summarize-and-design", async (req, res) => {
  const material = (req.body.material || req.body.materialText || "").trim();
  const topic = (req.body.topic || req.body.subjectTitle || "Ringkasan Materi Edukasi").trim();
  const targetFormat = req.body.targetFormat || req.body.format || "presentation_slide";
  const language = req.body.language || "id";
  const detailLevel = req.body.detailLevel || "comprehensive";
  const customWishes = req.body.customWishes || req.body.wishes || "";

  const canvasWidth = Number(
    req.body.canvasWidth || req.body.dimensions?.width || (targetFormat === "presentation_slide" ? 960 : 800)
  );
  const canvasHeight = Number(
    req.body.canvasHeight || req.body.dimensions?.height || (targetFormat === "presentation_slide" ? 540 : 1000)
  );

  if (!material && !topic) {
    return res.status(400).json({ success: false, error: "Materi atau topik harus disediakan" });
  }

  try {
    const ai = getGeminiClient();

    if (!ai) {
      // Procedural educational summary fallback
      const fallback = createEducationalSummaryFallback(topic, material || topic, canvasWidth, canvasHeight, language);
      return res.json({
        success: true,
        ...fallback,
        title: fallback.design.title,
        background: fallback.design.background,
        elements: fallback.design.elements,
        dimensions: { width: canvasWidth, height: canvasHeight },
        source: "procedural",
      });
    }

    const systemInstruction = `You are an elite Educational Content Specialist, Infographic Architect, and Knowledge Visualizer.
Your mission:
1. Deeply analyze and BROADLY SUMMARIZE the provided study material, article, or topic into a rich, structured, comprehensive summary with broad coverage of essential concepts, context, key takeaways, and breakdown points.
2. Transform that summary directly into a ready-to-render, highly aesthetic Infographic / Educational Presentation Slide canvas design of size ${canvasWidth} x ${canvasHeight} pixels.
${customWishes ? `Specific User Desires: "${customWishes}"` : ""}
3. Language for summary and design text: ${language} (id=Indonesian, en=English, zh=Chinese, ja=Japanese, ar=Arabic, es=Spanish).

The JSON output MUST follow this strict structure:
{
  "summaryTitle": "Judul Rangkuman Materi",
  "topic": "${topic}",
  "broadSummaryText": "Paragraf rangkuman komprehensif yang luas dan mendalam (3-5 paragraf berbobot mengenai latar belakang, prinsip utama, dampak, dan implementasi materi).",
  "keyTakeaway": "Pesan inti paling fundamental dalam 1 kalimat berbobot.",
  "structuredPoints": [
    {
      "pointNumber": 1,
      "title": "Judul Poin 1",
      "explanation": "Penjelasan rinci dan mudah dipahami",
      "highlightStatOrFact": "Fakta atau statistik pendukung"
    },
    {
      "pointNumber": 2,
      "title": "Judul Poin 2",
      "explanation": "Penjelasan rinci dan mudah dipahami",
      "highlightStatOrFact": "Fakta atau statistik pendukung"
    },
    {
      "pointNumber": 3,
      "title": "Judul Poin 3",
      "explanation": "Penjelasan rinci dan mudah dipahami",
      "highlightStatOrFact": "Fakta atau statistik pendukung"
    }
  ],
  "design": {
    "title": "Infografis: ${topic}",
    "category": "${targetFormat === "presentation_slide" ? "banner" : "poster"}",
    "background": {
      "type": "gradient",
      "color": "#0f172a",
      "gradientColors": ["#090d16", "#1e1b4b"],
      "gradientDirection": "to bottom"
    },
    "elements": [
      {
        "id": "el-1",
        "type": "text" | "shape" | "badge",
        "text": "...",
        "x": 30,
        "y": 30,
        "width": 600,
        "height": 40,
        "fill": "#ffffff"
      }
    ]
  }
}
Design elements must be spaced within canvas dimensions 0..${canvasWidth} and 0..${canvasHeight}.`;

    const promptText = `Analyze and broadly summarize this material into an educational infographic and presentation format:
Topic: ${topic}
Material:
${material || topic}
Format: ${targetFormat}
Detail Level: ${detailLevel}
Canvas Size: ${canvasWidth}x${canvasHeight}px`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: promptText,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    let raw = response.text ? response.text.trim() : "{}";
    if (raw.startsWith("```json")) raw = raw.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    else if (raw.startsWith("```")) raw = raw.replace(/^```\s*/, "").replace(/\s*```$/, "");

    let parsedData: any;
    try {
      parsedData = JSON.parse(raw);
    } catch {
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Invalid JSON from Gemini");
      }
    }

    const design = parsedData.design || {};
    const normalizedDesign = {
      title: design.title || parsedData.summaryTitle || topic,
      category: targetFormat === "presentation_slide" ? "banner" : "poster",
      width: canvasWidth,
      height: canvasHeight,
      background: design.background || {
        type: "gradient",
        color: "#030712",
        gradientColors: ["#030712", "#111827"],
        gradientDirection: "to bottom",
      },
      elements: (design.elements && Array.isArray(design.elements) ? design.elements : []).map((el: any, idx: number) => ({
        ...el,
        id: el.id || `summary-el-${Date.now()}-${idx}`,
        type: el.type || "text",
        x: typeof el.x === "number" ? el.x : 30,
        y: typeof el.y === "number" ? el.y : 30 + idx * 70,
        width: typeof el.width === "number" ? el.width : (el.type === "text" ? canvasWidth - 60 : 140),
        height: typeof el.height === "number" ? el.height : (el.type === "text" ? 50 : 36),
        fill: el.fill || (el.type === "text" ? "#ffffff" : "#4f46e5"),
        zIndex: idx + 1,
      })),
    };

    return res.json({
      success: true,
      summaryTitle: parsedData.summaryTitle || topic,
      topic: parsedData.topic || topic,
      broadSummaryText: parsedData.broadSummaryText || "",
      keyTakeaway: parsedData.keyTakeaway || "",
      structuredPoints: parsedData.structuredPoints || [],
      design: normalizedDesign,
      title: normalizedDesign.title,
      background: normalizedDesign.background,
      elements: normalizedDesign.elements,
      dimensions: { width: canvasWidth, height: canvasHeight },
      source: "gemini",
    });
  } catch (err: any) {
    console.error("Gemini summarize error:", err);
    const fallback = createEducationalSummaryFallback(topic, material || topic, canvasWidth, canvasHeight, language);
    return res.json({
      success: true,
      ...fallback,
      title: fallback.design.title,
      background: fallback.design.background,
      elements: fallback.design.elements,
      dimensions: { width: canvasWidth, height: canvasHeight },
      source: "fallback",
      notice: err?.message || "Generated with procedural summary engine",
    });
  }
});

// AI Copywriting & Tagline generator
app.post("/api/gemini/suggest-copy", async (req, res) => {
  try {
    const { topic = "Desain Grafis", tone = "professional", language = "id" } = req.body || {};
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        success: true,
        headlines: [
          `Kreasi Terbaik: ${topic}`,
          `Eksklusif & Terpercaya - ${topic}`,
          `Mulai Sekarang Bersama ${topic}`,
          `Solusi Visual Modern untuk ${topic}`,
        ],
        taglines: [
          "Desain berkualitas tinggi untuk brand Anda.",
          "Wujudkan ide kreatif dalam hitungan detik.",
          "Estetika modern, dampak maksimal.",
        ],
        callToActions: ["Pesan Sekarang", "Mulai Gratis", "Jelajahi Koleksi", "Klaim Diskon"],
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Generate marketing copy, taglines, headlines and CTAs for graphic design on topic: "${topic}". Tone: ${tone}. Target language: ${language}.
Return JSON format:
{
  "headlines": ["string", "string", "string", "string"],
  "taglines": ["string", "string", "string"],
  "callToActions": ["string", "string", "string", "string"]
}`,
      config: {
        responseMimeType: "application/json",
      },
    });

    let raw = response.text ? response.text.trim() : "{}";
    if (raw.startsWith("```json")) raw = raw.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    else if (raw.startsWith("```")) raw = raw.replace(/^```\s*/, "").replace(/\s*```$/, "");

    let parsed: any;
    try {
      parsed = JSON.parse(raw);
    } catch {
      const match = raw.match(/\{[\s\S]*\}/);
      parsed = match ? JSON.parse(match[0]) : {};
    }

    return res.json({
      success: true,
      headlines: parsed.headlines || [`Kreasi Terbaik: ${topic}`, `Desain Modern: ${topic}`],
      taglines: parsed.taglines || ["Wujudkan ide Anda sekarang", "Tingkatkan kehadiran visual Anda"],
      callToActions: parsed.callToActions || ["Mulai Desain", "Pesan Sekarang", "Pelajari Lebih Lanjut"],
    });
  } catch (err: any) {
    console.error("Copy suggestion error:", err);
    return res.json({
      success: true,
      headlines: ["Karya Visual Berkualitas", "Desain Menarik & Berkesan", "Solusi Desain Cepat"],
      taglines: ["Wujudkan ide Anda sekarang", "Tingkatkan kehadiran visual Anda"],
      callToActions: ["Mulai Desain", "Pilih Sekarang", "Pelajari Lebih Lanjut"],
    });
  }
});

// Auto-save storage in memory
interface AutoSaveRecord {
  design: any;
  userId: string;
  savedAt: string;
  timestamp: number;
}
const autoSaveDraftStore = new Map<string, AutoSaveRecord>();

// Backend Auto-Save endpoint (every 30 seconds or on demand)
app.post("/api/designs/autosave", (req, res) => {
  try {
    const { design, userId = "default" } = req.body;
    if (!design) {
      return res.status(400).json({ error: "Data desain diperlukan untuk auto-save" });
    }

    const savedAt = new Date().toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const record: AutoSaveRecord = {
      design,
      userId,
      savedAt,
      timestamp: Date.now(),
    };

    autoSaveDraftStore.set(userId, record);
    if (design.id) {
      autoSaveDraftStore.set(design.id, record);
    }

    console.log(`[AutoSave Backend] Saved draft for user/design ${design.id || userId} at ${savedAt}`);

    return res.json({
      success: true,
      savedAt,
      timestamp: record.timestamp,
      message: "Draf berhasil disimpan otomatis ke server",
    });
  } catch (err: any) {
    console.error("AutoSave Error:", err);
    return res.status(500).json({ error: err.message || "Gagal auto-save ke server" });
  }
});

app.get("/api/designs/autosave/:id?", (req, res) => {
  const id = req.params.id || "default";
  const record = autoSaveDraftStore.get(id);
  if (!record) {
    return res.status(404).json({ draft: null, message: "Tidak ada draf auto-save ditemukan" });
  }
  return res.json({ draft: record });
});

app.delete("/api/designs/autosave/:id?", (req, res) => {
  const id = req.params.id || "default";
  autoSaveDraftStore.delete(id);
  return res.json({ success: true, message: "Draf auto-save berhasil dibersihkan" });
});

// Fallback procedural design generator function
function createFallbackDesign(prompt: string, category: string, width: number, height: number, lang: string) {
  const isPoster = category === "poster" || height > width;
  const isBanner = category === "banner" || width > height * 1.5;

  // Palettes
  const palettes = [
    { bg: "#0f172a", primary: "#6366f1", accent: "#ec4899", text: "#ffffff", sub: "#cbd5e1", card: "#1e293b" },
    { bg: "#faf5ff", primary: "#7c3aed", accent: "#f59e0b", text: "#1e1b4b", sub: "#6b7280", card: "#ffffff" },
    { bg: "#042f2e", primary: "#14b8a6", accent: "#f43f5e", text: "#f0fdfa", sub: "#99f6e4", card: "#134e4a" },
    { bg: "#fff7ed", primary: "#ea580c", accent: "#0284c7", text: "#431407", sub: "#78716c", card: "#ffedd5" },
  ];
  const pal = palettes[Math.floor(Math.random() * palettes.length)];

  const titleText = prompt.length > 30 ? prompt.substring(0, 30) + "..." : prompt;
  const ctaMap: Record<string, string> = {
    id: "Jelajahi Sekarang",
    en: "Explore Now",
    zh: "立即探索",
    ja: "今すぐ探索",
    ar: "استكشف الآن",
    es: "Explorar Ahora",
  };
  const subtitleMap: Record<string, string> = {
    id: "Koleksi visual istimewa dengan estetika modern & profesional.",
    en: "Special visual collection crafted with modern & professional aesthetics.",
    zh: "具有现代和专业美学的独特视觉集合。",
    ja: "モダンでプロフェッショナルな美学を備えた特別なビジュアルコレクション。",
    ar: "مجموعة بصرية مميزة بتصميم حديث واحترافي.",
    es: "Colección visual especial con estética moderna y profesional.",
  };

  const elements: any[] = [
    // Decorative circle/blob
    {
      id: "elem-dec-1",
      type: "shape",
      shapeType: "circle",
      x: width * 0.7,
      y: height * 0.1,
      width: Math.min(width, height) * 0.45,
      height: Math.min(width, height) * 0.45,
      fill: pal.primary,
      opacity: 0.25,
      borderRadius: 999,
    },
    // Decorative accent block
    {
      id: "elem-dec-2",
      type: "shape",
      shapeType: "rectangle",
      x: 40,
      y: 40,
      width: 48,
      height: 6,
      fill: pal.accent,
      opacity: 1,
      borderRadius: 3,
    },
    // Category Badge
    {
      id: "elem-badge",
      type: "badge",
      text: category.toUpperCase().replace("_", " "),
      x: 40,
      y: 60,
      width: 140,
      height: 32,
      fill: pal.primary,
      textColor: "#ffffff",
      borderRadius: 16,
    },
    // Main Title
    {
      id: "elem-title",
      type: "text",
      text: titleText,
      x: 40,
      y: height * 0.32,
      fontSize: Math.round(width * 0.058),
      fontWeight: "800",
      fontFamily: "Outfit",
      fill: pal.text,
      align: "left",
      width: width - 80,
    },
    // Subtitle
    {
      id: "elem-sub",
      type: "text",
      text: subtitleMap[lang] || subtitleMap.id,
      x: 40,
      y: height * 0.52,
      fontSize: Math.round(width * 0.026),
      fontWeight: "400",
      fontFamily: "Plus Jakarta Sans",
      fill: pal.sub,
      align: "left",
      width: width * 0.75,
    },
    // CTA Button
    {
      id: "elem-cta",
      type: "button",
      text: ctaMap[lang] || ctaMap.id,
      x: 40,
      y: height * 0.75,
      width: Math.min(200, width * 0.4),
      height: 48,
      fill: pal.accent,
      textColor: "#ffffff",
      borderRadius: 24,
    },
  ];

  return {
    title: prompt,
    category,
    background: {
      type: "solid",
      color: pal.bg,
    },
    palette: [pal.bg, pal.primary, pal.accent, pal.text, pal.sub],
    designTips: "Tata letak seimbang dengan kontras tinggi untuk visibilitas optimal.",
    elements,
  };
}

// Fallback procedural educational material summary & infographic builder
function createEducationalSummaryFallback(topic: string, material: string, width: number, height: number, lang: string) {
  const cleanTitle = topic || "Ringkasan Materi Esensial";
  const points = [
    {
      pointNumber: 1,
      title: "Prinsip Fundamental & Definisi Konsep",
      explanation: "Memahami landasan teori dasar, latar belakang historis, dan terminologi penting yang membentuk struktur materi ini secara menyeluruh.",
      highlightStatOrFact: "Dasar 100% krusial untuk pemahaman tingkat lanjut",
    },
    {
      pointNumber: 2,
      title: "Analisis Struktur & Mekanisme Kerja",
      explanation: "Bagaimana komponen-komponen saling terhubung, proses interaksi bertahap, serta faktor penentu keberhasilan sistem secara empiris.",
      highlightStatOrFact: "3 fase pilar utama implementasi",
    },
    {
      pointNumber: 3,
      title: "Aplikasi Nyata & Studi Kasus Lapangan",
      explanation: "Implementasi praktis pada pemecahan masalah konkret, efisiensi kerja, dan transformasi proses di era modern.",
      highlightStatOrFact: "Peningkatan efisiensi terukur hingga 85%",
    },
    {
      pointNumber: 4,
      title: "Kesimpulan Strategis & Rekomendasi Aksi",
      explanation: "Langkah-langkah terarah yang harus diambil untuk mencapai hasil optimal berdasarkan rangkuman materi komprehensif ini.",
      highlightStatOrFact: "Rekomendasi tindakan segera",
    },
  ];

  const elements: any[] = [
    // Header decorative bar
    {
      id: "edu-dec-bar",
      type: "shape",
      shapeType: "rectangle",
      x: 30,
      y: 30,
      width: width - 60,
      height: 8,
      fill: "#6366f1",
      opacity: 1,
      borderRadius: 4,
    },
    // Badge
    {
      id: "edu-badge",
      type: "badge",
      text: "🎓 RANGKUMAN MATERI EDUKASI",
      x: 30,
      y: 50,
      width: 240,
      height: 32,
      fill: "#312e81",
      textColor: "#a5b4fc",
      borderRadius: 16,
    },
    // Title
    {
      id: "edu-title",
      type: "text",
      text: cleanTitle,
      x: 30,
      y: 95,
      fontSize: Math.min(36, Math.round(width * 0.045)),
      fontWeight: "800",
      fontFamily: "Outfit",
      fill: "#ffffff",
      align: "left",
      width: width - 60,
    },
    // Key Takeaway Container
    {
      id: "edu-takeaway-card",
      type: "shape",
      shapeType: "rectangle",
      x: 30,
      y: 150,
      width: width - 60,
      height: 70,
      fill: "#1e1b4b",
      opacity: 0.9,
      borderRadius: 16,
    },
    {
      id: "edu-takeaway-text",
      type: "text",
      text: "💡 Inti Materi: Konsep kunci yang memadukan pemahaman teoritis dengan eksekusi aplikatif untuk hasil optimal.",
      x: 45,
      y: 168,
      fontSize: 14,
      fontWeight: "600",
      fontFamily: "Plus Jakarta Sans",
      fill: "#c7d2fe",
      align: "left",
      width: width - 90,
    },
  ];

  // Add 3 structured point cards
  const startY = 240;
  const cardH = 140;
  const gap = 18;

  points.slice(0, 3).forEach((pt, i) => {
    const cardY = startY + i * (cardH + gap);
    // Background card
    elements.push({
      id: `edu-card-${i}`,
      type: "shape",
      shapeType: "rectangle",
      x: 30,
      y: cardY,
      width: width - 60,
      height: cardH,
      fill: "#0f172a",
      opacity: 0.95,
      borderRadius: 16,
    });
    // Number badge
    elements.push({
      id: `edu-num-${i}`,
      type: "badge",
      text: `POIN ${pt.pointNumber}`,
      x: 46,
      y: cardY + 16,
      width: 80,
      height: 24,
      fill: i === 0 ? "#4f46e5" : i === 1 ? "#0891b2" : "#7c3aed",
      textColor: "#ffffff",
      borderRadius: 12,
    });
    // Point title
    elements.push({
      id: `edu-point-title-${i}`,
      type: "text",
      text: pt.title,
      x: 138,
      y: cardY + 18,
      fontSize: 16,
      fontWeight: "700",
      fontFamily: "Outfit",
      fill: "#f8fafc",
      align: "left",
      width: width - 180,
    });
    // Point description
    elements.push({
      id: `edu-point-desc-${i}`,
      type: "text",
      text: pt.explanation,
      x: 46,
      y: cardY + 54,
      fontSize: 13,
      fontWeight: "400",
      fontFamily: "Plus Jakarta Sans",
      fill: "#94a3b8",
      align: "left",
      width: width - 92,
    });
    // Highlight pill
    elements.push({
      id: `edu-pill-${i}`,
      type: "badge",
      text: `✓ ${pt.highlightStatOrFact}`,
      x: 46,
      y: cardY + 102,
      width: Math.min(280, width - 100),
      height: 24,
      fill: "#1e293b",
      textColor: "#38bdf8",
      borderRadius: 8,
    });
  });

  // Bottom footer/summary tag
  elements.push({
    id: "edu-footer-cta",
    type: "badge",
    text: "Materi Terverifikasi • Grafika Belajar AI",
    x: 30,
    y: height - 60,
    width: 250,
    height: 36,
    fill: "#10b981",
    textColor: "#ffffff",
    borderRadius: 18,
  });

  return {
    summaryTitle: cleanTitle,
    topic: cleanTitle,
    broadSummaryText: `Materi mengenai "${cleanTitle}" mencakup berbagai spektrum penting yang saling terkait erat. Pada dasarnya, topik ini membedah prinsip dasar yang telah menjadi acuan di bidangnya, bagaimana sistem bekerja secara dinamis, serta tantangan praktis yang kerap dihadapi di era kontemporer.\n\nSecara menyeluruh, penguasaan materi ini memberikan keunggulan kompetitif, memungkinkan identifikasi celah kritis secara lebih cepat, dan memfasilitasi pengambilan keputusan strategis yang berbasis data dan fakta konseptual.\n\nRangkuman terstruktur ini dirancang untuk mempermudah pemahaman luas, memetakan pilar-pilar esensial, dan menjadi panduan komprehensif bagi pendidik, siswa, maupun profesional.`,
    keyTakeaway: `Penguasaan mendalam atas "${cleanTitle}" merupakan pondasi esensial untuk transformasi dan peningkatan kinerja berkualitas tinggi.`,
    structuredPoints: points,
    design: {
      title: `Infografis: ${cleanTitle}`,
      category: "poster",
      background: {
        type: "gradient",
        color: "#030712",
        gradientColors: ["#030712", "#111827"],
        gradientDirection: "to bottom",
      },
      palette: ["#030712", "#4f46e5", "#0891b2", "#10b981", "#ffffff"],
      designTips: "Tata letak infografis edukatif dengan kartu terstruktur untuk daya serap materi maksimal.",
      elements,
    },
  };
}

// Setup Vite middleware in dev or static serving in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Grafika Studio AI server listening at http://0.0.0.0:${PORT}`);
  });
}

startServer();
