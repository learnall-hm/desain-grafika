import React from "react";
import { useApp } from "../context/AppContext";
import {
  Palette,
  LayoutGrid,
  PlusCircle,
  FolderHeart,
  UploadCloud,
  ShieldCheck,
  UserCheck,
  Sparkles,
  LogIn,
} from "lucide-react";
import { NotificationPanel } from "./NotificationPanel";
import { SettingsDropdown } from "./SettingsDropdown";

export const Navbar: React.FC = () => {
  const {
    currentUser,
    activeView,
    setActiveView,
    setIsLoginModalOpen,
    t,
    startDesignFromScratch,
    userDesigns,
  } = useApp();

  return (
    <header
      id="main-navbar"
      className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveView("templates")}
              className="flex items-center gap-2.5 text-left group focus:outline-hidden"
              id="brand-logo-btn"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
                <Palette className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-slate-900 to-indigo-950 bg-clip-text text-transparent">
                  {t("appTitle")}
                </span>
                <span className="hidden sm:block text-[10px] font-medium text-slate-400 leading-none">
                  {t("appTagline")}
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              <button
                id="nav-templates-btn"
                onClick={() => setActiveView("templates")}
                className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  activeView === "templates"
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                {t("navTemplates")}
              </button>

              <button
                id="nav-create-btn"
                onClick={() => startDesignFromScratch(800, 800, "Desain Baru")}
                className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  activeView === "editor"
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <PlusCircle className="w-3.5 h-3.5 text-indigo-600" />
                {t("navCreate")}
              </button>

              <button
                id="nav-upload-btn"
                onClick={() => setActiveView("upload_design")}
                className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  activeView === "upload_design"
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <UploadCloud className="w-3.5 h-3.5 text-blue-500" />
                {t("navUpload")}
              </button>

              <button
                id="nav-my-designs-btn"
                onClick={() => setActiveView("my_designs")}
                className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  activeView === "my_designs"
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <FolderHeart className="w-3.5 h-3.5 text-rose-500" />
                <span>{t("navMyDesigns")}</span>
                {userDesigns.length > 0 && (
                  <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-slate-200 text-slate-700">
                    {userDesigns.length}
                  </span>
                )}
              </button>

              {/* Admin Portal Tab */}
              <button
                id="nav-admin-portal-btn"
                onClick={() => setActiveView("admin_portal")}
                className={`px-3 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                  activeView === "admin_portal"
                    ? "bg-sky-100 text-sky-800"
                    : "text-sky-700 hover:bg-sky-50"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
                <span>Admin Booking Tour</span>
              </button>
            </nav>
          </div>

          {/* Right Section: Role, Auth, Notification, Profile, Settings */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Akun Belajar Premium indicator */}
            {currentUser.isBelajarAccount && (
              <span
                id="navbar-belajar-badge"
                className="hidden xl:inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-bold bg-gradient-to-r from-amber-50 to-amber-100 text-amber-800 rounded-full border border-amber-300 shadow-2xs"
                title="Akun Belajar ID Aktif - Akses Semua Fitur Premium Gratis"
              >
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>Akun Belajar (Premium)</span>
              </span>
            )}

            {/* Role indicator badge */}
            <div className="hidden lg:flex items-center">
              {currentUser.role === "admin_utama" ? (
                <span
                  id="navbar-admin-badge"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold bg-purple-100 text-purple-800 rounded-full border border-purple-200 shadow-2xs"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                  {t("adminBadge")}
                </span>
              ) : (
                <span
                  id="navbar-user-badge"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200 shadow-2xs"
                >
                  <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                  {t("userBadge")}
                </span>
              )}
            </div>

            {/* Login / Switch Account Button */}
            <button
              id="navbar-switch-role-btn"
              onClick={() => setActiveView("login")}
              className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50 rounded-lg transition-colors flex items-center gap-1"
              title="Buka Halaman Masuk / Ganti Akun"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Masuk / Daftar</span>
            </button>

            {/* Integrated Notification Popover */}
            <NotificationPanel />

            {/* Profile Avatar & Info */}
            <div className="flex items-center gap-2 pl-1 sm:pl-2 border-l border-slate-200">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/20"
              />
              <div className="hidden xl:block text-left leading-tight">
                <p className="text-xs font-bold text-slate-800 truncate max-w-28">
                  {currentUser.name}
                </p>
                <p className="text-[10px] text-slate-400 capitalize truncate max-w-28">
                  {currentUser.role === "admin_utama" ? t("adminBadge") : t("userBadge")}
                </p>
              </div>
            </div>

            {/* Crucial requirement: Menu pengaturan disamping profil */}
            <SettingsDropdown />
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden items-center justify-between py-2 border-t border-slate-100 overflow-x-auto gap-1">
          <button
            onClick={() => setActiveView("templates")}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md whitespace-nowrap ${
              activeView === "templates" ? "bg-indigo-50 text-indigo-700" : "text-slate-600"
            }`}
          >
            {t("navTemplates")}
          </button>
          <button
            onClick={() => startDesignFromScratch(800, 800, "Desain Baru")}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md whitespace-nowrap ${
              activeView === "editor" ? "bg-indigo-50 text-indigo-700" : "text-slate-600"
            }`}
          >
            {t("navCreate")}
          </button>
          <button
            onClick={() => setActiveView("upload_design")}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md whitespace-nowrap ${
              activeView === "upload_design" ? "bg-indigo-50 text-indigo-700" : "text-slate-600"
            }`}
          >
            {t("navUpload")}
          </button>
          <button
            onClick={() => setActiveView("my_designs")}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md whitespace-nowrap ${
              activeView === "my_designs" ? "bg-indigo-50 text-indigo-700" : "text-slate-600"
            }`}
          >
            {t("navMyDesigns")} ({userDesigns.length})
          </button>
          <button
            onClick={() => {
              if (currentUser.role === "admin_utama") {
                setActiveView("admin_portal");
              } else {
                setIsLoginModalOpen(true);
              }
            }}
            className={`px-2.5 py-1 text-xs font-bold rounded-md whitespace-nowrap ${
              activeView === "admin_portal" ? "bg-purple-100 text-purple-800" : "text-purple-700"
            }`}
          >
            {t("navAdminPortal")}
          </button>
        </div>
      </div>
    </header>
  );
};
