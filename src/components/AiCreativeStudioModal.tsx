import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Sparkles,
  X,
  Wand2,
  BookOpen,
  Send,
  Layers,
  Palette,
  Check,
  Loader2,
  FileText,
  Presentation,
  Lightbulb,
  Zap,
  Sliders,
  GraduationCap,
  Crown,
} from "lucide-react";
import { CanvasElement, UserDesign } from "../types";

interface AiCreativeStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDesignGenerated: (design: UserDesign) => void;
}

export const AiCreativeStudioModal: React.FC<AiCreativeStudioModalProps> = ({
  isOpen,
  onClose,
  onDesignGenerated,
}) => {
  const { currentUser, isUserPremium, setIsPremiumModalOpen, showToast, addNotification } = useApp();

  const [activeTab, setActiveTab] = useState<"creative_design" | "summarize_material">("creative_design");

  // Tab 1 State: Creative Design
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Modern Minimalis");
  const [themeColor, setThemeColor] = useState("indigo");
  const [customWishes, setCustomWishes] = useState("");
  const [category, setCategory] = useState<"social_post" | "story" | "banner" | "poster">("social_post");

  // Tab 2 State: Summarize Material
  const [subjectTitle, setSubjectTitle] = useState("");
  const [materialText, setMaterialText] = useState("");
  const [summaryFormat, setSummaryFormat] = useState<
    "infographic" | "presentation_slide" | "summary_cheat_sheet" | "concept_map"
  >("presentation_slide");
  const [summaryWishes, setSummaryWishes] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  // Preset quick ideas
  const quickIdeas = [
    {
      title: "Flash Sale 50% Gadget",
      prompt: "Poster promo kilat gadget smartphone dengan diskon 50%, countdown timer, dan tombol beli sekarang",
      style: "Cyberpunk Neon",
      color: "cyan",
      wishes: "Teks diskon besar menyala neon, tambahkan badge Best Deal dan tanggal berlaku",
    },
    {
      title: "Menu Kopi Signature Cafe",
      prompt: "Desain daftar kopi spesial espresso, latte art, dan croissant hangat dengan nuansa kedai artisan",
      style: "Natural Warm",
      color: "amber",
      wishes: "Warna coklat karamel hangat, cantumkan harga Rp 28K dan Rp 35K, badge Organic Bean",
    },
    {
      title: "Webinar Digital Marketing",
      prompt: "Poster pengumuman webinar strategi pemasaran digital untuk UMKM dan profesional",
      style: "Professional Corporate",
      color: "blue",
      wishes: "Cantumkan jam 19.00 WIB, via Zoom, gratis sertifikat e-certificate",
    },
  ];

  // Material quick templates
  const materialPresets = [
    {
      title: "Siklus Air & Presipitasi (Geografi)",
      text: "Siklus hidrologi adalah pergerakan air terus menerus di atas, dalam, dan di bawah permukaan bumi. Tahapannya meliputi: 1. Evaporasi (penguapan air laut dan darat oleh sinar matahari). 2. Transpirasi (penguapan dari tumbuhan). 3. Kondensasi (uap air menjadi awan dingin). 4. Presipitasi (hujan atau salju jatuh ke bumi). 5. Infiltrasi (air meresap ke dalam tanah) dan perkolasi menjadi air tanah.",
      format: "presentation_slide" as const,
    },
    {
      title: "Prinsip Dasar Ekonomi Makro",
      text: "Ekonomi makro mempelajari perekonomian secara agregat dan menyeluruh. Tiga pilar utama: 1. Produk Domestik Bruto (PDB): mengukur nilai pasar total barang dan jasa akhir. 2. Tingkat Inflasi: kenaikan harga barang umum dari waktu ke waktu diukur dengan IHK. 3. Tingkat Pengangguran: persentase angkatan kerja yang aktif mencari kerja. Kebijakan pemerintah terbagi menjadi Kebijakan Fiskal (anggaran belanja & pajak) dan Kebijakan Moneter (suku bunga bank sentral & jumlah uang beredar).",
      format: "infographic" as const,
    },
  ];

  const handleGenerateDesign = async () => {
    if (!prompt.trim()) {
      showToast("Mohon masukkan deskripsi desain yang Anda inginkan.");
      return;
    }

    setIsLoading(true);
    try {
      let width = 800;
      let height = 800;
      if (category === "story") {
        width = 600;
        height = 1060;
      } else if (category === "banner") {
        width = 960;
        height = 540;
      } else if (category === "poster") {
        width = 720;
        height = 960;
      }

      const res = await fetch("/api/gemini/generate-design", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          category,
          style,
          themeColor,
          customWishes,
          dimensions: { width, height },
          isPremium: isUserPremium,
          speedPriority: isUserPremium ? "turbo" : "standard",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Gagal membuat desain AI.");
      }

      const generatedDesign: UserDesign = {
        id: `design-ai-${Date.now()}`,
        title: data.title || prompt.slice(0, 30),
        category,
        width: data.dimensions?.width || width,
        height: data.dimensions?.height || height,
        background: data.background || { type: "solid", color: "#0f172a" },
        elements: (data.elements || []).map((el: any, idx: number) => ({
          ...el,
          id: el.id || `ai-el-${Date.now()}-${idx}`,
        })),
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toLocaleDateString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      onDesignGenerated(generatedDesign);
      onClose();
      showToast("✨ Desain AI Kreatif berhasil dibuat presisi!");
      addNotification(
        "Desain AI Kreatif Tercipta",
        `Desain "${generatedDesign.title}" berhasil dibuat otomatis sesuai instruksi spesifik Anda.`,
        "activity",
        "AI Gemini"
      );
    } catch (err: any) {
      console.error("AI Generation Error:", err);
      showToast(err.message || "Gagal membuat desain dengan AI.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSummarizeMaterial = async () => {
    if (!materialText.trim()) {
      showToast("Mohon masukkan naskah atau ringkasan materi yang ingin dirangkum.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/gemini/summarize-and-design", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          materialText,
          subjectTitle: subjectTitle || "Rangkuman Materi Terpadu",
          format: summaryFormat,
          style: "Edukasi Interaktif & Jelas",
          customWishes: summaryWishes,
          isPremium: isUserPremium,
          speedPriority: isUserPremium ? "turbo" : "standard",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Gagal merangkum materi.");
      }

      const summarizedDesign: UserDesign = {
        id: `design-summary-${Date.now()}`,
        title: data.title || subjectTitle || "Rangkuman Materi Edukatif",
        category: summaryFormat === "presentation_slide" ? "banner" : "poster",
        width: data.dimensions?.width || 960,
        height: data.dimensions?.height || 540,
        background: data.background || { type: "solid", color: "#091428" },
        elements: (data.elements || []).map((el: any, idx: number) => ({
          ...el,
          id: el.id || `summary-el-${Date.now()}-${idx}`,
        })),
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toLocaleDateString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      onDesignGenerated(summarizedDesign);
      onClose();
      showToast("🎓 Materi berhasil dirangkum secara komprehensif ke dalam desain!");
      addNotification(
        "Rangkuman Materi AI Siap",
        `Materi "${summarizedDesign.title}" berhasil diringkas dan ditata rapi ke dalam format ${summaryFormat.toUpperCase()}. Siap diunduh sebagai PPT atau PDF!`,
        "activity",
        "Rangkuman AI"
      );
    } catch (err: any) {
      console.error("Material Summary Error:", err);
      showToast(err.message || "Gagal merangkum materi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      id="ai-creative-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/65 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in duration-200"
    >
      <div
        id="ai-creative-modal-card"
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 flex flex-col max-h-[92vh] overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 bg-gradient-to-r from-indigo-900 via-slate-900 to-purple-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-400 to-indigo-500 text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-lg text-white">Creative AI Studio</h3>
                <span className="px-2 py-0.5 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-extrabold text-[10px] rounded-full uppercase tracking-wider shadow-xs">
                  Gemini 3.8
                </span>
              </div>
              <p className="text-xs text-indigo-200">
                Buat desain presisi sesuai keinginan atau rangkum materi luas dalam hitungan detik
              </p>
            </div>
          </div>
          <button
            id="close-ai-modal-btn"
            onClick={onClose}
            className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex gap-2">
          <button
            id="tab-btn-creative-design"
            type="button"
            onClick={() => setActiveTab("creative_design")}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === "creative_design"
                ? "bg-white text-indigo-700 shadow-xs border border-indigo-100"
                : "text-slate-600 hover:bg-slate-200/60"
            }`}
          >
            <Wand2 className="w-4 h-4 text-indigo-600" />
            <span>Desain Kreatif Sesuai Keinginan</span>
          </button>

          <button
            id="tab-btn-summarize-material"
            type="button"
            onClick={() => setActiveTab("summarize_material")}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === "summarize_material"
                ? "bg-white text-emerald-700 shadow-xs border border-emerald-100"
                : "text-slate-600 hover:bg-slate-200/60"
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>Rangkum Materi Luas Jadi Desain & Slide</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* AI Speed & Priority Status Banner (Requirement: AI lebih cepat untuk pengguna premium) */}
          {isUserPremium ? (
            <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-500/15 via-purple-500/15 to-indigo-500/15 border border-amber-300/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white flex items-center justify-center shadow-xs">
                  <Zap className="w-4 h-4 fill-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    Mode AI Turbo Prioritas Aktif
                    <span className="text-[10px] font-black px-1.5 py-0.2 rounded-sm bg-amber-500 text-white">VIP</span>
                  </p>
                  <p className="text-[11px] text-slate-600">
                    Alokasi server prioritas tertinggi: waktu respons hingga 3x lebih cepat dan presisi detail maksimal.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-slate-200 text-slate-600 flex items-center justify-center">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-800">
                    Kecepatan AI: <span className="font-bold text-slate-900">Standar (Antrean Reguler)</span>
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Ingin AI 3x lebih cepat & tanpa antrean? Upgrade ke Premium mulai Rp 25.000/bulan.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsPremiumModalOpen(true)}
                className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all whitespace-nowrap self-start sm:self-auto flex items-center gap-1"
              >
                <Crown className="w-3.5 h-3.5" />
                <span>AI Turbo VIP</span>
              </button>
            </div>
          )}

          {activeTab === "creative_design" ? (
            /* TAB 1: CREATIVE DESIGN ACCORDING TO CONSUMER WISHES */
            <div className="space-y-4">
              {/* Prompt Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  Konsep Desain Utama (Ide Pokok)
                </label>
                <textarea
                  id="ai-prompt-input"
                  rows={2}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Contoh: Poster pengumuman diskon akhir tahun 70% untuk toko sepatu sneakers dengan gaya energik"
                  className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden transition-all text-slate-800"
                />
              </div>

              {/* Consumer Specific Wishes (Keinginan Khusus Konsumen) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-purple-500" />
                  Keinginan Khusus & Detail Pesanan (Detail Konsumen)
                </label>
                <input
                  id="ai-custom-wishes-input"
                  type="text"
                  value={customWishes}
                  onChange={(e) => setCustomWishes(e.target.value)}
                  placeholder="Contoh: Tambahkan tombol Beli Sekarang warna merah, sertakan WhatsApp 081234567, font tebal neon"
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden text-slate-800"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  AI akan secara presisi menuruti instruksi kata kunci, elemen, dan nomor kontak yang Anda tulis.
                </p>
              </div>

              {/* Style & Theme Color */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-indigo-500" />
                    Gaya Desain (Style)
                  </label>
                  <select
                    id="ai-style-select"
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden text-slate-800 font-medium"
                  >
                    <option value="Modern Minimalis">Modern Minimalis (Elegan & Bersih)</option>
                    <option value="Bold Pop Art">Bold & Energetic Pop Art</option>
                    <option value="Cyberpunk Neon">Cyberpunk Neon Futuristik</option>
                    <option value="Elegant Luxury">Luxury & Gold Premium</option>
                    <option value="Natural Warm">Natural Warm & Earthy</option>
                    <option value="Professional Corporate">Professional & Corporate Bisnis</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-indigo-500" />
                    Format Ukuran Kanvas
                  </label>
                  <select
                    id="ai-category-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden text-slate-800 font-medium"
                  >
                    <option value="social_post">Postingan Feed Persegi (800x800 - 1:1)</option>
                    <option value="story">Story Instagram / TikTok (600x1060 - 9:16)</option>
                    <option value="banner">Slide Presentasi / Banner (960x540 - 16:9)</option>
                    <option value="poster">Poster Vertikal Cetak (720x960 - 3:4)</option>
                  </select>
                </div>
              </div>

              {/* Quick Preset Ideas */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Inspirasi Cepat Sekali Klik
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {quickIdeas.map((item, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setPrompt(item.prompt);
                        setStyle(item.style);
                        setThemeColor(item.color);
                        setCustomWishes(item.wishes);
                      }}
                      className="p-2.5 text-left rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all text-xs group"
                    >
                      <span className="font-bold text-slate-800 block group-hover:text-indigo-600">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-slate-500 line-clamp-2 mt-0.5">
                        {item.prompt}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* TAB 2: BROAD MATERIAL SUMMARIZER */
            <div className="space-y-4">
              <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-2xl flex items-start gap-2.5">
                <GraduationCap className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-900">
                    AI Rangkum Materi Luas & Otomatis Jadi Desain
                  </h4>
                  <p className="text-[11px] text-emerald-700 leading-relaxed mt-0.5">
                    Tempelkan artikel panjang, materi pelajaran, modul, atau bab kuliah. AI Gemini akan
                    merangkum poin-poin utama secara cerdas dan menyajikannya ke dalam desain visual atau
                    slide yang siap diekspor ke PPT & PDF!
                  </p>
                </div>
              </div>

              {/* Subject Title */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Judul Materi / Topik Pembelajaran
                </label>
                <input
                  id="ai-material-title-input"
                  type="text"
                  value={subjectTitle}
                  onChange={(e) => setSubjectTitle(e.target.value)}
                  placeholder="Contoh: Bab 2 - Sistem Tata Surya & Planet Kebumian"
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden text-slate-800"
                />
              </div>

              {/* Broad Material Text Area */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                  <span>Naskah / Teks Materi Luas (Paste Text Disini)</span>
                  <span className="text-[10px] text-slate-400 font-normal">
                    Mendukung paragraf panjang & bab buku
                  </span>
                </label>
                <textarea
                  id="ai-material-textarea"
                  rows={6}
                  value={materialText}
                  onChange={(e) => setMaterialText(e.target.value)}
                  placeholder="Tempelkan naskah materi lengkap Anda di sini... AI akan mengekstrak inti sari, definisi kunci, dan struktur materi menjadi tata letak visual infografis atau slide."
                  className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-mono transition-all text-slate-800"
                />
              </div>

              {/* Format Selection for Output */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Bentuk Output Rangkuman yang Diinginkan
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    {
                      id: "presentation_slide",
                      label: "Slide Presentasi PPT (16:9)",
                      desc: "Slide ringkas, judul, 3 poin utama & kesimpulan",
                      icon: Presentation,
                    },
                    {
                      id: "infographic",
                      label: "Infografis Vertikal (Poster)",
                      desc: "Alur tahapan visual berurut siap cetak/baca",
                      icon: FileText,
                    },
                    {
                      id: "summary_cheat_sheet",
                      label: "Lembar Ringkasan Cepat",
                      desc: "Rumus, poin penting & kata kunci esensial",
                      icon: Sparkles,
                    },
                    {
                      id: "concept_map",
                      label: "Peta Konsep & Hierarki",
                      desc: "Bagan hubungan antar konsep materi",
                      icon: Layers,
                    },
                  ].map((fmt) => {
                    const Icon = fmt.icon;
                    return (
                      <button
                        key={fmt.id}
                        type="button"
                        onClick={() => setSummaryFormat(fmt.id as any)}
                        className={`p-2.5 text-left rounded-xl border transition-all text-xs flex items-start gap-2.5 ${
                          summaryFormat === fmt.id
                            ? "bg-emerald-50/50 border-emerald-500 ring-2 ring-emerald-500/20 text-emerald-950"
                            : "border-slate-200 hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                            summaryFormat === fmt.id
                              ? "bg-emerald-600 text-white"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="font-bold block">{fmt.label}</span>
                          <span className="text-[10px] text-slate-500 leading-tight block mt-0.5">
                            {fmt.desc}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Wishes for Summary */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Catatan Tambahan untuk AI
                </label>
                <input
                  id="ai-summary-wishes-input"
                  type="text"
                  value={summaryWishes}
                  onChange={(e) => setSummaryWishes(e.target.value)}
                  placeholder="Contoh: Buat bahasa santai untuk siswa SMP, tonjolkan 3 tips praktis"
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden text-slate-800"
                />
              </div>

              {/* Sample Material Quick Load */}
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                  Coba Contoh Materi Edukatif:
                </span>
                <div className="flex gap-2">
                  {materialPresets.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSubjectTitle(p.title);
                        setMaterialText(p.text);
                        setSummaryFormat(p.format);
                      }}
                      className="py-1.5 px-3 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg text-xs font-medium text-slate-700 border border-slate-200 transition-colors"
                    >
                      {p.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Action Buttons */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Batal
          </button>

          {activeTab === "creative_design" ? (
            <button
              id="btn-execute-creative-design"
              type="button"
              disabled={isLoading || !prompt.trim()}
              onClick={handleGenerateDesign}
              className="py-2.5 px-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-extrabold rounded-xl shadow-md shadow-indigo-500/25 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{isUserPremium ? "AI Turbo Memproses Cepat (Prioritas)..." : "AI Sedang Merancang Desain Presisi..."}</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-amber-300" />
                  <span>{isUserPremium ? "Buat dengan AI Turbo (Cepat)" : "Buat Desain AI Sekarang"}</span>
                </>
              )}
            </button>
          ) : (
            <button
              id="btn-execute-summarize-material"
              type="button"
              disabled={isLoading || !materialText.trim()}
              onClick={handleSummarizeMaterial}
              className="py-2.5 px-5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-extrabold rounded-xl shadow-md shadow-emerald-500/25 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{isUserPremium ? "AI Turbo Merangkum Prioritas..." : "AI Sedang Merangkum Materi Luas..."}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>{isUserPremium ? "Rangkum Cepat AI Turbo" : "Rangkum & Buat Desain Visual Otomatis"}</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
