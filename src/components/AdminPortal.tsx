import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Compass,
  Search,
  Bell,
  MessageSquare,
  ChevronRight,
  ChevronDown,
  LayoutDashboard,
  Calendar,
  BarChart2,
  Users,
  MapPin,
  Star,
  Plus,
  Trash2,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Lock,
  Sparkles,
  ArrowRight,
  Layers,
  HelpCircle,
  Eye,
  Filter,
  Check,
  Send,
  Home,
  Palette,
  ExternalLink,
} from "lucide-react";
import { DesignCategory, DesignTemplate } from "../types";

export const AdminPortal: React.FC = () => {
  const {
    currentUser,
    login,
    setIsLoginModalOpen,
    templates,
    addTemplate,
    deleteTemplate,
    addNotification,
    showToast,
    setActiveView,
    t,
  } = useApp();

  // Active navigation tab in the Booking Tour Admin Sidebar
  const [activeMenu, setActiveMenu] = useState<
    "dashboard" | "pemesanan" | "wisatawan" | "wisata" | "ulasan" | "analisis" | "kalender" | "pesan"
  >("dashboard");

  // Filter dropdown state for "Tur Terlaris"
  const [bestTourPeriod, setBestTourPeriod] = useState<"Mingguan" | "Kemarin" | "Sekarang" | "Bulanan">(
    "Mingguan"
  );
  const [isPeriodDropdownOpen, setIsPeriodDropdownOpen] = useState(false);

  // Search in Admin
  const [adminSearch, setAdminSearch] = useState("");

  // Modal / Form state for uploading new template (under "Wisata / Template")
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<DesignCategory>("social_post");
  const [description, setDescription] = useState("");
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(800);
  const [tags, setTags] = useState("promo, tur, kreatif");
  const [bgColor, setBgColor] = useState("#0284c7");
  const [previewUrl, setPreviewUrl] = useState(
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80"
  );
  const [headlineText, setHeadlineText] = useState("Eksplorasi Destinasi Impian");

  // Broadcast state
  const [broadcastTitle, setBroadcastTitle] = useState("");
  const [broadcastMessage, setBroadcastMessage] = useState("");

  // Quick switch to admin if currently not logged in
  const handleQuickLoginAsFredyant = () => {
    login("admin@designstudio.com", "admin_utama");
    showToast("Berhasil masuk sebagai Fredyant (Admin Utama)!");
  };

  // Handle template submit
  const handleTemplateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      showToast("Judul template harus diisi.");
      return;
    }

    const tagsArray = tags.split(",").map((t) => t.trim()).filter(Boolean);

    addTemplate({
      title,
      category,
      description: description || "Template tur dan desain kreatif berkualitas tinggi.",
      previewUrl,
      width: Number(width),
      height: Number(height),
      tags: tagsArray.length > 0 ? tagsArray : ["tur", "kreatif"],
      background: {
        type: "solid",
        color: bgColor,
      },
      elements: [
        {
          id: `el-${Date.now()}-1`,
          type: "badge",
          text: category.toUpperCase().replace("_", " "),
          x: 40,
          y: 50,
          width: 150,
          height: 36,
          fill: "#ffffff",
          textColor: bgColor,
          borderRadius: 18,
          zIndex: 1,
        },
        {
          id: `el-${Date.now()}-2`,
          type: "text",
          text: headlineText || title,
          x: 40,
          y: 110,
          fontSize: Math.round(width * 0.055),
          fontWeight: "800",
          fontFamily: "Outfit",
          fill: "#ffffff",
          align: "left",
          width: width - 80,
          zIndex: 2,
        },
      ],
    });

    setTitle("");
    setDescription("");
    setIsUploadModalOpen(false);
    showToast("Template baru berhasil ditambahkan ke katalog!");
  };

  // Handle broadcast message
  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastMessage) {
      showToast("Harap isi judul dan pesan siaran.");
      return;
    }
    addNotification(broadcastTitle, broadcastMessage, "system", "Siaran Admin");
    setBroadcastTitle("");
    setBroadcastMessage("");
    showToast("Pesan siaran berhasil dikirim ke seluruh pengguna!");
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-slate-800 font-sans flex flex-col" id="admin-booking-tour-root">
      {/* If not logged in as admin_utama, show friendly banner */}
      {currentUser.role !== "admin_utama" && (
        <div className="bg-amber-500 text-white px-4 py-2 text-xs flex items-center justify-between z-50">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            <span>Mode Pratinjau Pengguna: Anda sedang melihat tampilan Administrator Utama Booking Tour.</span>
          </div>
          <button
            onClick={handleQuickLoginAsFredyant}
            className="px-3 py-1 bg-white text-amber-700 font-bold rounded-md hover:bg-amber-50 transition-colors shadow-2xs"
          >
            Masuk sebagai Fredyant (Admin)
          </button>
        </div>
      )}

      {/* TOP HEADER (Matching Image 1) */}
      <header className="h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
        {/* Left Brand + Breadcrumb */}
        <div className="flex items-center gap-6">
          {/* Booking Tour Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full border-2 border-sky-400 flex items-center justify-center text-sky-500 bg-sky-50 shadow-2xs">
              <Compass className="w-5 h-5 text-sky-500 transform -rotate-45" />
            </div>
            <div className="leading-tight">
              <span className="font-bold text-slate-900 text-base block tracking-tight">Booking</span>
              <span className="font-black text-sky-600 text-sm block -mt-1 tracking-wider uppercase">Tour</span>
            </div>
          </div>

          {/* Breadcrumb Title */}
          <div className="hidden md:flex items-center gap-2 pl-4 border-l border-slate-200 text-slate-700">
            <LayoutDashboard className="w-4 h-4 text-sky-400" />
            <span className="text-sm font-semibold capitalize">
              {activeMenu === "dashboard" ? "Dashboard" : activeMenu}
            </span>
          </div>
        </div>

        {/* Center Search Bar */}
        <div className="flex-1 max-w-md mx-4 hidden sm:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              placeholder="Cari Sesuatu..."
              value={adminSearch}
              onChange={(e) => setAdminSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-full focus:outline-hidden focus:ring-2 focus:ring-sky-400 focus:bg-white transition-all text-slate-700 placeholder-slate-400"
            />
          </div>
        </div>

        {/* Right User & Actions */}
        <div className="flex items-center gap-3">
          {/* Quick link to Creative Hub (User Dashboard) */}
          <button
            onClick={() => setActiveView("templates")}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-full border border-sky-200 transition-colors"
            title="Buka Creative Hub / Dashboard Pengguna"
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Creative Hub</span>
          </button>

          {/* Messages Icon */}
          <button
            onClick={() => setActiveMenu("pesan")}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors relative"
            title="Pesan Masuk"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-sky-500 rounded-full"></span>
          </button>

          {/* Notification Icon */}
          <button
            onClick={() => setActiveMenu("pesan")}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors relative"
            title="Notifikasi"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full"></span>
          </button>

          {/* Fredyant Profile Badge */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="text-right hidden sm:block leading-tight">
              <span className="text-xs font-bold text-slate-800 block">Fredyant</span>
              <span className="text-[10px] text-slate-400 font-medium block">Admin</span>
            </div>
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="Fredyant"
              className="w-8 h-8 rounded-full object-cover border border-sky-300 ring-2 ring-sky-100"
            />
          </div>
        </div>
      </header>

      {/* BODY WITH LEFT SIDEBAR AND MAIN CONTENT */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT SIDEBAR (Matching Image 1) */}
        <aside className="w-56 bg-white border-r border-slate-200/80 flex flex-col justify-between p-4 shrink-0 hidden md:flex overflow-y-auto">
          {/* Main Navigation Links */}
          <div className="space-y-6">
            <nav className="space-y-1">
              {/* Dashboard (Active Sky-Blue Pill from Image 1) */}
              <button
                id="admin-nav-dashboard"
                onClick={() => setActiveMenu("dashboard")}
                className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeMenu === "dashboard"
                    ? "bg-[#38bdf8] text-white shadow-md shadow-sky-400/30"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </div>
              </button>

              {/* Pemesanan */}
              <button
                id="admin-nav-pemesanan"
                onClick={() => setActiveMenu("pemesanan")}
                className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeMenu === "pemesanan"
                    ? "bg-sky-50 text-sky-700 font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4" />
                  <span>Pemesanan</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Wisatawan */}
              <button
                id="admin-nav-wisatawan"
                onClick={() => setActiveMenu("wisatawan")}
                className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeMenu === "wisatawan"
                    ? "bg-sky-50 text-sky-700 font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4" />
                  <span>Wisatawan</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Wisata / Katalog Template */}
              <button
                id="admin-nav-wisata"
                onClick={() => setActiveMenu("wisata")}
                className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeMenu === "wisata"
                    ? "bg-sky-50 text-sky-700 font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4" />
                  <span>Wisata & Template</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Ulasan */}
              <button
                id="admin-nav-ulasan"
                onClick={() => setActiveMenu("ulasan")}
                className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeMenu === "ulasan"
                    ? "bg-sky-50 text-sky-700 font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Star className="w-4 h-4" />
                  <span>Ulasan</span>
                </div>
              </button>

              {/* Analisis */}
              <button
                id="admin-nav-analisis"
                onClick={() => setActiveMenu("analisis")}
                className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeMenu === "analisis"
                    ? "bg-sky-50 text-sky-700 font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <BarChart2 className="w-4 h-4" />
                  <span>Analisis</span>
                </div>
              </button>

              {/* Kalender */}
              <button
                id="admin-nav-kalender"
                onClick={() => setActiveMenu("kalender")}
                className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeMenu === "kalender"
                    ? "bg-sky-50 text-sky-700 font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4" />
                  <span>Kalender</span>
                </div>
              </button>

              {/* Pesan */}
              <button
                id="admin-nav-pesan"
                onClick={() => setActiveMenu("pesan")}
                className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeMenu === "pesan"
                    ? "bg-sky-50 text-sky-700 font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4" />
                  <span>Pesan</span>
                </div>
              </button>
            </nav>

            {/* Sidebar Middle Stats (Pemesanan Hari Ini & Pendapatan Hari Ini from Image 1) */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div>
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 mb-1">
                  <span>Pemesanan Hari Ini</span>
                </div>
                <div className="text-[10px] text-slate-400 mb-1.5">50 order</div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-[#38bdf8] rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 mb-0.5">
                  <span>Pendapatan Hari ini</span>
                </div>
                <div className="text-xs font-bold text-slate-800">Rp 25.000.000</div>
              </div>
            </div>
          </div>

          {/* Bottom Card: "Butuh bantuan?" with cute cartoon illustration (Matching Image 1) */}
          <div className="mt-6 pt-3 border-t border-slate-100">
            <div className="bg-sky-50/70 rounded-2xl p-3.5 text-center border border-sky-100/80">
              {/* Illustration SVG with yellow question mark and friendly people */}
              <div className="w-16 h-12 mx-auto mb-2 relative flex items-center justify-center">
                <span className="text-3xl font-black text-amber-400 select-none">?</span>
                <div className="absolute -left-1 bottom-0 w-4 h-7 bg-slate-700 rounded-t-sm"></div>
                <div className="absolute -right-1 bottom-0 w-4 h-7 bg-slate-700 rounded-t-sm"></div>
              </div>
              <p className="text-xs font-bold text-slate-800 mb-2">Butuh bantuan ?</p>
              <button
                onClick={() => showToast("Pusat Bantuan Admin Booking Tour siap melayani Anda 24/7!")}
                className="w-full py-1.5 px-3 bg-[#38bdf8] hover:bg-sky-500 text-white text-[11px] font-bold rounded-xl shadow-xs transition-colors"
              >
                Butuh bantuan ?
              </button>
            </div>
          </div>
        </aside>

        {/* MAIN ADMIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7 space-y-6">
          {/* VIEW: DASHBOARD (Identical to Image 1) */}
          {activeMenu === "dashboard" && (
            <>
              {/* TOP ROW: HERO BANNER + TUR TERLARIS CARD */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* HERO BANNER (Hai, Fredyant - Sky Blue Card with traveler illustration) */}
                <div className="lg:col-span-8 bg-gradient-to-r from-[#60a5fa] via-[#38bdf8] to-[#7dd3fc] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-sm flex flex-col justify-between min-h-[175px]">
                  {/* Subtle decorative clouds and sun */}
                  <div className="absolute top-3 left-1/3 w-16 h-6 bg-white/20 rounded-full blur-xs"></div>
                  <div className="absolute top-6 left-1/2 w-12 h-5 bg-white/20 rounded-full blur-xs"></div>
                  <div className="absolute top-4 right-1/4 w-10 h-10 bg-amber-300/60 rounded-full blur-xs"></div>

                  <div className="relative z-10 max-w-sm">
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-1 text-white">
                      Hai, Fredyant
                    </h2>
                    <p className="text-xs sm:text-sm text-sky-50/90 mb-5 leading-relaxed">
                      Selamat datang kembali, dasbor Anda sudah siap!
                    </p>

                    <button
                      id="hero-admin-start-btn"
                      onClick={() => setIsUploadModalOpen(true)}
                      className="px-5 py-2 bg-[#fbbf24] hover:bg-amber-400 text-slate-900 text-xs font-bold rounded-xl shadow-sm inline-flex items-center gap-1.5 transition-transform hover:scale-105 active:scale-95"
                    >
                      <span>Mulai</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Right side flat illustration of Fredyant/Traveler with suitcase and yellow tree */}
                  <div className="absolute right-4 sm:right-8 bottom-0 w-36 sm:w-48 h-full flex items-end pointer-events-none">
                    {/* Yellow stylized tree */}
                    <div className="absolute right-2 bottom-0 w-24 h-36 bg-amber-300 rounded-full opacity-95"></div>
                    <div className="absolute right-8 bottom-0 w-3 h-12 bg-amber-600/60"></div>
                    {/* Traveler character */}
                    <div className="relative z-10 flex flex-col items-center ml-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-slate-800"></div>
                      <div className="w-8 h-12 bg-white rounded-t-lg -mt-1 shadow-xs flex flex-col items-center justify-center">
                        <div className="w-4 h-4 bg-sky-500 rounded-xs"></div>
                      </div>
                      <div className="w-6 h-10 bg-slate-800 -mt-1"></div>
                    </div>
                    {/* Yellow rolling suitcase */}
                    <div className="relative z-10 w-6 h-12 bg-[#fbbf24] rounded-sm ml-1 mb-2 border border-amber-500 shadow-xs flex flex-col justify-between p-0.5">
                      <div className="w-2 h-2 border-t-2 border-slate-700 mx-auto"></div>
                      <div className="w-1.5 h-1.5 bg-slate-800 rounded-full mx-auto"></div>
                    </div>
                  </div>
                </div>

                {/* TOP RIGHT: TUR TERLARIS CARD (Matching Image 1) */}
                <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-bold text-slate-800">Tur Terlaris</h3>

                    {/* Period dropdown */}
                    <div className="relative">
                      <button
                        onClick={() => setIsPeriodDropdownOpen(!isPeriodDropdownOpen)}
                        className="px-2.5 py-1 text-[11px] font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 flex items-center gap-1"
                      >
                        <span>{bestTourPeriod}</span>
                        <ChevronDown className="w-3 h-3 text-slate-400" />
                      </button>

                      {isPeriodDropdownOpen && (
                        <div className="absolute right-0 mt-1 w-28 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-20 text-xs">
                          {(["Kemarin", "Sekarang", "Mingguan", "Bulanan"] as const).map((period) => (
                            <button
                              key={period}
                              onClick={() => {
                                setBestTourPeriod(period);
                                setIsPeriodDropdownOpen(false);
                              }}
                              className={`w-full text-left px-3 py-1.5 text-[11px] hover:bg-sky-50 hover:text-sky-600 ${
                                bestTourPeriod === period ? "font-bold text-sky-600 bg-sky-50/50" : "text-slate-600"
                              }`}
                            >
                              {period}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Best Tour details */}
                  <div className="flex items-center gap-3.5 my-auto">
                    {/* Thumbnail */}
                    <div className="w-16 h-16 rounded-2xl bg-slate-300 overflow-hidden shrink-0 shadow-2xs">
                      <img
                        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&auto=format&fit=crop&q=80"
                        alt="Phang Nga"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Info */}
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-slate-900">Phang Nga</h4>
                      <div className="flex items-center gap-1">
                        <div className="flex text-amber-400 text-xs">
                          {"★★★★★".split("").map((s, i) => (
                            <span key={i}>{s}</span>
                          ))}
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium">(4.9)</span>
                      </div>
                      <p className="text-[11px] font-semibold text-slate-500">633k Penjualan</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Status: Tersedia</span>
                    <span className="font-bold text-emerald-600">Populer #1</span>
                  </div>
                </div>
              </div>

              {/* MIDDLE ROW: 3 STAT CARDS (Total Pemesanan 6.29k, Pemesanan Berhasil 4.39k, Total Pendapatan Rp 800m) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* CARD 1: Total Pemesanan */}
                <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
                  <div className="space-y-1.5">
                    <p className="text-xs text-slate-400 font-medium">Total Pemesanan</p>
                    <h3 className="text-xl font-extrabold text-slate-900">6.29k</h3>
                    <p className="text-[11px] font-semibold text-sky-500 flex items-center gap-1">
                      <span>0.43%</span>
                      <span>(30 Hari)</span>
                    </p>
                  </div>
                  {/* Person with blue board vector illustration */}
                  <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center p-2 relative overflow-hidden">
                    <div className="w-6 h-8 bg-sky-400 rounded-sm shadow-xs flex flex-col justify-center items-center">
                      <div className="w-3 h-0.5 bg-white mb-1"></div>
                      <div className="w-3 h-0.5 bg-white"></div>
                    </div>
                    <div className="absolute right-2 bottom-1 w-3 h-7 bg-amber-400 rounded-xs"></div>
                  </div>
                </div>

                {/* CARD 2: Pemesanan Berhasil */}
                <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
                  <div className="space-y-1.5">
                    <p className="text-xs text-slate-400 font-medium">Pemesanan Berhasil</p>
                    <h3 className="text-xl font-extrabold text-slate-900">4.39k</h3>
                    <p className="text-[11px] font-semibold text-sky-500 flex items-center gap-1">
                      <span>0.43%</span>
                      <span>(30 Hari)</span>
                    </p>
                  </div>
                  {/* Person with green check badge illustration */}
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center p-2 relative">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                      <Check className="w-5 h-5 stroke-[3]" />
                    </div>
                  </div>
                </div>

                {/* CARD 3: Total Pendapatan */}
                <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
                  <div className="space-y-1.5">
                    <p className="text-xs text-slate-400 font-medium">Total Pendapatan</p>
                    <h3 className="text-xl font-extrabold text-slate-900">Rp 800m</h3>
                    <p className="text-[11px] font-semibold text-rose-500 flex items-center gap-1">
                      <span>0.43%</span>
                      <span>↓ (30 Hari)</span>
                    </p>
                  </div>
                  {/* Person with revenue stack illustration */}
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center p-2 relative">
                    <div className="space-y-1">
                      <div className="w-7 h-2.5 bg-amber-400 rounded-xs shadow-2xs"></div>
                      <div className="w-7 h-2.5 bg-amber-500 rounded-xs shadow-2xs"></div>
                      <div className="w-7 h-2.5 bg-amber-600 rounded-xs shadow-2xs"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* BOTTOM ROW: 3 ANALYTICS CARDS (Donut 90%, Donut 80%, Spline Weekly Chart) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                {/* CHART 1: Statistik Pemesanan Bulanan (90% Donut) */}
                <div className="md:col-span-3 bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col items-center text-center justify-between">
                  <div className="w-full text-left">
                    <p className="text-[11px] text-slate-400 font-medium">Statistik</p>
                    <h4 className="text-xs font-bold text-slate-800">Pemesanan Bulanan</h4>
                  </div>

                  {/* Circular Donut Gauge (90%) */}
                  <div className="relative w-28 h-28 my-4 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      {/* Background circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#f1f5f9"
                        strokeWidth="12"
                        fill="transparent"
                      />
                      {/* 90% Progress stroke in sky-blue #38bdf8 */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#38bdf8"
                        strokeWidth="12"
                        strokeDasharray={2 * Math.PI * 40}
                        strokeDashoffset={2 * Math.PI * 40 * (1 - 0.9)}
                        strokeLinecap="round"
                        fill="transparent"
                      />
                    </svg>
                    <div className="absolute text-center">
                      <span className="text-xl font-black text-slate-800">90%</span>
                    </div>
                  </div>

                  <div className="w-full pt-2 border-t border-slate-100">
                    <p className="text-[11px] text-slate-400">Total Pemesanan</p>
                    <p className="text-xs font-bold text-slate-700">6,29k</p>
                  </div>
                </div>

                {/* CHART 2: Statistik Pendapatan Bulanan (80% Donut in Yellow) */}
                <div className="md:col-span-3 bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col items-center text-center justify-between">
                  <div className="w-full text-left">
                    <p className="text-[11px] text-slate-400 font-medium">Statistik</p>
                    <h4 className="text-xs font-bold text-slate-800">Pendapatan Bulanan</h4>
                  </div>

                  {/* Circular Donut Gauge (80%) */}
                  <div className="relative w-28 h-28 my-4 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      {/* Background circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#f1f5f9"
                        strokeWidth="12"
                        fill="transparent"
                      />
                      {/* 80% Progress stroke in golden yellow #fbbf24 */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#fbbf24"
                        strokeWidth="12"
                        strokeDasharray={2 * Math.PI * 40}
                        strokeDashoffset={2 * Math.PI * 40 * (1 - 0.8)}
                        strokeLinecap="round"
                        fill="transparent"
                      />
                    </svg>
                    <div className="absolute text-center">
                      <span className="text-xl font-black text-slate-800">80%</span>
                    </div>
                  </div>

                  <div className="w-full pt-2 border-t border-slate-100">
                    <p className="text-[11px] text-slate-400">Total Pendapatan</p>
                    <p className="text-xs font-bold text-slate-700">Rp800jt</p>
                  </div>
                </div>

                {/* CHART 3: Pendapatan Mingguan (Dual spline chart with Jum tooltip) */}
                <div className="md:col-span-6 bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <p className="text-[11px] text-slate-400 font-medium">Statistik</p>
                      <h4 className="text-xs font-bold text-slate-800">Pendapatan Mingguan</h4>
                    </div>

                    {/* Chart Legend */}
                    <div className="flex items-center gap-3 text-[10px]">
                      <div className="flex items-center gap-1 text-sky-500 font-bold">
                        <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                        <span>Minggu Ini (Rp 96jt)</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500 font-medium">
                        <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                        <span>Minggu Terakhir</span>
                      </div>
                    </div>
                  </div>

                  {/* SVG Line / Spline Graph */}
                  <div className="relative w-full h-44 my-auto">
                    {/* Y-Axis Labels */}
                    <div className="absolute left-0 top-0 bottom-6 w-8 flex flex-col justify-between text-[9px] text-slate-300 font-mono">
                      <span>800</span>
                      <span>600</span>
                      <span>400</span>
                      <span>200</span>
                      <span>0</span>
                    </div>

                    {/* Chart Area */}
                    <div className="ml-8 h-full flex flex-col justify-between">
                      {/* Grid Lines */}
                      <div className="relative h-36 w-full">
                        <div className="absolute top-0 w-full border-b border-slate-100"></div>
                        <div className="absolute top-1/4 w-full border-b border-slate-100"></div>
                        <div className="absolute top-2/4 w-full border-b border-slate-100"></div>
                        <div className="absolute top-3/4 w-full border-b border-slate-100"></div>
                        <div className="absolute bottom-0 w-full border-b border-slate-200"></div>

                        {/* Spline Path SVG */}
                        <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 700 140">
                          {/* Golden Yellow Line: Minggu Terakhir */}
                          <path
                            d="M 10 90 Q 120 70, 230 100 T 450 70 T 570 40 T 690 60"
                            fill="none"
                            stroke="#fbbf24"
                            strokeWidth="3"
                            strokeLinecap="round"
                          />

                          {/* Sky Blue Line: Minggu Ini */}
                          <path
                            d="M 10 115 Q 120 120, 230 90 T 450 65 T 570 30 T 690 75"
                            fill="none"
                            stroke="#38bdf8"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                          />

                          {/* Data point dot on Jum (Friday) */}
                          <circle cx="570" cy="30" r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
                        </svg>

                        {/* Highlight Tooltip Box on Friday (Jum) */}
                        <div className="absolute right-[16%] top-1 -translate-y-1/2 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-md text-[10px] font-bold text-slate-700 flex items-center gap-1 z-10">
                          <span className="text-slate-400 font-normal">Jum</span>
                          <span className="text-sky-600">Rp 96jt</span>
                        </div>
                      </div>

                      {/* X-Axis Days Labels (Ming, Sen, Sel, Rab, Kam, Jum, Sab) */}
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium px-1 pt-1">
                        <span>Ming</span>
                        <span>Sen</span>
                        <span>Sel</span>
                        <span>Rab</span>
                        <span>Kam</span>
                        <span className="font-bold text-sky-600">Jum</span>
                        <span>Sab</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* VIEW: PEMESANAN (Interactive Orders & Bookings List) */}
          {activeMenu === "pemesanan" && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Daftar Pemesanan & Pembelian</h3>
                  <p className="text-xs text-slate-500">Kelola tiket wisata, langganan pro, dan pemesanan desain pelanggan.</p>
                </div>
                <button
                  onClick={() => showToast("Ekspor laporan pemesanan berhasil diunduh!")}
                  className="px-3.5 py-1.5 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold rounded-xl shadow-2xs"
                >
                  Ekspor Laporan (Excel)
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-50 text-slate-400 font-bold border-b border-slate-100 uppercase text-[10px]">
                    <tr>
                      <th className="py-3 px-4">ID Order</th>
                      <th className="py-3 px-4">Pelanggan</th>
                      <th className="py-3 px-4">Paket / Layanan</th>
                      <th className="py-3 px-4">Jumlah</th>
                      <th className="py-3 px-4">Tanggal</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { id: "ORD-9921", name: "Anisa Rahma", item: "Paket Tur Phang Nga Eksklusif", price: "Rp 1.450.000", date: "Hari Ini, 14:20", status: "Selesai" },
                      { id: "ORD-9920", name: "Rizky Santoso", item: "Lisensi Template Poster Pro", price: "Rp 120.000", date: "Hari Ini, 12:05", status: "Selesai" },
                      { id: "ORD-9919", name: "Dewi Lestari", item: "Langganan Tahunan Studio AI", price: "Rp 450.000", date: "Kemarin", status: "Selesai" },
                      { id: "ORD-9918", name: "Budi Pratama", item: "E-Ticket Wisata Raja Ampat", price: "Rp 3.200.000", date: "Kemarin", status: "Menunggu" },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80">
                        <td className="py-3 px-4 font-mono font-bold text-sky-600">{row.id}</td>
                        <td className="py-3 px-4 font-semibold text-slate-800">{row.name}</td>
                        <td className="py-3 px-4">{row.item}</td>
                        <td className="py-3 px-4 font-bold text-slate-800">{row.price}</td>
                        <td className="py-3 px-4 text-slate-400">{row.date}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            row.status === "Selesai"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VIEW: WISATA & TEMPLATE (Katalog Template & Tambah Template Baru) */}
          {activeMenu === "wisata" && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Katalog Wisata & Template Desain</h3>
                  <p className="text-xs text-slate-500">Kelola dan publikasikan template desain serta tur wisata untuk pengguna platform.</p>
                </div>
                <button
                  id="admin-open-upload-modal-btn"
                  onClick={() => setIsUploadModalOpen(true)}
                  className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-2 transition-transform hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Template Baru</span>
                </button>
              </div>

              {/* Grid of existing templates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {templates.map((tpl) => (
                  <div key={tpl.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs group flex flex-col justify-between">
                    <div className="aspect-video relative overflow-hidden bg-slate-100">
                      <img
                        src={tpl.previewUrl}
                        alt={tpl.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-sky-700 shadow-xs">
                        {tpl.category}
                      </span>
                    </div>

                    <div className="p-3.5 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{tpl.title}</h4>
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">{tpl.description}</p>
                      </div>

                      <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[10px] text-slate-400">{tpl.width} x {tpl.height}px</span>
                        <button
                          onClick={() => deleteTemplate(tpl.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                          title="Hapus Template"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW: WISATAWAN (Users List) */}
          {activeMenu === "wisatawan" && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900">Wisatawan & Pengguna Platform</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: "Budi Pratama", email: "budi.kreatif@gmail.com", role: "Pengguna Regular", designs: 4, type: "Umum" },
                  { name: "Rina Sasmita", email: "rina.guru@belajar.id", role: "Akun Belajar ID", designs: 12, type: "Belajar.id" },
                  { name: "Doni Kusuma", email: "doni.agency@gmail.com", role: "Pengguna Regular", designs: 8, type: "Umum" },
                  { name: "Fredyant", email: "admin@designstudio.com", role: "Administrator Utama", designs: 18, type: "Admin" },
                ].map((usr, i) => (
                  <div key={i} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-sm">
                      {usr.name[0]}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-slate-900 truncate">{usr.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{usr.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-sky-100 text-sky-700 text-[9px] font-bold rounded-full">
                        {usr.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW: PESAN & SIARAN (Broadcast Announcements) */}
          {activeMenu === "pesan" && (
            <div className="max-w-2xl bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Kirim Siaran & Notifikasi Massal</h3>
                <p className="text-xs text-slate-500">Pesan ini akan langsung muncul di panel notifikasi seluruh pengguna platform.</p>
              </div>

              <form onSubmit={handleBroadcast} className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Judul Siaran</label>
                  <input
                    type="text"
                    value={broadcastTitle}
                    onChange={(e) => setBroadcastTitle(e.target.value)}
                    placeholder="Contoh: Rilis Koleksi Tur Phang Nga Terbaru 2026"
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Isi Pesan Siaran</label>
                  <textarea
                    rows={3}
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                    placeholder="Tulis pengumuman atau promo resmi di sini..."
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:outline-hidden"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim ke Seluruh Pengguna</span>
                </button>
              </form>
            </div>
          )}

          {/* VIEW: ULASAN & ANALISIS & KALENDER FALLBACKS */}
          {(activeMenu === "ulasan" || activeMenu === "analisis" || activeMenu === "kalender") && (
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center mx-auto">
                <BarChart2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 capitalize">{activeMenu} Terintegrasi</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Modul {activeMenu} terhubung dengan analitik real-time. Statistik utama telah tersaji pada tab Dashboard utama.
              </p>
              <button
                onClick={() => setActiveMenu("dashboard")}
                className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold rounded-xl"
              >
                Kembali ke Dashboard Utama
              </button>
            </div>
          )}
        </main>
      </div>

      {/* MODAL: UPLOAD NEW TEMPLATE (Wisata & Template Baru) */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Tambah Template / Wisata Baru</h3>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleTemplateSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Judul Desain / Wisata</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Tur Phang Nga Tropis Eksklusif"
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Kategori</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as DesignCategory)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:outline-hidden"
                  >
                    <option value="social_post">Social Post (800x800)</option>
                    <option value="poster">Poster (1080x1350)</option>
                    <option value="story">Story (1080x1920)</option>
                    <option value="banner">Banner (1200x400)</option>
                    <option value="flyer">Flyer Brosur</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Warna Background</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer border-0"
                    />
                    <span className="text-xs font-mono text-slate-500">{bgColor}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">URL Gambar Pratinjau</label>
                <input
                  type="url"
                  value={previewUrl}
                  onChange={(e) => setPreviewUrl(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Keterangan singkat mengenai keunggulan desain atau wisata..."
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:outline-hidden"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-sky-500 hover:bg-sky-600 rounded-xl shadow-xs"
                >
                  Publikasikan ke Katalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
