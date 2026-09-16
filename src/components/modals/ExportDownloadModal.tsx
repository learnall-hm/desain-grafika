import React, { useState } from "react";
import {
  X,
  Download,
  FileText,
  Image as ImageIcon,
  Presentation,
  Check,
  Loader2,
  Sparkles,
  Crown,
  Zap,
} from "lucide-react";
import { UserDesign } from "../../types";
import {
  exportAsPicture,
  exportAsPdf,
  exportAsPpt,
  exportAsDocument,
} from "../../utils/exportUtils";
import { useApp } from "../../context/AppContext";

interface ExportDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  design: UserDesign | null;
  onToast?: (msg: string) => void;
}

export const ExportDownloadModal: React.FC<ExportDownloadModalProps> = ({
  isOpen,
  onClose,
  design,
  onToast,
}) => {
  const { isUserPremium, setIsPremiumModalOpen } = useApp();
  const [downloadingFormat, setDownloadingFormat] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [pictureFormat, setPictureFormat] = useState<"png" | "jpeg" | "svg">("png");
  const [qualityScale, setQualityScale] = useState<number>(isUserPremium ? 3 : 1);

  if (!isOpen || !design) return null;

  const handleSelectQuality = (scale: number) => {
    if (scale > 1 && !isUserPremium) {
      if (onToast) {
        onToast("👑 Resolusi HD & Ultra HD 300 DPI adalah fitur eksklusif Premium!");
      }
      setIsPremiumModalOpen(true);
      return;
    }
    setQualityScale(scale);
  };

  const handleDownload = async (formatType: "picture" | "pdf" | "ppt" | "doc") => {
    try {
      setDownloadingFormat(formatType);
      setDownloadSuccess(null);

      const effectiveScale = isUserPremium ? (qualityScale || 3) : 1;

      if (formatType === "picture") {
        await exportAsPicture(design, pictureFormat, effectiveScale);
      } else if (formatType === "pdf") {
        await exportAsPdf(design, effectiveScale);
      } else if (formatType === "ppt") {
        await exportAsPpt(design, effectiveScale);
      } else if (formatType === "doc") {
        await exportAsDocument(design, effectiveScale);
      }

      setDownloadSuccess(formatType);
      const qualityLabel = effectiveScale >= 3 ? "Ultra HD 300 DPI" : effectiveScale >= 2 ? "HD 150 DPI" : "Standar";
      if (onToast) onToast(`Berhasil mengunduh format ${formatType.toUpperCase()} (Kualitas: ${qualityLabel})!`);
      setTimeout(() => setDownloadSuccess(null), 3000);
    } catch (err) {
      console.error("Download error:", err);
      if (onToast) onToast("Gagal mengunduh desain. Silakan coba lagi.");
    } finally {
      setDownloadingFormat(null);
    }
  };

  return (
    <div
      id="export-download-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200"
    >
      <div
        id="export-download-modal-card"
        className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-xs">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">Unduh Desain</h3>
              <p className="text-xs text-slate-500 truncate max-w-64 sm:max-w-xs">
                {design.title} • {design.width}x{design.height}px
              </p>
            </div>
          </div>
          <button
            id="close-export-modal-btn"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formats Grid & Quality Selection */}
        <div className="p-6 space-y-5">
          {/* Quality Selector (Requirement: Mengunduh template dengan kualitas lebih baik) */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Kualitas Render & Resolusi Unduhan
              </span>
              {isUserPremium ? (
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white flex items-center gap-1 shadow-2xs">
                  <Crown className="w-2.5 h-2.5" />
                  VIP 300 DPI AKTIF
                </span>
              ) : (
                <button
                  onClick={() => setIsPremiumModalOpen(true)}
                  className="text-[10px] font-bold text-amber-600 hover:text-amber-700 flex items-center gap-0.5"
                >
                  <Crown className="w-2.5 h-2.5" />
                  Buka Ultra HD
                </button>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleSelectQuality(1)}
                className={`py-2 px-2.5 rounded-xl border text-left transition-all ${
                  qualityScale === 1
                    ? "bg-white border-slate-800 shadow-xs ring-1 ring-slate-800"
                    : "bg-white/60 border-slate-200 hover:bg-white text-slate-600"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Standar</span>
                  <span className="text-[9px] text-slate-400">1x</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5">72 DPI (Web)</p>
              </button>

              <button
                type="button"
                onClick={() => handleSelectQuality(2)}
                className={`py-2 px-2.5 rounded-xl border text-left transition-all relative ${
                  qualityScale === 2
                    ? "bg-white border-indigo-600 shadow-xs ring-1 ring-indigo-600"
                    : "bg-white/60 border-slate-200 hover:bg-white text-slate-600"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">HD Tajam</span>
                  <span className="text-[9px] font-bold text-indigo-600">2x</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-0.5">
                  150 DPI {!isUserPremium && <Crown className="w-2.5 h-2.5 text-amber-500 inline" />}
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleSelectQuality(3)}
                className={`py-2 px-2.5 rounded-xl border text-left transition-all relative ${
                  qualityScale === 3
                    ? "bg-white border-amber-500 shadow-xs ring-1 ring-amber-500"
                    : "bg-white/60 border-slate-200 hover:bg-white text-slate-600"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Ultra HD</span>
                  <span className="text-[9px] font-black text-amber-600">3x</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-0.5">
                  300 DPI {!isUserPremium && <Crown className="w-2.5 h-2.5 text-amber-500 inline" />}
                </p>
              </button>
            </div>
          </div>

          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Pilih Format Ekspor yang Diinginkan
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* 1. PPT (PowerPoint) */}
            <div
              id="export-option-ppt"
              className="group border border-slate-200 hover:border-orange-500/50 hover:bg-orange-50/20 p-4 rounded-2xl transition-all flex flex-col justify-between"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <Presentation className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Presentasi PPT</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Berkas Microsoft PowerPoint (.pptx) siap presentasi slide
                  </p>
                </div>
              </div>
              <button
                id="btn-download-ppt"
                onClick={() => handleDownload("ppt")}
                disabled={downloadingFormat !== null}
                className="mt-3 w-full py-2 px-3 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs disabled:opacity-50"
              >
                {downloadingFormat === "ppt" ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : downloadSuccess === "ppt" ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <Download className="w-3.5 h-3.5" />
                )}
                <span>Unduh .PPTX</span>
              </button>
            </div>

            {/* 2. PDF Document */}
            <div
              id="export-option-pdf"
              className="group border border-slate-200 hover:border-rose-500/50 hover:bg-rose-50/20 p-4 rounded-2xl transition-all flex flex-col justify-between"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Dokumen PDF</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Berkas PDF vektor jernih resolusi tinggi siap cetak & arsip
                  </p>
                </div>
              </div>
              <button
                id="btn-download-pdf"
                onClick={() => handleDownload("pdf")}
                disabled={downloadingFormat !== null}
                className="mt-3 w-full py-2 px-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs disabled:opacity-50"
              >
                {downloadingFormat === "pdf" ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : downloadSuccess === "pdf" ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <Download className="w-3.5 h-3.5" />
                )}
                <span>Unduh .PDF</span>
              </button>
            </div>

            {/* 3. Picture (Image PNG / JPG / SVG) */}
            <div
              id="export-option-picture"
              className="group border border-slate-200 hover:border-indigo-500/50 hover:bg-indigo-50/20 p-4 rounded-2xl transition-all flex flex-col justify-between"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Gambar (Picture)</h4>
                  <div className="flex items-center gap-1.5 mt-1">
                    {(["png", "jpeg", "svg"] as const).map((fmt) => (
                      <button
                        key={fmt}
                        onClick={() => setPictureFormat(fmt)}
                        className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-md transition-colors ${
                          pictureFormat === fmt
                            ? "bg-indigo-600 text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {fmt === "jpeg" ? "jpg" : fmt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <button
                id="btn-download-picture"
                onClick={() => handleDownload("picture")}
                disabled={downloadingFormat !== null}
                className="mt-3 w-full py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs disabled:opacity-50"
              >
                {downloadingFormat === "picture" ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : downloadSuccess === "picture" ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <Download className="w-3.5 h-3.5" />
                )}
                <span>Unduh {pictureFormat.toUpperCase()}</span>
              </button>
            </div>

            {/* 4. Document (.DOC / Word) */}
            <div
              id="export-option-doc"
              className="group border border-slate-200 hover:border-blue-500/50 hover:bg-blue-50/20 p-4 rounded-2xl transition-all flex flex-col justify-between"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Dokumen Word</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Berkas Microsoft Word (.doc) lengkap visual & transkrip teks
                  </p>
                </div>
              </div>
              <button
                id="btn-download-doc"
                onClick={() => handleDownload("doc")}
                disabled={downloadingFormat !== null}
                className="mt-3 w-full py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs disabled:opacity-50"
              >
                {downloadingFormat === "doc" ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : downloadSuccess === "doc" ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <Download className="w-3.5 h-3.5" />
                )}
                <span>Unduh .DOC</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Kualitas Asli Tanpa Watermark
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
