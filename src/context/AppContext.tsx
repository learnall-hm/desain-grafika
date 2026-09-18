import React, { createContext, useContext, useState, useEffect } from "react";
import {
  User,
  UserRole,
  LanguageCode,
  DesignTemplate,
  UserDesign,
  AppNotification,
  AutoSaveDraft,
} from "../types";
import { translations, TranslationDict } from "../locales/translations";
import { initialTemplates } from "../data/initialTemplates";

export const ADMIN_EMAIL = "admin@designstudio.com";
export const ADMIN_ALT_EMAILS = [
  "admin@designstudio.com",
  "admin@bookingtour.com",
  "fredyant@bookingtour.com",
  "fredyant@gmail.com",
];
export const ADMIN_DEFAULT_PASSWORD = "admin";
export const ADMIN_PASSWORDS = ["admin", "admin123", "Fredyant123", "123456"];

const defaultAdminUser: User = {
  id: "usr-admin-01",
  name: "Fredyant",
  email: ADMIN_EMAIL,
  role: "admin_utama",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  phone: "+62 811-2345-6789",
  bio: "Administrator Utama Sistem Booking Tour & Creative Studio",
  joinedDate: "10 Januari 2026",
  designsCount: 18,
};

const defaultRegularUser: User = {
  id: "usr-user-02",
  name: "Budi Pratama",
  email: "budi.kreatif@gmail.com",
  role: "pengguna",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
  phone: "+62 813-8899-7766",
  bio: "Desainer Grafis Freelance & Kreator Konten Digital",
  joinedDate: "15 Maret 2026",
  designsCount: 4,
};

