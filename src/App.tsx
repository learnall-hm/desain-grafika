import React from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { Navbar } from "./components/Navbar";
import { TemplateGallery } from "./components/TemplateGallery";
import { CanvasEditor } from "./components/CanvasEditor";
import { AdminPortal } from "./components/AdminPortal";
import { UploadDesignView } from "./components/UploadDesignView";
import { MyDesignsView } from "./components/MyDesignsView";
import { LoginView } from "./components/LoginView";
import { LanguageModal } from "./components/modals/LanguageModal";
import { PersonalInfoModal } from "./components/modals/PersonalInfoModal";
import { AccountModal } from "./components/modals/AccountModal";
import { LoginModal } from "./components/modals/LoginModal";
import { LogoutConfirmModal } from "./components/modals/LogoutConfirmModal";
import { ExportDownloadModal } from "./components/modals/ExportDownloadModal";
import { ShareDesignModal } from "./components/modals/ShareDesignModal";
import { CheckCircle, Info } from "lucide-react";

const MainAppContent: React.FC = () => {
  const {
    activeView,
    toastMessage,
    isExportModalOpen,
    setIsExportModalOpen,
    isShareModalOpen,
    setIsShareModalOpen,
    activeModalDesign,
    showToast,
  } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation Bar (Hidden on standalone Login View and Admin Portal for clean immersion) */}
      {activeView !== "login" && activeView !== "admin_portal" && <Navbar />}

      {/* Main View Switcher */}
      <main className="flex-1 flex flex-col">
        {activeView === "templates" && <TemplateGallery />}
        {activeView === "editor" && <CanvasEditor />}
        {activeView === "admin_portal" && <AdminPortal />}
        {activeView === "upload_design" && <UploadDesignView />}
        {activeView === "my_designs" && <MyDesignsView />}
        {activeView === "login" && <LoginView />}
      </main>

      {/* Footer (hidden in editor view, login view, and admin portal for distraction-free immersion) */}
      {activeView !== "editor" && activeView !== "login" && activeView !== "admin_portal" && (
        <footer className="bg-white border-t border-slate-200 py-8 text-center text-xs text-slate-500 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-400">
              © {new Date().getFullYear()} Creative Canvas Studio AI. Platform Desain Grafis Cerdas & Kolaboratif.
            </p>
            <div className="flex items-center gap-4 text-slate-500 font-medium">
              <span>Admin Utama: admin@designstudio.com</span>
              <span>•</span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Sistem Online
              </span>
            </div>
          </div>
        </footer>
      )}

      {/* Global Modals */}
      <LanguageModal />
      <PersonalInfoModal />
      <AccountModal />
      <LoginModal />
      <LogoutConfirmModal />
      <ExportDownloadModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        design={activeModalDesign}
        onToast={showToast}
      />
      <ShareDesignModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        design={activeModalDesign}
        onToast={showToast}
      />

      {/* Global Floating Toast Notification */}
      {toastMessage && (
        <div
          id="global-toast"
          className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-200"
        >
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-medium pr-2">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
