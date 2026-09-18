import React, { useState } from "react";
import { useApp, ADMIN_EMAIL } from "../context/AppContext";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  AlertTriangle,
  RotateCw,
  ArrowLeft,
  ArrowRight as ArrowNext,
  Star,
  Layers,
  Palette,
  ExternalLink,
  GraduationCap,
  BookOpen,
  School,
} from "lucide-react";

export const LoginView: React.FC = () => {
  const {
    login,
    registerUser,
    loginWithBelajarAccount,
    loginWithPelajarAccount,
    setActiveView,
    showToast,
  } = useApp();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [accountType, setAccountType] = useState<"reguler" | "pelajar">("reguler");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [showQuickDemo, setShowQuickDemo] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const normalizedEmail = email.trim().toLowerCase();

    if (mode === "login") {
      // Jika mode Akun Pelajar atau memasukkan email belajar/siswa
      if (
        accountType === "pelajar" ||
        normalizedEmail.includes("belajar.id") ||
        normalizedEmail.includes("siswa")
      ) {
        loginWithPelajarAccount(name || undefined, normalizedEmail || undefined);
        setActiveView("templates");
        showToast("🎓 Berhasil Masuk! Selamat datang di Dashboard Utama!");
        return;
      }

      // Check if trying to login as admin
      const isAdmin =
        normalizedEmail === ADMIN_EMAIL.toLowerCase() ||
        normalizedEmail === "fredyant@bookingtour.com" ||
        normalizedEmail === "admin@bookingtour.com";

      const role = isAdmin ? "admin_utama" : "pengguna";
      const result = login(normalizedEmail, role, password);

      if (!result.success) {
        setErrorMessage(
          result.error || "Email atau kata sandi tidak sesuai. Silakan periksa kembali."
        );
      } else {
        // Setelah pengguna berhasil login arahkan pengguna ke dashboard utama
        setActiveView("templates");
        showToast(
          isAdmin
            ? "Selamat datang di Dashboard Utama! (Akses Admin Aktif)"
            : "Selamat datang di Dashboard Utama Creative Canvas!"
        );
      }
    } else {
      // Register mode
      if (!normalizedEmail || !password.trim()) {
        setErrorMessage("Mohon lengkapi email dan kata sandi.");
        return;
      }
      const result = registerUser(name, normalizedEmail, "pengguna", password);
      if (result.success) {
        setActiveView("templates");
        showToast("Selamat datang di Dashboard Utama Creative Canvas!");
      } else {
        setErrorMessage(result.error || "Pendaftaran gagal. Silakan coba lagi.");
      }
    }
  };

  const handleDirectPelajarLogin = (
    studentName = "Budi Pratama (Pelajar Belajar ID)",
    studentEmail = "budi.pratama@siswa.belajar.id"
  ) => {
    loginWithPelajarAccount(studentName, studentEmail);
    setActiveView("templates");
    showToast("🎓 Masuk Berhasil! Selamat datang di Dashboard Utama Creative Canvas!");
  };

  const handleQuickDemoFill = (type: "admin" | "pelajar" | "belajar" | "user") => {
    if (type === "admin") {
      setAccountType("reguler");
      setEmail(ADMIN_EMAIL);
      setPassword("admin123");
    } else if (type === "pelajar") {
      setAccountType("pelajar");
      setEmail("budi.pratama@siswa.belajar.id");
      setPassword("siswa123");
    } else if (type === "belajar") {
      setAccountType("pelajar");
      setEmail("guru.teladan@guru.belajar.id");
      setPassword("belajar123");
    } else {
      setAccountType("reguler");
      setEmail("kreator@canvas.io");
      setPassword("kreator123");
    }
    setErrorMessage(null);
  };

  return (
    <div
      id="creative-canvas-browser-viewport"
      className="min-h-screen w-full bg-[#0a0f1d] text-slate-100 font-sans flex flex-col select-none overflow-x-hidden"
    >
      {/* 1. REALISTIC BROWSER CHROME BAR (Matching image header with tab & URL: creativecanvas.io/login) */}
      <header className="bg-[#1e293b] border-b border-slate-700/60 text-slate-300 text-xs shrink-0 select-none z-30">
        {/* Top Tab Strip */}
        <div className="flex items-center justify-between px-3 pt-2 pb-1.5 bg-[#0f172a]">
          <div className="flex items-center gap-1">
            {/* Active Tab matching screenshot "CC Creative Canvas" */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1e293b] text-white rounded-t-lg border-t-2 border-orange-500 max-w-xs text-xs font-semibold shadow-xs">
              <span className="w-4 h-4 rounded-sm bg-gradient-to-tr from-orange-500 to-rose-500 text-[9px] font-black flex items-center justify-center text-white shrink-0">
                CC
              </span>
              <span className="truncate">Creative Canvas</span>
              <button
                type="button"
                onClick={() => setActiveView("templates")}
                className="ml-1 text-slate-400 hover:text-white rounded-full p-0.5"
                title="Buka Studio"
              >
                ✕
              </button>
            </div>

            {/* Plus Tab */}
            <button
              type="button"
              onClick={() => setActiveView("templates")}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
              title="Buka Tab Studio Baru"
            >
              +
            </button>
          </div>

          {/* Window action buttons */}
          <div className="flex items-center gap-3 pr-1 text-slate-400">
            <button
              type="button"
              onClick={() => setShowQuickDemo(!showQuickDemo)}
              className="px-2 py-0.5 text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-md transition-colors flex items-center gap-1 border border-slate-700"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Demo Login Akun</span>
            </button>
            <span className="cursor-pointer hover:text-white">─</span>
            <span className="cursor-pointer hover:text-white">□</span>
            <span
              onClick={() => setActiveView("templates")}
              className="cursor-pointer hover:text-red-400 font-bold"
              title="Kembali ke Studio"
            >
              ✕
            </span>
          </div>
        </div>

        {/* Address Bar Row matching screenshot URL: creativecanvas.io/login */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1e293b]">
          <div className="flex items-center gap-1 text-slate-400">
            <button
              type="button"
              onClick={() => setActiveView("templates")}
              className="p-1 hover:text-white hover:bg-slate-700/50 rounded-sm"
              title="Kembali"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              className="p-1 text-slate-600 cursor-not-allowed"
              title="Maju"
            >
              <ArrowNext className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="p-1 hover:text-white hover:bg-slate-700/50 rounded-sm"
              title="Muat ulang"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* URL Input Bar with Lock Icon */}
          <div className="flex-1 max-w-2xl mx-auto flex items-center gap-2 px-3 py-1 bg-[#0f172a] rounded-full border border-slate-700 text-slate-200 text-xs font-mono">
            <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="text-slate-100 font-sans tracking-wide">
              creativecanvas.io
            </span>
            <span className="text-slate-400 font-sans">/login</span>
            <div className="ml-auto flex items-center gap-2 text-slate-400">
              <Star className="w-3 h-3 hover:text-amber-400 cursor-pointer" />
            </div>
          </div>

          {/* Quick Switch to Studio */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveView("templates")}
              className="hidden md:flex items-center gap-1 px-2.5 py-1 bg-indigo-600/80 hover:bg-indigo-600 text-white rounded-md text-[11px] font-semibold transition-colors"
            >
              <Palette className="w-3 h-3" />
              <span>Jelajah Studio</span>
            </button>
          </div>
        </div>
      </header>

      {/* QUICK DEMO CREDENTIAL DRAWER */}
      {showQuickDemo && (
        <div
          id="demo-credential-drawer"
          className="bg-slate-900 border-b border-amber-500/40 px-4 py-2.5 text-xs flex flex-wrap items-center justify-between gap-3 animate-in slide-in-from-top duration-200 z-20"
        >
          <div className="flex items-center gap-2 text-amber-300 font-semibold">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Pilih akun demo untuk mengisi form login otomatis:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoFill("admin")}
              className="px-2.5 py-1 bg-purple-900/60 hover:bg-purple-800 border border-purple-400/50 text-purple-200 rounded-lg font-bold text-[11px] transition-colors"
            >
              👑 Admin Utama
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoFill("pelajar")}
              className="px-2.5 py-1 bg-emerald-900/70 hover:bg-emerald-800 border border-emerald-400/60 text-emerald-200 rounded-lg font-bold text-[11px] transition-colors flex items-center gap-1"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>🎓 Akun Pelajar Siswa</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoFill("belajar")}
              className="px-2.5 py-1 bg-teal-900/60 hover:bg-teal-800 border border-teal-400/50 text-teal-200 rounded-lg font-bold text-[11px] transition-colors"
            >
              🎓 Guru (belajar.id)
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoFill("user")}
              className="px-2.5 py-1 bg-blue-900/60 hover:bg-blue-800 border border-blue-400/50 text-blue-200 rounded-lg font-bold text-[11px] transition-colors"
            >
              🎨 Kreator Umum
            </button>
          </div>
        </div>
      )}

      {/* 2. MAIN BODY: EXACT SPLIT SCREEN (55% LEFT / 45% RIGHT) */}
      <div className="flex-1 flex flex-col lg:flex-row relative">
        {/* ======================================================== */}
        {/* LEFT COLUMN (55% WIDTH) - ARTISTIC SHOWCASE */}
        {/* ======================================================== */}
        <div
          id="creative-canvas-showcase-55"
          className="lg:w-[55%] relative flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden bg-gradient-to-br from-[#0c4a6e] via-[#0284c7] to-[#1e1b4b]"
        >
          {/* Subtle Ambient Radial Glows */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-400/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 right-0 w-80 h-80 bg-orange-500/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none" />

          {/* Top Bar on Left: "55%" Pill Badge & "CC" Logo */}
          <div className="relative z-10 flex items-center justify-between">
            {/* 55% Pill Badge */}
            <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-[#0284c7]/60 text-cyan-100 border border-cyan-300/40 backdrop-blur-md shadow-inner">
              55%
            </span>

            {/* CC Bold Logo Mark */}
            <div className="text-3xl font-black tracking-tighter text-white drop-shadow-md select-none">
              CC
            </div>
          </div>

          {/* Central Section: Headline Typography & Artistic Visual Composition */}
          <div className="relative z-10 my-auto pt-6 lg:pt-0 max-w-xl">
            {/* BIG BOLD HEADLINE (WELCOME TO CREATIVE CANVAS) */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black tracking-tight text-white uppercase leading-[1.05] drop-shadow-lg">
              WELCOME TO <br />
              <span className="text-white">CREATIVE CANVAS</span>
            </h1>

            {/* SUBTITLE */}
            <div className="mt-4 sm:mt-5 text-lg sm:text-xl lg:text-2xl text-amber-100/90 font-medium leading-tight drop-shadow-sm">
              <p>Unleash Your Vision.</p>
              <p className="font-bold text-white">Design Without Limits.</p>
            </div>

            {/* ARTISTIC GRAPHICS COMPOSITION (Tablet, Stylus, Color Wheel, Ca, Tp, VT, Brushes) */}
            <div className="relative mt-8 sm:mt-12 h-64 sm:h-72 w-full flex items-center justify-center">
              {/* Floating Vector Path with Anchor Points & "VT" Tag */}
              <div className="absolute top-2 right-12 z-20">
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-lg border border-white/30 text-white font-bold text-xs shadow-md">
                  <span className="text-cyan-300">✦</span>
                  <span>VT</span>
                </div>
                {/* Bezier vector handle line */}
                <svg
                  className="w-24 h-16 text-cyan-300/80 -mt-2 -ml-6 pointer-events-none"
                  viewBox="0 0 100 60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M10 50 C 40 10, 60 10, 90 40" strokeLinecap="round" />
                  <circle cx="10" cy="50" r="4" fill="#38bdf8" />
                  <circle cx="90" cy="40" r="4" fill="#38bdf8" />
                  <line x1="10" y1="50" x2="30" y2="20" stroke="#f59e0b" strokeWidth="1.5" />
                  <circle cx="30" cy="20" r="3" fill="#f59e0b" />
                </svg>
              </div>

              {/* Floating Paintbrush 1 (Diagonal angle splashing color) */}
              <div className="absolute -top-4 left-1/3 z-15 transform -rotate-45 pointer-events-none">
                <div className="w-2.5 h-36 bg-gradient-to-t from-[#8b4513] via-[#cd853f] to-[#f4a460] rounded-full shadow-lg relative">
                  {/* Metallic ferrule */}
                  <div className="w-3 h-6 bg-gradient-to-r from-slate-300 via-slate-100 to-slate-400 absolute top-0 -left-0.5 rounded-sm"></div>
                  {/* Bristles dipped in cyan paint */}
                  <div className="w-2.5 h-7 bg-gradient-to-t from-cyan-400 to-blue-600 absolute -top-7 left-0 rounded-t-full shadow-md"></div>
                </div>
              </div>

              {/* DIGITAL DRAWING TABLET WITH STYLUS PEN */}
              <div className="absolute w-64 sm:w-76 h-40 sm:h-48 bg-[#0f172a] rounded-2xl p-2.5 shadow-2xl border border-slate-700 transform -rotate-6 hover:rotate-0 transition-transform duration-500 z-10">
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-[#1e1b4b] via-[#0369a1] to-[#0f766e] p-3 relative overflow-hidden flex flex-col justify-between">
                  {/* Tablet Interface Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-200 font-bold bg-black/30 px-2 py-0.5 rounded-full">
                      Studio Canvas 4K
                    </span>
                  </div>

                  {/* Tablet Screen Artboard & Floating Nodes */}
                  <div className="relative my-auto flex items-center justify-center">
                    <div className="w-24 h-16 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex flex-col items-center justify-center p-1.5 shadow-inner">
                      <span className="text-[11px] font-black text-white">Artboard</span>
                      <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-orange-400 rounded-full mt-1"></div>
                    </div>
                  </div>

                  {/* White Digital Stylus Pen */}
                  <div className="absolute -right-2 -bottom-2 w-36 h-3 bg-gradient-to-r from-slate-200 via-white to-slate-300 rounded-full shadow-xl transform -rotate-35 z-20 border border-slate-400/60 flex items-center justify-between px-2">
                    <div className="w-2 h-2 bg-slate-800 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                    <div className="w-2 h-1 bg-slate-400 rounded-l-full"></div>
                  </div>
                </div>
              </div>

              {/* CHROMATIC COLOR WHEEL (Exact match from screenshot) */}
              <div className="absolute -left-2 sm:left-4 bottom-0 w-28 sm:w-32 h-28 sm:h-32 rounded-full p-1 shadow-2xl bg-white/10 backdrop-blur-md border-2 border-white/30 flex items-center justify-center z-15">
                <div className="w-full h-full rounded-full bg-[conic-gradient(#ef4444,#f97316,#facc15,#22c55e,#06b6d4,#3b82f6,#8b5cf6,#ec4899,#ef4444)] flex items-center justify-center p-2.5">
                  <div className="w-full h-full rounded-full bg-white/90 shadow-inner flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-orange-500 to-rose-500 shadow-md"></div>
                  </div>
                </div>
              </div>

              {/* "Ca" CANVAS CARD (Tilted White Card with "Ca" & Pencil Icon) */}
              <div className="absolute top-6 left-6 z-20 px-3.5 py-2 bg-white text-slate-900 font-black rounded-xl shadow-xl transform -rotate-12 border border-slate-200 flex items-center gap-1.5">
                <span className="text-base tracking-tight">Ca</span>
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              </div>

              {/* "Tp" TYPOGRAPHY SYMBOL (Serif Bold White Mark) */}
              <div className="absolute -bottom-4 right-10 z-20 text-white font-serif text-3xl sm:text-4xl font-black drop-shadow-2xl select-none transform rotate-3">
                Tp
              </div>

              {/* Paintbrush 2 with wooden handle and orange paint */}
              <div className="absolute bottom-6 right-28 z-15 transform rotate-45 pointer-events-none">
                <div className="w-2 h-28 bg-[#8b4513] rounded-full shadow-md relative">
                  <div className="w-2.5 h-5 bg-slate-300 absolute -top-5 left-0 rounded-t-sm"></div>
                  <div className="w-2 h-4 bg-orange-500 absolute -top-9 left-0 rounded-t-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Left Subtle Tagline */}
          <div className="relative z-10 pt-4 flex items-center gap-2 text-xs text-cyan-100/70 font-medium">
            <span>Platform Desain Cerdas</span>
            <span>•</span>
            <span>Didukung Gemini AI & Ekspor Multi-Format</span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN (45% WIDTH) - CLEAN FLOATING LOGIN CARD */}
        {/* ======================================================== */}
        <div
          id="creative-canvas-auth-45"
          className="lg:w-[45%] bg-[#0a0f1d] relative flex flex-col justify-center items-center p-6 sm:p-10 lg:p-12 min-h-[580px]"
        >
          {/* 45% Badge at top right */}
          <div className="absolute top-6 right-6 z-10">
            <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-[#050811]/80 text-slate-300 border border-slate-700/80 shadow-inner">
              45%
            </span>
          </div>

          {/* THE WHITE FLOATING CARD (Exact match from screenshot) */}
          <div
            id="login-workspace-card"
            className="w-full max-w-[420px] bg-white text-slate-900 rounded-[28px] p-7 sm:p-9 shadow-2xl shadow-black/50 border border-slate-100 relative my-auto animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Card Header: Dual 'CC' Logo + "Creative Canvas" */}
            <div className="text-center mb-5">
              <div className="flex items-center justify-center gap-2">
                {/* CC Icon: One coral-orange, one black/navy */}
                <div className="flex items-center -space-x-1">
                  <span className="text-2xl font-black text-[#ff5537] tracking-tighter leading-none">
                    C
                  </span>
                  <span className="text-2xl font-black text-slate-900 tracking-tighter leading-none">
                    C
                  </span>
                </div>
                <span className="font-black text-xl tracking-tight text-slate-900">
                  Creative Canvas
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-slate-800 mt-3">
                {mode === "login"
                  ? "Login to your workspace"
                  : "Buat Akun Baru Workspace"}
              </h2>
            </div>

            {/* OPSI PILIHAN AKUN: AKUN UMUM vs AKUN PELAJAR */}
            <div className="flex p-1 bg-slate-100/90 rounded-xl mb-3.5 border border-slate-200">
              <button
                type="button"
                id="btn-tab-akun-umum"
                onClick={() => {
                  setAccountType("reguler");
                  setErrorMessage(null);
                }}
                className={`flex-1 py-1.5 px-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  accountType === "reguler"
                    ? "bg-white text-slate-900 shadow-xs border border-slate-200/80"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Akun Umum</span>
              </button>

              <button
                type="button"
                id="btn-tab-akun-pelajar"
                onClick={() => {
                  setAccountType("pelajar");
                  if (!email) {
                    setEmail("budi.pratama@siswa.belajar.id");
                    setPassword("siswa123");
                  }
                  setErrorMessage(null);
                }}
                className={`flex-1 py-1.5 px-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  accountType === "pelajar"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Akun Pelajar</span>
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded-full font-black tracking-wider leading-none ${
                    accountType === "pelajar"
                      ? "bg-emerald-800 text-emerald-100"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  PRO
                </span>
              </button>
            </div>

            {/* BANNER KHUSUS AKUN PELAJAR DENGAN PRESET SISWA */}
            {accountType === "pelajar" && (
              <div
                id="pelajar-info-box"
                className="mb-3.5 p-2.5 bg-emerald-50/90 border border-emerald-200 rounded-xl text-slate-700 text-xs animate-in fade-in duration-150"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <GraduationCap className="w-3 h-3" />
                  </div>
                  <span className="font-bold text-[11px] text-emerald-950">
                    Akses Pendidikan Pro Gratis Kemendikbudristek
                  </span>
                </div>
                <div className="flex items-center flex-wrap gap-1 pt-1 border-t border-emerald-100 text-[10px]">
                  <span className="text-emerald-800 font-semibold">Pilih Siswa:</span>
                  <button
                    type="button"
                    onClick={() => {
                      setEmail("budi.pratama@siswa.belajar.id");
                      setPassword("siswa123");
                    }}
                    className="px-1.5 py-0.5 bg-white hover:bg-emerald-100 border border-emerald-200 rounded text-emerald-900 font-medium cursor-pointer"
                  >
                    SMP: Budi
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEmail("siti.aulia@sma.belajar.id");
                      setPassword("siswa123");
                    }}
                    className="px-1.5 py-0.5 bg-white hover:bg-emerald-100 border border-emerald-200 rounded text-emerald-900 font-medium cursor-pointer"
                  >
                    SMA: Siti
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEmail("guru.teladan@guru.belajar.id");
                      setPassword("belajar123");
                    }}
                    className="px-1.5 py-0.5 bg-white hover:bg-emerald-100 border border-emerald-200 rounded text-emerald-900 font-medium cursor-pointer"
                  >
                    Guru ID
                  </button>
                </div>
              </div>
            )}

            {/* Error Message Box */}
            {errorMessage && (
              <div
                id="auth-error-alert"
                className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-start gap-2 animate-shake"
              >
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span className="font-semibold">{errorMessage}</span>
              </div>
            )}

            {/* AUTHENTICATION FORM */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Full Name field (Only shown in Register mode) */}
              {mode === "register" && (
                <div>
                  <div className="bg-[#182238] rounded-xl px-4 py-2.5 flex items-center gap-3 border border-transparent focus-within:border-[#ff5537] transition-all">
                    {accountType === "pelajar" ? (
                      <GraduationCap className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <User className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                    <input
                      id="input-name-register"
                      type="text"
                      required
                      placeholder={
                        accountType === "pelajar"
                          ? "Nama Lengkap Siswa / Pelajar"
                          : "Nama Lengkap Anda"
                      }
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-transparent text-white text-xs sm:text-sm placeholder-slate-400 focus:outline-hidden"
                    />
                  </div>
                </div>
              )}

              {/* 1. Username or Email Address (Dark Navy Box from Screenshot) */}
              <div>
                <div className="bg-[#182238] rounded-xl px-4 py-3 flex items-center gap-3 border border-transparent focus-within:border-[#ff5537] transition-all shadow-inner">
                  {accountType === "pelajar" ? (
                    <GraduationCap className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <User className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                  <input
                    id="input-username-email"
                    type="email"
                    required
                    placeholder={
                      accountType === "pelajar"
                        ? "nama.siswa@siswa.belajar.id"
                        : "Username or Email Address"
                    }
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrorMessage(null);
                    }}
                    className="w-full bg-transparent text-white text-xs sm:text-sm placeholder-slate-400 focus:outline-hidden font-medium"
                  />
                </div>
              </div>

              {/* 2. Password (Dark Navy Box from Screenshot) */}
              <div>
                <div className="bg-[#182238] rounded-xl px-4 py-3 flex items-center gap-3 border border-transparent focus-within:border-[#ff5537] transition-all shadow-inner">
                  <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    id="input-password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrorMessage(null);
                    }}
                    className="w-full bg-transparent text-white text-xs sm:text-sm placeholder-slate-400 focus:outline-hidden font-mono tracking-wider"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title={showPassword ? "Sembunyikan sandi" : "Tampilkan sandi"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* "Lupa Password?" aligned to right */}
                {mode === "login" && (
                  <div className="flex justify-end mt-1.5">
                    <button
                      type="button"
                      onClick={() => setIsForgotModalOpen(true)}
                      className="text-xs font-semibold text-slate-700 hover:text-[#ff5537] hover:underline transition-colors"
                    >
                      Lupa Password?
                    </button>
                  </div>
                )}
              </div>

              {/* 3. Keep me logged in checkbox */}
              {mode === "login" && (
                <div className="flex items-center gap-2 pt-0.5">
                  <input
                    id="checkbox-keep-logged"
                    type="checkbox"
                    checked={keepLoggedIn}
                    onChange={(e) => setKeepLoggedIn(e.target.checked)}
                    className="w-4 h-4 accent-[#ff5537] rounded-sm cursor-pointer"
                  />
                  <label
                    htmlFor="checkbox-keep-logged"
                    className="text-xs font-medium text-slate-700 cursor-pointer"
                  >
                    Keep me logged in
                  </label>
                </div>
              )}

              {/* 4. SUBMIT BUTTON: VIBRANT CORAL/ORANGE "MASUK" (With Pointer Cursor icon like in screenshot) */}
              <div className="relative pt-1">
                <button
                  id="btn-submit-masuk"
                  type="submit"
                  className="w-full py-3 px-4 bg-[#ff5537] hover:bg-[#eb4629] text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-[#ff5537]/35 transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider relative overflow-hidden group"
                >
                  <span>{mode === "login" ? "MASUK" : "DAFTAR SEKARANG"}</span>

                  {/* Visual Hand Pointer Indicator 👆 (depicted clicking on MASUK in the screenshot) */}
                  <span
                    className="absolute right-6 top-2 text-base select-none pointer-events-none group-hover:translate-y-0.5 transition-transform"
                    title="Klik untuk Masuk"
                  >
                    👆
                  </span>
                </button>
              </div>

              {/* OPSI LANGSUNG: MASUK DENGAN AKUN PELAJAR */}
              <div className="pt-2">
                <button
                  type="button"
                  id="btn-direct-login-pelajar"
                  onClick={() => handleDirectPelajarLogin()}
                  className="w-full py-2.5 px-3 bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-800/20 flex items-center justify-center gap-2 transition-all cursor-pointer group"
                >
                  <GraduationCap className="w-4 h-4 text-emerald-200 group-hover:scale-110 transition-transform" />
                  <span>Masuk dengan Akun Pelajar (.belajar.id)</span>
                  <span className="text-[9px] font-extrabold px-1.5 py-0.5 bg-black/25 rounded-md text-emerald-100">
                    Free Pro
                  </span>
                </button>
              </div>
            </form>

            {/* Switch between Login and Register */}
            <div className="text-center mt-4 text-xs text-slate-500">
              {mode === "login" ? (
                <p>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("register");
                      setErrorMessage(null);
                    }}
                    className="font-bold text-slate-900 hover:text-[#ff5537] underline cursor-pointer"
                  >
                    Daftar Sekarang
                  </button>
                </p>
              ) : (
                <p>
                  Sudah memiliki akun?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("login");
                      setErrorMessage(null);
                    }}
                    className="font-bold text-slate-900 hover:text-[#ff5537] underline cursor-pointer"
                  >
                    Masuk Sekarang
                  </button>
                </p>
              )}
            </div>

            {/* SOCIAL LOGIN BUTTONS ROW (Google, Facebook, Apple from screenshot) */}
            <div className="mt-5 flex items-center justify-center gap-3">
              {/* Google Button [ G ] */}
              <button
                type="button"
                id="btn-social-google"
                onClick={() => {
                  login("user.google@gmail.com", "pengguna");
                  setActiveView("templates");
                  showToast("Selamat datang di Dashboard Utama Creative Canvas!");
                }}
                className="flex-1 py-2 px-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center transition-all shadow-2xs hover:shadow-xs cursor-pointer"
                title="Masuk dengan akun Google"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              </button>

              {/* Facebook Button [ f ] */}
              <button
                type="button"
                id="btn-social-facebook"
                onClick={() => {
                  login("user.facebook@meta.com", "pengguna");
                  setActiveView("templates");
                  showToast("Selamat datang di Dashboard Utama Creative Canvas!");
                }}
                className="flex-1 py-2 px-3 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-xl flex items-center justify-center transition-all shadow-2xs hover:shadow-xs cursor-pointer"
                title="Masuk dengan Facebook"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>

              {/* Apple Button [  ] */}
              <button
                type="button"
                id="btn-social-apple"
                onClick={() => {
                  login("user.apple@icloud.com", "pengguna");
                  setActiveView("templates");
                  showToast("Selamat datang di Dashboard Utama Creative Canvas!");
                }}
                className="flex-1 py-2 px-3 bg-white hover:bg-slate-50 border border-slate-200 text-black rounded-xl flex items-center justify-center transition-all shadow-2xs hover:shadow-xs cursor-pointer"
                title="Masuk dengan Apple ID"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.87c.64-.78 1.08-1.86.96-2.87-.93.04-2.03.63-2.69 1.41-.58.68-1.1 1.77-.96 2.81 1.04.08 2.06-.57 2.69-1.35z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Legal Links below card (Matching exact Privacy Policy / Terms of Service in screenshot) */}
          <div className="mt-6 flex items-center gap-4 text-xs text-slate-400">
            <button
              type="button"
              onClick={() => alert("Kebijakan Privasi Creative Canvas Studio: Data Anda aman dan terlindungi.")}
              className="hover:text-slate-200 transition-colors"
            >
              Privacy Policy
            </button>
            <span className="text-slate-600">•</span>
            <button
              type="button"
              onClick={() => alert("Ketentuan Layanan Creative Canvas: Gunakan kanvas untuk berkarya tanpa batasan.")}
              className="hover:text-slate-200 transition-colors"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 max-w-sm w-full rounded-2xl p-6 shadow-2xl animate-in zoom-in-95">
            <h3 className="font-bold text-base text-slate-900 mb-2">Lupa Kata Sandi?</h3>
            <p className="text-xs text-slate-600 mb-4">
              Untuk kemudahan uji coba di lingkungan aplikasi, gunakan akun demo cepat:
            </p>
            <div className="space-y-2 mb-4 text-xs">
              <div
                onClick={() => {
                  handleQuickDemoFill("admin");
                  setIsForgotModalOpen(false);
                }}
                className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl hover:bg-purple-50 hover:border-purple-300 cursor-pointer transition-colors"
              >
                <p className="font-bold text-slate-800">Admin Utama:</p>
                <p className="text-slate-500 font-mono">admin@designstudio.com / admin123</p>
              </div>
              <div
                onClick={() => {
                  handleQuickDemoFill("belajar");
                  setIsForgotModalOpen(false);
                }}
                className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl hover:bg-emerald-50 hover:border-emerald-300 cursor-pointer transition-colors"
              >
                <p className="font-bold text-slate-800">Akun Belajar (.belajar.id):</p>
                <p className="text-slate-500 font-mono">guru.teladan@guru.belajar.id / belajar123</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsForgotModalOpen(false)}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
