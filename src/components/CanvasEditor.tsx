import React, { useState, useRef, useEffect } from "react";
import { useApp } from "../context/AppContext";
import {
  Type,
  Square,
  Circle,
  Triangle,
  Star,
  Image as ImageIcon,
  Sparkles,
  Download,
  Save,
  Trash2,
  Copy,
  ArrowUp,
  ArrowDown,
  Layers,
  Palette,
  Undo2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Sliders,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Plus,
  Wand2,
  Lightbulb,
  CheckCircle2,
  Loader2,
  Heart,
  ShoppingBag,
  Coffee,
  Music,
  Rocket,
  Award,
  Cloud,
  CloudCheck,
  ShieldCheck,
  Clock,
  RotateCcw,
  Check,
  X,
  AlertCircle,
  Share2,
  FileText,
  Presentation,
} from "lucide-react";
import { CanvasElement, ShapeType, ElementType, UserDesign } from "../types";
import { AiCreativeStudioModal } from "./AiCreativeStudioModal";
import { exportAsPpt, exportAsPdf, exportAsDocument, exportAsPicture } from "../utils/exportUtils";

export const CanvasEditor: React.FC = () => {
  const {
    currentEditingDesign,
    setCurrentEditingDesign,
    saveUserDesign,
    setActiveView,
    addNotification,
    showToast,
    currentLang,
    t,
    autoSaveDraft,
    lastAutoSavedTime,
    isAutoSaving,
    autoSaveDesign,
    openExportModal,
    openShareModal,
  } = useApp();

  // Modal AI Creative Studio
  const [isAiStudioModalOpen, setIsAiStudioModalOpen] = useState(false);

  // Helper to snapshot active design
  const getCurrentDesignSnapshot = (): UserDesign => ({
    id: currentEditingDesign?.id || `ud-${Date.now()}`,
    title: designTitle,
    category: currentEditingDesign?.category || "social_post",
    width: canvasWidth,
    height: canvasHeight,
    background: { type: "solid", color: bgColor },
    elements: elements,
    createdAt: currentEditingDesign?.createdAt || new Date().toISOString().split("T")[0],
    updatedAt: new Date().toLocaleDateString("id-ID", { hour: "2-digit", minute: "2-digit" }),
  });

  const handleLoadAiGeneratedDesign = (design: UserDesign) => {
    saveUserDesign(design);
    setCurrentEditingDesign(design);
    setDesignTitle(design.title);
    setCanvasWidth(design.width);
    setCanvasHeight(design.height);
    setBgColor(design.background?.color || "#0f172a");
    setElements(design.elements);
    setSelectedId(null);
    showToast(`Desain AI "${design.title}" berhasil dimuat ke kanvas!`);
  };

  // Design state
  const [designTitle, setDesignTitle] = useState(
    currentEditingDesign?.title || "Desain Kreatif Baru"
  );
  const [canvasWidth, setCanvasWidth] = useState(currentEditingDesign?.width || 800);
  const [canvasHeight, setCanvasHeight] = useState(currentEditingDesign?.height || 800);
  const [bgColor, setBgColor] = useState(
    currentEditingDesign?.background?.color || "#0f172a"
  );
  const [elements, setElements] = useState<CanvasElement[]>(
    currentEditingDesign?.elements || [
      {
        id: "default-title",
        type: "text",
        text: "Judul Desain Kreatif",
        x: 60,
        y: 120,
        fontSize: 48,
        fontWeight: "800",
        fontFamily: "Outfit",
        fill: "#ffffff",
        align: "left",
        width: 680,
        zIndex: 1,
      },
    ]
  );

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"elements" | "text" | "ai" | "bg">("elements");
  const [zoomLevel, setZoomLevel] = useState(1);

  // AI Assistant states
  const [aiPrompt, setAiPrompt] = useState("");
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiTips, setAiTips] = useState<string | null>(null);

  // AI Copywriting generator
  const [copyTopic, setCopyTopic] = useState("");
  const [copyResults, setCopyResults] = useState<{
    headlines: string[];
    taglines: string[];
    callToActions: string[];
  } | null>(null);
  const [isGeneratingCopy, setIsGeneratingCopy] = useState(false);

  // Dragging state on canvas
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const selectedElement = elements.find((el) => el.id === selectedId) || null;

  // Sync when currentEditingDesign changes
  useEffect(() => {
    if (currentEditingDesign) {
      setDesignTitle(currentEditingDesign.title);
      setCanvasWidth(currentEditingDesign.width);
      setCanvasHeight(currentEditingDesign.height);
      setBgColor(currentEditingDesign.background.color || "#0f172a");
      setElements(currentEditingDesign.elements || []);
      setSelectedId(null);
    }
  }, [currentEditingDesign]);

  // Auto-Save States & 30-Second Interval Mechanism
  const [autoSaveCountdown, setAutoSaveCountdown] = useState(30);
  const [isAutoSaveActive, setIsAutoSaveActive] = useState(true);
  const [lastSavedTimestamp, setLastSavedTimestamp] = useState<string | null>(lastAutoSavedTime || null);
  const [showRecoveryBanner, setShowRecoveryBanner] = useState(false);
  const [activeDraftToRecover, setActiveDraftToRecover] = useState<any>(null);
  const [unsavedChangesCount, setUnsavedChangesCount] = useState(0);

  // Keep fresh ref to current design for timers and synchronous beforeunload event
  const designSnapshotRef = useRef<UserDesign>({
    id: currentEditingDesign?.id || `user-design-${Date.now()}`,
    title: designTitle,
    category: currentEditingDesign?.category || "social_post",
    width: canvasWidth,
    height: canvasHeight,
    background: { type: "solid", color: bgColor },
    elements,
    createdAt: currentEditingDesign?.createdAt || new Date().toISOString().split("T")[0],
    updatedAt: new Date().toLocaleString(),
  });

  useEffect(() => {
    designSnapshotRef.current = {
      id: currentEditingDesign?.id || designSnapshotRef.current.id,
      title: designTitle,
      category: currentEditingDesign?.category || "social_post",
      width: canvasWidth,
      height: canvasHeight,
      background: { type: "solid", color: bgColor },
      elements,
      createdAt: currentEditingDesign?.createdAt || designSnapshotRef.current.createdAt,
      updatedAt: new Date().toLocaleString(),
    };
    setUnsavedChangesCount((prev) => prev + 1);
  }, [designTitle, canvasWidth, canvasHeight, bgColor, elements, currentEditingDesign]);

  // Check if an existing auto-save draft can be recovered on editor mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("grafika_autosave_draft");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          parsed &&
          parsed.design &&
          Array.isArray(parsed.design.elements) &&
          parsed.design.elements.length > 0
        ) {
          const draftDesign = parsed.design as UserDesign;
          const currentId = currentEditingDesign?.id;
          const draftId = draftDesign.id;
          if (
            (currentId && currentId === draftId) ||
            (!currentId && draftDesign.elements.length > 0) ||
            draftDesign.title !== designTitle ||
            draftDesign.elements.length !== elements.length
          ) {
            setActiveDraftToRecover(parsed);
            setShowRecoveryBanner(true);
          }
        }
      }
    } catch (e) {
      console.error("AutoSave recovery check error:", e);
    }
  }, []);

  // 30-Second Auto-Save Interval (to localStorage AND backend /api/designs/autosave)
  useEffect(() => {
    if (!isAutoSaveActive) return;

    const timer = setInterval(() => {
      setAutoSaveCountdown((prev) => {
        if (prev <= 1) {
          // Perform automatic save every 30s
          const currentSnapshot = designSnapshotRef.current;
          autoSaveDesign(currentSnapshot, true).then((res) => {
            setLastSavedTimestamp(res.savedAt);
            setUnsavedChangesCount(0);
          });
          return 30; // reset to 30 seconds
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isAutoSaveActive, autoSaveDesign]);

  // Tab Close / Accident Reload Protection (beforeunload)
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const currentSnapshot = designSnapshotRef.current;
      if (currentSnapshot && currentSnapshot.elements && currentSnapshot.elements.length > 0) {
        // Immediate synchronous backup to localStorage before tab closes
        const emergencyDraft = {
          design: currentSnapshot,
          savedAt: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          timestamp: Date.now(),
        };
        try {
          localStorage.setItem("grafika_autosave_draft", JSON.stringify(emergencyDraft));
        } catch (err) {
          console.error("Emergency draft save error:", err);
        }

        // Alert user if there were active modifications
        if (unsavedChangesCount > 1) {
          e.preventDefault();
          e.returnValue = "";
          return "";
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [unsavedChangesCount]);

  // Restore draft handler
  const handleRestoreDraft = () => {
    const draft = activeDraftToRecover?.design || autoSaveDraft?.design;
    if (!draft) return;
    setDesignTitle(draft.title);
    setCanvasWidth(draft.width);
    setCanvasHeight(draft.height);
    setBgColor(draft.background?.color || "#0f172a");
    setElements(draft.elements || []);
    setShowRecoveryBanner(false);
    showToast(t("draftRestored"));
  };

  // Immediate manual auto-save trigger
  const triggerManualAutoSave = async () => {
    const currentSnapshot = designSnapshotRef.current;
    const res = await autoSaveDesign(currentSnapshot, false);
    setLastSavedTimestamp(res.savedAt);
    setAutoSaveCountdown(30);
    setUnsavedChangesCount(0);
  };

  // Add new element helpers
  const addTextElement = (preset: "heading" | "subheading" | "body") => {
    const newEl: CanvasElement = {
      id: `text-${Date.now()}`,
      type: "text",
      text:
        preset === "heading"
          ? "JUDUL UTAMA"
          : preset === "subheading"
          ? "Sub-judul Menarik & Jelas"
          : "Tambahkan teks deskripsi atau informasi detail di sini.",
      x: 80,
      y: preset === "heading" ? 120 : preset === "subheading" ? 220 : 300,
      fontSize: preset === "heading" ? 52 : preset === "subheading" ? 28 : 18,
      fontWeight: preset === "heading" ? "800" : preset === "subheading" ? "600" : "400",
      fontFamily: preset === "heading" ? "Outfit" : "Plus Jakarta Sans",
      fill: "#ffffff",
      align: "left",
      width: Math.min(600, canvasWidth - 160),
      zIndex: elements.length + 1,
    };
    setElements([...elements, newEl]);
    setSelectedId(newEl.id);
  };

  const addShapeElement = (shapeType: ShapeType) => {
    const size = Math.min(canvasWidth, canvasHeight) * 0.25;
    const newEl: CanvasElement = {
      id: `shape-${Date.now()}`,
      type: "shape",
      shapeType,
      x: canvasWidth / 2 - size / 2,
      y: canvasHeight / 2 - size / 2,
      width: size,
      height: shapeType === "pill" ? size * 0.4 : size,
      fill: "#6366f1",
      opacity: 1,
      borderRadius: shapeType === "circle" || shapeType === "pill" ? 999 : 12,
      zIndex: elements.length + 1,
    };
    setElements([...elements, newEl]);
    setSelectedId(newEl.id);
  };

  const addIconElement = (iconName: string) => {
    const size = 64;
    const newEl: CanvasElement = {
      id: `icon-${Date.now()}`,
      type: "icon",
      iconName,
      x: canvasWidth / 2 - size / 2,
      y: canvasHeight / 2 - size / 2,
      width: size,
      height: size,
      fill: "#f59e0b",
      zIndex: elements.length + 1,
    };
    setElements([...elements, newEl]);
    setSelectedId(newEl.id);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const url = event.target?.result as string;
      const newEl: CanvasElement = {
        id: `img-${Date.now()}`,
        type: "image",
        imageUrl: url,
        x: canvasWidth * 0.1,
        y: canvasHeight * 0.1,
        width: canvasWidth * 0.8,
        height: canvasHeight * 0.5,
        zIndex: elements.length + 1,
      };
      setElements([...elements, newEl]);
      setSelectedId(newEl.id);
      showToast("Gambar ditambahkan ke kanvas!");
    };
    reader.readAsDataURL(file);
  };

  // Update selected element property
  const updateSelected = (props: Partial<CanvasElement>) => {
    if (!selectedId) return;
    setElements((prev) =>
      prev.map((el) => (el.id === selectedId ? { ...el, ...props } : el))
    );
  };

  const deleteSelected = () => {
    if (!selectedId) return;
    setElements((prev) => prev.filter((el) => el.id !== selectedId));
    setSelectedId(null);
  };

  const duplicateSelected = () => {
    if (!selectedElement) return;
    const dup: CanvasElement = {
      ...selectedElement,
      id: `elem-dup-${Date.now()}`,
      x: selectedElement.x + 30,
      y: selectedElement.y + 30,
      zIndex: elements.length + 1,
    };
    setElements([...elements, dup]);
    setSelectedId(dup.id);
  };

  const bringForward = () => {
    if (!selectedElement) return;
    setElements((prev) => {
      const idx = prev.findIndex((el) => el.id === selectedId);
      if (idx < prev.length - 1) {
        const next = [...prev];
        const temp = next[idx];
        next[idx] = next[idx + 1];
        next[idx + 1] = temp;
        return next;
      }
      return prev;
    });
  };

  const sendBackward = () => {
    if (!selectedElement) return;
    setElements((prev) => {
      const idx = prev.findIndex((el) => el.id === selectedId);
      if (idx > 0) {
        const next = [...prev];
        const temp = next[idx];
        next[idx] = next[idx - 1];
        next[idx - 1] = temp;
        return next;
      }
      return prev;
    });
  };

  // Drag element on canvas
  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedId(id);
    const el = elements.find((elem) => elem.id === id);
    if (!el) return;

    setIsDragging(true);
    setDragOffset({
      x: e.clientX - el.x * zoomLevel,
      y: e.clientY - el.y * zoomLevel,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedId) return;
    const newX = Math.round((e.clientX - dragOffset.x) / zoomLevel);
    const newY = Math.round((e.clientY - dragOffset.y) / zoomLevel);
    updateSelected({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // AI Gemini Design Generator
  const handleGenerateWithAi = async () => {
    if (!aiPrompt) {
      showToast("Tulis ide atau deskripsi desain terlebih dahulu.");
      return;
    }

    setIsAiGenerating(true);
    try {
      const res = await fetch("/api/gemini/generate-design", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: aiPrompt,
          category: "social_post",
          language: currentLang,
          canvasWidth,
          canvasHeight,
        }),
      });

      const data = await res.json();
      const gen = data.design || data;
      if (gen && (gen.elements || gen.title)) {
        if (gen.title) setDesignTitle(gen.title);
        if (gen.background?.color) setBgColor(gen.background.color);
        if (gen.elements && Array.isArray(gen.elements)) {
          setElements(gen.elements);
        }
        if (gen.designTips) setAiTips(gen.designTips);

        showToast(t("aiDesignReady"));
        addNotification(
          "AI Menghasilkan Desain",
          `Gemini AI berhasil menghasilkan tata letak & palet warna untuk "${aiPrompt}".`,
          "activity",
          "Gemini AI"
        );
      } else {
        showToast("AI tidak mengembalikan tata letak yang valid.");
      }
    } catch (err) {
      console.error(err);
      showToast("Gagal memanggil AI. Mencoba generator alternatif...");
    } finally {
      setIsAiGenerating(false);
    }
  };

  // AI Copywriting Generator
  const handleGenerateCopy = async () => {
    if (!copyTopic) return;
    setIsGeneratingCopy(true);
    try {
      const res = await fetch("/api/gemini/suggest-copy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: copyTopic,
          language: currentLang,
        }),
      });
      const data = await res.json();
      setCopyResults(data);
      showToast("Ide slogan dan teks berhasil dibuat oleh Gemini!");
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingCopy(false);
    }
  };

  // Save Design
  const handleSave = () => {
    const designToSave: UserDesign = designSnapshotRef.current;
    saveUserDesign(designToSave);
    setAutoSaveCountdown(30);
    setUnsavedChangesCount(0);
    const nowTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    setLastSavedTimestamp(nowTime);
  };

  // Export Design (PNG / JPG)
  const handleExport = (format: "png" | "jpeg" | "svg") => {
    if (format === "svg") {
      // Export vector SVG
      const svgContent = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${canvasWidth}" height="${canvasHeight}" viewBox="0 0 ${canvasWidth} ${canvasHeight}">
          <rect width="100%" height="100%" fill="${bgColor}" />
          ${elements
            .map((el) => {
              if (el.type === "text") {
                return `<text x="${el.x}" y="${el.y + (el.fontSize || 24)}" font-size="${
                  el.fontSize || 24
                }" font-family="${el.fontFamily || "sans-serif"}" font-weight="${
                  el.fontWeight || "bold"
                }" fill="${el.fill || "#fff"}">${el.text || ""}</text>`;
              }
              if (el.type === "shape" && el.shapeType === "circle") {
                return `<circle cx="${el.x + el.width / 2}" cy="${el.y + el.height / 2}" r="${
                  el.width / 2
                }" fill="${el.fill || "#6366f1"}" opacity="${el.opacity || 1}" />`;
              }
              if (el.type === "shape") {
                return `<rect x="${el.x}" y="${el.y}" width="${el.width}" height="${
                  el.height
                }" rx="${el.borderRadius || 0}" fill="${el.fill || "#6366f1"}" opacity="${
                  el.opacity || 1
                }" />`;
              }
              return "";
            })
            .join("\n")}
        </svg>
      `;
      const blob = new Blob([svgContent], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${designTitle.replace(/\s+/g, "_")}.svg`;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      // Render to HTML5 Canvas
      const offscreenCanvas = document.createElement("canvas");
      offscreenCanvas.width = canvasWidth;
      offscreenCanvas.height = canvasHeight;
      const ctx = offscreenCanvas.getContext("2d");
      if (!ctx) return;

      // Background
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Elements
      elements.forEach((el) => {
        ctx.save();
        ctx.globalAlpha = el.opacity !== undefined ? el.opacity : 1;

        if (el.type === "shape") {
          ctx.fillStyle = el.fill || "#6366f1";
          const elW = el.width ?? 100;
          const elH = el.height ?? 100;
          if (el.shapeType === "circle") {
            ctx.beginPath();
            ctx.arc(
              el.x + elW / 2,
              el.y + elH / 2,
              Math.min(elW, elH) / 2,
              0,
              Math.PI * 2
            );
            ctx.fill();
          } else {
            ctx.beginPath();
            ctx.roundRect(el.x, el.y, elW, elH, el.borderRadius || 0);
            ctx.fill();
          }
          if (el.stroke) {
            ctx.strokeStyle = el.stroke;
            ctx.lineWidth = el.strokeWidth || 2;
            ctx.stroke();
          }
        } else if (el.type === "badge" || el.type === "button") {
          const elW = el.width ?? 160;
          const elH = el.height ?? 40;
          ctx.fillStyle = el.fill || "#6366f1";
          ctx.beginPath();
          ctx.roundRect(el.x, el.y, elW, elH, el.borderRadius || 18);
          ctx.fill();

          ctx.fillStyle = el.textColor || "#ffffff";
          ctx.font = `bold ${Math.round(elH * 0.42)}px Plus Jakarta Sans, sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(el.text || "", el.x + elW / 2, el.y + elH / 2);
        } else if (el.type === "text") {
          const elW = el.width ?? canvasWidth - 120;
          ctx.fillStyle = el.fill || "#ffffff";
          ctx.font = `${el.fontWeight || "normal"} ${el.fontSize || 24}px ${
            el.fontFamily || "Outfit"
          }, sans-serif`;
          ctx.textAlign = el.align || "left";
          ctx.textBaseline = "top";

          // Multiline text wrap
          const textX =
            el.align === "center"
              ? el.x + elW / 2
              : el.align === "right"
              ? el.x + elW
              : el.x;

          const lines = (el.text || "").split("\n");
          let lineY = el.y;
          lines.forEach((line) => {
            ctx.fillText(line, textX, lineY);
            lineY += (el.fontSize || 24) * 1.3;
          });
        }
        ctx.restore();
      });

      const dataUrl = offscreenCanvas.toDataURL(
        format === "png" ? "image/png" : "image/jpeg",
        0.95
      );
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `${designTitle.replace(/\s+/g, "_")}.${format}`;
      a.click();
    }

    showToast(t("designExportedSuccess"));
    addNotification(
      "Desain Diekspor",
      `File "${designTitle}.${format.toUpperCase()}" berhasil diunduh ke perangkat Anda.`,
      "activity",
      "Ekspor"
    );
  };

  // Helper render icon
  const renderIcon = (name?: string, fill?: string) => {
    const color = fill || "#f59e0b";
    switch (name) {
      case "Heart":
        return <Heart className="w-full h-full" style={{ color }} />;
      case "ShoppingBag":
        return <ShoppingBag className="w-full h-full" style={{ color }} />;
      case "Coffee":
        return <Coffee className="w-full h-full" style={{ color }} />;
      case "Music":
        return <Music className="w-full h-full" style={{ color }} />;
      case "Rocket":
        return <Rocket className="w-full h-full" style={{ color }} />;
      case "Award":
        return <Award className="w-full h-full" style={{ color }} />;
      default:
        return <Sparkles className="w-full h-full" style={{ color }} />;
    }
  };

  return (
    <div
      className="flex flex-col h-[calc(100vh-4rem)] bg-slate-900 text-slate-100 overflow-hidden"
      id="canvas-editor-screen"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Top Editor Toolbar */}
      <div className="h-14 bg-slate-950 border-b border-slate-800 px-4 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveView("templates")}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg text-xs flex items-center gap-1"
          >
            <Undo2 className="w-4 h-4" />
            <span className="hidden sm:inline">Kembali</span>
          </button>
          <div className="h-4 w-px bg-slate-800"></div>

          <input
            id="editor-design-title-input"
            type="text"
            value={designTitle}
            onChange={(e) => setDesignTitle(e.target.value)}
            className="bg-transparent font-bold text-sm text-white px-2 py-1 rounded-md hover:bg-slate-800/80 focus:bg-slate-900 focus:ring-1 focus:ring-indigo-500 max-w-48 sm:max-w-xs truncate"
          />

          <span className="text-[11px] text-slate-500 hidden md:inline">
            {canvasWidth} × {canvasHeight} px
          </span>
        </div>

        {/* Zoom & Action buttons */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-800 text-xs">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.4, z - 0.1))}
              className="p-1.5 text-slate-400 hover:text-white"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 font-mono text-[11px]">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.8, z + 0.1))}
              className="p-1.5 text-slate-400 hover:text-white"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Auto-Save Indicator (every 30 seconds to localStorage & backend) */}
          <div
            id="editor-autosave-indicator"
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs"
            title={t("autoSaveIntervalNotice")}
          >
            {isAutoSaving ? (
              <>
                <Loader2 className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
                <span className="text-indigo-300 text-[11px] font-medium hidden md:inline">
                  {t("autoSaving")}
                </span>
              </>
            ) : (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-slate-300 text-[11px] hidden lg:inline">
                  {lastSavedTimestamp
                    ? `${t("autoSaveStatus")}: ${lastSavedTimestamp}`
                    : t("autoSaveActive")}
                </span>
                <button
                  type="button"
                  onClick={triggerManualAutoSave}
                  title="Klik untuk auto-save sekarang (interval 30 detik)"
                  className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[10px] font-mono text-emerald-400 border border-emerald-500/30 transition-colors flex items-center gap-1"
                >
                  <Clock className="w-2.5 h-2.5 hidden sm:inline" />
                  <span>{autoSaveCountdown}s</span>
                </button>
              </>
            )}
          </div>

          <button
            id="editor-save-btn"
            onClick={handleSave}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <Save className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t("saveDesign")}</span>
          </button>

          {/* AI Creative & Material Summarizer Studio Button */}
          <button
            id="editor-ai-studio-btn"
            onClick={() => setIsAiStudioModalOpen(true)}
            className="px-3 py-1.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
            title="Buka AI Creative Studio & Rangkum Materi"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">AI Studio & Rangkum</span>
          </button>

          {/* Share Button (WhatsApp, Gmail, Instagram, Message, Link) */}
          <button
            id="editor-share-btn"
            onClick={() => openShareModal(getCurrentDesignSnapshot())}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-colors"
            title="Bagikan ke WhatsApp, Gmail, Instagram, SMS, atau Link"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Bagikan</span>
          </button>

          {/* Export multi-format dropdown (PPT, PDF, Gambar, Dokumen) */}
          <div className="relative group">
            <button
              id="editor-export-btn"
              onClick={() => openExportModal(getCurrentDesignSnapshot())}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t("exportDesign")}</span>
            </button>
            <div className="absolute right-0 mt-1 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-1.5 hidden group-hover:block z-50">
              <button
                onClick={() => openExportModal(getCurrentDesignSnapshot())}
                className="w-full text-left px-3.5 py-1.5 text-xs text-amber-300 font-bold hover:bg-slate-800 flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Buka Menu Unduh Lengkap</span>
              </button>
              <div className="my-1 border-t border-slate-800" />
              <button
                onClick={() => exportAsPpt(getCurrentDesignSnapshot())}
                className="w-full text-left px-3.5 py-1.5 text-xs text-orange-400 hover:bg-slate-800 flex items-center gap-2"
              >
                <Presentation className="w-3.5 h-3.5 text-orange-400" />
                <span>Presentasi (.PPTX)</span>
              </button>
              <button
                onClick={() => exportAsPdf(getCurrentDesignSnapshot())}
                className="w-full text-left px-3.5 py-1.5 text-xs text-rose-400 hover:bg-slate-800 flex items-center gap-2"
              >
                <FileText className="w-3.5 h-3.5 text-rose-400" />
                <span>Dokumen PDF (.PDF)</span>
              </button>
              <button
                onClick={() => exportAsPicture(getCurrentDesignSnapshot(), "png")}
                className="w-full text-left px-3.5 py-1.5 text-xs text-cyan-400 hover:bg-slate-800 flex items-center gap-2"
              >
                <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                <span>Gambar (PNG / JPG)</span>
              </button>
              <button
                onClick={() => exportAsDocument(getCurrentDesignSnapshot())}
                className="w-full text-left px-3.5 py-1.5 text-xs text-blue-400 hover:bg-slate-800 flex items-center gap-2"
              >
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <span>Dokumen Word (.DOC)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Auto-Save Draft Recovery Alert Banner */}
      {showRecoveryBanner && (activeDraftToRecover || autoSaveDraft) && (
        <div
          id="autosave-recovery-banner"
          className="bg-gradient-to-r from-amber-950/90 via-slate-900 to-amber-950/90 border-b border-amber-500/40 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs text-amber-200 z-30 shadow-md"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>{t("autoSaveDraftFound")}:</strong> &ldquo;
              {activeDraftToRecover?.design?.title || autoSaveDraft?.design?.title || designTitle}&rdquo;
              <span className="text-amber-300/80 ml-1">
                ({activeDraftToRecover?.savedAt || autoSaveDraft?.savedAt || "Sesi sebelumnya"})
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              id="restore-autosave-draft-btn"
              onClick={handleRestoreDraft}
              className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-md shadow-xs transition-colors flex items-center gap-1.5 text-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t("restoreDraft")}</span>
            </button>
            <button
              id="dismiss-autosave-draft-btn"
              onClick={() => setShowRecoveryBanner(false)}
              className="p-1 text-amber-400 hover:text-white hover:bg-amber-800/40 rounded-md transition-colors"
              title={t("dismissDraft")}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Workspace Area: Sidebar + Canvas Stage + Inspector */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side Tool Tabs */}
        <div className="w-16 bg-slate-950 border-r border-slate-800 flex flex-col items-center py-3 gap-3 shrink-0 z-10">
          <button
            id="tab-tool-elements"
            onClick={() => setActiveTab("elements")}
            className={`p-2.5 rounded-xl text-xs flex flex-col items-center gap-1 transition-colors ${
              activeTab === "elements"
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:text-white hover:bg-slate-900"
            }`}
          >
            <Square className="w-5 h-5" />
            <span className="text-[9px] font-medium">Bentuk</span>
          </button>

          <button
            id="tab-tool-text"
            onClick={() => setActiveTab("text")}
            className={`p-2.5 rounded-xl text-xs flex flex-col items-center gap-1 transition-colors ${
              activeTab === "text"
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:text-white hover:bg-slate-900"
            }`}
          >
            <Type className="w-5 h-5" />
            <span className="text-[9px] font-medium">Teks</span>
          </button>

          <button
            id="tab-tool-ai"
            onClick={() => setActiveTab("ai")}
            className={`p-2.5 rounded-xl text-xs flex flex-col items-center gap-1 transition-colors relative ${
              activeTab === "ai"
                ? "bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-900/50"
                : "text-purple-400 hover:text-white hover:bg-slate-900"
            }`}
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-[9px] font-bold">AI Gemini</span>
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
          </button>

          <button
            id="tab-tool-bg"
            onClick={() => setActiveTab("bg")}
            className={`p-2.5 rounded-xl text-xs flex flex-col items-center gap-1 transition-colors ${
              activeTab === "bg"
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:text-white hover:bg-slate-900"
            }`}
          >
            <Palette className="w-5 h-5" />
            <span className="text-[9px] font-medium">Latar</span>
          </button>

          <div className="mt-auto">
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <button
              onClick={() => imageInputRef.current?.click()}
              title={t("addImage")}
              className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-900 rounded-xl"
            >
              <ImageIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sub-Panel Drawer */}
        <div className="w-64 sm:w-72 bg-slate-900 border-r border-slate-800 p-4 overflow-y-auto shrink-0 z-10">
          {/* TAB: ELEMENTS & SHAPES */}
          {activeTab === "elements" && (
            <div className="space-y-5">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Bentuk Geometris
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => addShapeElement("rectangle")}
                    className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl flex flex-col items-center gap-1 text-slate-200 text-xs transition-colors"
                  >
                    <Square className="w-5 h-5 text-indigo-400" />
                    <span>Kotak</span>
                  </button>
                  <button
                    onClick={() => addShapeElement("circle")}
                    className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl flex flex-col items-center gap-1 text-slate-200 text-xs transition-colors"
                  >
                    <Circle className="w-5 h-5 text-indigo-400" />
                    <span>Lingkaran</span>
                  </button>
                  <button
                    onClick={() => addShapeElement("pill")}
                    className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl flex flex-col items-center gap-1 text-slate-200 text-xs transition-colors"
                  >
                    <div className="w-5 h-3 rounded-full border-2 border-indigo-400"></div>
                    <span>Badge</span>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Stiker & Ikon Grafis
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => addIconElement("Sparkles")}
                    className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl flex flex-col items-center gap-1 text-xs text-slate-300"
                  >
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span className="text-[10px]">Sparkle</span>
                  </button>
                  <button
                    onClick={() => addIconElement("Heart")}
                    className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl flex flex-col items-center gap-1 text-xs text-slate-300"
                  >
                    <Heart className="w-5 h-5 text-rose-500" />
                    <span className="text-[10px]">Heart</span>
                  </button>
                  <button
                    onClick={() => addIconElement("ShoppingBag")}
                    className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl flex flex-col items-center gap-1 text-xs text-slate-300"
                  >
                    <ShoppingBag className="w-5 h-5 text-emerald-400" />
                    <span className="text-[10px]">Promo</span>
                  </button>
                  <button
                    onClick={() => addIconElement("Coffee")}
                    className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl flex flex-col items-center gap-1 text-xs text-slate-300"
                  >
                    <Coffee className="w-5 h-5 text-amber-600" />
                    <span className="text-[10px]">Coffee</span>
                  </button>
                  <button
                    onClick={() => addIconElement("Music")}
                    className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl flex flex-col items-center gap-1 text-xs text-slate-300"
                  >
                    <Music className="w-5 h-5 text-cyan-400" />
                    <span className="text-[10px]">Music</span>
                  </button>
                  <button
                    onClick={() => addIconElement("Rocket")}
                    className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl flex flex-col items-center gap-1 text-xs text-slate-300"
                  >
                    <Rocket className="w-5 h-5 text-purple-400" />
                    <span className="text-[10px]">Startup</span>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Gambar & Foto
                </h3>
                <button
                  onClick={() => imageInputRef.current?.click()}
                  className="w-full py-2.5 px-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-semibold text-slate-200 flex items-center justify-center gap-2"
                >
                  <ImageIcon className="w-4 h-4 text-indigo-400" />
                  <span>Unggah Gambar ke Kanvas</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB: TEXT */}
          {activeTab === "text" && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Gaya Teks Standar
              </h3>
              <button
                onClick={() => addTextElement("heading")}
                className="w-full p-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-left transition-colors"
              >
                <p className="text-lg font-black font-display text-white">Tambahkan Judul</p>
                <p className="text-[11px] text-slate-400">Ukuran 52px Outfit Bold</p>
              </button>
              <button
                onClick={() => addTextElement("subheading")}
                className="w-full p-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-left transition-colors"
              >
                <p className="text-sm font-bold text-white">Tambahkan Sub-judul</p>
                <p className="text-[11px] text-slate-400">Ukuran 28px Semi-Bold</p>
              </button>
              <button
                onClick={() => addTextElement("body")}
                className="w-full p-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-left transition-colors"
              >
                <p className="text-xs text-slate-300">Tambahkan sedikit teks isi</p>
                <p className="text-[11px] text-slate-400">Ukuran 18px Regular</p>
              </button>
            </div>
          )}

          {/* TAB: AI GEMINI ASSISTANT */}
          {activeTab === "ai" && (
            <div className="space-y-5">
              <div className="p-3 bg-gradient-to-r from-purple-900/60 to-indigo-900/60 border border-purple-500/30 rounded-2xl">
                <div className="flex items-center gap-2 mb-1 text-purple-300 font-bold text-xs">
                  <Sparkles className="w-4 h-4" />
                  <span>Asisten Grafis Gemini AI</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Jelaskan konsep visual Anda, Gemini akan merancang warna, tipografi, dan tata letak secara instan!
                </p>
              </div>

              {/* Prompt Input */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Deskripsikan Desain:
                </label>
                <textarea
                  id="ai-design-prompt-input"
                  rows={3}
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder={t("aiPromptPlaceholder")}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>

              {/* Quick Presets */}
              <div className="space-y-1.5">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Preset Populer:</p>
                <button
                  onClick={() => setAiPrompt("Poster Diskon Kilat Akhir Pekan 50% merah bold")}
                  className="w-full text-left p-1.5 px-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-[11px] text-purple-300 truncate"
                >
                  ⚡ Poster Diskon Kilat 50%
                </button>
                <button
                  onClick={() => setAiPrompt("Banner Seminar Bisnis AI & Teknologi futuristik cyan")}
                  className="w-full text-left p-1.5 px-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-[11px] text-purple-300 truncate"
                >
                  🚀 Banner Seminar AI & Teknologi
                </button>
                <button
                  onClick={() => setAiPrompt("Poster Festival Kopi Nusantara cokelat artisanal hangat")}
                  className="w-full text-left p-1.5 px-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-[11px] text-purple-300 truncate"
                >
                  ☕ Festival Kopi Nusantara
                </button>
              </div>

              <button
                id="generate-ai-design-btn"
                onClick={handleGenerateWithAi}
                disabled={isAiGenerating}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-purple-900/40 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isAiGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{t("generatingAiDesign")}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{t("generateWithAi")}</span>
                  </>
                )}
              </button>

              {aiTips && (
                <div className="p-3 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-slate-300">
                  <p className="font-bold text-amber-400 flex items-center gap-1 mb-1">
                    <Lightbulb className="w-3.5 h-3.5" /> Tips Desain AI:
                  </p>
                  <p className="text-[11px] leading-relaxed">{aiTips}</p>
                </div>
              )}

              {/* Copywriting Generator Sub-section */}
              <div className="pt-4 border-t border-slate-800 space-y-2.5">
                <p className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Wand2 className="w-3.5 h-3.5 text-indigo-400" />
                  {t("aiCopyGenerator")}
                </p>
                <input
                  type="text"
                  placeholder="Topik: Bisnis katering / diskon gadget..."
                  value={copyTopic}
                  onChange={(e) => setCopyTopic(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
                <button
                  onClick={handleGenerateCopy}
                  disabled={isGeneratingCopy}
                  className="w-full py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-indigo-300 rounded-lg border border-slate-700 flex items-center justify-center gap-1.5"
                >
                  {isGeneratingCopy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                  {t("aiGenerateTaglines")}
                </button>

                {copyResults && (
                  <div className="space-y-2 mt-2">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Klik untuk Pasang:</p>
                    {copyResults.headlines?.map((hl, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          const newEl: CanvasElement = {
                            id: `ai-hl-${Date.now()}`,
                            type: "text",
                            text: hl,
                            x: 60,
                            y: 150,
                            fontSize: 38,
                            fontWeight: "800",
                            fontFamily: "Outfit",
                            fill: "#ffffff",
                            width: 600,
                            zIndex: elements.length + 1,
                          };
                          setElements([...elements, newEl]);
                          setSelectedId(newEl.id);
                          showToast("Teks dimasukkan ke kanvas!");
                        }}
                        className="w-full text-left p-1.5 bg-slate-800 hover:bg-indigo-900/40 rounded border border-slate-700 text-[11px] text-slate-200 truncate"
                      >
                        {hl}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: BACKGROUND */}
          {activeTab === "bg" && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                {t("canvasBackground")}
              </h3>

              <div>
                <label className="block text-xs text-slate-400 mb-1.5">Pilih Warna Kanvas</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg font-mono text-white"
                  />
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-400 mb-2">Preset Palet Warna:</p>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    "#0f172a",
                    "#1e1b4b",
                    "#831843",
                    "#064e3b",
                    "#7c2d12",
                    "#ffffff",
                    "#f8fafc",
                    "#18181b",
                  ].map((hex) => (
                    <button
                      key={hex}
                      onClick={() => setBgColor(hex)}
                      className="w-full h-8 rounded-lg border border-slate-600 transition-transform hover:scale-105"
                      style={{ backgroundColor: hex }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Center: Interactive Canvas Stage */}
        <div
          className="flex-1 bg-slate-950 overflow-auto p-6 flex items-center justify-center relative"
          onClick={() => setSelectedId(null)}
        >
          <div
            ref={canvasRef}
            id="interactive-canvas"
            className="relative shadow-2xl transition-all duration-100 select-none cursor-default"
            style={{
              width: canvasWidth * zoomLevel,
              height: canvasHeight * zoomLevel,
              backgroundColor: bgColor,
              transformOrigin: "center center",
            }}
          >
            {/* Render Canvas Elements */}
            {elements.map((el) => {
              const isSelected = selectedId === el.id;
              const elX = el.x * zoomLevel;
              const elY = el.y * zoomLevel;
              const elW = (el.width ?? (el.type === "text" ? 400 : 100)) * zoomLevel;
              const elH = (el.height ?? (el.type === "text" ? 60 : 100)) * zoomLevel;

              return (
                <div
                  key={el.id}
                  id={`canvas-elem-${el.id}`}
                  onMouseDown={(e) => handleMouseDown(e, el.id)}
                  style={{
                    position: "absolute",
                    left: elX,
                    top: elY,
                    width: elW,
                    height: elH,
                    opacity: el.opacity !== undefined ? el.opacity : 1,
                    zIndex: el.zIndex || 1,
                    cursor: isDragging && isSelected ? "grabbing" : "grab",
                  }}
                  className={`group ${
                    isSelected
                      ? "ring-2 ring-indigo-500 ring-offset-2 ring-offset-slate-900"
                      : "hover:ring-1 hover:ring-indigo-400/50"
                  }`}
                >
                  {/* Element rendering by type */}
                  {el.type === "text" && (
                    <div
                      style={{
                        color: el.fill || "#ffffff",
                        fontSize: (el.fontSize || 24) * zoomLevel,
                        fontFamily: el.fontFamily || "Outfit",
                        fontWeight: el.fontWeight || "bold",
                        textAlign: el.align || "left",
                        width: "100%",
                        height: "100%",
                        lineHeight: 1.25,
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {el.text}
                    </div>
                  )}

                  {el.type === "shape" && (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: el.fill || "#6366f1",
                        borderRadius: el.borderRadius ? el.borderRadius * zoomLevel : 0,
                        border: el.stroke
                          ? `${(el.strokeWidth || 2) * zoomLevel}px solid ${el.stroke}`
                          : "none",
                      }}
                    />
                  )}

                  {(el.type === "badge" || el.type === "button") && (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: el.fill || "#6366f1",
                        color: el.textColor || "#ffffff",
                        borderRadius: (el.borderRadius || 18) * zoomLevel,
                        fontSize: ((el.height ?? 40) * 0.42) * zoomLevel,
                      }}
                      className="font-bold flex items-center justify-center px-4 shadow-sm"
                    >
                      {el.text}
                    </div>
                  )}

                  {el.type === "icon" && (
                    <div className="w-full h-full flex items-center justify-center">
                      {renderIcon(el.iconName, el.fill)}
                    </div>
                  )}

                  {el.type === "image" && el.imageUrl && (
                    <img
                      src={el.imageUrl}
                      alt="Elemen"
                      className="w-full h-full object-cover rounded-lg pointer-events-none"
                    />
                  )}

                  {/* Selection handles */}
                  {isSelected && (
                    <>
                      <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-indigo-600 rounded-full"></div>
                      <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-indigo-600 rounded-full"></div>
                      <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-indigo-600 rounded-full"></div>
                      <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-indigo-600 rounded-full"></div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Inspector Panel */}
        <div className="w-64 sm:w-72 bg-slate-900 border-l border-slate-800 p-4 overflow-y-auto shrink-0 z-10">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5" />
              Inspector Elemen
            </h3>
            {selectedElement && (
              <div className="flex items-center gap-1">
                <button
                  onClick={bringForward}
                  title={t("bringForward")}
                  className="p-1 text-slate-400 hover:text-white rounded"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={sendBackward}
                  title={t("sendBackward")}
                  className="p-1 text-slate-400 hover:text-white rounded"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={duplicateSelected}
                  title={t("duplicateElement")}
                  className="p-1 text-slate-400 hover:text-white rounded"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={deleteSelected}
                  title={t("deleteElement")}
                  className="p-1 text-rose-400 hover:text-rose-300 rounded"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {!selectedElement ? (
            <div className="py-12 text-center text-slate-500">
              <Layers className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-xs">Klik salah satu elemen di kanvas untuk mengedit posisi, warna, dan teks.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Text editing if text or badge/button */}
              {(selectedElement.type === "text" ||
                selectedElement.type === "badge" ||
                selectedElement.type === "button") && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Isi Teks
                  </label>
                  <textarea
                    rows={2}
                    value={selectedElement.text || ""}
                    onChange={(e) => updateSelected({ text: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                </div>
              )}

              {/* Font Size & Align for text */}
              {selectedElement.type === "text" && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Ukuran Font ({selectedElement.fontSize || 24}px)
                    </label>
                    <input
                      type="range"
                      min={12}
                      max={120}
                      value={selectedElement.fontSize || 24}
                      onChange={(e) =>
                        updateSelected({ fontSize: Number(e.target.value) })
                      }
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Perataan Teks
                    </label>
                    <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-700">
                      <button
                        onClick={() => updateSelected({ align: "left" })}
                        className={`flex-1 p-1 rounded flex justify-center ${
                          selectedElement.align === "left"
                            ? "bg-indigo-600 text-white"
                            : "text-slate-400"
                        }`}
                      >
                        <AlignLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => updateSelected({ align: "center" })}
                        className={`flex-1 p-1 rounded flex justify-center ${
                          selectedElement.align === "center"
                            ? "bg-indigo-600 text-white"
                            : "text-slate-400"
                        }`}
                      >
                        <AlignCenter className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => updateSelected({ align: "right" })}
                        className={`flex-1 p-1 rounded flex justify-center ${
                          selectedElement.align === "right"
                            ? "bg-indigo-600 text-white"
                            : "text-slate-400"
                        }`}
                      >
                        <AlignRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Color */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {selectedElement.type === "text" ? "Warna Teks" : "Warna Elemen"}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={selectedElement.fill || "#ffffff"}
                    onChange={(e) => updateSelected({ fill: e.target.value })}
                    className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                  />
                  <input
                    type="text"
                    value={selectedElement.fill || "#ffffff"}
                    onChange={(e) => updateSelected({ fill: e.target.value })}
                    className="flex-1 px-2.5 py-1 text-xs bg-slate-950 border border-slate-700 rounded-lg font-mono text-white"
                  />
                </div>
              </div>

              {/* Width & Height */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Lebar (W)</label>
                  <input
                    type="number"
                    value={selectedElement.width ?? 200}
                    onChange={(e) => updateSelected({ width: Number(e.target.value) })}
                    className="w-full px-2 py-1 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Tinggi (H)</label>
                  <input
                    type="number"
                    value={selectedElement.height ?? 80}
                    onChange={(e) => updateSelected({ height: Number(e.target.value) })}
                    className="w-full px-2 py-1 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white"
                  />
                </div>
              </div>

              {/* Opacity */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Transparansi ({Math.round((selectedElement.opacity || 1) * 100)}%)
                </label>
                <input
                  type="range"
                  min={0.05}
                  max={1}
                  step={0.05}
                  value={selectedElement.opacity !== undefined ? selectedElement.opacity : 1}
                  onChange={(e) => updateSelected({ opacity: Number(e.target.value) })}
                  className="w-full"
                />
              </div>

              {/* Delete Button */}
              <button
                onClick={deleteSelected}
                className="w-full py-2 px-3 bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 border border-rose-800/40 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors mt-4"
              >
                <Trash2 className="w-3.5 h-3.5" />
                {t("deleteElement")}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* AI Creative Studio & Material Summarizer Modal */}
      <AiCreativeStudioModal
        isOpen={isAiStudioModalOpen}
        onClose={() => setIsAiStudioModalOpen(false)}
        onDesignGenerated={handleLoadAiGeneratedDesign}
      />
    </div>
  );
};
