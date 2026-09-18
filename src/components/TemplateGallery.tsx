import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Search,
  Sparkles,
  Layers,
  ArrowRight,
  Eye,
  SlidersHorizontal,
  PlusCircle,
  MoreHorizontal,
  Check,
  CheckCircle2,
  Share2,
  Download,
  Edit3,
  Calendar,
  Users,
  Palette,
  ExternalLink,
  Plus,
  Crown,
} from "lucide-react";
import { DesignCategory, DesignTemplate, UserDesign } from "../types";
import { AiCreativeStudioModal } from "./AiCreativeStudioModal";

export const TemplateGallery: React.FC = () => {
  const {
    templates,
    startDesignFromTemplate,
    startDesignFromScratch,
    setCurrentEditingDesign,
    saveUserDesign,
    setActiveView,
    currentUser,
    openExportModal,
    openShareModal,
    isUserPremium,
    setIsPremiumModalOpen,
    showToast,
    t,
  } = useApp();

  // Search in Creative Hub
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<DesignCategory | "vip_premium">("all");
  const [isAiStudioModalOpen, setIsAiStudioModalOpen] = useState(false);

  // Active hover/selected moodboard item
  const [activeMoodboardInfo, setActiveMoodboardInfo] = useState<string | null>(null);

  // Task Bites checklist state (interactive)
  const [taskBites, setTaskBites] = useState([
    { id: "tb-1", title: "Website Redesign v1.1", color: "bg-purple-400", checked: true },
    { id: "tb-2", title: "Brand Assets", color: "bg-emerald-400", checked: true },
    { id: "tb-3", title: "Asset Collection", color: "bg-slate-200", checked: false },
    { id: "tb-4", title: "Launch Socials", color: "bg-amber-400", checked: false },
  ]);

  const toggleTaskBite = (id: string) => {
    setTaskBites((prev) =>
      prev.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t))
    );
  };

  const handleAddTaskBite = () => {
    const title = prompt("Nama tugas / task bite baru:");
    if (title && title.trim()) {
      setTaskBites((prev) => [
        ...prev,
        {
          id: `tb-${Date.now()}`,
          title: title.trim(),
          color: "bg-cyan-400",
          checked: false,
        },
      ]);
      showToast("Tugas baru ditambahkan ke Task Bites!");
    }
  };

  // Team Wave members
  const teamMembers = [
    {
      id: "tm-1",
      name: "Chloe",
      role: "Motion",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
      bgColor: "bg-purple-100 border-purple-300",
      status: "Aktif",
    },
    {
      id: "tm-2",
      name: "Beni",
      role: "Brand",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
      bgColor: "bg-amber-100 border-amber-300",
      status: "Review",
    },
    {
      id: "tm-3",
      name: "Dan",
      role: "Assets",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
      bgColor: "bg-cyan-100 border-cyan-300",
      status: "Aktif",
    },
    {
      id: "tm-4",
      name: "Alex",
      role: "UI/UX",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
      bgColor: "bg-lime-100 border-lime-300",
      status: "Online",
    },
  ];

  // Filter templates for MY CANVAS
  const filteredTemplates = templates.filter((tpl) => {
    const matchesCategory =
      selectedCategory === "all"
        ? true
        : selectedCategory === "vip_premium"
        ? Boolean(tpl.isPremium)
        : tpl.category === selectedCategory;
    const matchesSearch =
      tpl.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleOpenTemplate = (tpl: DesignTemplate) => {
    if (tpl.isPremium && !isUserPremium) {
      showToast("👑 Template VIP Eksklusif! Buka akses dengan paket Premium.");
      setIsPremiumModalOpen(true);
      return;
    }
    startDesignFromTemplate(tpl);
  };

  const handleStartWithPreset = (presetName: string, color: string) => {
    startDesignFromScratch(1080, 1080, `${presetName} Project`);
    showToast(`Membuat proyek baru dengan estetika ${presetName}!`);
  };

  // Convert template to dummy UserDesign for export/share modal
  const toUserDesign = (tpl: DesignTemplate): UserDesign => ({
    id: tpl.id,
    title: tpl.title,
    category: tpl.category,
    width: tpl.width,
    height: tpl.height,
    previewUrl: tpl.previewUrl,
    background: tpl.background,
    elements: tpl.elements,
    createdAt: tpl.createdAt,
    updatedAt: "Terbaru",
  });

  return (
    <div
      className="min-h-screen bg-[#faf8f5] text-neutral-900 font-sans p-4 sm:p-6 lg:p-8 space-y-6"
      id="creative-hub-dashboard-view"
    >
      {/* TOP HEADER: CREATIVE HUB (Matching Image 2) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200/60">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 font-display">
            CREATIVE HUB
          </h1>
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-neutral-900 text-white tracking-wide uppercase">
            {currentUser.isBelajarAccount ? "🎓 Dashboard Pelajar Pro" : "Dashboard Utama"}
          </span>
        </div>

        {/* Right Search & Action Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Search Pill Input (Matching Image 2) */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-white border border-neutral-300 rounded-full focus:outline-hidden focus:ring-2 focus:ring-neutral-900 w-36 sm:w-52 transition-all placeholder:text-neutral-400 shadow-2xs"
            />
          </div>

          {/* Quick AI Studio Button */}
          <button
            id="hub-ai-studio-btn"
            onClick={() => setIsAiStudioModalOpen(true)}
            className="px-3.5 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-full shadow-2xs flex items-center gap-1.5 transition-all"
            title="Buka AI Creative Studio & Rangkum Materi"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden md:inline">AI Studio & Rangkum</span>
          </button>

          {/* New Project Button */}
          <button
            id="hub-new-scratch-btn"
            onClick={() => startDesignFromScratch(1080, 1080, "Proyek Baru")}
            className="px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-full shadow-2xs flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New Canvas</span>
          </button>

          {/* Profile Circle Avatar with Purple Ring (Matching Image 2) */}
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-500 border border-white shadow-2xs"
            />
            {currentUser.isBelajarAccount && (
              <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-amber-400 border border-white rounded-full"></span>
            )}
          </div>
        </div>
      </div>

      {/* BENTO GRID (ROW 1: MOODBOARD & PROJECT CANVAS PROGRESS Q2) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* CARD 1: MOODBOARD (Top-Left ~58% width - Matching Image 2) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-6 border border-neutral-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-bold tracking-wider text-neutral-800 uppercase">
              MOODBOARD
            </h2>
            <button
              onClick={() => showToast("Opsi Moodboard: Salin Palet Warna / Ekspor Koleksi")}
              className="p-1 text-neutral-400 hover:text-neutral-700 rounded-lg"
              title="More options"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Moodboard Visual Collage Grid (Matching Image 2) */}
          <div className="grid grid-cols-12 gap-3 h-auto sm:h-[300px]">
            {/* Tile 1: NEON RETRO VIBES (Anime Cyberpunk) */}
            <div
              onClick={() => handleStartWithPreset("Neon Retro Vibes", "#ec4899")}
              className="col-span-12 sm:col-span-4 relative rounded-2xl overflow-hidden bg-purple-900 group cursor-pointer border border-neutral-100 shadow-2xs"
            >
              <img
                src="https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&auto=format&fit=crop&q=80"
                alt="Neon Retro Vibes"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-2.5 left-2.5 right-2.5">
                <span className="px-2 py-0.5 rounded-md bg-neutral-900/90 text-white text-[9px] font-bold tracking-wider uppercase block truncate shadow-xs">
                  NEON RETRO VIBES
                </span>
              </div>
            </div>

            {/* Middle Column (Wild Botanicals + Urban Motion) */}
            <div className="col-span-12 sm:col-span-4 flex flex-col gap-3">
              {/* Tile 2: WILD BOTANICALS */}
              <div
                onClick={() => handleStartWithPreset("Wild Botanicals", "#10b981")}
                className="h-1/2 relative rounded-2xl overflow-hidden bg-emerald-950 group cursor-pointer border border-neutral-100 shadow-2xs"
              >
                <img
                  src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=500&auto=format&fit=crop&q=80"
                  alt="Wild Botanicals"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-2 left-2 right-2">
                  <span className="px-2 py-0.5 rounded-md bg-neutral-900/90 text-white text-[9px] font-bold tracking-wider uppercase block truncate shadow-xs">
                    WILD BOTANICALS
                  </span>
                </div>
              </div>

              {/* Tile 3: URBAN MOTION */}
              <div
                onClick={() => handleStartWithPreset("Urban Motion", "#0ea5e9")}
                className="h-1/2 relative rounded-2xl overflow-hidden bg-slate-900 group cursor-pointer border border-neutral-100 shadow-2xs"
              >
                <img
                  src="https://images.unsplash.com/photo-1514565131-fce0801e5785?w=500&auto=format&fit=crop&q=80"
                  alt="Urban Motion"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-2 left-2 right-2">
                  <span className="px-2 py-0.5 rounded-md bg-neutral-900/90 text-white text-[9px] font-bold tracking-wider uppercase block truncate shadow-xs">
                    URBAN MOTION
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column (Typography + Black & White Architecture) */}
            <div className="col-span-12 sm:col-span-4 flex flex-col gap-3">
              {/* Tile 4: TYPOGRAPHY (A type Aa r ba - Matching Image 2) */}
              <div
                onClick={() => handleStartWithPreset("Typography Editorial", "#f59e0b")}
                className="h-1/2 relative rounded-2xl overflow-hidden bg-[#faf7f2] border border-neutral-200 p-3 flex flex-col justify-between group cursor-pointer shadow-2xs"
              >
                <div className="leading-tight">
                  <span className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 block">
                    A<span className="text-xs font-mono font-normal text-neutral-400">type</span>
                  </span>
                  <span className="text-lg font-black tracking-tight text-neutral-800 -mt-1 block">
                    Aar<span className="text-neutral-400">ba</span>
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-bold tracking-wider uppercase text-neutral-500 block">
                    TYPOGRAPHY
                  </span>
                </div>
              </div>

              {/* Tile 5: B&W PERSPECTIVE ARCHITECTURE */}
              <div
                onClick={() => handleStartWithPreset("Monochrome Architecture", "#000000")}
                className="h-1/2 relative rounded-2xl overflow-hidden bg-neutral-900 group cursor-pointer border border-neutral-100 shadow-2xs"
              >
                <img
                  src="https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format&fit=crop&q=80"
                  alt="Architecture"
                  className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-2 left-2 right-2">
                  <span className="px-2 py-0.5 rounded-md bg-neutral-900/90 text-white text-[9px] font-bold tracking-wider uppercase block truncate shadow-xs">
                    PERSPECTIVE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2: PROJECT CANVAS / PROJECT PROGRESS Q2 (Top-Right ~42% width - Matching Image 2) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-6 border border-neutral-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">PROJECT CANVAS</p>
              <h2 className="text-xs font-bold text-neutral-800">PROJECT PROGRESS (Q2)</h2>
            </div>
            <button
              onClick={() => showToast("Data kemajuan kanvas Q2 disinkronkan!")}
              className="p-1 text-neutral-400 hover:text-neutral-700 rounded-lg"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Color Dots Legend (Lavender, Mint, Lime - Matching Image 2) */}
          <div className="flex items-center justify-end gap-3 text-[10px] text-neutral-600 mb-2">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#c084fc]"></span>
              <span>Lavender</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#6ee7b7]"></span>
              <span>Mint</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#a3e635]"></span>
              <span>Lime</span>
            </div>
          </div>

          {/* Spline Area Chart with Milestone Badges (50%, 75%, 38% - Matching Image 2) */}
          <div className="relative w-full h-[220px] my-auto">
            {/* Y-Axis scale: 100, 75, 50, 25, 0 */}
            <div className="absolute left-0 top-0 bottom-6 w-6 flex flex-col justify-between text-[9px] text-neutral-400 font-mono">
              <span>100</span>
              <span>75</span>
              <span>50</span>
              <span>25</span>
              <span>0</span>
            </div>

            {/* Chart Graphic Area */}
            <div className="ml-7 h-full flex flex-col justify-between">
              <div className="relative h-[180px] w-full">
                {/* Horizontal Guide Lines */}
                <div className="absolute top-0 w-full border-b border-neutral-100"></div>
                <div className="absolute top-1/4 w-full border-b border-neutral-100"></div>
                <div className="absolute top-2/4 w-full border-b border-neutral-100"></div>
                <div className="absolute top-3/4 w-full border-b border-neutral-100"></div>
                <div className="absolute bottom-0 w-full border-b border-neutral-200"></div>

                {/* SVG Curves & Soft Area Fill */}
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 500 150">
                  <defs>
                    <linearGradient id="lavenderGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#c084fc" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#c084fc" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="mintGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#6ee7b7" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="limeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a3e635" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#a3e635" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Lime Wave Area */}
                  <path
                    d="M 10 130 Q 100 110, 200 90 T 360 80 T 490 50 L 490 150 L 10 150 Z"
                    fill="url(#limeGrad)"
                  />
                  <path
                    d="M 10 130 Q 100 110, 200 90 T 360 80 T 490 50"
                    fill="none"
                    stroke="#a3e635"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Mint Wave Area */}
                  <path
                    d="M 10 140 Q 120 130, 220 100 T 360 95 T 490 60 L 490 150 L 10 150 Z"
                    fill="url(#mintGrad)"
                  />
                  <path
                    d="M 10 140 Q 120 130, 220 100 T 360 95 T 490 60"
                    fill="none"
                    stroke="#6ee7b7"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Lavender Wave Area */}
                  <path
                    d="M 10 145 Q 120 125, 230 70 T 350 75 T 490 40 L 490 150 L 10 150 Z"
                    fill="url(#lavenderGrad)"
                  />
                  <path
                    d="M 10 145 Q 120 125, 230 70 T 350 75 T 490 40"
                    fill="none"
                    stroke="#c084fc"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Milestone Pinned Badge: 50% (on Lavender Curve) */}
                <div className="absolute left-[44%] top-[42%] -translate-x-1/2 -translate-y-1/2 bg-neutral-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow-xs flex items-center gap-0.5 z-10">
                  <span>50%</span>
                </div>

                {/* Milestone Pinned Badge: 38% (on Mint Curve) */}
                <div className="absolute left-[70%] top-[62%] -translate-x-1/2 -translate-y-1/2 bg-neutral-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow-xs flex items-center gap-0.5 z-10">
                  <span>38%</span>
                </div>
              </div>

              {/* X-Axis dates: Dec 2, Feb 3, Dec 3, Sep 4, Oct 9, Jan 19 (Matching Image 2) */}
              <div className="flex items-center justify-between text-[9px] text-neutral-400 font-mono pt-1">
                <span>Dec 2</span>
                <span>Feb 3</span>
                <span>Dec 3</span>
                <span>Sep 4</span>
                <span>Oct 9</span>
                <span>Jan 19</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BENTO GRID (ROW 2: TASK BITES & TEAM WAVE) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* CARD 3: TASK BITES (Center Left ~58% width - Matching Image 2) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-6 border border-neutral-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold tracking-wider text-neutral-800 uppercase">
              TASK BITES
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handleAddTaskBite}
                className="px-2 py-1 text-[11px] font-bold text-purple-600 hover:bg-purple-50 rounded-lg transition-colors flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>Tambah</span>
              </button>
              <button
                onClick={() => showToast("Opsi Task Bites")}
                className="p-1 text-neutral-400 hover:text-neutral-700 rounded-lg"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Task Bites Checklist (Matching Image 2) */}
          <div className="space-y-2.5">
            {taskBites.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTaskBite(task.id)}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-neutral-50 cursor-pointer transition-colors border border-neutral-100"
              >
                <div className="flex items-center gap-3">
                  {/* Colored Tag Square */}
                  <span className={`w-3.5 h-3.5 rounded-xs ${task.color} shrink-0 shadow-2xs`}></span>
                  <span
                    className={`text-xs font-medium ${
                      task.checked ? "text-neutral-400 line-through" : "text-neutral-800 font-semibold"
                    }`}
                  >
                    {task.title}
                  </span>
                </div>

                {/* Checkbox Icon */}
                <div
                  className={`w-4 h-4 rounded-md flex items-center justify-center transition-colors ${
                    task.checked ? "text-emerald-500 bg-emerald-50" : "text-neutral-300 border border-neutral-300"
                  }`}
                >
                  {task.checked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CARD 4: TEAM WAVE (Center Right ~42% width - Matching Image 2) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-6 border border-neutral-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold tracking-wider text-neutral-800 uppercase">
              TEAM WAVE
            </h2>
            <button
              onClick={() => showToast("Undang anggota tim baru ke workspace")}
              className="p-1 text-neutral-400 hover:text-neutral-700 rounded-lg"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Team Member Tiles Grid (Chloe, Beni, Dan, Alex - Matching Image 2) */}
          <div className="grid grid-cols-2 gap-3">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                onClick={() => showToast(`Membuka sesi kolaborasi dengan ${member.name} (${member.role})`)}
                className={`p-3 rounded-2xl ${member.bgColor} border flex items-center gap-3 cursor-pointer hover:shadow-2xs transition-all`}
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-10 h-10 rounded-full object-cover border border-white shadow-2xs shrink-0"
                />
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-neutral-900 truncate">{member.name}</p>
                  <p className="text-[10px] text-neutral-500 font-medium truncate">({member.role})</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROW 3: MY CANVAS (Full Width Showcase - Matching Image 2) */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-neutral-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-neutral-100">
          <div>
            <h2 className="text-xs font-bold tracking-wider text-neutral-800 uppercase">
              MY CANVAS
            </h2>
            <p className="text-xs text-neutral-400">Pilih kanvas siap pakai atau lanjutkan rancangan kreatif Anda.</p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {(
              [
                { id: "all", label: "Semua" },
                { id: "vip_premium", label: "👑 Template VIP" },
                { id: "social_post", label: "Social" },
                { id: "story", label: "Story" },
                { id: "poster", label: "Poster" },
                { id: "banner", label: "Banner" },
                { id: "logo", label: "Logo" },
              ] as const
            ).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-3 py-1 text-[11px] rounded-full font-semibold transition-all shrink-0 flex items-center gap-1 ${
                  selectedCategory === cat.id
                    ? cat.id === "vip_premium"
                      ? "bg-amber-500 text-white shadow-xs font-bold"
                      : "bg-neutral-900 text-white shadow-2xs"
                    : cat.id === "vip_premium"
                    ? "bg-amber-100/70 text-amber-900 hover:bg-amber-200/80 border border-amber-300/60"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Highlight Banner for Premium Access if not premium */}
        {!isUserPremium && (
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-400/15 to-indigo-500/10 border border-amber-300/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Crown className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-slate-900">
                  Ingin Koleksi Template Lebih Menarik & Unduhan Resolusi Tinggi?
                </p>
                <p className="text-[11px] text-slate-600">
                  Langganan Premium Rp 25.000/bulan atau Rp 300.000/tahun. Bebas pilih berlangganan atau tetap gratis!
                </p>
              </div>
            </div>
            <button
              id="gallery-banner-upgrade-btn"
              onClick={() => setIsPremiumModalOpen(true)}
              className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all whitespace-nowrap self-start sm:self-auto"
            >
              Lihat Akses Premium
            </button>
          </div>
        )}

        {/* Carousel / Grid of Canvas Items (Matching Image 2) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredTemplates.slice(0, 8).map((tpl) => (
            <div
              key={tpl.id}
              className={`bg-neutral-50 rounded-2xl border overflow-hidden group flex flex-col justify-between hover:shadow-md transition-all ${
                tpl.isPremium ? "border-amber-300/80 ring-1 ring-amber-400/20" : "border-neutral-200"
              }`}
            >
              {/* Thumbnail Container */}
              <div className="aspect-video relative overflow-hidden bg-neutral-200">
                <img
                  src={tpl.previewUrl}
                  alt={tpl.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold bg-black/70 text-white backdrop-blur-xs">
                  {tpl.width} x {tpl.height}
                </span>

                {tpl.isPremium && (
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-black bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xs flex items-center gap-1 tracking-wider uppercase">
                    <Crown className="w-2.5 h-2.5" />
                    <span>VIP</span>
                  </span>
                )}
              </div>

              {/* Card Meta & Actions */}
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs font-bold text-neutral-900 truncate">{tpl.title}</h3>
                    {tpl.isPremium && <Crown className="w-3 h-3 text-amber-500 shrink-0" />}
                  </div>
                  <p className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">{tpl.description}</p>
                </div>

                <div className="pt-3 mt-3 border-t border-neutral-200/60 flex items-center justify-between gap-1">
                  <button
                    onClick={() => handleOpenTemplate(tpl)}
                    className={`flex-1 py-1.5 px-2 text-[11px] font-bold rounded-lg shadow-2xs flex items-center justify-center gap-1 transition-colors ${
                      tpl.isPremium && !isUserPremium
                        ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
                        : "bg-neutral-900 hover:bg-neutral-800 text-white"
                    }`}
                  >
                    {tpl.isPremium && !isUserPremium ? (
                      <>
                        <Crown className="w-3 h-3" />
                        <span>Buka (VIP)</span>
                      </>
                    ) : (
                      <>
                        <Edit3 className="w-3 h-3" />
                        <span>Buka Kanvas</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => openExportModal(toUserDesign(tpl))}
                    className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200 rounded-lg transition-colors"
                    title="Unduh (PPT, PDF, DOC, Gambar)"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => openShareModal(toUserDesign(tpl))}
                    className="p-1.5 text-neutral-600 hover:text-emerald-600 hover:bg-neutral-200 rounded-lg transition-colors"
                    title="Bagikan (WhatsApp, Gmail, IG)"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Creative Studio & Material Summarizer Modal */}
      <AiCreativeStudioModal
        isOpen={isAiStudioModalOpen}
        onClose={() => setIsAiStudioModalOpen(false)}
        onDesignGenerated={(design) => {
          saveUserDesign(design);
          setCurrentEditingDesign(design);
          setActiveView("editor");
          showToast(`Desain "${design.title}" berhasil dibuat AI dan siap diedit!`);
        }}
      />
    </div>
  );
};
