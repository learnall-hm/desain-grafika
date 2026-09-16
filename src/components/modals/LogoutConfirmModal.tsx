import React from "react";
import { useApp } from "../../context/AppContext";
import { LogOut, AlertCircle } from "lucide-react";

export const LogoutConfirmModal: React.FC = () => {
  const { isLogoutConfirmOpen, setIsLogoutConfirmOpen, logout, t } = useApp();

  if (!isLogoutConfirmOpen) return null;

  return (
    <div
      id="logout-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200"
    >
      <div
        id="logout-modal-card"
        className="bg-white rounded-2xl max-w-sm w-full shadow-2xl border border-slate-100 p-5 animate-in zoom-in-95 duration-200 text-center"
      >
        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3.5">
          <LogOut className="w-6 h-6" />
        </div>
        <h3 className="font-bold text-slate-900 text-base mb-1">
          {t("logoutConfirmTitle")}
        </h3>
        <p className="text-xs text-slate-500 mb-5 leading-relaxed">
          {t("logoutConfirmMsg")}
        </p>

        <div className="flex gap-2.5">
          <button
            id="cancel-logout-btn"
            onClick={() => setIsLogoutConfirmOpen(false)}
            className="flex-1 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            {t("cancel")}
          </button>
          <button
            id="confirm-logout-btn"
            onClick={logout}
            className="flex-1 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-xs transition-colors"
          >
            {t("confirm")}
          </button>
        </div>
      </div>
    </div>
  );
};
