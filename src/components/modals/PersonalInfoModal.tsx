import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { X, User, Mail, Phone, FileText, CheckCircle2, Shield } from "lucide-react";

export const PersonalInfoModal: React.FC = () => {
  const { currentUser, updateUserProfile, isPersonalInfoOpen, setIsPersonalInfoOpen, t } = useApp();

  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone);
  const [bio, setBio] = useState(currentUser.bio);

  if (!isPersonalInfoOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      phone,
      bio,
    });
    setIsPersonalInfoOpen(false);
  };

  return (
    <div
      id="personal-info-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200"
    >
      <div
        id="personal-info-modal-card"
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base">{t("personalInfoTitle")}</h3>
              <p className="text-xs text-slate-500">{t("personalInfoDesc")}</p>
            </div>
          </div>
          <button
            id="close-personal-info-btn"
            onClick={() => setIsPersonalInfoOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Avatar & Role Header */}
          <div className="flex items-center gap-4 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-xs"
            />
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-slate-900 text-sm">{currentUser.name}</h4>
                {currentUser.role === "admin_utama" ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                    <Shield className="w-3 h-3" />
                    {t("adminBadge")}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                    {t("userBadge")}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                <Mail className="w-3 h-3 text-slate-400" />
                {currentUser.email}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                {t("memberSince")} {currentUser.joinedDate}
              </p>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {t("fullName")}
            </label>
            <input
              id="input-personal-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Email (Readonly) */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {t("emailLabel")}
            </label>
            <input
              type="email"
              value={currentUser.email}
              disabled
              className="w-full px-3.5 py-2 text-sm border border-slate-200 bg-slate-100 text-slate-500 rounded-lg cursor-not-allowed"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Email terdaftar dikaitkan dengan hak akses akun.
            </p>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {t("phoneNumber")}
            </label>
            <div className="relative">
              <input
                id="input-personal-phone"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {t("bioLabel")}
            </label>
            <div className="relative">
              <textarea
                id="input-personal-bio"
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setIsPersonalInfoOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {t("cancel")}
            </button>
            <button
              id="save-personal-info-btn"
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              {t("saveChanges")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
