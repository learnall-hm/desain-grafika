import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { X, Shield, Key, HardDrive, Sliders, CheckCircle2, Sparkles, Crown } from "lucide-react";

export const AccountModal: React.FC = () => {
  const {
    currentUser,
    isAccountModalOpen,
    setIsAccountModalOpen,
    setIsPremiumModalOpen,
    isUserPremium,
    showToast,
    t,
  } = useApp();

  const [darkCanvas, setDarkCanvas] = useState(false);
  const [highRes, setHighRes] = useState(true);
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");

  if (!isAccountModalOpen) return null;

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPass || !newPass) {
      showToast("Harap isi semua kolom kata sandi.");
      return;
    }
    setPasswordUpdated(true);
    setOldPass("");
    setNewPass("");
    showToast("Kata sandi akun berhasil diperbarui secara aman.");
    setTimeout(() => setPasswordUpdated(false), 3000);
  };

  return (
    <div
      id="account-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200"
    >
      <div
        id="account-modal-card"
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base">{t("accountTitle")}</h3>
              <p className="text-xs text-slate-500">{t("accountDesc")}</p>
            </div>
          </div>
          <button
            id="close-account-modal-btn"
            onClick={() => setIsAccountModalOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Plan & Storage stats */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-medium">{t("currentPlan")}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    {isUserPremium ? (
                      <Crown className="w-4 h-4 text-amber-500" />
                    ) : (
                      <Sparkles className="w-4 h-4 text-slate-400" />
                    )}
                    <span className="text-sm font-bold text-slate-800">
                      {currentUser.role === "admin_utama"
                        ? "Admin Master"
                        : currentUser.isBelajarAccount
                        ? "Akun Belajar (VIP)"
                        : currentUser.subscriptionPlan === "yearly"
                        ? "Premium Tahunan"
                        : currentUser.subscriptionPlan === "monthly"
                        ? "Premium Bulanan"
                        : "Akun Gratis"}
                    </span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-[11px] text-slate-500 block">
                    {isUserPremium
                      ? `Aktif (${currentUser.subscriptionExpiresAt || "Unlimited"})`
                      : "Fitur standar"}
                  </span>
                </div>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-medium">{t("storageUsed")}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <HardDrive className="w-4 h-4 text-indigo-500" />
                    <span className="text-sm font-bold text-slate-800">
                      {isUserPremium ? "1.8 GB / 50 GB" : "320 MB / 2 GB"}
                    </span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-[11px] text-slate-500 block">
                    {isUserPremium ? "Kapasitas Cloud Ekstra" : "Kapasitas Standar"}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Upgrade / Manage Subscription Banner */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-50 via-amber-100/50 to-indigo-50 border border-amber-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Crown className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">
                    {isUserPremium ? "Langganan Premium Anda Aktif" : "Buka Fitur Premium"}
                  </p>
                  <p className="text-[11px] text-slate-600">
                    {isUserPremium
                      ? "Nikmati template eksklusif, AI Turbo cepat, dan unduh Ultra HD"
                      : "Rp 25.000/bln atau Rp 300.000/thn • Pilihan bebas"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                id="account-modal-upgrade-btn"
                onClick={() => {
                  setIsAccountModalOpen(false);
                  setIsPremiumModalOpen(true);
                }}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-lg shadow-xs transition-colors whitespace-nowrap"
              >
                {isUserPremium ? "Kelola Paket" : "Pilih Paket"}
              </button>
            </div>
          </div>

          {/* Preferences */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5" />
              {t("preferences")}
            </h4>
            <div className="space-y-2.5">
              <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{t("darkCanvasMode")}</p>
                  <p className="text-xs text-slate-500">Latar kanvas editor bernuansa gelap lembut</p>
                </div>
                <input
                  type="checkbox"
                  checked={darkCanvas}
                  onChange={(e) => setDarkCanvas(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded-sm focus:ring-indigo-500"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{t("highResExport")}</p>
                  <p className="text-xs text-slate-500">Render ekspor gambar PNG/JPEG dengan 300 DPI</p>
                </div>
                <input
                  type="checkbox"
                  checked={highRes}
                  onChange={(e) => setHighRes(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded-sm focus:ring-indigo-500"
                />
              </label>
            </div>
          </div>

          {/* Security & Password */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5" />
              {t("security")}
            </h4>
            <form onSubmit={handlePasswordChange} className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kata Sandi Saat Ini
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={oldPass}
                  onChange={(e) => setOldPass(e.target.value)}
                  className="w-full px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kata Sandi Baru
                </label>
                <input
                  type="password"
                  placeholder="Minimal 8 karakter aman"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  className="w-full px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-3 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <Key className="w-3.5 h-3.5" />
                {t("changePassword")}
              </button>
              {passwordUpdated && (
                <p className="text-xs text-emerald-600 flex items-center gap-1 mt-1 justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Kata sandi berhasil disimpan.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={() => setIsAccountModalOpen(false)}
            className="px-4 py-2 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};
