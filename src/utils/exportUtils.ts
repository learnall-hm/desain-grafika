import jsPDF from "jspdf";
import pptxgen from "pptxgenjs";
import { UserDesign, CanvasElement } from "../types";

// Generate an offscreen HTML5 Canvas from UserDesign with optional resolution multiplier (1x = Standard, 2x = HD, 3x = Ultra HD 300 DPI)
export async function renderDesignToCanvas(
  design: UserDesign | { width: number; height: number; background: any; elements: CanvasElement[] },
  scale: number = 1
): Promise<HTMLCanvasElement> {
  const canvas = document.createElement("canvas");
  const actualScale = Math.max(1, Math.min(scale, 4));
  canvas.width = Math.round(design.width * actualScale);
  canvas.height = Math.round(design.height * actualScale);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2D context");

  if (actualScale !== 1) {
    ctx.scale(actualScale, actualScale);
  }

  // Draw background
  const bg = design.background;
  if (bg.type === "gradient" && bg.gradientColors && bg.gradientColors.length >= 2) {
    const grad = ctx.createLinearGradient(0, 0, 0, design.height);
    grad.addColorStop(0, bg.gradientColors[0]);
    grad.addColorStop(1, bg.gradientColors[1]);
    ctx.fillStyle = grad;
  } else {
    ctx.fillStyle = bg.color || "#0f172a";
  }
  ctx.fillRect(0, 0, design.width, design.height);

  // Draw elements
  for (const el of design.elements) {
    ctx.save();
    ctx.globalAlpha = el.opacity !== undefined ? el.opacity : 1;

    if (el.type === "shape") {
      ctx.fillStyle = el.fill || "#6366f1";
      const w = el.width ?? 100;
      const h = el.height ?? 100;

      if (el.shapeType === "circle") {
        ctx.beginPath();
        ctx.arc(el.x + w / 2, el.y + h / 2, w / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        const radius = el.borderRadius || 0;
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(el.x, el.y, w, h, radius);
        } else {
          ctx.rect(el.x, el.y, w, h);
        }
        ctx.fill();
      }
    } else if (el.type === "badge" || el.type === "button") {
      const w = el.width ?? 140;
      const h = el.height ?? 36;
      const radius = el.borderRadius || h / 2;

      ctx.fillStyle = el.fill || "#4f46e5";
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(el.x, el.y, w, h, radius);
      } else {
        ctx.rect(el.x, el.y, w, h);
      }
      ctx.fill();

      if (el.text) {
        ctx.fillStyle = el.textColor || "#ffffff";
        ctx.font = `bold 13px 'Plus Jakarta Sans', sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(el.text, el.x + w / 2, el.y + h / 2);
      }
    } else if (el.type === "text") {
      ctx.fillStyle = el.fill || "#ffffff";
      const weight = el.fontWeight || "bold";
      const size = el.fontSize || 24;
      const family = el.fontFamily || "Plus Jakarta Sans, sans-serif";
      ctx.font = `${weight} ${size}px ${family}`;
      ctx.textAlign = el.align || "left";
      ctx.textBaseline = "top";

      const maxW = el.width || design.width - el.x - 20;
      const words = (el.text || "").split(" ");
      let line = "";
      let curY = el.y;
      const lineHeight = size * 1.3;

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + " ";
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxW && n > 0) {
          ctx.fillText(line, el.x, curY);
          line = words[n] + " ";
          curY += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, el.x, curY);
    } else if (el.type === "image" && el.imageUrl) {
      try {
        const img = new Image();
        img.crossOrigin = "anonymous";
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = el.imageUrl!;
        });
        ctx.drawImage(img, el.x, el.y, el.width || 200, el.height || 200);
      } catch {
        // Fallback placeholder box
        ctx.fillStyle = "#334155";
        ctx.fillRect(el.x, el.y, el.width || 200, el.height || 200);
      }
    }

    ctx.restore();
  }

  return canvas;
}

// 1. Export as Picture (PNG / JPEG / WebP / SVG) with scale multiplier
export async function exportAsPicture(
  design: UserDesign,
  format: "png" | "jpeg" | "webp" | "svg" = "png",
  scale: number = 1
) {
  const filename = `${design.title.replace(/[^a-zA-Z0-9_-]/g, "_")}${scale > 1 ? `_${scale}x_UHD` : ""}.${format}`;

  if (format === "svg") {
    const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${design.width}" height="${design.height}" viewBox="0 0 ${design.width} ${design.height}">
        <rect width="100%" height="100%" fill="${design.background.color || "#0f172a"}" />
        ${design.elements
          .map((el) => {
            if (el.type === "text") {
              return `<text x="${el.x}" y="${el.y + (el.fontSize || 24)}" font-size="${
                el.fontSize || 24
              }" font-family="${el.fontFamily || "sans-serif"}" font-weight="${
                el.fontWeight || "bold"
              }" fill="${el.fill || "#fff"}">${(el.text || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</text>`;
            }
            if (el.type === "shape" && el.shapeType === "circle") {
              const r = (el.width || 100) / 2;
              return `<circle cx="${el.x + r}" cy="${el.y + r}" r="${r}" fill="${el.fill || "#6366f1"}" opacity="${el.opacity || 1}" />`;
            }
            if (el.type === "shape") {
              return `<rect x="${el.x}" y="${el.y}" width="${el.width || 100}" height="${el.height || 100}" rx="${el.borderRadius || 0}" fill="${el.fill || "#6366f1"}" opacity="${el.opacity || 1}" />`;
            }
            return "";
          })
          .join("\n")}
      </svg>
    `;
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    triggerDownload(url, filename);
    URL.revokeObjectURL(url);
    return;
  }

  const canvas = await renderDesignToCanvas(design, scale);
  const mimeType = format === "jpeg" ? "image/jpeg" : format === "webp" ? "image/webp" : "image/png";
  const dataUrl = canvas.toDataURL(mimeType, 0.98);
  triggerDownload(dataUrl, filename);
}

// 2. Export as PDF (.pdf) with scale multiplier
export async function exportAsPdf(design: UserDesign, scale: number = 1) {
  const canvas = await renderDesignToCanvas(design, scale);
  const imgData = canvas.toDataURL("image/png", 1.0);

  const isLandscape = design.width > design.height;
  const pdf = new jsPDF({
    orientation: isLandscape ? "landscape" : "portrait",
    unit: "px",
    format: [design.width, design.height],
  });

  pdf.addImage(imgData, "PNG", 0, 0, design.width, design.height);
  pdf.save(`${design.title.replace(/[^a-zA-Z0-9_-]/g, "_")}${scale > 1 ? `_${scale}x_UHD` : ""}.pdf`);
}

// 3. Export as PPTX Presentation (.pptx) with scale multiplier
export async function exportAsPpt(design: UserDesign, scale: number = 1) {
  const pptx = new pptxgen();
  pptx.title = design.title;
  pptx.author = "Creative Canvas Studio";

  // Set slide dimensions (16:9 or 4:3 based on aspect ratio)
  const isWidescreen = design.width >= design.height;
  pptx.layout = isWidescreen ? "LAYOUT_16x9" : "LAYOUT_4x3";

  const slide = pptx.addSlide();

  // Canvas raster background image with high fidelity
  const canvas = await renderDesignToCanvas(design, scale);
  const imgData = canvas.toDataURL("image/png");

  slide.addImage({
    data: imgData,
    x: 0,
    y: 0,
    w: "100%",
    h: "100%",
  });

  // Also add native PowerPoint editable text overlay for the main title
  slide.addNotes(`Slide Desain: ${design.title}\nDibuat dengan Creative Canvas AI\nDimensi Asli: ${design.width} x ${design.height}px (Kualitas ${scale}x Ultra HD)`);

  await pptx.writeFile({
    fileName: `${design.title.replace(/[^a-zA-Z0-9_-]/g, "_")}${scale > 1 ? `_${scale}x_UHD` : ""}.pptx`,
  });
}

// 4. Export as Document (.doc / .docx compatible printable report) with scale multiplier
export async function exportAsDocument(design: UserDesign, scale: number = 1) {
  const canvas = await renderDesignToCanvas(design, scale);
  const imgData = canvas.toDataURL("image/png");

  // Extract all text elements for the document body
  const textItems = design.elements
    .filter((e) => e.text && e.text.trim())
    .map((e) => `<li><strong>${e.type.toUpperCase()}:</strong> ${e.text}</li>`)
    .join("\n");

  const docHtml = `
    <!DOCTYPE html>
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset="utf-8">
      <title>${design.title}</title>
      <style>
        body { font-family: 'Segoe UI', Calibri, Arial, sans-serif; padding: 40px; color: #1e293b; background: #ffffff; }
        h1 { color: #0f172a; font-size: 26px; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 20px; }
        .meta { color: #64748b; font-size: 13px; margin-bottom: 24px; }
        .image-container { text-align: center; margin: 30px 0; }
        .image-container img { max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; }
        .content-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin-top: 24px; }
        .content-box h3 { margin-top: 0; color: #334155; font-size: 18px; }
        ul { line-height: 1.8; color: #475569; }
        .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 16px; }
      </style>
    </head>
    <body>
      <h1>${design.title}</h1>
      <div class="meta">
        <p><strong>Kategori:</strong> ${design.category.toUpperCase()} | <strong>Dimensi:</strong> ${design.width} x ${design.height} px | <strong>Dibuat:</strong> ${design.createdAt} | <strong>Pembaruan Terakhir:</strong> ${design.updatedAt}</p>
      </div>

      <div class="image-container">
        <img src="${imgData}" alt="${design.title}" />
      </div>

      <div class="content-box">
        <h3>Transkrip & Ringkasan Elemen Desain</h3>
        <ul>
          ${textItems || "<li>Tidak ada elemen teks khusus.</li>"}
        </ul>
      </div>

      <div class="footer">
        Dokumen dicetak dari Creative Canvas AI Studio • Platform Desain Grafis Cerdas
      </div>
    </body>
    </html>
  `;

  const blob = new Blob(["\ufeff" + docHtml], { type: "application/msword" });
  const url = URL.createObjectURL(blob);
  triggerDownload(url, `${design.title.replace(/[^a-zA-Z0-9_-]/g, "_")}.doc`);
  URL.revokeObjectURL(url);
}

// 5. Share Utilities (WhatsApp, Gmail, Instagram, Message/SMS, Link)
export function getShareLinks(design: UserDesign) {
  const appUrl = window.location.origin;
  const shareText = `Lihat karya desain grafis "${design.title}" yang saya buat di Creative Canvas AI! ✨\nKategori: ${design.category}\nCek selengkapnya di: ${appUrl}`;
  const encodedText = encodeURIComponent(shareText);
  const subject = encodeURIComponent(`Karya Desain: ${design.title} - Creative Canvas`);

  return {
    whatsapp: `https://api.whatsapp.com/send?text=${encodedText}`,
    gmail: `https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${encodedText}`,
    mailto: `mailto:?subject=${subject}&body=${encodedText}`,
    sms: `sms:?body=${encodedText}`,
    instagramCaption: `Desain baru "${design.title}" dibuat dengan @CreativeCanvasAI 🎨✨ #CreativeCanvas #Design #GraphicDesign #AIArt`,
    publicLink: `${appUrl}/#design=${design.id}`,
  };
}

function triggerDownload(url: string, filename: string) {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
