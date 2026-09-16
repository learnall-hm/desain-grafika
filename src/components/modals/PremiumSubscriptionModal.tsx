import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  X,
  Crown,
  Sparkles,
  Zap,
  Download,
  LayoutGrid,
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  QrCode,
  Building2,
  ArrowRight,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

export const PremiumSubscriptionModal: React.FC = () => {
  const {
    currentUser,
    isPremiumModalOpen,
    setIsPremiumModalOpen,
    subscribeToPremium,
    cancelPremiumSubscription,
    isUserPremium,
    showToast,
  } = useApp();

  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("monthly");
  const [paymentMethod, setPaymentMethod] = useState<"qris" | "va_bank" | "card">("qris");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmCancel, setShowConfirmCancel] = useState(false);

  if (!isPremiumModalOpen) return null;

  const handleSubscribe = async () => {
    setIsProcessing(true);
    // Simulate brief payment processing feedback
    setTimeout(() => {
      subscribeToPremium(selectedPlan, paymentMethod);
      setIsProcessing(false);
      setIsPremiumModalOpen(false);
    }, 900);
  };

  const handleCancelSubscription = () => {
    cancelPremiumSubscription();
    setShowConfirmCancel(false);
    setIsPremiumModalOpen(false);
  };

  return (
    <div
      id="premium-subscription-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-in fade-in duration-200"
    >
      <div
        id="premium-subscription-modal-card"
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-amber-200/80 overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
      >
        {/* Top Gradient Banner */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-indigo-600 p-6 text-white relative overflow-hidden shrink-0">
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex items-start justify-between relative z-10">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-amber-200 border border-white/30 shadow-inner">
                <Crown className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                    Creative Studio Premium
                  </h2>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 bg-amber-300 text-amber-950 rounded-full uppercase tracking-wider shadow-xs">
                    VIP Akses
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-amber-100/90 mt-0.5">
                  Template lebih menarik, AI generasi lebih cepat, dan unduhan Ultra HD
                </p>
              </div>
            </div>
            <button
              id="close-premium-modal-btn"
              onClick={() => setIsPremiumModalOpen(false)}
              className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-xl transition-colors"
              aria-label="Tutup Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
          {/* Status info if already premium */}
          {isUserPremium && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-indigo-50 border border-amber-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Crown className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-amber-950">
                    Akun Anda Memiliki Akses Premium Aktif
                  </p>
                  <p className="text-[11px] text-amber-800">
                    Paket: {currentUser.subscriptionPlan === "yearly" ? "Tahunan (Rp 300.000)" : "Bulanan (Rp 25.000)"} • Semua fitur prioritas terbuka
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowConfirmCancel(true)}
                className="text-xs font-semibold px-3 py-1.5 bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 rounded-lg transition-colors whitespace-nowrap"
              >
                Kelola / Batal
              </button>
            </div>
          )}

          {/* Cancellation Confirmation Box */}
          {showConfirmCancel && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-3">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-rose-900">Batalkan Langganan Premium?</h4>
                  <p className="text-xs text-rose-700 mt-0.5">
                    Anda akan kembali ke tier Gratis. Anda tetap dapat menggunakan template standar dan ekspor normal.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 justify-end pt-1">
                <button
                  onClick={() => setShowConfirmCancel(false)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-white rounded-lg transition-colors"
                >
                  Batal, Tetap Premium
                </button>
                <button
                  onClick={handleCancelSubscription}
                  className="px-3 py-1.5 text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white rounded-lg transition-colors shadow-xs"
                >
                  Ya, Berhenti Langganan
                </button>
              </div>
            </div>
          )}

          {/* Key Advantages Grid (3 Main Pillars requested by user) */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Keunggulan Utama Akun Premium
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Feature 1: More Attractive Templates */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-400 hover:bg-amber-50/20 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-2.5">
                    <LayoutGrid className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">Banyak Template Menarik</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    Koleksi template eksklusif desain luxury, bisnis corporate, cyberpunk, dan promosi viral.
                  </p>
                </div>
                <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center gap-1 text-[10px] font-bold text-amber-700">
                  <CheckCircle2 className="w-3 h-3 text-amber-600" />
                  <span>Koleksi VIP Terbuka</span>
                </div>
              </div>

              {/* Feature 2: Faster AI */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-indigo-400 hover:bg-indigo-50/20 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-2.5">
                    <Zap className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">AI 3x Lebih Cepat</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    Prioritas server tanpa antrean untuk generator desain kreatif dan rangkuman materi pelajaran.
                  </p>
                </div>
                <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center gap-1 text-[10px] font-bold text-indigo-700">
                  <CheckCircle2 className="w-3 h-3 text-indigo-600" />
                  <span>Mode Turbo Otomatis</span>
                </div>
              </div>

              {/* Feature 3: Better Quality Downloads */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-emerald-400 hover:bg-emerald-50/20 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2.5">
                    <Download className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">Unduh Kualitas Terbaik</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    Ekspor resolusi Ultra HD (300 DPI), PPTX, PDF vektor tanpa watermark dan tajam untuk cetak.
                  </p>
                </div>
                <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Resolusi 300 DPI Siap Cetak</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Options Section (Rp 25.000/bln & Rp 300.000/thn) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Pilih Paket Sesuai Kebutuhan Anda
              </h3>
              <span className="text-[11px] text-slate-500 font-medium">
                Pilihan bebas: Berlangganan atau Tetap Gratis
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Option A: Monthly (25.000 / bln) */}
              <div
                id="plan-monthly-card"
                onClick={() => setSelectedPlan("monthly")}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all relative flex flex-col justify-between ${
                  selectedPlan === "monthly"
                    ? "border-amber-500 bg-amber-50/30 shadow-md ring-2 ring-amber-500/20"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                      Paket Bulanan
                    </span>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="text-2xl font-black text-slate-900">Rp 25.000</span>
                      <span className="text-xs text-slate-500 font-medium">/ bulan</span>
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                      selectedPlan === "monthly"
                        ? "border-amber-500 bg-amber-500 text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {selectedPlan === "monthly" && <div className="w-2 h-2 rounded-full bg-white"></div>}
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Fleksibel untuk kreator yang ingin berkarya santai. Pembayaran per 30 hari, bebas batal kapan saja.
                </p>
                <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center gap-1.5 text-xs text-amber-800 font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Akses Penuh Selama 1 Bulan</span>
                </div>
              </div>

              {/* Option B: Yearly (300.000 / thn) */}
              <div
                id="plan-yearly-card"
                onClick={() => setSelectedPlan("yearly")}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all relative flex flex-col justify-between ${
                  selectedPlan === "yearly"
                    ? "border-indigo-600 bg-indigo-50/30 shadow-md ring-2 ring-indigo-500/20"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <span className="absolute -top-2.5 right-4 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full bg-indigo-600 text-white shadow-xs">
                  Paling Hemat Setahun
                </span>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                      Paket Tahunan
                    </span>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="text-2xl font-black text-slate-900">Rp 300.000</span>
                      <span className="text-xs text-slate-500 font-medium">/ tahun</span>
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                      selectedPlan === "yearly"
                        ? "border-indigo-600 bg-indigo-600 text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {selectedPlan === "yearly" && <div className="w-2 h-2 rounded-full bg-white"></div>}
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Bebas batas setahun penuh untuk desainer dan pelaku bisnis aktif. Tanpa repot perpanjang setiap bulan.
                </p>
                <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center gap-1.5 text-xs text-indigo-800 font-semibold">
                  <Crown className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Bonus Akses Fitur Eksklusif Prioritas</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              Metode Pembayaran Cepat
            </h3>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setPaymentMethod("qris")}
                className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === "qris"
                    ? "border-amber-500 bg-amber-50 text-amber-900 shadow-xs"
                    : "border-slate-200 hover:bg-slate-50 text-slate-700"
                }`}
              >
                <QrCode className="w-4 h-4 text-slate-700" />
                <span>QRIS Instant</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("va_bank")}
                className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === "va_bank"
                    ? "border-amber-500 bg-amber-50 text-amber-900 shadow-xs"
                    : "border-slate-200 hover:bg-slate-50 text-slate-700"
                }`}
              >
                <Building2 className="w-4 h-4 text-slate-700" />
                <span>Virtual Account</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === "card"
                    ? "border-amber-500 bg-amber-50 text-amber-900 shadow-xs"
                    : "border-slate-200 hover:bg-slate-50 text-slate-700"
                }`}
              >
                <CreditCard className="w-4 h-4 text-slate-700" />
                <span>Kartu / E-Wallet</span>
              </button>
            </div>
          </div>

          {/* Freedom of Choice Guarantee Notice */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p>
              <strong>Kebebasan Pengguna:</strong> Anda bebas memilih untuk berlangganan premium sekarang, nanti, atau tetap menikmati seluruh fitur dasar pada akun gratis tanpa batasan waktu pembuatan kanvas.
            </p>
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <button
            id="stay-free-plan-btn"
            type="button"
            onClick={() => {
              showToast("Anda memilih tetap menggunakan Akun Gratis. Selamat berkarya!");
              setIsPremiumModalOpen(false);
            }}
            className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-xl transition-colors order-2 sm:order-1 text-center"
          >
            Tetap Gunakan Akun Gratis
          </button>

          <div className="w-full sm:w-auto flex items-center gap-2 order-1 sm:order-2">
            <button
              id="activate-premium-btn"
              type="button"
              disabled={isProcessing}
              onClick={handleSubscribe}
              className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-98"
            >
              {isProcessing ? (
                <span>Memproses Aktivasi...</span>
              ) : (
                <>
                  <Crown className="w-4 h-4" />
                  <span>
                    Aktifkan Premium (
                    {selectedPlan === "monthly" ? "Rp 25.000/bln" : "Rp 300.000/thn"}
                    )
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
