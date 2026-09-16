import React from "react";
import { useApp } from "../../context/AppContext";
import { X, Check, Globe } from "lucide-react";
import { LanguageCode } from "../../types";

const languages: { code: LanguageCode; name: string; nativeName: string; flag: string }[] = [
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "en", name: "English", nativeName: "English (US)", flag: "🇬🇧" },
  { code: "zh", name: "Chinese", nativeName: "简体中文 (Mandarin)", flag: "🇨🇳" },
  { code: "ja", name: "Japanese", nativeName: "日本語 (Japanese)", flag: "🇯🇵" },
  { code: "ar", name: "Arabic", nativeName: "العربية (Arabic)", flag: "🇸🇦" },
  { code: "es", name: "Spanish", nativeName: "Español (Spanish)", flag: "🇪🇸" },
];

export const LanguageModal: React.FC = () => {
  const { isLanguageModalOpen, setIsLanguageModalOpen, currentLang, setLanguage, t } = useApp();

  if (!isLanguageModalOpen) return null;

  return (
    <div
      id="language-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200"
    >
      <div
        id="language-modal-card"
        className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base">{t("languageTitle")}</h3>
              <p className="text-xs text-slate-500">{t("languageDesc")}</p>
            </div>
          </div>
          <button
            id="close-language-modal-btn"
            onClick={() => setIsLanguageModalOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Language Grid */}
        <div className="p-5 grid grid-cols-1 gap-2.5 max-h-96 overflow-y-auto">
          {languages.map((lang) => {
            const isSelected = currentLang === lang.code;
            return (
              <button
                key={lang.code}
                id={`lang-select-${lang.code}`}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsLanguageModalOpen(false);
                }}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all text-left ${
                  isSelected
                    ? "border-indigo-600 bg-indigo-50/70 shadow-xs"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span className="text-2xl">{lang.flag}</span>
                  <div>
                    <p className={`text-sm font-semibold ${isSelected ? "text-indigo-950" : "text-slate-800"}`}>
                      {lang.nativeName}
                    </p>
                    <p className="text-xs text-slate-500">{lang.name}</p>
                  </div>
                </div>
                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={() => setIsLanguageModalOpen(false)}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
          >
            {t("cancel")}
          </button>
        </div>
      </div>
    </div>
  );
};
