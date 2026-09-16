import React, { useState } from "react";
import {
  X,
  Share2,
  Copy,
  Check,
  ExternalLink,
  MessageCircle,
  Mail,
  Instagram,
  MessageSquare,
  Link as LinkIcon,
  QrCode,
  Sparkles,
} from "lucide-react";
import { UserDesign } from "../../types";
import { getShareLinks } from "../../utils/exportUtils";

interface ShareDesignModalProps {
  isOpen: boolean;
  onClose: () => void;
  design: UserDesign | null;
  onToast?: (msg: string) => void;
}

export const ShareDesignModal: React.FC<ShareDesignModalProps> = ({
  isOpen,
  onClose,
  design,
  onToast,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [showQr, setShowQr] = useState(false);

  if (!isOpen || !design) return null;

  const shareData = getShareLinks(design);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareData.publicLink);
    setCopiedLink(true);
    if (onToast) onToast("Tautan publik berhasil disalin ke clipboard!");
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyInstagramCaption = () => {
    navigator.clipboard.writeText(shareData.instagramCaption);
    setCopiedCaption(true);
    if (onToast) onToast("Caption Instagram berhasil disalin!");
    setTimeout(() => setCopiedCaption(false), 2500);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: design.title,
          text: `Lihat desain "${design.title}" di Creative Canvas AI!`,
          url: shareData.publicLink,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div
      id="share-design-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200"
    >
      <div
        id="share-design-modal-card"
        className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-xs">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">Bagikan Desain</h3>
              <p className="text-xs text-slate-500 truncate max-w-64 sm:max-w-xs">
                {design.title}
              </p>
            </div>
          </div>
          <button
            id="close-share-modal-btn"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Social Channels Row */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
              Bagikan Melalui Aplikasi
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* WhatsApp */}
              <a
                id="share-whatsapp-btn"
                href={shareData.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-3 rounded-2xl border border-emerald-200/80 bg-emerald-50/40 hover:bg-emerald-100/60 text-emerald-700 transition-all text-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform mb-1.5">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold">WhatsApp</span>
                <span className="text-[10px] text-emerald-600/80">Kirim Chat</span>
              </a>

              {/* Gmail */}
              <a
                id="share-gmail-btn"
                href={shareData.gmail}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-3 rounded-2xl border border-rose-200/80 bg-rose-50/40 hover:bg-rose-100/60 text-rose-700 transition-all text-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform mb-1.5">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold">Gmail</span>
                <span className="text-[10px] text-rose-600/80">Kirim Email</span>
              </a>

              {/* Instagram */}
              <button
                id="share-instagram-btn"
                onClick={() => {
                  handleCopyInstagramCaption();
                  window.open("https://instagram.com", "_blank");
                }}
                className="flex flex-col items-center justify-center p-3 rounded-2xl border border-pink-200/80 bg-pink-50/40 hover:bg-pink-100/60 text-pink-700 transition-all text-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform mb-1.5">
                  <Instagram className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold">Instagram</span>
                <span className="text-[10px] text-pink-600/80">Story / Post</span>
              </button>

              {/* Message / SMS */}
              <a
                id="share-message-btn"
                href={shareData.sms}
                className="flex flex-col items-center justify-center p-3 rounded-2xl border border-indigo-200/80 bg-indigo-50/40 hover:bg-indigo-100/60 text-indigo-700 transition-all text-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform mb-1.5">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold">Message</span>
                <span className="text-[10px] text-indigo-600/80">SMS / Chat</span>
              </a>
            </div>
          </div>

          {/* Share as Link */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5 text-slate-400" />
                Bentuk Link Publik
              </label>
              <button
                type="button"
                onClick={() => setShowQr(!showQr)}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>{showQr ? "Tutup QR" : "Tampilkan QR"}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  readOnly
                  value={shareData.publicLink}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 font-mono focus:outline-hidden"
                />
              </div>
              <button
                id="btn-copy-public-link"
                type="button"
                onClick={handleCopyLink}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                  copiedLink
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-slate-900 hover:bg-slate-800 text-white shadow-xs"
                }`}
              >
                {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedLink ? "Tersalin!" : "Salin Link"}</span>
              </button>
            </div>

            {/* QR Code view */}
            {showQr && (
              <div className="mt-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col items-center text-center animate-in fade-in duration-150">
                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs mb-2">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                      shareData.publicLink
                    )}`}
                    alt="QR Code Desain"
                    className="w-32 h-32"
                  />
                </div>
                <p className="text-xs font-semibold text-slate-700">Pindai dengan Kamera HP</p>
                <p className="text-[11px] text-slate-400">
                  Untuk langsung membuka dan melihat desain di perangkat ponsel
                </p>
              </div>
            )}
          </div>

          {/* Instagram Caption helper banner */}
          <div className="p-3.5 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl border border-pink-200/60 flex items-start justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold text-pink-700 uppercase tracking-wide flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-pink-500" />
                Format Caption Instagram Siap Pakai
              </span>
              <p className="text-xs text-slate-600 mt-1 font-sans italic">
                "{shareData.instagramCaption}"
              </p>
            </div>
            <button
              onClick={handleCopyInstagramCaption}
              className="px-3 py-1.5 bg-white hover:bg-pink-100 text-pink-700 text-xs font-semibold rounded-lg border border-pink-200 shrink-0 transition-colors"
            >
              {copiedCaption ? "Tersalin!" : "Salin Caption"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={handleNativeShare}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Buka Menu Berbagi Sistem
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};
