import React from "react";
import { useApp } from "../context/AppContext";
import {
  FolderHeart,
  PlusCircle,
  Edit3,
  Trash2,
  Calendar,
  Layers,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  Clock,
  X,
  Download,
  Share2,
} from "lucide-react";
import { UserDesign } from "../types";

export const MyDesignsView: React.FC = () => {
  const {
    userDesigns,
    setCurrentEditingDesign,
    setActiveView,
    deleteUserDesign,
    startDesignFromScratch,
    autoSaveDraft,
    restoreAutoSaveDraft,
    clearAutoSaveDraft,
    openExportModal,
    openShareModal,
    t,
  } = useApp();

  const handleEdit = (design: UserDesign) => {
    setCurrentEditingDesign(design);
    setActiveView("editor");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6" id="my-designs-view">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <FolderHeart className="w-6 h-6 text-rose-500" />
            {t("myDesignsTitle")}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t("myDesignsDesc")}
          </p>
        </div>

        <button
          id="create-new-design-btn"
          onClick={() => startDesignFromScratch(800, 800, "Desain Baru")}
          className="px-4 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md transition-all flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          {t("createNewDesign")}
        </button>
      </div>

      {/* Auto-Save Draft Banner if available */}
      {autoSaveDraft && autoSaveDraft.design && (
        <div
          id="my-designs-autosave-card"
          className="bg-gradient-to-r from-indigo-500/10 via-emerald-500/10 to-transparent border border-emerald-500/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-700 font-bold text-[10px] tracking-wide uppercase">
                  {t("autoSaveActive")}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {t("autoSavedAt")} {autoSaveDraft.savedAt}
                </span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm mt-0.5">
                {autoSaveDraft.design.title || "Draf Desain"}
              </h4>
              <p className="text-xs text-slate-500">
                {t("autoSaveIntervalNotice")} ({autoSaveDraft.design.elements?.length || 0} elemen)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              id="resume-draft-btn"
              onClick={() => restoreAutoSaveDraft()}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t("restoreDraft")}</span>
            </button>
            <button
              id="discard-draft-btn"
              onClick={clearAutoSaveDraft}
              className="px-3 py-2 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 text-xs font-medium rounded-xl transition-colors"
              title="Hapus draf auto-save"
            >
              {t("dismissDraft")}
            </button>
          </div>
        </div>
      )}

      {/* Grid */}
      {userDesigns.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
            <FolderHeart className="w-8 h-8 text-indigo-400" />
          </div>
          <h3 className="text-base font-bold text-slate-800 mb-1">
            {t("noDesignsYet")}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
            Mulai eksplorasi template pilihan atau buat desain baru dengan bantuan asisten AI Gemini.
          </p>
          <button
            onClick={() => setActiveView("templates")}
            className="px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition-colors inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            {t("createFirstDesign")}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userDesigns.map((design) => (
            <div
              key={design.id}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Visual Preview Container */}
                <div
                  className="relative aspect-4/3 overflow-hidden flex items-center justify-center cursor-pointer border-b border-slate-100"
                  style={{ backgroundColor: design.background.color || "#0f172a" }}
                  onClick={() => handleEdit(design)}
                >
                  {/* Render simplified thumbnail elements */}
                  <div className="w-full h-full p-4 flex flex-col justify-center items-center text-center scale-90">
                    {design.elements.slice(0, 3).map((el, i) => (
                      <div
                        key={el.id || i}
                        className="my-1 line-clamp-2 max-w-full font-bold"
                        style={{
                          color: el.fill || "#ffffff",
                          fontSize: Math.min(18, Math.max(11, (el.fontSize || 20) * 0.3)),
                        }}
                      >
                        {el.text || (el.type === "badge" ? el.text : "")}
                      </div>
                    ))}
                    <div className="text-[10px] text-white/50 mt-2 px-2 py-0.5 rounded bg-black/30">
                      {design.elements.length} elemen grafis
                    </div>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-black/60 text-white backdrop-blur-md rounded-md">
                      {design.width}×{design.height}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-bold text-slate-800 text-sm mb-1 truncate group-hover:text-indigo-600 transition-colors">
                    {design.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {t("lastEdited")} {design.updatedAt}
                  </p>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-1.5">
                <button
                  id={`edit-design-btn-${design.id}`}
                  onClick={() => handleEdit(design)}
                  className="px-2.5 py-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-colors flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{t("editDesign")}</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    id={`download-design-btn-${design.id}`}
                    onClick={() => openExportModal(design)}
                    className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    title="Unduh (PPT, PDF, DOC, Gambar)"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    id={`share-design-btn-${design.id}`}
                    onClick={() => openShareModal(design)}
                    className="p-1.5 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                    title="Bagikan (WhatsApp, Gmail, Instagram, Link)"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    id={`delete-design-btn-${design.id}`}
                    onClick={() => deleteUserDesign(design.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title={t("deleteDesign")}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
