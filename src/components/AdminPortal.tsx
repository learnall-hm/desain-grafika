import React, { useState } from "react";
import { useApp, ADMIN_EMAIL, ADMIN_ALT_EMAILS } from "../context/AppContext";
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
  Ticket,
  Tag,
  Shield,
  ShieldAlert,
  ShieldCheck,
  LogIn,
  LogOut,
  Mail,
  EyeOff,
  AlertTriangle,
} from "lucide-react";
import { DesignCategory, DesignTemplate } from "../types";

// SECURE LOGIN GATE: Displayed strictly when user is not logged in as admin_utama
const AdminTourLoginGate: React.FC = () => {
  const { loginAdminTour, setActiveView, showToast } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const normalizedEmail = email.trim().toLowerCase();
  const isAuthorizedAdminEmail =
    normalizedEmail === ADMIN_EMAIL.toLowerCase() ||
    ADMIN_ALT_EMAILS.some((e) => e.toLowerCase() === normalizedEmail);

  const isUnauthorizedWarning = email.trim().length > 4 && !isAuthorizedAdminEmail;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const result = loginAdminTour(email, password);
    setIsSubmitting(false);

    if (!result.success) {
      setErrorMessage(
        result.error ||
          "Akses Ditolak: Hanya akun admin utama yang dapat login ke admin booking tour."
      );
    }
  };

  const handleQuickDemoAdmin = () => {
    setEmail(ADMIN_EMAIL);
    setPassword("admin123");
    setErrorMessage(null);
    const result = loginAdminTour(ADMIN_EMAIL, "admin123");
    if (!result.success) {
      setErrorMessage(result.error || "Gagal masuk.");
    }
  };

  return (
    <div
      id="admin-tour-login-gate"
      className="min-h-screen bg-gradient-to-b from-[#f8fafc] via-[#f0f9ff] to-[#e2e8f0] text-slate-800 font-sans flex flex-col justify-between select-none relative overflow-hidden"
    >
      {/* Background Soft Glows matching Booking Tour Sky Blue */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#42b6ee]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-[#fbc531]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="h-16 px-4 sm:px-8 border-b border-slate-200/80 bg-white/80 backdrop-blur-md flex items-center justify-between sticky top-0 z-20 shadow-2xs">
        <div className="flex items-center gap-3">
          {/* Logo Booking Tour */}
          <div className="w-8 h-8 rounded-full border-2 border-[#42b6ee] flex items-center justify-center text-[#42b6ee] bg-sky-50/80 shadow-2xs">
            <svg className="w-5 h-5 text-[#42b6ee]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="8" stroke="#42b6ee" />
              <line x1="6" y1="18" x2="18" y2="6" stroke="#42b6ee" strokeWidth="2" />
              <polyline points="13 6 18 6 18 11" stroke="#42b6ee" strokeWidth="2" />
            </svg>
          </div>
          <div className="leading-tight">
            <span className="font-extrabold text-slate-900 text-sm block tracking-tight">Booking</span>
            <span className="font-extrabold text-slate-900 text-sm block -mt-1 tracking-tight">Tour</span>
          </div>
          <span className="ml-2 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-sky-100 text-[#0284c7] border border-sky-200 uppercase tracking-wide">
            Portal Admin
          </span>
        </div>

        <button
          id="btn-back-to-canvas"
          onClick={() => setActiveView("templates")}
          className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full transition-all flex items-center gap-1.5 shadow-2xs"
        >
          <Palette className="w-3.5 h-3.5 text-indigo-600" />
          <span>Kembali ke Creative Hub</span>
        </button>
      </header>

      {/* Main Login Card Section */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 z-10">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-sky-900/5 border border-sky-100/80 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Card Top Accent Header */}
          <div className="p-6 pb-4 text-center bg-gradient-to-b from-sky-50/60 to-transparent border-b border-slate-100">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold shadow-2xs mb-3">
              <Lock className="w-3.5 h-3.5 text-amber-600" />
              <span>Area Khusus Admin Utama</span>
            </div>

            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-[#42b6ee] to-sky-400 text-white flex items-center justify-center shadow-lg shadow-sky-400/25 mb-3 ring-4 ring-sky-50">
              <ShieldCheck className="w-7 h-7" />
            </div>

            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Login Admin Booking Tour
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
              Hanya akun <strong>Admin Utama (Fredyant)</strong> yang dapat masuk untuk mengelola pemesanan, wisatawan, keuangan, dan kalender tur.
            </p>
          </div>

          {/* Body & Form */}
          <div className="p-6 pt-4 space-y-4">
            {/* Strict Notice Box */}
            <div className="p-3 bg-rose-50/90 border border-rose-200 rounded-2xl flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-rose-900">Restriksi Akses Keamanan</p>
                <p className="text-[11px] text-rose-700 leading-snug mt-0.5">
                  Hanya akun admin utama yang dapat login ke admin booking tour. Akun pengguna biasa atau siswa/guru tidak memiliki hak akses.
                </p>
              </div>
            </div>

            {/* Error Message Box */}
            {errorMessage && (
              <div
                id="admin-login-error-alert"
                className="p-3 bg-red-100/80 border-2 border-red-300 rounded-2xl flex items-start gap-2.5 text-red-800 text-xs animate-shake"
              >
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span className="font-semibold">{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              {/* Email field */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700">
                    Email Administrator
                  </label>
                  {isUnauthorizedWarning && (
                    <span className="text-[10px] font-bold text-rose-600">
                      Bukan akun admin utama
                    </span>
                  )}
                </div>
                <div className="relative">
                  <input
                    id="input-admin-tour-email"
                    type="email"
                    required
                    placeholder={ADMIN_EMAIL}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrorMessage(null);
                    }}
                    className={`w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl transition-all border ${
                      isUnauthorizedWarning
                        ? "border-rose-400 bg-rose-50/40 text-rose-900 focus:ring-2 focus:ring-rose-400"
                        : "border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#42b6ee]"
                    }`}
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              {/* Password field */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700">
                    Kata Sandi Admin
                  </label>
                  <span className="text-[10px] text-slate-400">Default: admin123</span>
                </div>
                <div className="relative">
                  <input
                    id="input-admin-tour-password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrorMessage(null);
                    }}
                    className="w-full pl-9 pr-10 py-2.5 text-xs border border-slate-200 bg-slate-50 focus:bg-white rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#42b6ee] transition-all text-slate-800"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                id="btn-submit-admin-tour-login"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 bg-[#42b6ee] hover:bg-sky-500 text-white text-xs font-bold rounded-xl shadow-md shadow-sky-400/25 transition-all flex items-center justify-center gap-2 transform active:scale-[0.99] cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>Masuk ke Admin Booking Tour</span>
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase">
                <span className="bg-white px-2 text-slate-400 font-bold">Akses Cepat Verifikasi</span>
              </div>
            </div>

            {/* Quick Demo Access as Fredyant */}
            <button
              id="btn-quick-fredyant-login"
              type="button"
              onClick={handleQuickDemoAdmin}
              className="w-full p-2.5 bg-sky-50/70 hover:bg-sky-100/70 border border-sky-200/80 rounded-2xl flex items-center justify-between transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#f87171] overflow-hidden p-0.5 shrink-0 shadow-2xs">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="Fredyant"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-800">Fredyant</span>
                    <span className="px-1.5 py-0.2 rounded-sm bg-[#42b6ee] text-white text-[9px] font-extrabold uppercase">
                      Admin Utama
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-mono">admin@designstudio.com</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#0284c7] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                <span>Login</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>

          {/* Card Footer */}
          <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={() => setActiveView("templates")}
              className="text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              Bukan Administrator Utama? <span className="font-bold text-[#0284c7] underline">Kembali ke Studio Desain</span>
            </button>
          </div>
        </div>
      </main>

      {/* Bottom Footer */}
      <footer className="py-4 text-center text-xs text-slate-400 border-t border-slate-200/60 bg-white/40">
        <p>© {new Date().getFullYear()} Booking Tour Admin Security Shield. Dilindungi otorisasi peran ketat.</p>
      </footer>
    </div>
  );
};

export const AdminPortal: React.FC = () => {
  const {
    currentUser,
    login,
    loginAdminTour,
    logout,
    setIsLoginModalOpen,
    templates,
    addTemplate,
    deleteTemplate,
    addNotification,
    showToast,
    setActiveView,
    t,
  } = useApp();

  // Profile dropdown menu toggle in header
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

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

  // STRICT ACCESS CONTROL: Only the main admin account can enter Admin Booking Tour
  if (currentUser.role !== "admin_utama") {
    return <AdminTourLoginGate />;
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-slate-800 font-sans flex flex-col" id="admin-booking-tour-root">

      {/* TOP HEADER (Matching Reference Image) */}
      <header className="h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
        {/* Left Brand + Breadcrumb */}
        <div className="flex items-center gap-6">
          {/* Booking Tour Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full border-2 border-[#42b6ee] flex items-center justify-center text-[#42b6ee] bg-sky-50/60 shadow-2xs relative">
              <svg className="w-5 h-5 text-[#42b6ee]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="8" stroke="#42b6ee" />
                <line x1="6" y1="18" x2="18" y2="6" stroke="#42b6ee" strokeWidth="2" />
                <polyline points="13 6 18 6 18 11" stroke="#42b6ee" strokeWidth="2" />
              </svg>
            </div>
            <div className="leading-tight">
              <span className="font-extrabold text-slate-900 text-sm block tracking-tight">Booking</span>
              <span className="font-extrabold text-slate-900 text-sm block -mt-1 tracking-tight">Tour</span>
            </div>
          </div>

          {/* Breadcrumb Title */}
          <div className="hidden md:flex items-center gap-2 pl-4 border-l border-slate-200 text-slate-700">
            <div className="grid grid-cols-2 gap-0.5 w-3.5 h-3.5">
              <div className="w-1.5 h-1.5 rounded-[2px] bg-[#42b6ee]"></div>
              <div className="w-1.5 h-1.5 rounded-[2px] bg-sky-300"></div>
              <div className="w-1.5 h-1.5 rounded-[2px] bg-sky-300"></div>
              <div className="w-1.5 h-1.5 rounded-[2px] bg-[#42b6ee]"></div>
            </div>
            <span className="text-sm font-bold text-slate-800">
              Dashboard
            </span>
          </div>
        </div>

        {/* Center Search Bar */}
        <div className="flex-1 max-w-sm mx-6 hidden sm:block">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              placeholder="Cari Sesuatu..."
              value={adminSearch}
              onChange={(e) => setAdminSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-white border border-slate-200 rounded-full focus:outline-hidden focus:ring-2 focus:ring-[#42b6ee] transition-all text-slate-700 placeholder-slate-400 shadow-2xs"
            />
          </div>
        </div>

        {/* Right User & Actions */}
        <div className="flex items-center gap-2.5">
          {/* Quick link to Creative Hub (Design Studio) */}
          <button
            onClick={() => setActiveView("templates")}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#0284c7] bg-sky-50 hover:bg-sky-100 rounded-full border border-sky-200 transition-colors mr-1"
            title="Buka Creative Hub / Desain Studio"
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Creative Hub</span>
          </button>

          {/* Ticket / Coupon Icon (Light Sky Blue) */}
          <button
            onClick={() => setActiveMenu("pemesanan")}
            className="w-8 h-8 rounded-full bg-sky-50 hover:bg-sky-100 text-[#42b6ee] flex items-center justify-center transition-colors shadow-2xs"
            title="Tiket & Promo"
          >
            <Ticket className="w-4 h-4" />
          </button>

          {/* Notification Icon (Sky Blue with indicator) */}
          <button
            onClick={() => setActiveMenu("pesan")}
            className="w-8 h-8 rounded-full bg-sky-50 hover:bg-sky-100 text-[#42b6ee] flex items-center justify-center transition-colors relative shadow-2xs"
            title="Notifikasi"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#42b6ee] rounded-full ring-1 ring-white"></span>
          </button>

          {/* Messages Icon (Golden Yellow with indicator) */}
          <button
            onClick={() => setActiveMenu("pesan")}
            className="w-8 h-8 rounded-full bg-amber-50 hover:bg-amber-100 text-[#fbc531] flex items-center justify-center transition-colors relative shadow-2xs"
            title="Pesan Masuk"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#fbc531] rounded-full ring-1 ring-white"></span>
          </button>

          {/* Fredyant Profile Badge & Dropdown */}
          <div className="relative">
            <button
              id="btn-admin-profile-menu"
              type="button"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-2 pl-2.5 border-l border-slate-200 hover:opacity-90 transition-opacity cursor-pointer group"
              title="Menu Administrator"
            >
              <div className="text-right hidden sm:block leading-tight">
                <span className="text-xs font-bold text-slate-800 block group-hover:text-[#42b6ee] transition-colors">
                  Fredyant
                </span>
                <span className="text-[10px] text-slate-400 font-medium block">
                  Admin Utama
                </span>
              </div>
              {/* Squircle profile photo avatar matching the coral/red background in screenshot */}
              <div className="w-8 h-8 rounded-xl bg-[#f87171] overflow-hidden p-0.5 shadow-2xs flex items-center justify-center shrink-0 ring-2 ring-transparent group-hover:ring-[#42b6ee]/50 transition-all">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Fredyant"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isProfileMenuOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileMenuOpen && (
              <div
                id="admin-profile-dropdown"
                className="absolute right-0 top-12 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in zoom-in-95 duration-150"
              >
                <div className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-xl mb-2 border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-[#f87171] overflow-hidden p-0.5 shadow-2xs shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                      alt="Fredyant"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="leading-tight overflow-hidden">
                    <p className="text-xs font-bold text-slate-900 truncate">Fredyant</p>
                    <p className="text-[10px] text-slate-500 font-mono truncate">{ADMIN_EMAIL}</p>
                    <span className="inline-block mt-1 px-1.5 py-0.5 rounded-sm bg-sky-100 text-[#0284c7] text-[9px] font-extrabold uppercase tracking-wide">
                      Admin Utama Resmi
                    </span>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      setActiveView("templates");
                    }}
                    className="w-full py-2 px-3 text-left rounded-xl hover:bg-slate-100 text-slate-700 font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Palette className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Buka Creative Hub Studio</span>
                  </button>

                  <button
                    id="btn-admin-dropdown-logout"
                    type="button"
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      logout();
                      showToast("Sesi Admin Booking Tour telah berakhir.");
                    }}
                    className="w-full py-2 px-3 text-left rounded-xl hover:bg-rose-50 text-rose-600 font-semibold flex items-center gap-2 transition-colors border-t border-slate-100 pt-2 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-500" />
                    <span>Keluar dari Admin (Logout)</span>
                  </button>
                </div>
              </div>
            )}
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
              {/* Dashboard (Active Sky-Blue Pill from Reference Image) */}
              <button
                id="admin-nav-dashboard"
                onClick={() => setActiveMenu("dashboard")}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  activeMenu === "dashboard"
                    ? "bg-[#42b6ee] text-white shadow-md shadow-sky-400/30"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium"
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
                className={`w-full flex items-center justify-between px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeMenu === "pemesanan"
                    ? "bg-sky-50 text-[#0284c7] font-bold"
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
                className={`w-full flex items-center justify-between px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeMenu === "wisatawan"
                    ? "bg-sky-50 text-[#0284c7] font-bold"
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
                className={`w-full flex items-center justify-between px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeMenu === "wisata"
                    ? "bg-sky-50 text-[#0284c7] font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4" />
                  <span>Wisata</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Ulasan */}
              <button
                id="admin-nav-ulasan"
                onClick={() => setActiveMenu("ulasan")}
                className={`w-full flex items-center justify-between px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeMenu === "ulasan"
                    ? "bg-sky-50 text-[#0284c7] font-bold"
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
                className={`w-full flex items-center justify-between px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeMenu === "analisis"
                    ? "bg-sky-50 text-[#0284c7] font-bold"
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
                className={`w-full flex items-center justify-between px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeMenu === "kalender"
                    ? "bg-sky-50 text-[#0284c7] font-bold"
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
                className={`w-full flex items-center justify-between px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeMenu === "pesan"
                    ? "bg-sky-50 text-[#0284c7] font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4" />
                  <span>Pesan</span>
                </div>
              </button>
            </nav>

            {/* Sidebar Middle Stats (Pemesanan Hari Ini & Pendapatan Hari Ini from Reference Image) */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div>
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 mb-0.5">
                  <span>Pemesanan Hari Ini</span>
                </div>
                <div className="text-[10px] text-slate-400 mb-1.5 font-medium">50 orderan</div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-[#42b6ee] rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 mb-0.5">
                  <span>Pendapatan Hari ini</span>
                </div>
                <div className="text-xs font-bold text-slate-800">Rp 25.000.000</div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1.5">
                  <div className="w-4/5 h-full bg-[#fbc531] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Card: "Butuh bantuan?" with cute cartoon illustration (Matching Reference Image) */}
          <div className="mt-6 pt-3 border-t border-slate-100">
            <div className="bg-sky-50/50 rounded-2xl p-3.5 text-center border border-sky-100/80">
              {/* Illustration SVG with yellow 3D question mark and two friendly cartoon characters */}
              <div className="w-full h-16 mb-2 relative flex items-center justify-center">
                {/* Left cartoon figure */}
                <svg className="w-6 h-12 absolute left-6 bottom-0" viewBox="0 0 30 60" fill="none">
                  <circle cx="15" cy="10" r="7" fill="#1e293b" />
                  <path d="M7 18 C7 17, 23 17, 23 18 L26 38 L4 38 Z" fill="#42b6ee" />
                  <rect x="9" y="38" width="4" height="20" rx="1.5" fill="#1e293b" />
                  <rect x="17" y="38" width="4" height="20" rx="1.5" fill="#1e293b" />
                </svg>

                {/* Big 3D Golden-Yellow Question Mark */}
                <span className="text-3xl font-black text-[#fbc531] select-none drop-shadow-xs z-10 scale-110">?</span>

                {/* Right cartoon figure */}
                <svg className="w-6 h-12 absolute right-6 bottom-0" viewBox="0 0 30 60" fill="none">
                  <circle cx="15" cy="10" r="7" fill="#1e293b" />
                  <path d="M7 18 C7 17, 23 17, 23 18 L26 38 L4 38 Z" fill="#fbc531" />
                  <rect x="9" y="38" width="4" height="20" rx="1.5" fill="#1e293b" />
                  <rect x="17" y="38" width="4" height="20" rx="1.5" fill="#1e293b" />
                </svg>
              </div>

              <p className="text-xs font-bold text-slate-800 mb-2">Butuh bantuan ?</p>
              <button
                onClick={() => showToast("Pusat Bantuan Admin Booking Tour siap melayani Anda 24/7!")}
                className="w-full py-2 px-3 bg-[#42b6ee] hover:bg-sky-500 text-white text-[11px] font-bold rounded-xl shadow-xs transition-colors"
              >
                Butuh bantuan ?
              </button>
              <p className="text-[10px] text-slate-400 mt-1.5">Pelajari selengkapnya</p>
            </div>

            {/* Logout from Admin Portal */}
            <button
              id="btn-admin-sidebar-logout"
              type="button"
              onClick={() => {
                logout();
                showToast("Sesi Admin Booking Tour telah berakhir.");
              }}
              className="w-full mt-3 py-2 px-3 flex items-center justify-center gap-1.5 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl text-xs font-bold border border-rose-100 transition-colors cursor-pointer"
              title="Keluar dari sesi Admin Booking Tour"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-500" />
              <span>Keluar dari Admin</span>
            </button>
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
                <div className="lg:col-span-8 bg-gradient-to-r from-[#42b6ee] via-[#56c1f1] to-[#78d2f7] rounded-[26px] p-6 sm:p-7 text-white relative overflow-hidden shadow-xs flex flex-col justify-between min-h-[175px]">
                  {/* Subtle decorative clouds */}
                  <div className="absolute top-3 left-1/4 w-16 h-5 bg-white/20 rounded-full blur-2xs"></div>
                  <div className="absolute top-7 left-1/2 w-14 h-4 bg-white/25 rounded-full blur-2xs"></div>
                  <div className="absolute top-4 right-1/3 w-10 h-3 bg-white/15 rounded-full blur-2xs"></div>

                  <div className="relative z-10 max-w-sm">
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-1 text-white">
                      Hai, Fredyant
                    </h2>
                    <p className="text-xs sm:text-sm text-white/95 mb-5 leading-relaxed font-normal">
                      Selamat datang kembali, dasbor Anda sudah siap!
                    </p>

                    <button
                      id="hero-admin-start-btn"
                      onClick={() => setIsUploadModalOpen(true)}
                      className="px-5 py-2 bg-[#fbc531] hover:bg-amber-400 text-slate-900 text-xs font-bold rounded-xl shadow-xs inline-flex items-center gap-1.5 transition-transform hover:scale-105 active:scale-95"
                    >
                      <span>Mulai</span>
                      <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>

                  {/* Right side flat vector illustration matching screenshot: Yellow Tree + Traveler pulling Suitcase */}
                  <div className="absolute right-2 sm:right-6 bottom-0 w-44 sm:w-56 h-full flex items-end justify-end pointer-events-none select-none">
                    <svg className="w-full h-36" viewBox="0 0 200 130" fill="none">
                      {/* Fluffy white clouds */}
                      <path d="M120 20 C120 15, 126 12, 132 14 C136 10, 145 11, 147 16 C152 16, 155 20, 153 24 L118 24 C116 22, 118 20, 120 20 Z" fill="white" fillOpacity="0.3" />
                      <path d="M40 30 C40 26, 45 24, 50 25 C53 22, 60 23, 62 27 C66 27, 68 30, 67 34 L38 34 C36 32, 38 30, 40 30 Z" fill="white" fillOpacity="0.25" />

                      {/* Yellow Stylized Foliage Tree */}
                      <rect x="162" y="55" width="6" height="75" rx="3" fill="#334155" />
                      <circle cx="165" cy="45" r="28" fill="#fbc531" />
                      <circle cx="150" cy="55" r="18" fill="#fbc531" />
                      <circle cx="178" cy="55" r="16" fill="#fbc531" />
                      <circle cx="165" cy="28" r="16" fill="#fbc531" />

                      {/* Traveler Figure */}
                      {/* Head and hair */}
                      <circle cx="95" cy="40" r="7" fill="#1e293b" />
                      {/* Torso: white shirt */}
                      <path d="M88 48 C88 47, 102 47, 102 48 L104 74 L86 74 Z" fill="#ffffff" />
                      {/* Left Arm holding suitcase handle */}
                      <line x1="90" y1="52" x2="68" y2="76" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
                      {/* Right Arm */}
                      <line x1="100" y1="52" x2="108" y2="68" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
                      {/* Legs: dark trousers */}
                      <line x1="91" y1="74" x2="88" y2="108" stroke="#1e293b" strokeWidth="4.5" strokeLinecap="round" />
                      <line x1="99" y1="74" x2="104" y2="108" stroke="#1e293b" strokeWidth="4.5" strokeLinecap="round" />
                      {/* Shoes */}
                      <ellipse cx="86" cy="109" rx="4" ry="2" fill="#0f172a" />
                      <ellipse cx="106" cy="109" rx="4" ry="2" fill="#0f172a" />

                      {/* Yellow Rolling Suitcase */}
                      <rect x="52" y="70" width="16" height="28" rx="3" fill="#fbc531" stroke="#eab308" strokeWidth="1" />
                      {/* Suitcase ribs */}
                      <line x1="55" y1="78" x2="65" y2="78" stroke="#ca8a04" strokeWidth="1.2" strokeLinecap="round" />
                      <line x1="55" y1="84" x2="65" y2="84" stroke="#ca8a04" strokeWidth="1.2" strokeLinecap="round" />
                      {/* Handle */}
                      <line x1="60" y1="70" x2="68" y2="76" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                      {/* Wheels */}
                      <circle cx="55" cy="100" r="2.5" fill="#1e293b" />
                      <circle cx="65" cy="100" r="2.5" fill="#1e293b" />
                    </svg>
                  </div>
                </div>

                {/* TOP RIGHT: TUR TERLARIS CARD (Matching Reference Image) */}
                <div className="lg:col-span-4 bg-white rounded-[26px] p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-bold text-slate-800">Tur Terlaris</h3>

                    {/* Period dropdown */}
                    <div className="relative">
                      <button
                        onClick={() => setIsPeriodDropdownOpen(!isPeriodDropdownOpen)}
                        className="px-2.5 py-1 text-[11px] font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 flex items-center gap-1 shadow-2xs"
                      >
                        <span>{bestTourPeriod}</span>
                        <ChevronDown className="w-3 h-3 text-slate-400" />
                      </button>

                      {isPeriodDropdownOpen && (
                        <div className="absolute right-0 mt-1 w-28 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-20 text-xs">
                          {(["Kemarin", "Sekarang", "Bulanan"] as const).map((period) => (
                            <button
                              key={period}
                              onClick={() => {
                                setBestTourPeriod(period);
                                setIsPeriodDropdownOpen(false);
                              }}
                              className={`w-full text-left px-3 py-1.5 text-[11px] hover:bg-sky-50 hover:text-sky-600 ${
                                period === "Sekarang"
                                  ? "font-bold text-[#0284c7] bg-sky-50"
                                  : "text-slate-600"
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
                  <div className="flex items-center gap-3.5 my-auto py-1">
                    {/* Thumbnail */}
                    <div className="w-16 h-16 rounded-2xl bg-sky-100 overflow-hidden shrink-0 shadow-2xs border border-slate-100">
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
                        <div className="flex text-[#fbc531] text-xs">
                          {"★★★★★".split("").map((s, i) => (
                            <span key={i}>{s}</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-[11px] font-semibold text-slate-500">633k /Pax</p>
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
                <div className="bg-white rounded-[24px] p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs text-slate-400 font-medium">Total Pemesanan</p>
                    <h3 className="text-2xl font-black text-slate-900">6.29k</h3>
                    <p className="text-[11px] font-semibold text-emerald-500 flex items-center gap-1">
                      <span>0.43%</span>
                      <span>(30 Hari)</span>
                    </p>
                  </div>
                  {/* Person with blue board/clipboard vector illustration */}
                  <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center p-1 relative overflow-hidden shrink-0">
                    <svg className="w-10 h-12" viewBox="0 0 40 50" fill="none">
                      {/* Character head */}
                      <circle cx="20" cy="10" r="6" fill="#1e293b" />
                      {/* Character torso */}
                      <path d="M14 16 C14 15, 26 15, 26 16 L28 32 L12 32 Z" fill="#fbc531" />
                      {/* Paper / clipboard held by character */}
                      <rect x="18" y="18" width="16" height="22" rx="2" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
                      {/* Blue folded tab */}
                      <polygon points="28,18 34,18 34,24" fill="#42b6ee" />
                      <line x1="21" y1="23" x2="27" y2="23" stroke="#42b6ee" strokeWidth="1.5" strokeLinecap="round" />
                      <line x1="21" y1="27" x2="31" y2="27" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
                      <line x1="21" y1="31" x2="29" y2="31" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                {/* CARD 2: Pemesanan Berhasil */}
                <div className="bg-white rounded-[24px] p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs text-slate-400 font-medium">Pemesanan Berhasil</p>
                    <h3 className="text-2xl font-black text-slate-900">4.39k</h3>
                    <p className="text-[11px] font-semibold text-emerald-500 flex items-center gap-1">
                      <span>0.43%</span>
                      <span>(30 Hari)</span>
                    </p>
                  </div>
                  {/* Person with green/yellow check badge illustration */}
                  <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center p-1 relative overflow-hidden shrink-0">
                    <svg className="w-10 h-12" viewBox="0 0 40 50" fill="none">
                      {/* Character head */}
                      <circle cx="15" cy="12" r="5" fill="#1e293b" />
                      {/* Character body */}
                      <path d="M10 18 C10 17, 20 17, 20 18 L22 34 L8 34 Z" fill="#42b6ee" />
                      {/* Check badge */}
                      <circle cx="26" cy="24" r="10" fill="#fbc531" />
                      <path d="M22 24 L25 27 L30 21" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                {/* CARD 3: Total Pendapatan */}
                <div className="bg-white rounded-[24px] p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs text-slate-400 font-medium">Total Pendapatan</p>
                    <h3 className="text-2xl font-black text-slate-900">Rp 800m</h3>
                    <p className="text-[11px] font-semibold text-rose-500 flex items-center gap-1">
                      <span>0.43%</span>
                      <span>↓ (30 Hari)</span>
                    </p>
                  </div>
                  {/* Person with gold boxes/crates stack illustration */}
                  <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center p-1 relative overflow-hidden shrink-0">
                    <svg className="w-10 h-12" viewBox="0 0 40 50" fill="none">
                      {/* Character head */}
                      <circle cx="14" cy="12" r="5" fill="#1e293b" />
                      {/* Character body */}
                      <path d="M9 18 C9 17, 19 17, 19 18 L21 34 L7 34 Z" fill="#1e293b" />
                      {/* Stack of gold crates */}
                      <rect x="21" y="24" width="14" height="6" rx="1" fill="#fbc531" stroke="#eab308" strokeWidth="0.5" />
                      <rect x="22" y="17" width="12" height="6" rx="1" fill="#fbc531" stroke="#eab308" strokeWidth="0.5" />
                      <rect x="23" y="10" width="10" height="6" rx="1" fill="#fbc531" stroke="#eab308" strokeWidth="0.5" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* BOTTOM ROW: 3 ANALYTICS CARDS (Donut 90%, Donut 80%, Spline Weekly Chart) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                {/* CHART 1: Statistik Pemesanan Bulanan (90% Donut in Sky Blue) */}
                <div className="md:col-span-3 bg-white rounded-[24px] p-5 border border-slate-200/80 shadow-xs flex flex-col items-center text-center justify-between">
                  <div className="w-full text-left">
                    <p className="text-[11px] text-slate-400 font-medium">Statistik</p>
                    <h4 className="text-xs font-bold text-slate-800">Pemesanan Bulanan</h4>
                  </div>

                  {/* Circular Donut Gauge (90%) */}
                  <div className="relative w-28 h-28 my-3 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      {/* Background circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        stroke="#f1f5f9"
                        strokeWidth="11"
                        fill="transparent"
                      />
                      {/* 90% Progress stroke in sky-blue #42b6ee */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        stroke="#42b6ee"
                        strokeWidth="11"
                        strokeDasharray={2 * Math.PI * 38}
                        strokeDashoffset={2 * Math.PI * 38 * (1 - 0.9)}
                        strokeLinecap="round"
                        fill="transparent"
                      />
                    </svg>
                    <div className="absolute text-center">
                      <span className="text-2xl font-black text-slate-900">90%</span>
                    </div>
                  </div>

                  <div className="w-full pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400">Total Pemesanan</span>
                    <span className="font-bold text-slate-800">6,29k</span>
                  </div>
                </div>

                {/* CHART 2: Statistik Pendapatan Bulanan (80% Donut in Yellow) */}
                <div className="md:col-span-3 bg-white rounded-[24px] p-5 border border-slate-200/80 shadow-xs flex flex-col items-center text-center justify-between">
                  <div className="w-full text-left">
                    <p className="text-[11px] text-slate-400 font-medium">Statistik</p>
                    <h4 className="text-xs font-bold text-slate-800">Pendapatan Bulanan</h4>
                  </div>

                  {/* Circular Donut Gauge (80%) */}
                  <div className="relative w-28 h-28 my-3 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      {/* Background circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        stroke="#f1f5f9"
                        strokeWidth="11"
                        fill="transparent"
                      />
                      {/* 80% Progress stroke in golden yellow #fbc531 */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        stroke="#fbc531"
                        strokeWidth="11"
                        strokeDasharray={2 * Math.PI * 38}
                        strokeDashoffset={2 * Math.PI * 38 * (1 - 0.8)}
                        strokeLinecap="round"
                        fill="transparent"
                      />
                    </svg>
                    <div className="absolute text-center">
                      <span className="text-2xl font-black text-slate-900">80%</span>
                    </div>
                  </div>

                  <div className="w-full pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400">Total Pendapatan</span>
                    <span className="font-bold text-slate-800">Rp800jt</span>
                  </div>
                </div>

                {/* CHART 3: Pendapatan Mingguan (Dual spline chart with Jum tooltip) */}
                <div className="md:col-span-6 bg-white rounded-[24px] p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <p className="text-[11px] text-slate-400 font-medium">Statistik</p>
                      <h4 className="text-xs font-bold text-slate-800">Pendapatan Mingguan</h4>
                    </div>

                    {/* Chart Legend */}
                    <div className="flex items-center gap-3 text-[10px]">
                      <div className="flex items-center gap-1 text-[#42b6ee] font-bold">
                        <span className="w-2 h-2 rounded-full bg-[#42b6ee]"></span>
                        <span>Minggu Ini (Rp 26jt)</span>
                      </div>
                      <div className="flex items-center gap-1 text-[#fbc531] font-medium">
                        <span className="w-2 h-2 rounded-full bg-[#fbc531]"></span>
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
                            stroke="#fbc531"
                            strokeWidth="3"
                            strokeLinecap="round"
                          />

                          {/* Sky Blue Line: Minggu Ini */}
                          <path
                            d="M 10 115 Q 120 120, 230 90 T 450 65 T 570 30 T 690 75"
                            fill="none"
                            stroke="#42b6ee"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                          />

                          {/* Data point dot on Jum (Friday) */}
                          <circle cx="570" cy="30" r="5.5" fill="#42b6ee" stroke="#ffffff" strokeWidth="2.5" />
                        </svg>

                        {/* Highlight Tooltip Box on Friday (Jum) */}
                        <div className="absolute right-[16%] top-1 -translate-y-1/2 bg-white px-2.5 py-1 rounded-xl border border-slate-200 shadow-md text-[10px] font-bold text-slate-700 flex items-center gap-1 z-10">
                          <span className="text-slate-400 font-normal">Jum</span>
                          <span className="text-[#0284c7]">Rp 96jt</span>
                        </div>
                      </div>

                      {/* X-Axis Days Labels (Ming, Sen, Sel, Rab, Kam, Jum, Sab) */}
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium px-1 pt-1">
                        <span>Ming</span>
                        <span>Sen</span>
                        <span>Sel</span>
                        <span>Rab</span>
                        <span>Kam</span>
                        <span className="font-bold text-[#0284c7]">Jum</span>
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
