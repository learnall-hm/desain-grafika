import React, { useState, useRef, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { Settings, Globe, User, Shield, LogOut, ChevronDown, Crown, Sparkles } from "lucide-react";

export const SettingsDropdown: React.FC = () => {
  const {
    t,
    currentLang,
    setIsLanguageModalOpen,
    setIsPersonalInfoOpen,
    setIsAccountModalOpen,
    setIsLogoutConfirmOpen,
    setIsPremiumModalOpen,
    isUserPremium,
  } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const langLabels: Record<string, string> = {
    id: "🇮🇩 Bahasa Indonesia",
    en: "🇬🇧 English",
    zh: "🇨🇳 中文",
    ja: "🇯🇵 日本語",
    ar: "🇸🇦 العربية",
    es: "🇪🇸 Español",
  };

  return (
    <div className="relative" ref={dropdownRef} id="settings-menu-container">
      <button
        id="settings-menu-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t("settingsMenu")}
        className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-700 bg-white hover:bg-slate-100 hover:text-slate-900 border border-slate-200 rounded-lg shadow-xs transition-all focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
      >
        <Settings className="w-4 h-4 text-slate-500" />
        <span className="hidden sm:inline">{t("settingsMenu")}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div
          id="settings-dropdown-popup"
          className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="px-3.5 py-2 border-b border-slate-100 mb-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {t("settingsMenu")}
            </p>
          </div>

          {/* 0. Akses Premium (Prominent feature in settings menu) */}
          <div className="px-2 pb-1.5 pt-0.5">
            <button
              id="settings-access-premium-btn"
              onClick={() => {
                setIsOpen(false);
                setIsPremiumModalOpen(true);
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl transition-all text-left bg-gradient-to-r from-amber-500/10 via-amber-400/10 to-indigo-500/10 hover:from-amber-500/20 hover:to-indigo-500/20 text-slate-800 border border-amber-300/80 shadow-2xs group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-400 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0">
                  <Crown className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-xs text-slate-900 leading-none">
                      Akses Premium
                    </span>
                    <Sparkles className="w-3 h-3 text-amber-500" />
                  </div>
                  <span className="text-[10px] text-amber-800 font-medium block mt-0.5">
                    Rp 25rb/bln • AI Turbo & VIP
                  </span>
                </div>
              </div>
              {isUserPremium ? (
                <span className="text-[10px] font-extrabold px-2 py-0.5 bg-amber-500 text-white rounded-full shadow-2xs">
                  Aktif
                </span>
              ) : (
                <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-200/80 text-amber-900 rounded-md">
                  Pilih
                </span>
              )}
            </button>
          </div>

          <div className="border-t border-slate-100 my-1"></div>

          {/* 1. Language selector */}
          <button
            id="settings-language-btn"
            onClick={() => {
              setIsOpen(false);
              setIsLanguageModalOpen(true);
            }}
            className="w-full flex items-center justify-between px-3.5 py-2.5 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors text-left"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-blue-50 text-blue-600 rounded-md">
                <Globe className="w-4 h-4" />
              </div>
              <span className="font-medium">{t("languageSelect")}</span>
            </div>
            <span className="text-xs font-medium px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">
              {langLabels[currentLang]?.split(" ")[0]} {currentLang.toUpperCase()}
            </span>
          </button>

          {/* 2. Personal Info */}
          <button
            id="settings-personal-info-btn"
            onClick={() => {
              setIsOpen(false);
              setIsPersonalInfoOpen(true);
            }}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors text-left"
          >
            <div className="p-1.5 bg-purple-50 text-purple-600 rounded-md">
              <User className="w-4 h-4" />
            </div>
            <span className="font-medium">{t("personalInfo")}</span>
          </button>

          {/* 3. Account */}
          <button
            id="settings-account-btn"
            onClick={() => {
              setIsOpen(false);
              setIsAccountModalOpen(true);
            }}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors text-left"
          >
            <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-md">
              <Shield className="w-4 h-4" />
            </div>
            <span className="font-medium">{t("accountSettings")}</span>
          </button>

          <div className="border-t border-slate-100 my-1"></div>

          {/* 4. Logout */}
          <button
            id="settings-logout-btn"
            onClick={() => {
              setIsOpen(false);
              setIsLogoutConfirmOpen(true);
            }}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors text-left font-medium"
          >
            <div className="p-1.5 bg-rose-50 text-rose-600 rounded-md">
              <LogOut className="w-4 h-4" />
            </div>
            <span>{t("logout")}</span>
          </button>
        </div>
      )}
    </div>
  );
};
