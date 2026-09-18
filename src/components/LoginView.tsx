import React, { useState } from "react";
import { useApp, ADMIN_EMAIL } from "../context/AppContext";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Layers,
  Palette,
} from "lucide-react";

export const LoginView: React.FC = () => {
  const { login, registerUser, loginWithBelajarAccount, setActiveView, t } = useApp();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isBelajarDetected, setIsBelajarDetected] = useState(false);

  const handleEmailChange = (val: string) => {
    setEmail(val);
    const isBelajar = val.toLowerCase().includes("belajar.id");
    setIsBelajarDetected(isBelajar);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (mode === "login") {
      // Check if trying to login as admin
      const role = email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() ? "admin_utama" : "pengguna";
      const result = login(email, role, password);
      if (!result.success) {
        setErrorMessage(result.error || "Gagal masuk. Periksa kembali email Anda.");
      } else {
        if (role === "admin_utama") {
          setActiveView("admin_portal");
        } else {
          setActiveView("templates");
        }
      }
    } else {
      // Register mode
      if (!email.trim() || !password.trim()) {
        setErrorMessage("Mohon lengkapi email dan kata sandi.");
        return;
      }
      const result = registerUser(name, email, "pengguna", password);
      if (result.success) {
        setActiveView("templates");
      } else {
        setErrorMessage(result.error || "Gagal mendaftar akun baru.");
      }
    }
  };

  const handleQuickBelajarLogin = () => {
    loginWithBelajarAccount();
    setActiveView("templates");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex flex-col lg:flex-row bg-[#0b1120] text-slate-100 font-sans relative overflow-hidden select-none">
      {/* Top Floating Back Button */}
      <button
        onClick={() => setActiveView("templates")}
        className="absolute top-4 left-4 z-50 px-3.5 py-1.5 bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-xs font-semibold rounded-full border border-slate-700/60 backdrop-blur-md transition-all flex items-center gap-1.5 shadow-lg"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Kembali ke Studio</span>
      </button>

      {/* LEFT SECTION (55% Width on Desktop) - Creative Artistic Showcase */}
      <div
        id="creative-canvas-hero-left"
        className="lg:w-[55%] relative flex flex-col justify-between p-8 sm:p-12 lg:p-16 overflow-hidden bg-gradient-to-br from-[#0c4a6e] via-[#0284c7] to-[#1e1b4b]"
      >
        {/* Decorative Fluid Mesh Glows */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-400/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-fuchsia-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* 55% Badge at top left */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-xs font-mono font-bold text-cyan-300 border border-cyan-400/30 shadow-inner">
            55%
          </span>

          {/* Monogram CC Badge */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 text-white font-black text-xl flex items-center justify-center shadow-lg shadow-cyan-500/30 ring-4 ring-white/10">
            CC
          </div>
        </div>

        {/* Center Typography & Graphics Composition */}
        <div className="relative z-10 my-8 lg:my-auto max-w-xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-[1.05] drop-shadow-md">
            WELCOME TO <br />
            <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent">
              CREATIVE CANVAS
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-xl font-medium text-cyan-100/90 max-w-md drop-shadow-sm">
            Unleash Your Vision. <br className="hidden sm:inline" />
            <span className="font-semibold text-white">Design Without Limits.</span>
          </p>

          {/* Interactive Artistic Visual Graphics (Tablet, Color Wheel, Brush, Badges) */}
          <div className="relative mt-8 sm:mt-12 h-56 sm:h-64 w-full flex items-center justify-center">
            {/* Tablet Mockup */}
            <div className="absolute w-64 sm:w-72 h-40 sm:h-44 bg-slate-950 rounded-2xl p-2.5 shadow-2xl border border-slate-700/80 transform -rotate-6 hover:rotate-0 transition-transform duration-500">
              <div className="w-full h-full rounded-xl bg-gradient-to-br from-indigo-900 via-sky-800 to-slate-900 p-3 relative overflow-hidden flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-300 font-bold">4K Canvas</span>
                </div>
                <div className="text-center my-auto">
                  <span className="text-xs font-bold text-white/90 tracking-wide">
                    Artboard Aktif #1
                  </span>
                  <div className="w-32 h-1 bg-cyan-400/50 rounded-full mx-auto mt-1"></div>
                </div>
                {/* Stylus Pen Illustration */}
                <div className="absolute right-3 bottom-2 w-14 h-1.5 bg-gradient-to-r from-slate-200 to-white rounded-full shadow-lg transform -rotate-45"></div>
              </div>
            </div>

            {/* Color Wheel Graphic */}
            <div className="absolute -left-2 sm:left-4 bottom-2 w-28 h-28 rounded-full border-4 border-white/20 p-1 shadow-2xl bg-slate-900/60 backdrop-blur-md flex items-center justify-center animate-spin-slow">
              <div className="w-full h-full rounded-full bg-[conic-gradient(#ef4444,#f97316,#eab308,#22c55e,#06b6d4,#3b82f6,#a855f7,#ec4899,#ef4444)] opacity-90"></div>
            </div>

            {/* Floating Badges: "Ca", "Tp", "VT" */}
            <div className="absolute top-2 left-8 px-3 py-1.5 rounded-xl bg-white text-slate-950 font-black text-sm shadow-xl transform -rotate-12 border border-slate-200">
              Ca
            </div>
            <div className="absolute top-6 right-8 px-3.5 py-1.5 rounded-xl bg-indigo-600 text-white font-black text-sm shadow-xl transform rotate-6 border border-indigo-400">
              VT
            </div>
            <div className="absolute bottom-4 right-14 px-4 py-2 rounded-2xl bg-white/90 text-indigo-950 font-black text-lg shadow-2xl transform rotate-3">
              Tp
            </div>
          </div>
        </div>

        {/* Bottom Feature Badges */}
        <div className="relative z-10 pt-4 flex flex-wrap items-center gap-3 text-xs text-cyan-100/80">
          <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
            🎨 Studio AI Gemini 3.8
          </span>
          <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
            ⚡ Export PPT, PDF, DOC, IMG
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
            🎓 Gratis Akun Belajar
          </span>
        </div>
      </div>

      {/* RIGHT SECTION (45% Width on Desktop) - The Floating Clean Login Card */}
      <div
        id="creative-canvas-login-right"
        className="lg:w-[45%] bg-[#0b1120] relative flex flex-col justify-center items-center p-6 sm:p-10 lg:p-12 overflow-y-auto"
      >
        {/* 45% Badge at top right */}
        <div className="absolute top-6 right-6 z-10">
          <span className="px-3 py-1 bg-slate-800/80 backdrop-blur-md rounded-full text-xs font-mono font-bold text-slate-400 border border-slate-700 shadow-inner">
            45%
          </span>
        </div>

        {/* The White Card from Screenshot */}
        <div
          id="creative-canvas-auth-card"
          className="w-full max-w-md bg-white text-slate-900 rounded-[2rem] p-7 sm:p-9 shadow-2xl border border-slate-100/10 relative my-auto animate-in fade-in zoom-in-95 duration-300"
        >
          {/* Brand Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-slate-900 via-indigo-900 to-blue-600 text-white flex items-center justify-center font-black text-sm shadow-md">
                CC
              </div>
              <span className="font-black text-xl tracking-tight text-slate-900">
                Creative Canvas
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-700">
              {mode === "login" ? "Login to your workspace" : "Daftar Akun Baru Workspace"}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {mode === "login"
                ? "Masuk untuk mengakses kanvas, draf tersimpan, & ekspor"
                : "Buat akun baru untuk mulai berkarya tanpa batasan"}
            </p>
          </div>

          {/* Mode Switcher Tabs (Masuk vs Daftar) */}
          <div className="flex p-1 bg-slate-100 rounded-xl mb-5">
            <button
              type="button"
              id="tab-auth-login"
              onClick={() => {
                setMode("login");
                setErrorMessage(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                mode === "login"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Masuk (Login)
            </button>
            <button
              type="button"
              id="tab-auth-register"
              onClick={() => {
                setMode("register");
                setErrorMessage(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                mode === "register"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Daftar Sekarang
            </button>
          </div>

          {/* AKUN BELAJAR SPECIAL PERK BANNER */}
          <div
            id="belajar-perk-banner"
            className="mb-5 p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-indigo-50 border border-emerald-300/80 shadow-xs"
          >
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xs text-emerald-950">
                    Akun Belajar (.belajar.id)
                  </span>
                  <span className="px-1.5 py-0.2 bg-emerald-600 text-white font-bold text-[9px] rounded-sm uppercase tracking-wider">
                    GRATIS PRO
                  </span>
                </div>
                <p className="text-[11px] text-emerald-800 leading-snug mt-0.5">
                  Guru & Siswa dengan email <strong>@belajar.id</strong> mendapatkan{" "}
                  <strong>Akses Premium Sepenuhnya Gratis!</strong>
                </p>
                <button
                  type="button"
                  id="btn-quick-belajar-login"
                  onClick={handleQuickBelajarLogin}
                  className="mt-2 w-full py-1.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Masuk dengan Akun Belajar (Instant Pro)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2 text-rose-700 text-xs">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* If Register mode, show Name field */}
            {mode === "register" && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <input
                    id="input-auth-name"
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-orange-500 transition-all text-slate-800"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                </div>
              </div>
            )}

            {/* Email / Username field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  {mode === "login" ? "Username or Email Address" : "Alamat Email"}
                </label>
                {isBelajarDetected && (
                  <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1 animate-pulse">
                    <CheckCircle2 className="w-3 h-3" />
                    Akun Belajar Terdeteksi (Pro Aktif)
                  </span>
                )}
              </div>
              <div className="relative">
                <input
                  id="input-auth-email"
                  type="email"
                  required
                  placeholder={
                    mode === "login" ? "nama@email.com atau @belajar.id" : "nama.anda@belajar.id"
                  }
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  className={`w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl transition-all text-slate-800 ${
                    isBelajarDetected
                      ? "bg-emerald-50/60 border-2 border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                      : "bg-slate-50 border border-slate-200 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                  }`}
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

            {/* Password field with Show/Hide toggle */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700">Password</label>
                {mode === "login" && (
                  <button
                    type="button"
                    onClick={() => alert("Silakan gunakan kredensial demo cepat di bawah ini untuk masuk.")}
                    className="text-xs font-medium text-slate-600 hover:text-orange-600 hover:underline"
                  >
                    Lupa Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  id="input-auth-password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-orange-500 transition-all text-slate-800"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Keep me logged in checkbox */}
            {mode === "login" && (
              <div className="flex items-center gap-2 pt-1">
                <input
                  id="checkbox-keep-logged-in"
                  type="checkbox"
                  checked={keepLoggedIn}
                  onChange={(e) => setKeepLoggedIn(e.target.checked)}
                  className="w-4 h-4 text-orange-500 rounded-sm border-slate-300 focus:ring-orange-400 cursor-pointer"
                />
                <label
                  htmlFor="checkbox-keep-logged-in"
                  className="text-xs font-medium text-slate-600 cursor-pointer"
                >
                  Keep me logged in
                </label>
              </div>
            )}

            {/* Submit Button matching coral/orange in screenshot */}
            <button
              id="submit-auth-btn"
              type="submit"
              className="w-full mt-2 py-3 bg-gradient-to-r from-orange-500 via-rose-500 to-orange-600 hover:from-orange-600 hover:to-rose-600 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-orange-500/25 transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 tracking-wide uppercase"
            >
              <span>{mode === "login" ? "MASUK" : "DAFTAR SEKARANG"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Don't have an account? / Switch mode toggle */}
          <div className="text-center mt-4">
            <p className="text-xs text-slate-500">
              {mode === "login" ? (
                <>
                  Don't have an account?{" "}
                  <button
                    id="switch-to-register-btn"
                    type="button"
                    onClick={() => {
                      setMode("register");
                      setErrorMessage(null);
                    }}
                    className="font-bold text-slate-900 hover:text-orange-600 hover:underline"
                  >
                    Daftar Sekarang
                  </button>
                </>
              ) : (
                <>
                  Sudah punya akun?{" "}
                  <button
                    id="switch-to-login-btn"
                    type="button"
                    onClick={() => {
                      setMode("login");
                      setErrorMessage(null);
                    }}
                    className="font-bold text-slate-900 hover:text-orange-600 hover:underline"
                  >
                    Masuk Sekarang
                  </button>
                </>
              )}
            </p>
          </div>

          {/* Social Logins matching G, f, Apple in screenshot */}
          <div className="mt-5 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-center gap-3">
              {/* Google */}
              <button
                type="button"
                onClick={() => {
                  login("google.user@gmail.com", "pengguna");
                  setActiveView("templates");
                }}
                className="flex-1 py-2 px-3 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl flex items-center justify-center transition-all shadow-2xs"
                title="Masuk dengan Google"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
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

              {/* Facebook */}
              <button
                type="button"
                onClick={() => {
                  login("fb.user@facebook.com", "pengguna");
                  setActiveView("templates");
                }}
                className="flex-1 py-2 px-3 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-xl flex items-center justify-center transition-all shadow-2xs"
                title="Masuk dengan Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>

              {/* Apple */}
              <button
                type="button"
                onClick={() => {
                  login("apple.user@icloud.com", "pengguna");
                  setActiveView("templates");
                }}
                className="flex-1 py-2 px-3 bg-black hover:bg-slate-900 text-white rounded-xl flex items-center justify-center transition-all shadow-2xs"
                title="Masuk dengan Apple"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.87c.64-.78 1.08-1.86.96-2.87-.93.04-2.03.63-2.69 1.41-.58.68-1.1 1.77-.96 2.81 1.04.08 2.06-.57 2.69-1.35z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Quick Demo Credentials helper */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Demo Cepat:</span>
            <button
              type="button"
              onClick={() => {
                setEmail(ADMIN_EMAIL);
                setPassword("admin123");
              }}
              className="text-purple-600 font-semibold hover:underline"
            >
              Admin Utama
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => {
                setEmail("guru.teladan@guru.belajar.id");
                setPassword("belajar123");
                setIsBelajarDetected(true);
              }}
              className="text-emerald-600 font-semibold hover:underline"
            >
              Akun Belajar (Pro)
            </button>
          </div>
        </div>

        {/* Legal links from screenshot below card */}
        <div className="mt-6 flex items-center gap-3 text-xs text-slate-400">
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-slate-200 transition-colors">
            Privacy Policy
          </a>
          <span>•</span>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-slate-200 transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  );
};
