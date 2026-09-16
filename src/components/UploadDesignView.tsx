import React, { useState, useRef } from "react";
import { useApp } from "../context/AppContext";
import { UploadCloud, Image, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export const UploadDesignView: React.FC = () => {
  const { startDesignFromUploadedImage, startDesignFromScratch, t, showToast } = useApp();

  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number }>({
    width: 800,
    height: 800,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File) => {
    if (!file.type.startsWith("image/")) {
      showToast("Harap pilih file gambar (PNG, JPG, SVG, WEBP).");
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      setPreviewUrl(url);

      // Measure original image dimensions
      const img = new window.Image();
      img.onload = () => {
        const aspect = img.width / img.height;
        let w = img.width;
        let h = img.height;
        // scale to manageable canvas size
        if (w > 1200 || h > 1200) {
          if (w > h) {
            w = 1200;
            h = Math.round(1200 / aspect);
          } else {
            h = 1200;
            w = Math.round(1200 * aspect);
          }
        }
        setImageDimensions({ width: w, height: h });
      };
      img.src = url;
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleContinueToEditor = () => {
    if (previewUrl) {
      startDesignFromUploadedImage(previewUrl, imageDimensions.width, imageDimensions.height);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="upload-design-view">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          {t("uploadDesignTitle")}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          {t("uploadDesignDesc")}
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
        {!previewUrl ? (
          <div
            id="dropzone-area"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-10 sm:p-14 text-center cursor-pointer transition-all ${
              dragActive
                ? "border-indigo-600 bg-indigo-50/50 scale-[1.01]"
                : "border-slate-300 hover:border-indigo-400 hover:bg-slate-50"
            }`}
          >
            <input
              ref={fileInputRef}
              id="file-upload-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileChange(e.target.files[0]);
                }
              }}
            />
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
              <UploadCloud className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-1">
              {t("dragDropOrBrowse")}
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mb-5">
              {t("supportsFormats")}
            </p>
            <button
              type="button"
              className="px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition-colors inline-flex items-center gap-2"
            >
              <Image className="w-4 h-4" />
              {t("uploadFileBtn")}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 aspect-16/10 flex items-center justify-center">
              <img
                src={previewUrl}
                alt="Pratinjau Unggahan"
                className="max-h-full max-w-full object-contain"
              />
              <button
                onClick={() => {
                  setSelectedFile(null);
                  setPreviewUrl(null);
                }}
                className="absolute top-4 right-4 px-3 py-1.5 bg-black/70 hover:bg-black text-white text-xs font-semibold rounded-lg backdrop-blur-sm transition-colors"
              >
                Ganti Gambar
              </button>
            </div>

            <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-indigo-950">
                  {selectedFile?.name || "Gambar Terpilih"}
                </p>
                <p className="text-[11px] text-indigo-700">
                  Dimensi Kanvas: {imageDimensions.width} × {imageDimensions.height} px • Siap ditambahkan teks, bentuk, stiker, dan sentuhan AI.
                </p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setSelectedFile(null);
                  setPreviewUrl(null);
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                {t("cancel")}
              </button>
              <button
                id="start-editing-uploaded-btn"
                onClick={handleContinueToEditor}
                className="px-6 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <span>{t("startDesigning")}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Quick Blank Canvas Presets */}
        <div className="mt-10 pt-8 border-t border-slate-100">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Atau Mulai dari Kanvas Kosong:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={() => startDesignFromScratch(800, 800, "Instagram Feed Post")}
              className="p-3 text-left border border-slate-200 hover:border-indigo-400 rounded-xl hover:bg-indigo-50/40 transition-colors"
            >
              <p className="text-xs font-bold text-slate-800">Postingan Sosial</p>
              <p className="text-[11px] text-slate-400">800 × 800 px (1:1)</p>
            </button>
            <button
              onClick={() => startDesignFromScratch(800, 1400, "Instagram Story")}
              className="p-3 text-left border border-slate-200 hover:border-indigo-400 rounded-xl hover:bg-indigo-50/40 transition-colors"
            >
              <p className="text-xs font-bold text-slate-800">Story & Reels</p>
              <p className="text-[11px] text-slate-400">800 × 1400 px (9:16)</p>
            </button>
            <button
              onClick={() => startDesignFromScratch(1000, 500, "Digital Web Banner")}
              className="p-3 text-left border border-slate-200 hover:border-indigo-400 rounded-xl hover:bg-indigo-50/40 transition-colors"
            >
              <p className="text-xs font-bold text-slate-800">Banner Digital</p>
              <p className="text-[11px] text-slate-400">1000 × 500 px (2:1)</p>
            </button>
            <button
              onClick={() => startDesignFromScratch(800, 1000, "Poster Acara Promosi")}
              className="p-3 text-left border border-slate-200 hover:border-indigo-400 rounded-xl hover:bg-indigo-50/40 transition-colors"
            >
              <p className="text-xs font-bold text-slate-800">Poster Acara</p>
              <p className="text-[11px] text-slate-400">800 × 1000 px (4:5)</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