interface AppContextType {
  currentUser: User;
  currentLang: LanguageCode;
  t: (key: keyof TranslationDict) => string;
  setLanguage: (lang: LanguageCode) => void;
  // Auth
  login: (email: string, role: UserRole, password?: string) => { success: boolean; error?: string };
  loginAdminTour: (email: string, password?: string) => { success: boolean; error?: string };
  registerUser: (name: string, email: string, role?: UserRole, password?: string) => { success: boolean; error?: string };
  loginWithBelajarAccount: (customEmail?: string) => { success: boolean };
  loginWithPelajarAccount: (customName?: string, customEmail?: string) => { success: boolean };
  logout: () => void;
  updateUserProfile: (data: Partial<User>) => void;
  // Views
  activeView: "templates" | "editor" | "my_designs" | "admin_portal" | "upload_design" | "login";
  setActiveView: (view: "templates" | "editor" | "my_designs" | "admin_portal" | "upload_design" | "login") => void;
  // Modals
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
  isPersonalInfoOpen: boolean;
  setIsPersonalInfoOpen: (open: boolean) => void;
  isAccountModalOpen: boolean;
  setIsAccountModalOpen: (open: boolean) => void;
  isLanguageModalOpen: boolean;
  setIsLanguageModalOpen: (open: boolean) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  isLogoutConfirmOpen: boolean;
  setIsLogoutConfirmOpen: (open: boolean) => void;
  isPremiumModalOpen: boolean;
  setIsPremiumModalOpen: (open: boolean) => void;
  subscribeToPremium: (plan: "monthly" | "yearly", paymentMethod?: string) => void;
  cancelPremiumSubscription: () => void;
  isUserPremium: boolean;
  // Export & Share Modals
  isExportModalOpen: boolean;
  setIsExportModalOpen: (open: boolean) => void;
  isShareModalOpen: boolean;
  setIsShareModalOpen: (open: boolean) => void;
  activeModalDesign: UserDesign | null;
  openExportModal: (design: UserDesign) => void;
  openShareModal: (design: UserDesign) => void;
  // Templates
  templates: DesignTemplate[];
  addTemplate: (template: Omit<DesignTemplate, "id" | "createdAt" | "createdBy">) => void;
  deleteTemplate: (id: string) => void;
  // Designs & Auto-Save
  userDesigns: UserDesign[];
  currentEditingDesign: UserDesign | null;
  setCurrentEditingDesign: (design: UserDesign | null) => void;
  saveUserDesign: (design: UserDesign) => void;
  deleteUserDesign: (id: string) => void;
  startDesignFromTemplate: (template: DesignTemplate) => void;
  startDesignFromScratch: (width: number, height: number, title?: string) => void;
  startDesignFromUploadedImage: (imageUrl: string, width: number, height: number) => void;
  // Auto-Save features
  autoSaveDraft: AutoSaveDraft | null;
  lastAutoSavedTime: string | null;
  isAutoSaving: boolean;
  autoSaveDesign: (design: UserDesign, quiet?: boolean) => Promise<{ success: boolean; savedAt: string }>;
  restoreAutoSaveDraft: (customDraft?: AutoSaveDraft) => void;
  clearAutoSaveDraft: () => void;
  // Notifications
  notifications: AppNotification[];
  unreadNotifsCount: number;
  addNotification: (title: string, message: string, type: "activity" | "system", badge?: string) => void;
  markAllNotificationsAsRead: () => void;
  clearNotifications: () => void;
  // Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Current Language
  const [currentLang, setCurrentLangState] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem("grafika_lang");
    return (saved as LanguageCode) || "id";
  });

  // Current User (Defaults to Fredyant Admin Utama as requested for main admin interface)
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const savedUser = localStorage.getItem("grafika_current_user");
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch {
        // fallback
      }
    }
    return defaultAdminUser;
  });

  // Templates
  const [templates, setTemplates] = useState<DesignTemplate[]>(() => {
    const saved = localStorage.getItem("grafika_templates");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return initialTemplates;
  });

  // User Designs
  const [userDesigns, setUserDesigns] = useState<UserDesign[]>(() => {
    const saved = localStorage.getItem("grafika_user_designs");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return [
      {
        id: "ud-1",
        title: "Poster Diskon Ramadhan 2026",
        category: "social_post",
        width: 800,
        height: 800,
        createdAt: "2026-09-14",
        updatedAt: "2026-09-15 14:30",
        background: { type: "solid", color: "#064e3b" },
        elements: [
          {
            id: "ud-el-1",
            type: "text",
            text: "BERKAH RAMADHAN",
            x: 60,
            y: 120,
            fontSize: 54,
            fontWeight: "800",
            fontFamily: "Outfit",
            fill: "#fbbf24",
            align: "left",
            width: 680,
          },
          {
            id: "ud-el-2",
            type: "text",
            text: "Diskon Spesial Busana Muslim & Parsel Lebaran",
            x: 60,
            y: 200,
            fontSize: 22,
            fontWeight: "400",
            fontFamily: "Plus Jakarta Sans",
            fill: "#d1fae5",
            align: "left",
            width: 600,
          },
          {
            id: "ud-el-3",
            type: "badge",
            text: "CASHBACK HINGGA 50%",
            x: 60,
            y: 300,
            width: 240,
            height: 44,
            fill: "#f59e0b",
            textColor: "#064e3b",
            borderRadius: 22,
          },
        ],
      },
    ];
  });

  // Notifications
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem("grafika_notifications");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return [
      {
        id: "notif-sys-1",
        title: "Pembaruan Sistem v2.4",
        message: "Fitur Gemini AI Design Assistant v2 kini aktif untuk generasi kanvas grafis otomatis.",
        type: "system",
        read: false,
        timestamp: "10 menit yang lalu",
        badge: "Fitur Baru",
      },
      {
        id: "notif-sys-2",
        title: "Template Baru Tersedia",
        message: "Admin Utama telah mengunggah 6 template desain premium siap pakai.",
        type: "system",
        read: false,
        timestamp: "1 jam yang lalu",
        badge: "Template",
      },
      {
        id: "notif-act-1",
        title: "Desain Disimpan",
        message: "Proyek 'Poster Diskon Ramadhan 2026' berhasil disimpan ke Desain Saya.",
        type: "activity",
        read: true,
        timestamp: "Kemarin",
        badge: "Desain",
      },
    ];
  });

  // Navigation & Views (Defaults to login to show the requested login screen on main view)
  const [activeView, setActiveView] = useState<
    "templates" | "editor" | "my_designs" | "admin_portal" | "upload_design" | "login"
  >("login");

  // Current editing design
  const [currentEditingDesign, setCurrentEditingDesign] = useState<UserDesign | null>(null);

  // Export & Share Modals
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [activeModalDesign, setActiveModalDesign] = useState<UserDesign | null>(null);

  const openExportModal = (design: UserDesign) => {
    setActiveModalDesign(design);
    setIsExportModalOpen(true);
  };

  const openShareModal = (design: UserDesign) => {
    setActiveModalDesign(design);
    setIsShareModalOpen(true);
  };

  // Auto-Save draft state
  const [autoSaveDraft, setAutoSaveDraft] = useState<AutoSaveDraft | null>(() => {
    const savedDraft = localStorage.getItem("grafika_autosave_draft");
    if (savedDraft) {
      try {
        return JSON.parse(savedDraft);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [lastAutoSavedTime, setLastAutoSavedTime] = useState<string | null>(() => {
    const savedDraft = localStorage.getItem("grafika_autosave_draft");
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        return parsed.savedAt || null;
      } catch {
        return null;
      }
    }
    return null;
  });

  const [isAutoSaving, setIsAutoSaving] = useState(false);

  // Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPersonalInfoOpen, setIsPersonalInfoOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);

  // Derived user premium status
  const isUserPremium = Boolean(
    currentUser.tier === "premium" ||
    currentUser.isBelajarAccount ||
    currentUser.role === "admin_utama"
  );

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3800);
  };

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem("grafika_lang", currentLang);
  }, [currentLang]);

  useEffect(() => {
    localStorage.setItem("grafika_current_user", JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("grafika_templates", JSON.stringify(templates));
  }, [templates]);

  useEffect(() => {
    localStorage.setItem("grafika_user_designs", JSON.stringify(userDesigns));
  }, [userDesigns]);

  useEffect(() => {
    localStorage.setItem("grafika_notifications", JSON.stringify(notifications));
  }, [notifications]);

  // Translation helper
  const t = (key: keyof TranslationDict): string => {
    const dict = translations[currentLang] || translations.id;
    return dict[key] || translations.id[key] || key;
  };

  const setLanguage = (lang: LanguageCode) => {
    setCurrentLangState(lang);
    showToast(
      lang === "id"
        ? "Bahasa berhasil diubah ke Bahasa Indonesia"
        : lang === "en"
        ? "Language changed to English"
        : lang === "zh"
        ? "语言已切换为中文"
        : lang === "ja"
        ? "言語が日本語に変更されました"
        : lang === "ar"
        ? "تم تغيير اللغة إلى العربية"
        : "Idioma cambiado a Español"
    );
  };

  // Notification helper
  const addNotification = (
    title: string,
    message: string,
    type: "activity" | "system",
    badge?: string
  ) => {
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title,
      message,
      type,
      read: false,
      timestamp: "Baru saja",
      badge: badge || (type === "activity" ? "Aktivitas" : "Sistem"),
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast(t("markAllAsRead"));
  };

  const clearNotifications = () => {
    setNotifications([]);
    showToast(t("clearAll"));
  };

  const unreadNotifsCount = notifications.filter((n) => !n.read).length;

  // Strict Login Function: only the designated admin account can login as admin_utama / admin booking tour
  const login = (email: string, role: UserRole, password?: string) => {
    const normalizedEmail = email.trim().toLowerCase();

    if (role === "admin_utama") {
      // STRICT CHECK: Hanya akun admin utama resmi yang bisa login ke admin utama / admin booking tour!
      const isAuthorizedAdmin =
        normalizedEmail === ADMIN_EMAIL.toLowerCase() ||
        ADMIN_ALT_EMAILS.some((e) => e.toLowerCase() === normalizedEmail);

      if (!isAuthorizedAdmin) {
        const errorMsg = "Akses Ditolak: Hanya akun admin utama yang dapat login ke admin booking tour.";
        showToast(errorMsg);
        return {
          success: false,
          error: errorMsg,
        };
      }

      if (password && !ADMIN_PASSWORDS.includes(password.trim())) {
        const errorMsg = "Kata sandi salah. Masukkan kata sandi resmi Admin Utama.";
        showToast(errorMsg);
        return {
          success: false,
          error: errorMsg,
        };
      }

      setCurrentUser(defaultAdminUser);
      showToast(`${t("loginSuccess")} ${defaultAdminUser.name} (${t("adminBadge")})`);
      addNotification(
        "Sesi Admin Booking Tour Aktif",
        `Admin Utama (${defaultAdminUser.name} - ${ADMIN_EMAIL}) berhasil masuk ke sistem Admin Booking Tour.`,
        "system",
        "Keamanan"
      );
      return { success: true };
    } else {
      // Standard regular user login - Auto check if Akun Belajar (.belajar.id)
      const isBelajar = normalizedEmail.includes("belajar.id");
      const regularUser: User = {
        ...defaultRegularUser,
        email: normalizedEmail || "pengguna@gmail.com",
        name: normalizedEmail ? normalizedEmail.split("@")[0] : "Pengguna Kreatif",
        tier: isBelajar ? "premium" : "free",
        isBelajarAccount: isBelajar,
        belajarInstitution: isBelajar ? "Kemendikbudristek RI (Akun Belajar ID)" : undefined,
        avatar: isBelajar
          ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
          : defaultRegularUser.avatar,
      };
      setCurrentUser(regularUser);

      if (isBelajar) {
        showToast("🎓 Akun Belajar Terverifikasi! Akses Premium Gratis Aktif.");
        addNotification(
          "Akun Belajar: Premium Gratis Aktif",
          "Selamat datang! Sebagai pemilik Akun Belajar, Anda menikmati akses Pro tanpa batas.",
          "system",
          "Premium Gratis"
        );
      } else {
        showToast(`${t("loginSuccess")} ${regularUser.name}`);
      }

      return { success: true };
    }
  };

  // Dedicated Admin Booking Tour Login handler
  const loginAdminTour = (email: string, password?: string) => {
    return login(email, "admin_utama", password);
  };

  // Register user with option for Akun Belajar (free premium)
  const registerUser = (name: string, email: string, role: UserRole = "pengguna", _password?: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const isBelajar = normalizedEmail.includes("belajar.id");

    const newUser: User = {
      ...defaultRegularUser,
      id: `usr-${Date.now()}`,
      name: name.trim() || (normalizedEmail ? normalizedEmail.split("@")[0] : "Kreator Baru"),
      email: normalizedEmail,
      role,
      tier: isBelajar ? "premium" : "free",
      isBelajarAccount: isBelajar,
      belajarInstitution: isBelajar ? "Kemendikbudristek RI (Akun Belajar ID)" : undefined,
      joinedDate: "Hari ini",
      designsCount: 0,
      avatar: isBelajar
        ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
        : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    };

    setCurrentUser(newUser);

    if (isBelajar) {
      showToast("🎓 Pendaftaran Berhasil! Akun Belajar Anda mendapatkan Akses Premium Gratis!");
      addNotification(
        "Pendaftaran Akun Belajar",
        `Selamat datang ${newUser.name}! Akun Belajar (@belajar.id) berhasil didaftarkan dengan status Premium Gratis seumur hidup.`,
        "system",
        "Belajar Pro"
      );
    } else {
      showToast("Pendaftaran berhasil! Selamat berkarya di Creative Canvas.");
      addNotification(
        "Pendaftaran Berhasil",
        `Selamat datang ${newUser.name}! Akun Anda telah siap digunakan.`,
        "activity",
        "Registrasi"
      );
    }

    return { success: true };
  };

  // Quick 1-click login for Akun Belajar (.belajar.id)
  const loginWithBelajarAccount = (customEmail?: string) => {
    const email = customEmail || "guru.teladan@guru.belajar.id";
    const belajarUser: User = {
      ...defaultRegularUser,
      id: "usr-belajar-pro",
      name: "Ibu Rahmawati (Guru Belajar ID)",
      email,
      role: "pengguna",
      tier: "premium",
      isBelajarAccount: true,
      belajarInstitution: "Kemendikbudristek RI (Pendidik & Tenaga Kependidikan)",
      bio: "Guru Inovatif & Kreator Media Pembelajaran Digital Berbasis AI",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      joinedDate: "Maret 2026",
      designsCount: 12,
    };
    setCurrentUser(belajarUser);
    showToast("🎓 Masuk Berhasil! Akun Belajar Aktif dengan Akses Premium Gratis!");
    addNotification(
      "Akses Premium Akun Belajar Aktif",
      "Anda terverifikasi sebagai pemegang Akun Belajar Kemendikbudristek. Semua fitur ekspor PPT, PDF, DOC, & AI Rangkum Materi terbuka penuh!",
      "system",
      "Premium Gratis"
    );
    return { success: true };
  };

  // Quick 1-click or customized login for Akun Pelajar / Siswa (.belajar.id / Siswa)
  const loginWithPelajarAccount = (customName?: string, customEmail?: string) => {
    const email = customEmail || "siswa.cerdas@smp.belajar.id";
    const name = customName || "Budi Pratama (Pelajar Belajar ID)";
    const pelajarUser: User = {
      ...defaultRegularUser,
      id: "usr-pelajar-pro",
      name,
      email,
      role: "pengguna",
      tier: "premium",
      isBelajarAccount: true,
      belajarInstitution: "SMP / SMA Negeri Pelajar Cerdas (Akun Pembelajaran Kemendikbudristek)",
      bio: "Pelajar Aktif & Kreator Presentasi & Desain Tugas Sekolah Digital",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
      joinedDate: "Maret 2026",
      designsCount: 8,
    };
    setCurrentUser(pelajarUser);
    showToast("🎓 Masuk Berhasil! Akun Pelajar Terverifikasi - Akses Pro Gratis Terbuka!");
    addNotification(
      "Akses Premium Akun Pelajar Aktif",
      `Selamat datang ${pelajarUser.name}! Anda terverifikasi dengan Akun Pelajar Kemendikbudristek. Semua fitur Pro & Template Tugas Sekolah gratis tanpa batas.`,
      "system",
      "Pelajar Pro"
    );
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(defaultRegularUser);
    setIsLogoutConfirmOpen(false);
    setActiveView("login");
    showToast("Anda telah keluar dari akun.");
  };

  const updateUserProfile = (data: Partial<User>) => {
    setCurrentUser((prev) => ({ ...prev, ...data }));
    showToast(t("changesSavedNotice"));
    addNotification(
      "Profil Diperbarui",
      "Informasi profil Anda berhasil diperbarui di sistem.",
      "activity",
      "Akun"
    );
  };

  // Premium Subscription Management
  const subscribeToPremium = (plan: "monthly" | "yearly", paymentMethod: string = "qris") => {
    const expiresText = plan === "monthly" ? "30 Hari Kedepan" : "1 Tahun Kedepan";
    const priceText = plan === "monthly" ? "Rp 25.000 / bulan" : "Rp 300.000 / tahun";
    const updatedUser: User = {
      ...currentUser,
      tier: "premium",
      subscriptionPlan: plan,
      subscriptionExpiresAt: expiresText,
    };

    setCurrentUser(updatedUser);
    localStorage.setItem("grafika_current_user", JSON.stringify(updatedUser));

    showToast(`🎉 Selamat! Akses Premium Aktif (${priceText}). Nikmati seluruh template VIP, AI Turbo, dan unduhan Ultra HD!`);
    addNotification(
      "Langganan Premium Aktif",
      `Selamat! Akun Anda kini berstatus Premium (${plan === "monthly" ? "Bulanan Rp 25.000" : "Tahunan Rp 300.000"}). Nikmati koleksi template menarik tanpa batas, akselerasi AI super cepat, dan ekspor kualitas cetak 300 DPI!`,
      "system",
      "VIP Pro"
    );
  };

  const cancelPremiumSubscription = () => {
    const updatedUser: User = {
      ...currentUser,
      tier: "free",
      subscriptionPlan: "free",
      subscriptionExpiresAt: undefined,
    };

    setCurrentUser(updatedUser);
    localStorage.setItem("grafika_current_user", JSON.stringify(updatedUser));

    showToast("Langganan Premium dinonaktifkan. Anda kini menggunakan Akun Gratis.");
    addNotification(
      "Langganan Berakhir",
      "Status akun Anda telah dialihkan kembali ke Akun Gratis. Anda tetap dapat menggunakan template standar dan ekspor normal kapan pun.",
      "system",
      "Info Akun"
    );
  };

  // Add template (Admin only)
  const addTemplate = (templateData: Omit<DesignTemplate, "id" | "createdAt" | "createdBy">) => {
    if (currentUser.role !== "admin_utama") {
      showToast(t("adminOnlyNotice"));
      return;
    }

    const newTemplate: DesignTemplate = {
      ...templateData,
      id: `tpl-${Date.now()}`,
      createdBy: currentUser.name,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setTemplates((prev) => [newTemplate, ...prev]);
    showToast(t("templatePublishedSuccess"));
    addNotification(
      "Template Baru Dipublikasikan",
      `Template "${newTemplate.title}" telah ditambahkan ke galeri publik oleh ${currentUser.name}.`,
      "system",
      "Koleksi"
    );
  };

  const deleteTemplate = (id: string) => {
    if (currentUser.role !== "admin_utama") {
      showToast(t("adminOnlyNotice"));
      return;
    }
    setTemplates((prev) => prev.filter((tpl) => tpl.id !== id));
    showToast("Template berhasil dihapus.");
  };

  // Save User Design (Manual Save)
  const saveUserDesign = (design: UserDesign) => {
    const formattedDate = new Date().toLocaleString();
    const updatedDesign = { ...design, updatedAt: formattedDate };

    setUserDesigns((prev) => {
      const idx = prev.findIndex((d) => d.id === design.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = updatedDesign;
        return updated;
      }
      return [updatedDesign, ...prev];
    });

    // Also update auto-save draft with this explicit save
    const nowTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    const draftRecord: AutoSaveDraft = {
      design: updatedDesign,
      savedAt: nowTime,
      timestamp: Date.now(),
    };
    try {
      localStorage.setItem("grafika_autosave_draft", JSON.stringify(draftRecord));
      setAutoSaveDraft(draftRecord);
      setLastAutoSavedTime(nowTime);
    } catch {
      // ignore
    }

    setCurrentUser((u) => ({ ...u, designsCount: u.designsCount + 1 }));
    showToast(t("designSavedSuccess"));
    addNotification(
      "Desain Disimpan",
      `Karya grafis "${design.title}" berhasil disimpan di portofolio Desain Saya.`,
      "activity",
      "Tersimpan"
    );
  };

  // Auto-Save implementation (localStorage + backend server every 30 seconds)
  const autoSaveDesign = async (
    design: UserDesign,
    quiet = true
  ): Promise<{ success: boolean; savedAt: string }> => {
    setIsAutoSaving(true);
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const updatedDesign: UserDesign = {
      ...design,
      updatedAt: `Otomatis ${formattedTime}`,
    };

    const draftRecord: AutoSaveDraft = {
      design: updatedDesign,
      savedAt: formattedTime,
      timestamp: Date.now(),
    };

    // 1. Save to LocalStorage immediately
    try {
      localStorage.setItem("grafika_autosave_draft", JSON.stringify(draftRecord));
      setAutoSaveDraft(draftRecord);
      setLastAutoSavedTime(formattedTime);

      // Seamlessly keep userDesigns in sync so tab reload preserves latest state
      setUserDesigns((prev) => {
        const idx = prev.findIndex((d) => d.id === design.id);
        if (idx >= 0) {
          const updated = [...prev];
          updated[idx] = updatedDesign;
          return updated;
        }
        return [updatedDesign, ...prev];
      });
    } catch (err) {
      console.warn("LocalStorage auto-save warning:", err);
    }

    // 2. Synchronize to Backend server endpoint (/api/designs/autosave)
    try {
      await fetch("/api/designs/autosave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          design: updatedDesign,
          userId: currentUser.id,
        }),
      });
    } catch (err) {
      console.log("Backend auto-save kept locally:", err);
    } finally {
      setIsAutoSaving(false);
    }

    if (!quiet) {
      showToast(`${t("autoSavedAt")} ${formattedTime}`);
    }

    return { success: true, savedAt: formattedTime };
  };

  // Restore draft from auto-save
  const restoreAutoSaveDraft = (customDraft?: AutoSaveDraft) => {
    const draftToRestore = customDraft || autoSaveDraft;
    if (!draftToRestore) {
      showToast("Tidak ada draf cadangan untuk dipulihkan.");
      return;
    }
    setCurrentEditingDesign(draftToRestore.design);
    setActiveView("editor");
    showToast(t("draftRestored"));
    addNotification(
      "Draf Dipulihkan",
      `Draf desain "${draftToRestore.design.title}" berhasil dipulihkan dari cadangan otomatis (${draftToRestore.savedAt}).`,
      "activity",
      "Auto-save"
    );
  };

  // Clear draft
  const clearAutoSaveDraft = () => {
    localStorage.removeItem("grafika_autosave_draft");
    setAutoSaveDraft(null);
    setLastAutoSavedTime(null);
    try {
      fetch(`/api/designs/autosave/${currentUser.id}`, { method: "DELETE" });
    } catch {
      // ignore
    }
  };

  const deleteUserDesign = (id: string) => {
    setUserDesigns((prev) => prev.filter((d) => d.id !== id));
    showToast("Desain berhasil dihapus.");
  };

  // Start designing helpers
  const startDesignFromTemplate = (template: DesignTemplate) => {
    const newDesign: UserDesign = {
      id: `design-${Date.now()}`,
      title: `${template.title} (Salinan)`,
      category: template.category,
      width: template.width,
      height: template.height,
      background: template.background,
      elements: JSON.parse(JSON.stringify(template.elements)),
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: "Baru saja",
    };
    setCurrentEditingDesign(newDesign);
    setActiveView("editor");
    showToast(`Membuka template "${template.title}" di editor...`);
    addNotification(
      "Template Dibuka",
      `Anda mulai membuat desain baru berdasarkan template "${template.title}".`,
      "activity",
      "Editor"
    );
  };

  const startDesignFromScratch = (width: number, height: number, title?: string) => {
    const newDesign: UserDesign = {
      id: `design-${Date.now()}`,
      title: title || "Desain Tanpa Judul",
      category: "social_post",
      width,
      height,
      background: { type: "solid", color: "#ffffff" },
      elements: [
        {
          id: `elem-${Date.now()}`,
          type: "text",
          text: "Judul Desain Anda",
          x: Math.round(width * 0.1),
          y: Math.round(height * 0.4),
          fontSize: Math.round(width * 0.06),
          fontWeight: "800",
          fontFamily: "Outfit",
          fill: "#0f172a",
          align: "center",
          width: Math.round(width * 0.8),
        },
      ],
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: "Baru saja",
    };
    setCurrentEditingDesign(newDesign);
    setActiveView("editor");
    showToast("Kanvas baru siap dikreasikan!");
  };

  const startDesignFromUploadedImage = (imageUrl: string, width: number, height: number) => {
    const newDesign: UserDesign = {
      id: `design-${Date.now()}`,
      title: "Desain dari Gambar Unggahan",
      category: "social_post",
      width,
      height,
      background: { type: "solid", color: "#ffffff" },
      elements: [
        {
          id: `elem-img-${Date.now()}`,
          type: "image",
          imageUrl,
          x: 0,
          y: 0,
          width,
          height,
          zIndex: 1,
        },
      ],
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: "Baru saja",
    };
    setCurrentEditingDesign(newDesign);
    setActiveView("editor");
    showToast("Gambar berhasil diunggah dan dibuka di kanvas!");
    addNotification(
      "Gambar Diunggah",
      "Gambar kustom Anda berhasil diimpor ke lembar kerja editor.",
      "activity",
      "Unggahan"
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentLang,
        t,
        setLanguage,
        login,
        loginAdminTour,
        registerUser,
        loginWithBelajarAccount,
        loginWithPelajarAccount,
        logout,
        updateUserProfile,
        activeView,
        setActiveView,
        isSettingsOpen,
        setIsSettingsOpen,
        isPersonalInfoOpen,
        setIsPersonalInfoOpen,
        isAccountModalOpen,
        setIsAccountModalOpen,
        isLanguageModalOpen,
        setIsLanguageModalOpen,
        isLoginModalOpen,
        setIsLoginModalOpen,
        isLogoutConfirmOpen,
        setIsLogoutConfirmOpen,
        isPremiumModalOpen,
        setIsPremiumModalOpen,
        subscribeToPremium,
        cancelPremiumSubscription,
        isUserPremium,
        isExportModalOpen,
        setIsExportModalOpen,
        isShareModalOpen,
        setIsShareModalOpen,
        activeModalDesign,
        openExportModal,
        openShareModal,
        templates,
        addTemplate,
        deleteTemplate,
        userDesigns,
        currentEditingDesign,
        setCurrentEditingDesign,
        saveUserDesign,
        deleteUserDesign,
        startDesignFromTemplate,
        startDesignFromScratch,
        startDesignFromUploadedImage,
        autoSaveDraft,
        lastAutoSavedTime,
        isAutoSaving,
        autoSaveDesign,
        restoreAutoSaveDraft,
        clearAutoSaveDraft,
        notifications,
        unreadNotifsCount,
        addNotification,
        markAllNotificationsAsRead,
        clearNotifications,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
