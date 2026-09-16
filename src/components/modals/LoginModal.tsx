import React, { useState } from "react";
import { useApp, ADMIN_EMAIL } from "../../context/AppContext";
import {
  X,
  Shield,
  User,
  Lock,
  Mail,
  AlertTriangle,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { UserRole } from "../../types";

export const LoginModal: React.FC = () => {
  const {
    isLoginModalOpen,
    setIsLoginModalOpen,
    login,
    registerUser,
    loginWithBelajarAccount,
    setActiveView,
    t,
  } = useApp();

  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [selectedRole, setSelectedRole] = useState<UserRole>("pengguna");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isLoginModalOpen) return null;

  const isBelajar = email.toLowerCase().includes("belajar.id");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (authMode === "login") {
      const result = login(email, selectedRole);
      if (!result.success) {
        setErrorMessage(result.error || t("loginErrorAdminOnly"));
      } else {
        setIsLoginModalOpen(false);
        setEmail("");
        setPassword("");
      }
    } else {
      // Register
      if (!email.trim() || !password.trim()) {
        setErrorMessage("Mohon lengkapi email dan kata sandi.");
        return;
      }
      const result = registerUser(name, email, selectedRole, password);
      if (result.success) {
        setIsLoginModalOpen(false);
        setEmail("");
        setPassword("");
        setName("");
      } else {
        setErrorMessage(result.error || "Gagal mendaftar.");
      }
    }
  };

  const autofillAdmin = () => {
    setSelectedRole("admin_utama");
    setAuthMode("login");
    setEmail(ADMIN_EMAIL);
    setPassword("admin123");
    setErrorMessage(null);
  };

  const autofillUser = () => {
    setSelectedRole("pengguna");
    setAuthMode("login");
    setEmail("budi.kreatif@gmail.com");
    setPassword("user123");
    setErrorMessage(null);
  };

  const handleBelajarInstant = () => {
    loginWithBelajarAccount();
    setIsLoginModalOpen(false);
  };

  const openFullLoginPage = () => {
    setIsLoginModalOpen(false);
    setActiveView("login");
  };

  return (
    <div
      id="login-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200"
    >
      <div
        id="login-modal-card"
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-xs ${
                selectedRole === "admin_utama"
                  ? "bg-purple-100 text-purple-700"
                  : "bg-indigo-100 text-indigo-700"
              }`}
            >
              {selectedRole === "admin_utama" ? (
                <Shield className="w-5 h-5" />
              ) : (
                <User className="w-5 h-5" />
              )}
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                {authMode === "login"
                  ? selectedRole === "admin_utama"
                    ? t("adminLoginTitle")
                    : t("loginAsUser")
                  : "Daftar Akun Baru"}
              </h3>
              <p className="text-xs text-slate-500">
                {selectedRole === "admin_utama"
                  ? t("adminLoginDesc")
                  : "Akses kanvas tak terbatas & fitur grafis AI canggih"}
              </p>
            </div>
          </div>
          <button
            id="close-login-modal-btn"
            onClick={() => {
              setIsLoginModalOpen(false);
              setErrorMessage(null);
            }}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Masuk vs Daftar */}
        <div className="p-5 pb-0 space-y-3">
          <div className="flex p-1 bg-slate-100 rounded-xl">
            <button
              type="button"
              id="tab-auth-mode-login"
              onClick={() => {
                setAuthMode("login");
                setErrorMessage(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                authMode === "login"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Masuk (Login)
            </button>
            <button
              type="button"
              id="tab-auth-mode-register"
              onClick={() => {
                setAuthMode("register");
                setSelectedRole("pengguna");
                setErrorMessage(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                authMode === "register"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Daftar Baru
            </button>
          </div>

          {/* Akun Belajar Special Perk Banner */}
          <div className="p-3 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-300 rounded-2xl">
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-emerald-950">
                    Akun Belajar (.belajar.id)
                  </span>
                  <span className="px-1.5 py-0.2 bg-emerald-600 text-white text-[9px] font-bold rounded-sm uppercase">
                    PRO GRATIS
                  </span>
                </div>
                <p className="text-[11px] text-emerald-800 leading-snug mt-0.5">
                  Guru & siswa dapat mengakses seluruh fitur premium secara cuma-cuma.
                </p>
                <button
                  type="button"
                  id="btn-modal-belajar-quick"
                  onClick={handleBelajarInstant}
                  className="mt-2 w-full py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1 shadow-2xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Masuk dengan Akun Belajar</span>
                </button>
              </div>
            </div>
          </div>

          {/* Role Segment Toggle (Only when in login mode) */}
          {authMode === "login" && (
            <div className="flex p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                id="tab-role-user"
                onClick={() => {
                  setSelectedRole("pengguna");
                  setErrorMessage(null);
                }}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  selectedRole === "pengguna"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <User className="w-3.5 h-3.5" />
                {t("userBadge")}
              </button>
              <button
                type="button"
                id="tab-role-admin"
                onClick={() => {
                  setSelectedRole("admin_utama");
                  setErrorMessage(null);
                }}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  selectedRole === "admin_utama"
                    ? "bg-purple-600 text-white shadow-xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                {t("adminBadge")}
              </button>
            </div>
          )}

          {selectedRole === "admin_utama" && authMode === "login" && (
            <div className="p-3 bg-purple-50/80 border border-purple-200 rounded-xl flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-purple-900">Proteksi Admin Utama</p>
                <p className="text-[11px] text-purple-700 leading-relaxed mt-0.5">
                  Hanya email resmi <strong>{ADMIN_EMAIL}</strong> yang dapat mengakses panel admin utama.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2 text-rose-700 text-xs">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {authMode === "register" && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nama Lengkap
              </label>
              <div className="relative">
                <input
                  id="input-modal-reg-name"
                  type="text"
                  placeholder="Nama Anda"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-9 pr-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700">
                {t("emailLabel")}
              </label>
              {isBelajar && (
                <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Akun Belajar (Pro)
                </span>
              )}
            </div>
            <div className="relative">
              <input
                id="input-login-email"
                type="email"
                placeholder={
                  selectedRole === "admin_utama"
                    ? ADMIN_EMAIL
                    : authMode === "register"
                    ? "contoh@guru.belajar.id"
                    : "nama@email.com"
                }
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full pl-9 pr-3.5 py-2 text-sm rounded-xl transition-all ${
                  isBelajar
                    ? "border-2 border-emerald-500 bg-emerald-50/40 focus:ring-2 focus:ring-emerald-500"
                    : "border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                }`}
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t("passwordLabel")}
            </label>
            <div className="relative">
              <input
                id="input-login-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-9 pr-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Quick autofill helper buttons */}
          {authMode === "login" && (
            <div className="pt-0.5">
              <p className="text-[11px] font-medium text-slate-400 mb-1">Demo Cepat:</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={autofillAdmin}
                  className="flex-1 py-1.5 px-2.5 text-[11px] font-semibold bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors"
                >
                  Admin Utama
                </button>
                <button
                  type="button"
                  onClick={autofillUser}
                  className="flex-1 py-1.5 px-2.5 text-[11px] font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors"
                >
                  Pengguna Biasa
                </button>
              </div>
            </div>
          )}

          <div className="pt-2">
            <button
              id="submit-login-btn"
              type="submit"
              className={`w-full py-2.5 text-xs font-bold text-white rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 ${
                authMode === "register"
                  ? "bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 shadow-orange-500/20"
                  : selectedRole === "admin_utama"
                  ? "bg-purple-600 hover:bg-purple-700 shadow-purple-500/20"
                  : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20"
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {authMode === "register"
                  ? "Daftar Akun Sekarang"
                  : `${t("loginBtn")} ${selectedRole === "admin_utama" ? t("adminBadge") : t("userBadge")}`}
              </span>
            </button>
          </div>

          {/* Full Page View Link */}
          <div className="pt-2 text-center border-t border-slate-100">
            <button
              type="button"
              onClick={openFullLoginPage}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center justify-center gap-1.5 mx-auto"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Buka Halaman Login Desain Lengkap (55/45 Showcase)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
