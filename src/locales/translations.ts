import { LanguageCode } from "../types";

export interface TranslationDict {
  // Brand & Nav
  appTitle: string;
  appTagline: string;
  navTemplates: string;
  navCreate: string;
  navMyDesigns: string;
  navUpload: string;
  navAdminPortal: string;
  adminBadge: string;
  userBadge: string;

  // Roles & Auth
  loginAsAdmin: string;
  loginAsUser: string;
  switchRole: string;
  adminOnlyNotice: string;
  adminLoginTitle: string;
  adminLoginDesc: string;
  emailLabel: string;
  passwordLabel: string;
  loginBtn: string;
  loginSuccess: string;
  loginErrorAdminOnly: string;
  logoutBtn: string;
  logoutConfirmTitle: string;
  logoutConfirmMsg: string;
  cancel: string;
  confirm: string;

  // Settings Menu beside profile
  settingsMenu: string;
  personalInfo: string;
  languageSelect: string;
  accountSettings: string;
  logout: string;

  // Personal Info Modal
  personalInfoTitle: string;
  personalInfoDesc: string;
  fullName: string;
  phoneNumber: string;
  bioLabel: string;
  memberSince: string;
  saveChanges: string;
  changesSavedNotice: string;

  // Account Modal
  accountTitle: string;
  accountDesc: string;
  currentPlan: string;
  storageUsed: string;
  security: string;
  changePassword: string;
  preferences: string;
  darkCanvasMode: string;
  highResExport: string;

  // Language Modal
  languageTitle: string;
  languageDesc: string;
  currentLanguage: string;

  // Notifications
  notifications: string;
  allNotifications: string;
  activityTab: string;
  systemTab: string;
  markAllAsRead: string;
  clearAll: string;
  noNotifications: string;
  newActivityNotif: string;
  newSystemNotif: string;

  // Admin Portal & Template Upload
  adminPortalTitle: string;
  adminPortalDesc: string;
  uploadTemplateBtn: string;
  manageTemplates: string;
  systemBroadcastTitle: string;
  broadcastPlaceholder: string;
  sendBroadcast: string;
  templateTitleLabel: string;
  templateCategoryLabel: string;
  templateDimensionsLabel: string;
  templateTagsLabel: string;
  templateBgColorLabel: string;
  uploadPreviewImage: string;
  publishTemplateBtn: string;
  templatePublishedSuccess: string;
  deleteTemplate: string;
  templateCount: string;

  // Design Gallery / Categories
  exploreTemplates: string;
  exploreTemplatesDesc: string;
  searchTemplatesPlaceholder: string;
  catAll: string;
  catSocialPost: string;
  catStory: string;
  catPoster: string;
  catBanner: string;
  catLogo: string;
  catBusinessCard: string;
  catFlyer: string;
  useTemplate: string;
  previewTemplate: string;

  // Design Creation & Upload
  createNewDesign: string;
  createNewDesignDesc: string;
  presetSizes: string;
  customSize: string;
  widthLabel: string;
  heightLabel: string;
  startDesigning: string;
  uploadDesignTitle: string;
  uploadDesignDesc: string;
  dragDropOrBrowse: string;
  supportsFormats: string;
  uploadFileBtn: string;

  // Canvas Editor
  canvasEditor: string;
  saveDesign: string;
  exportDesign: string;
  exportPng: string;
  exportJpg: string;
  exportSvg: string;
  addText: string;
  addShape: string;
  addIcon: string;
  addImage: string;
  canvasBackground: string;
  layers: string;
  deleteElement: string;
  duplicateElement: string;
  bringForward: string;
  sendBackward: string;
  fontSize: string;
  textColor: string;
  shapeFill: string;
  opacity: string;
  alignment: string;
  designSavedSuccess: string;
  designExportedSuccess: string;
  autoSaveStatus: string;
  autoSaveActive: string;
  autoSaving: string;
  autoSavedAt: string;
  autoSaveDraftFound: string;
  restoreDraft: string;
  dismissDraft: string;
  draftRestored: string;
  autoSaveIntervalNotice: string;

  // AI Assistant
  aiAssistant: string;
  aiAssistantDesc: string;
  aiPromptPlaceholder: string;
  generateWithAi: string;
  generatingAiDesign: string;
  aiPreset1: string;
  aiPreset2: string;
  aiPreset3: string;
  aiPreset4: string;
  aiCopyGenerator: string;
  aiGenerateTaglines: string;
  aiApplyToCanvas: string;
  aiDesignReady: string;

  // My Designs
  myDesignsTitle: string;
  myDesignsDesc: string;
  noDesignsYet: string;
  createFirstDesign: string;
  editDesign: string;
  deleteDesign: string;
  lastEdited: string;
}

export const translations: Record<LanguageCode, TranslationDict> = {
  id: {
    appTitle: "Grafika Studio AI",
    appTagline: "Platform Desain Grafis Cerdas & Kreatif",
    navTemplates: "Template Desain",
    navCreate: "Buat Desain",
    navMyDesigns: "Desain Saya",
    navUpload: "Unggah Desain",
    navAdminPortal: "Portal Admin Utama",
    adminBadge: "Admin Utama",
    userBadge: "Pengguna Kreatif",

    loginAsAdmin: "Masuk Admin Utama",
    loginAsUser: "Masuk Pengguna",
    switchRole: "Beralih Akun",
    adminOnlyNotice: "Hanya akun admin utama yang berwenang mengakses portal ini.",
    adminLoginTitle: "Autentikasi Admin Utama",
    adminLoginDesc: "Masukkan kredensial akun admin utama untuk mengelola sistem dan template.",
    emailLabel: "Alamat Email",
    passwordLabel: "Kata Sandi",
    loginBtn: "Masuk",
    loginSuccess: "Berhasil masuk sebagai",
    loginErrorAdminOnly: "Akses ditolak: Hanya akun admin utama resmi yang diizinkan masuk!",
    logoutBtn: "Keluar",
    logoutConfirmTitle: "Konfirmasi Keluar",
    logoutConfirmMsg: "Apakah Anda yakin ingin keluar dari akun Anda?",
    cancel: "Batal",
    confirm: "Ya, Keluar",

    settingsMenu: "Pengaturan",
    personalInfo: "Informasi Pribadi",
    languageSelect: "Bahasa",
    accountSettings: "Pengaturan Akun",
    logout: "Keluar Akun",

    personalInfoTitle: "Informasi Pribadi",
    personalInfoDesc: "Kelola profil, informasi kontak, dan identitas desain Anda.",
    fullName: "Nama Lengkap",
    phoneNumber: "Nomor Telepon",
    bioLabel: "Biografi Singkat",
    memberSince: "Bergabung Sejak",
    saveChanges: "Simpan Perubahan",
    changesSavedNotice: "Informasi pribadi berhasil diperbarui!",

    accountTitle: "Pengaturan Akun",
    accountDesc: "Kelola preferensi akun, penyimpanan, dan keamanan Anda.",
    currentPlan: "Paket Layanan",
    storageUsed: "Penyimpanan Digunakan",
    security: "Keamanan Akun",
    changePassword: "Ubah Kata Sandi",
    preferences: "Preferensi Desain",
    darkCanvasMode: "Mode Kanvas Gelap",
    highResExport: "Ekspor Resolusi Ultra HD",

    languageTitle: "Pilih Bahasa Sistem",
    languageDesc: "Ubah bahasa tampilan website. Semua teks antarmuka akan disesuaikan otomatis.",
    currentLanguage: "Bahasa Aktif",

    notifications: "Notifikasi",
    allNotifications: "Semua Notifikasi",
    activityTab: "Aktivitas Desain",
    systemTab: "Pembaruan Sistem",
    markAllAsRead: "Tandai Sudah Dibaca",
    clearAll: "Bersihkan Semua",
    noNotifications: "Belum ada notifikasi baru.",
    newActivityNotif: "Aktivitas Desain Baru",
    newSystemNotif: "Pembaruan Sistem",

    adminPortalTitle: "Panel Kendali Admin Utama",
    adminPortalDesc: "Unggah template baru, kelola aset desain publik, dan siarkan pembaruan sistem.",
    uploadTemplateBtn: "Unggah Template Baru",
    manageTemplates: "Kelola Koleksi Template",
    systemBroadcastTitle: "Kirim Pengumuman Sistem",
    broadcastPlaceholder: "Tulis pesan pembaruan sistem untuk semua pengguna...",
    sendBroadcast: "Siarkan Notifikasi",
    templateTitleLabel: "Judul Template",
    templateCategoryLabel: "Kategori Template",
    templateDimensionsLabel: "Ukuran / Dimensi (px)",
    templateTagsLabel: "Tagar (pisahkan dengan koma)",
    templateBgColorLabel: "Warna Latar Belakang",
    uploadPreviewImage: "Unggah Gambar Sampul / Desain",
    publishTemplateBtn: "Publikasikan Template",
    templatePublishedSuccess: "Template baru berhasil diunggah dan tersedia untuk pengguna!",
    deleteTemplate: "Hapus Template",
    templateCount: "Total Template Aktif",

    exploreTemplates: "Jelajahi Template Desain",
    exploreTemplatesDesc: "Pilih template profesional yang dikurasi langsung oleh Admin Utama.",
    searchTemplatesPlaceholder: "Cari template poster, logo, banner, feed Instagram...",
    catAll: "Semua Kategori",
    catSocialPost: "Postingan Sosial",
    catStory: "Story & Reels",
    catPoster: "Poster Acara",
    catBanner: "Banner Digital",
    catLogo: "Logo & Vektor",
    catBusinessCard: "Kartu Nama",
    catFlyer: "Brosur & Selebaran",
    useTemplate: "Gunakan Template",
    previewTemplate: "Pratinjau",

    createNewDesign: "Buat Desain Baru",
    createNewDesignDesc: "Mulai lembar kerja kosong dengan ukuran standar atau tentukan sendiri.",
    presetSizes: "Ukuran Populer",
    customSize: "Ukuran Kustom",
    widthLabel: "Lebar (px)",
    heightLabel: "Tinggi (px)",
    startDesigning: "Buka Kanvas Editor",
    uploadDesignTitle: "Unggah Desain Sendiri",
    uploadDesignDesc: "Unggah file gambar atau desain yang ingin Anda lanjutkan edit di kanvas.",
    dragDropOrBrowse: "Tarik & lepas file gambar di sini atau klik untuk memilih",
    supportsFormats: "Mendukung format PNG, JPG, WEBP, dan SVG (Maks. 10MB)",
    uploadFileBtn: "Pilih Berkas",

    canvasEditor: "Studio Kanvas Editor",
    saveDesign: "Simpan Desain",
    exportDesign: "Ekspor Desain",
    exportPng: "Unduh PNG",
    exportJpg: "Unduh JPEG",
    exportSvg: "Unduh Vektor SVG",
    addText: "Tambah Teks",
    addShape: "Tambah Bentuk",
    addIcon: "Tambah Ikon",
    addImage: "Unggah Gambar",
    canvasBackground: "Warna Latar",
    layers: "Lapisan Elemen",
    deleteElement: "Hapus Elemen",
    duplicateElement: "Duplikat",
    bringForward: "Bawa ke Depan",
    sendBackward: "Kirim ke Belakang",
    fontSize: "Ukuran Teks",
    textColor: "Warna Teks",
    shapeFill: "Warna Bentuk",
    opacity: "Transparansi",
    alignment: "Perataan",
    designSavedSuccess: "Desain berhasil disimpan ke daftar Desain Saya!",
    designExportedSuccess: "Desain berhasil diekspor dan diunduh!",
    autoSaveStatus: "Auto-save",
    autoSaveActive: "Auto-save Aktif (30d)",
    autoSaving: "Menyimpan otomatis...",
    autoSavedAt: "Tersimpan otomatis",
    autoSaveDraftFound: "Draf cadangan otomatis ditemukan dari sesi sebelumnya.",
    restoreDraft: "Pulihkan Draf",
    dismissDraft: "Abaikan",
    draftRestored: "Draf berhasil dipulihkan dari cadangan otomatis!",
    autoSaveIntervalNotice: "Penyimpanan otomatis ke penyimpanan lokal & cloud berjalan setiap 30 detik untuk melindungi karya Anda.",

    aiAssistant: "Asisten Desain AI Gemini",
    aiAssistantDesc: "Ketik ide Anda, AI akan merancang tata letak, warna, teks, dan elemen grafis siap pakai.",
    aiPromptPlaceholder: "Contoh: Poster festival kopi modern nuansa vintage coklat hangat...",
    generateWithAi: "Rancang dengan AI",
    generatingAiDesign: "Gemini sedang merancang karya seni Anda...",
    aiPreset1: "Poster Diskon Kilat Akhir Pekan",
    aiPreset2: "Banner Seminar Bisnis Teknologi",
    aiPreset3: "Kartu Ucapan Selamat Modern",
    aiPreset4: "Postingan Kuliner Nusantara Menggugah",
    aiCopyGenerator: "Generator Copywriting AI",
    aiGenerateTaglines: "Buat Slogan Menarik",
    aiApplyToCanvas: "Terapkan ke Kanvas",
    aiDesignReady: "Desain AI berhasil dibuat dan dimasukkan ke kanvas!",

    myDesignsTitle: "Koleksi Desain Saya",
    myDesignsDesc: "Kelola karya grafis yang telah Anda buat, edit kembali, atau unduh kapan saja.",
    noDesignsYet: "Anda belum memiliki proyek desain tersimpan.",
    createFirstDesign: "Mulai Buat Desain Pertama",
    editDesign: "Lanjutkan Edit",
    deleteDesign: "Hapus Desain",
    lastEdited: "Terakhir diedit",
  },

  en: {
    appTitle: "Grafika Studio AI",
    appTagline: "Smart & Creative Graphic Design Platform",
    navTemplates: "Design Templates",
    navCreate: "Create Design",
    navMyDesigns: "My Designs",
    navUpload: "Upload Design",
    navAdminPortal: "Primary Admin Portal",
    adminBadge: "Primary Admin",
    userBadge: "Creative User",

    loginAsAdmin: "Login as Primary Admin",
    loginAsUser: "Login as User",
    switchRole: "Switch Account",
    adminOnlyNotice: "Only the primary admin account is authorized to access this portal.",
    adminLoginTitle: "Primary Admin Authentication",
    adminLoginDesc: "Enter primary admin credentials to manage system and templates.",
    emailLabel: "Email Address",
    passwordLabel: "Password",
    loginBtn: "Sign In",
    loginSuccess: "Successfully logged in as",
    loginErrorAdminOnly: "Access denied: Only the official primary admin account can sign in here!",
    logoutBtn: "Log Out",
    logoutConfirmTitle: "Confirm Sign Out",
    logoutConfirmMsg: "Are you sure you want to log out of your account?",
    cancel: "Cancel",
    confirm: "Yes, Sign Out",

    settingsMenu: "Settings",
    personalInfo: "Personal Information",
    languageSelect: "Language",
    accountSettings: "Account Settings",
    logout: "Log Out",

    personalInfoTitle: "Personal Information",
    personalInfoDesc: "Manage your profile, contact details, and design identity.",
    fullName: "Full Name",
    phoneNumber: "Phone Number",
    bioLabel: "Short Bio",
    memberSince: "Member Since",
    saveChanges: "Save Changes",
    changesSavedNotice: "Personal information updated successfully!",

    accountTitle: "Account Settings",
    accountDesc: "Manage account preferences, storage, and security.",
    currentPlan: "Service Plan",
    storageUsed: "Storage Used",
    security: "Account Security",
    changePassword: "Change Password",
    preferences: "Design Preferences",
    darkCanvasMode: "Dark Canvas Mode",
    highResExport: "Ultra HD Export",

    languageTitle: "Select System Language",
    languageDesc: "Change the interface language. All text will adapt automatically.",
    currentLanguage: "Current Language",

    notifications: "Notifications",
    allNotifications: "All Notifications",
    activityTab: "Design Activity",
    systemTab: "System Updates",
    markAllAsRead: "Mark All as Read",
    clearAll: "Clear All",
    noNotifications: "No new notifications yet.",
    newActivityNotif: "New Design Activity",
    newSystemNotif: "System Update",

    adminPortalTitle: "Primary Admin Control Panel",
    adminPortalDesc: "Upload new templates, curate public assets, and broadcast system updates.",
    uploadTemplateBtn: "Upload New Template",
    manageTemplates: "Manage Template Collection",
    systemBroadcastTitle: "Send System Announcement",
    broadcastPlaceholder: "Write a system update message for all users...",
    sendBroadcast: "Broadcast Notification",
    templateTitleLabel: "Template Title",
    templateCategoryLabel: "Template Category",
    templateDimensionsLabel: "Dimensions (px)",
    templateTagsLabel: "Tags (comma separated)",
    templateBgColorLabel: "Background Color",
    uploadPreviewImage: "Upload Preview Image / Artwork",
    publishTemplateBtn: "Publish Template",
    templatePublishedSuccess: "New template uploaded and available to users!",
    deleteTemplate: "Delete Template",
    templateCount: "Total Active Templates",

    exploreTemplates: "Explore Design Templates",
    exploreTemplatesDesc: "Choose professional templates curated directly by the Primary Admin.",
    searchTemplatesPlaceholder: "Search posters, logos, banners, Instagram feeds...",
    catAll: "All Categories",
    catSocialPost: "Social Post",
    catStory: "Story & Reels",
    catPoster: "Event Poster",
    catBanner: "Digital Banner",
    catLogo: "Logo & Vector",
    catBusinessCard: "Business Card",
    catFlyer: "Flyer & Brochure",
    useTemplate: "Use Template",
    previewTemplate: "Preview",

    createNewDesign: "Create New Design",
    createNewDesignDesc: "Start from a blank canvas with standard sizes or custom dimensions.",
    presetSizes: "Popular Presets",
    customSize: "Custom Size",
    widthLabel: "Width (px)",
    heightLabel: "Height (px)",
    startDesigning: "Open Canvas Editor",
    uploadDesignTitle: "Upload Your Own Design",
    uploadDesignDesc: "Upload images or design files to continue editing on the canvas.",
    dragDropOrBrowse: "Drag & drop image file here or click to browse",
    supportsFormats: "Supports PNG, JPG, WEBP, and SVG (Max 10MB)",
    uploadFileBtn: "Choose File",

    canvasEditor: "Canvas Studio Editor",
    saveDesign: "Save Design",
    exportDesign: "Export Design",
    exportPng: "Download PNG",
    exportJpg: "Download JPEG",
    exportSvg: "Download SVG Vector",
    addText: "Add Text",
    addShape: "Add Shape",
    addIcon: "Add Icon",
    addImage: "Upload Image",
    canvasBackground: "Background",
    layers: "Element Layers",
    deleteElement: "Delete Element",
    duplicateElement: "Duplicate",
    bringForward: "Bring Forward",
    sendBackward: "Send Backward",
    fontSize: "Font Size",
    textColor: "Text Color",
    shapeFill: "Shape Color",
    opacity: "Opacity",
    alignment: "Alignment",
    designSavedSuccess: "Design saved successfully to My Designs!",
    designExportedSuccess: "Design exported and downloaded!",
    autoSaveStatus: "Auto-save",
    autoSaveActive: "Auto-save Active (30s)",
    autoSaving: "Auto-saving...",
    autoSavedAt: "Auto-saved at",
    autoSaveDraftFound: "Auto-saved recovery draft found from previous session.",
    restoreDraft: "Restore Draft",
    dismissDraft: "Dismiss",
    draftRestored: "Draft restored successfully from auto-save!",
    autoSaveIntervalNotice: "Automatic saving to local storage & cloud runs every 30 seconds to protect your work.",

    aiAssistant: "Gemini AI Design Assistant",
    aiAssistantDesc: "Type your vision; AI will craft layout, colors, typography, and graphic elements.",
    aiPromptPlaceholder: "E.g.: Warm vintage coffee festival poster with earthy tones...",
    generateWithAi: "Design with AI",
    generatingAiDesign: "Gemini is composing your artwork...",
    aiPreset1: "Weekend Flash Sale Poster",
    aiPreset2: "Tech Business Conference Banner",
    aiPreset3: "Modern Greeting Card",
    aiPreset4: "Gourmet Food Social Promo",
    aiCopyGenerator: "AI Copywriting Generator",
    aiGenerateTaglines: "Generate Catchy Slogans",
    aiApplyToCanvas: "Apply to Canvas",
    aiDesignReady: "AI design generated and loaded onto canvas!",

    myDesignsTitle: "My Design Collection",
    myDesignsDesc: "Manage the visual artwork you created, continue editing, or export anytime.",
    noDesignsYet: "You have no saved design projects yet.",
    createFirstDesign: "Create Your First Design",
    editDesign: "Continue Editing",
    deleteDesign: "Delete Design",
    lastEdited: "Last edited",
  },

  zh: {
    appTitle: "Grafika Studio AI",
    appTagline: "智能创意平面设计平台",
    navTemplates: "设计模板",
    navCreate: "创建设计",
    navMyDesigns: "我的设计",
    navUpload: "上传设计",
    navAdminPortal: "主管理员门户",
    adminBadge: "主管理员",
    userBadge: "创意用户",

    loginAsAdmin: "主管理员登录",
    loginAsUser: "普通用户登录",
    switchRole: "切换身份",
    adminOnlyNotice: "仅主管理员账号有权访问此管理系统。",
    adminLoginTitle: "主管理员身份验证",
    adminLoginDesc: "输入主管理员凭据以管理系统和模板。",
    emailLabel: "电子邮箱",
    passwordLabel: "密码",
    loginBtn: "登录",
    loginSuccess: "成功登录为",
    loginErrorAdminOnly: "访问被拒绝：只有官方主管理员账户才能在此登录！",
    logoutBtn: "退出登录",
    logoutConfirmTitle: "确认退出",
    logoutConfirmMsg: "您确定要退出当前账号吗？",
    cancel: "取消",
    confirm: "确认退出",

    settingsMenu: "设置",
    personalInfo: "个人信息",
    languageSelect: "语言",
    accountSettings: "账户设置",
    logout: "退出登录",

    personalInfoTitle: "个人信息",
    personalInfoDesc: "管理您的个人资料、联系方式和设计身份。",
    fullName: "完整姓名",
    phoneNumber: "电话号码",
    bioLabel: "个人简介",
    memberSince: "注册日期",
    saveChanges: "保存更改",
    changesSavedNotice: "个人信息已成功更新！",

    accountTitle: "账户设置",
    accountDesc: "管理账户偏好、存储空间和安全性。",
    currentPlan: "当前套餐",
    storageUsed: "已用存储",
    security: "账户安全",
    changePassword: "修改密码",
    preferences: "设计偏好",
    darkCanvasMode: "深色画布模式",
    highResExport: "超高清导出",

    languageTitle: "选择系统语言",
    languageDesc: "更改网站显示语言。所有界面文字将自动更新。",
    currentLanguage: "当前语言",

    notifications: "通知中心",
    allNotifications: "所有通知",
    activityTab: "设计活动",
    systemTab: "系统更新",
    markAllAsRead: "全部标为已读",
    clearAll: "清空通知",
    noNotifications: "暂无新通知。",
    newActivityNotif: "新设计动态",
    newSystemNotif: "系统更新",

    adminPortalTitle: "主管理员控制面板",
    adminPortalDesc: "上传新模板、管理公共设计资源并广播系统更新。",
    uploadTemplateBtn: "上传新模板",
    manageTemplates: "管理模板库",
    systemBroadcastTitle: "发布系统公告",
    broadcastPlaceholder: "向所有用户广播系统更新信息...",
    sendBroadcast: "发布通知",
    templateTitleLabel: "模板名称",
    templateCategoryLabel: "模板类别",
    templateDimensionsLabel: "尺寸 (像素)",
    templateTagsLabel: "标签 (逗号分隔)",
    templateBgColorLabel: "背景颜色",
    uploadPreviewImage: "上传封面图 / 设计",
    publishTemplateBtn: "发布模板",
    templatePublishedSuccess: "新模板已成功发布并向用户开放！",
    deleteTemplate: "删除模板",
    templateCount: "在架模板总数",

    exploreTemplates: "浏览设计模板",
    exploreTemplatesDesc: "挑选由主管理员精心策划的专业模板。",
    searchTemplatesPlaceholder: "搜索海报、标志、横幅、社交媒体图片...",
    catAll: "所有类别",
    catSocialPost: "社交贴文",
    catStory: "故事与短视频",
    catPoster: "活动海报",
    catBanner: "数字横幅",
    catLogo: "标志与矢量",
    catBusinessCard: "商务名片",
    catFlyer: "宣传折页",
    useTemplate: "使用模板",
    previewTemplate: "预览",

    createNewDesign: "新建设计",
    createNewDesignDesc: "从标准尺寸或自定义尺寸的空白画布开始创作。",
    presetSizes: "常用尺寸",
    customSize: "自定义尺寸",
    widthLabel: "宽度 (px)",
    heightLabel: "高度 (px)",
    startDesigning: "打开画布编辑器",
    uploadDesignTitle: "上传自有设计",
    uploadDesignDesc: "上传图片或设计文件并在画布上继续编辑。",
    dragDropOrBrowse: "将图片拖放到此处或点击选择",
    supportsFormats: "支持 PNG、JPG、WEBP 和 SVG (最大 10MB)",
    uploadFileBtn: "选择文件",

    canvasEditor: "画布工作室编辑器",
    saveDesign: "保存设计",
    exportDesign: "导出设计",
    exportPng: "下载 PNG",
    exportJpg: "下载 JPEG",
    exportSvg: "下载 SVG 矢量图",
    addText: "添加文字",
    addShape: "添加图形",
    addIcon: "添加图标",
    addImage: "上传图片",
    canvasBackground: "背景颜色",
    layers: "图层面板",
    deleteElement: "删除元素",
    duplicateElement: "复制元素",
    bringForward: "置于顶层",
    sendBackward: "置于底层",
    fontSize: "文字字号",
    textColor: "文字颜色",
    shapeFill: "图形填充色",
    opacity: "不透明度",
    alignment: "对齐方式",
    designSavedSuccess: "设计已成功保存至「我的设计」！",
    designExportedSuccess: "设计已成功导出并开始下载！",
    autoSaveStatus: "自动保存",
    autoSaveActive: "自动保存已开启 (30秒)",
    autoSaving: "正在自动保存...",
    autoSavedAt: "自动保存于",
    autoSaveDraftFound: "发现上一会话的自动保存草稿。",
    restoreDraft: "恢复草稿",
    dismissDraft: "忽略",
    draftRestored: "草稿已从自动保存中成功恢复！",
    autoSaveIntervalNotice: "每30秒自动保存到本地存储与云端，确保设计安全。",

    aiAssistant: "Gemini AI 设计助手",
    aiAssistantDesc: "输入您的创意，AI 将智能排版、配色并生成高质感平面设计。",
    aiPromptPlaceholder: "例如：复古温暖咖啡节海报，带有优雅几何装饰...",
    generateWithAi: "AI 智能生成",
    generatingAiDesign: "Gemini 正在精心构思您的设计...",
    aiPreset1: "周末限时特惠海报",
    aiPreset2: "科技商业峰会横幅",
    aiPreset3: "现代极简节日贺卡",
    aiPreset4: "美味餐饮社交推广图",
    aiCopyGenerator: "AI 文案撰写器",
    aiGenerateTaglines: "生成吸睛标语",
    aiApplyToCanvas: "应用到画布",
    aiDesignReady: "AI 设计已生成并载入画布！",

    myDesignsTitle: "我的设计作品",
    myDesignsDesc: "查看和管理您创建的所有作品，随时编辑或导出。",
    noDesignsYet: "您还没有保存任何设计项目。",
    createFirstDesign: "开始创建第一个设计",
    editDesign: "继续编辑",
    deleteDesign: "删除设计",
    lastEdited: "最后修改于",
  },

  ja: {
    appTitle: "Grafika Studio AI",
    appTagline: "スマートでクリエイティブなグラフィックデザインプラットフォーム",
    navTemplates: "テンプレート",
    navCreate: "デザイン作成",
    navMyDesigns: "マイデザイン",
    navUpload: "デザインをアップロード",
    navAdminPortal: "主任管理者ポータル",
    adminBadge: "主任管理者",
    userBadge: "クリエイティブユーザー",

    loginAsAdmin: "主任管理者ログイン",
    loginAsUser: "ユーザーログイン",
    switchRole: "アカウント切替",
    adminOnlyNotice: "主任管理者アカウントのみがアクセスを許可されています。",
    adminLoginTitle: "主任管理者認証",
    adminLoginDesc: "システムとテンプレートを管理するために主任管理者情報を入力してください。",
    emailLabel: "メールアドレス",
    passwordLabel: "パスワード",
    loginBtn: "ログイン",
    loginSuccess: "ログインに成功しました:",
    loginErrorAdminOnly: "アクセス拒否: 正式な主任管理者アカウントのみログイン可能です！",
    logoutBtn: "ログアウト",
    logoutConfirmTitle: "ログアウトの確認",
    logoutConfirmMsg: "本当にアカウントからログアウトしますか？",
    cancel: "キャンセル",
    confirm: "はい、ログアウト",

    settingsMenu: "設定",
    personalInfo: "個人情報",
    languageSelect: "言語",
    accountSettings: "アカウント設定",
    logout: "ログアウト",

    personalInfoTitle: "個人情報",
    personalInfoDesc: "プロフィール、連絡先情報、デザインIDを管理します。",
    fullName: "氏名",
    phoneNumber: "電話番号",
    bioLabel: "自己紹介",
    memberSince: "登録日",
    saveChanges: "変更を保存",
    changesSavedNotice: "個人情報を更新しました！",

    accountTitle: "アカウント設定",
    accountDesc: "環境設定、ストレージ、セキュリティを管理します。",
    currentPlan: "現在のプラン",
    storageUsed: "使用ストレージ",
    security: "アカウントセキュリティ",
    changePassword: "パスワード変更",
    preferences: "デザイン設定",
    darkCanvasMode: "ダークキャンバスモード",
    highResExport: "Ultra HD書き出し",

    languageTitle: "システム言語の選択",
    languageDesc: "表示言語を変更します。UIテキスト全体が瞬時に切り替わります。",
    currentLanguage: "現在の言語",

    notifications: "通知",
    allNotifications: "すべての通知",
    activityTab: "デザイン活動",
    systemTab: "システム更新",
    markAllAsRead: "すべて既読にする",
    clearAll: "すべて消去",
    noNotifications: "新しい通知はありません。",
    newActivityNotif: "新しいデザイン活動",
    newSystemNotif: "システム更新",

    adminPortalTitle: "主任管理者コントロールパネル",
    adminPortalDesc: "新規テンプレートの追加、公開アセット管理、システム更新の告知を行います。",
    uploadTemplateBtn: "新規テンプレートのアップロード",
    manageTemplates: "テンプレート管理",
    systemBroadcastTitle: "システムお知らせの送信",
    broadcastPlaceholder: "すべてのユーザーにシステム更新を配信...",
    sendBroadcast: "通知をブロードキャスト",
    templateTitleLabel: "テンプレート名",
    templateCategoryLabel: "カテゴリー",
    templateDimensionsLabel: "サイズ (px)",
    templateTagsLabel: "タグ (カンマ区切り)",
    templateBgColorLabel: "背景色",
    uploadPreviewImage: "プレビュー画像をアップロード",
    publishTemplateBtn: "テンプレートを公開",
    templatePublishedSuccess: "テンプレートを公開しました！",
    deleteTemplate: "テンプレート削除",
    templateCount: "有効なテンプレート総数",

    exploreTemplates: "テンプレートを探す",
    exploreTemplatesDesc: "主任管理者が厳選したプロフェッショナルなテンプレートです。",
    searchTemplatesPlaceholder: "ポスター、ロゴ、バナー、SNS投稿を検索...",
    catAll: "すべてのカテゴリ",
    catSocialPost: "SNS投稿",
    catStory: "ストーリー",
    catPoster: "イベントポスター",
    catBanner: "デジタルバナー",
    catLogo: "ロゴ・ベクター",
    catBusinessCard: "名刺",
    catFlyer: "チラシ",
    useTemplate: "テンプレートを使用",
    previewTemplate: "プレビュー",

    createNewDesign: "新規デザイン作成",
    createNewDesignDesc: "標準プリセットまたはカスタムサイズで空白のキャンバスから開始します。",
    presetSizes: "人気のサイズ",
    customSize: "カスタムサイズ",
    widthLabel: "幅 (px)",
    heightLabel: "高さ (px)",
    startDesigning: "エディターを開く",
    uploadDesignTitle: "デザインをアップロード",
    uploadDesignDesc: "画像やデザイン素材をアップロードしてキャンバスで編集を続行します。",
    dragDropOrBrowse: "画像をここにドラッグ＆ドロップ、またはクリックして選択",
    supportsFormats: "PNG、JPG、WEBP、SVG 対応 (最大 10MB)",
    uploadFileBtn: "ファイルを選択",

    canvasEditor: "キャンバスエディター",
    saveDesign: "デザインを保存",
    exportDesign: "書き出し",
    exportPng: "PNG ダウンロード",
    exportJpg: "JPEG ダウンロード",
    exportSvg: "SVG ベクターダウンロード",
    addText: "テキスト追加",
    addShape: "図形追加",
    addIcon: "アイコン追加",
    addImage: "画像アップロード",
    canvasBackground: "背景色",
    layers: "レイヤー",
    deleteElement: "要素を削除",
    duplicateElement: "複製",
    bringForward: "前面へ",
    sendBackward: "背面へ",
    fontSize: "フォントサイズ",
    textColor: "文字色",
    shapeFill: "塗りつぶし色",
    opacity: "不透明度",
    alignment: "配置",
    designSavedSuccess: "デザインを「マイデザイン」に保存しました！",
    designExportedSuccess: "デザインの書き出しが完了しました！",
    autoSaveStatus: "自動保存",
    autoSaveActive: "自動保存有効 (30秒)",
    autoSaving: "自動保存中...",
    autoSavedAt: "自動保存時刻",
    autoSaveDraftFound: "前回のセッションから自動保存された下書きが見つかりました。",
    restoreDraft: "下書きを復元",
    dismissDraft: "閉じる",
    draftRestored: "自動保存から下書きが正常に復元されました！",
    autoSaveIntervalNotice: "作業内容を保護するため、30秒ごとにローカルとクラウドへ自動保存されます。",

    aiAssistant: "Gemini AI デザインアシスタント",
    aiAssistantDesc: "アイデアを入力すると、AIが最適なレイアウト、色、テキスト、図形を自動作成します。",
    aiPromptPlaceholder: "例: 暖かみのある秋のカフェフェスティバルポスター...",
    generateWithAi: "AIで生成",
    generatingAiDesign: "Geminiが作品を構成しています...",
    aiPreset1: "週末フラッシュセールポスター",
    aiPreset2: "ITビジネスセミナーバナー",
    aiPreset3: "モダンなグリーティングカード",
    aiPreset4: "フードプロモーション画像",
    aiCopyGenerator: "AIコピーライター",
    aiGenerateTaglines: "キャッチコピー生成",
    aiApplyToCanvas: "キャンバスに適用",
    aiDesignReady: "AIデザインがキャンバスに反映されました！",

    myDesignsTitle: "マイデザインコレクション",
    myDesignsDesc: "作成したグラフィックの管理、再編集、書き出しがいつでも可能です。",
    noDesignsYet: "保存されたデザインはまだありません。",
    createFirstDesign: "最初のデザインを作成",
    editDesign: "編集を続ける",
    deleteDesign: "デザインを削除",
    lastEdited: "最終編集",
  },

  ar: {
    appTitle: "Grafika Studio AI",
    appTagline: "منصة التصميم الجرافيكي الذكية والإبداعية",
    navTemplates: "قوالب التصميم",
    navCreate: "إنشاء تصميم",
    navMyDesigns: "تصاميمي",
    navUpload: "رفع تصميم",
    navAdminPortal: "بوابة المسؤول الرئيسي",
    adminBadge: "المسؤول الرئيسي",
    userBadge: "مستخدم مبدع",

    loginAsAdmin: "تسجيل دخول المسؤول الرئيسي",
    loginAsUser: "تسجيل دخول المستخدم",
    switchRole: "تبديل الحساب",
    adminOnlyNotice: "يُسمح فقط لحساب المسؤول الرئيسي بالوصول إلى هذه البوابة.",
    adminLoginTitle: "مصادقة المسؤول الرئيسي",
    adminLoginDesc: "أدخل بيانات اعتماد المسؤول الرئيسي لإدارة النظام والقوالب.",
    emailLabel: "البريد الإلكتروني",
    passwordLabel: "كلمة المرور",
    loginBtn: "تسجيل الدخول",
    loginSuccess: "تم تسجيل الدخول بنجاح بصفتك",
    loginErrorAdminOnly: "تم رفض الوصول: يسمح فقط لحساب المسؤول الرئيسي الرسمي بالدخول!",
    logoutBtn: "تسجيل الخروج",
    logoutConfirmTitle: "تأكيد تسجيل الخروج",
    logoutConfirmMsg: "هل أنت متأكد أنك تريد تسجيل الخروج؟",
    cancel: "إلغاء",
    confirm: "نعم، خروج",

    settingsMenu: "الإعدادات",
    personalInfo: "المعلومات الشخصية",
    languageSelect: "اللغة",
    accountSettings: "إعدادات الحساب",
    logout: "تسجيل الخروج",

    personalInfoTitle: "المعلومات الشخصية",
    personalInfoDesc: "إدارة ملفك الشخصي وبيانات الاتصال وهوية التصميم.",
    fullName: "الاسم الكامل",
    phoneNumber: "رقم الهاتف",
    bioLabel: "نبذة قصيرة",
    memberSince: "عضو منذ",
    saveChanges: "حفظ التغييرات",
    changesSavedNotice: "تم تحديث المعلومات الشخصية بنجاح!",

    accountTitle: "إعدادات الحساب",
    accountDesc: "إدارة تفضيلات الحساب والمساحة التخزينية والأمان.",
    currentPlan: "الخطة الحالية",
    storageUsed: "المساحة المستخدمة",
    security: "أمان الحساب",
    changePassword: "تغيير كلمة المرور",
    preferences: "تفضيلات التصميم",
    darkCanvasMode: "وضع اللوحة الداكنة",
    highResExport: "تصدير بدقة فائقة",

    languageTitle: "اختر لغة النظام",
    languageDesc: "تغيير لغة الواجهة. ستتغير جميع الكلمات في الموقع فوراً.",
    currentLanguage: "اللغة الحالية",

    notifications: "الإشعارات",
    allNotifications: "كل الإشعارات",
    activityTab: "نشاط التصميم",
    systemTab: "تحديثات النظام",
    markAllAsRead: "تعيين الكل كمقروء",
    clearAll: "مسح الكل",
    noNotifications: "لا توجد إشعارات جديدة حالياً.",
    newActivityNotif: "نشاط تصميم جديد",
    newSystemNotif: "تحديث النظام",

    adminPortalTitle: "لوحة تحكم المسؤول الرئيسي",
    adminPortalDesc: "رفع قوالب جديدة وإدارة الأصول وبث إشعارات وتحديثات النظام.",
    uploadTemplateBtn: "رفع قالب جديد",
    manageTemplates: "إدارة مجموعة القوالب",
    systemBroadcastTitle: "إرسال إعلان النظام",
    broadcastPlaceholder: "اكتب رسالة تحديث النظام لجميع المستخدمين...",
    sendBroadcast: "بث الإشعار",
    templateTitleLabel: "عنوان القالب",
    templateCategoryLabel: "فئة القالب",
    templateDimensionsLabel: "الأبعاد (بكسل)",
    templateTagsLabel: "الوسوم (مفصولة بفواصل)",
    templateBgColorLabel: "لون الخلفية",
    uploadPreviewImage: "رفع صورة المعاينة / التصميم",
    publishTemplateBtn: "نشر القالب",
    templatePublishedSuccess: "تم رفع القالب الجديد بنجاح وإتاحته للمستخدمين!",
    deleteTemplate: "حذف القالب",
    templateCount: "إجمالي القوالب النشطة",

    exploreTemplates: "استكشف قوالب التصميم",
    exploreTemplatesDesc: "اختر من قوالب احترافية بإشراف المسؤول الرئيسي مباشرة.",
    searchTemplatesPlaceholder: "ابحث عن ملصقات، شعارات، لافتات، منشورات...",
    catAll: "جميع الفئات",
    catSocialPost: "منشور تواصل",
    catStory: "قصص وريلز",
    catPoster: "ملصق مناسبات",
    catBanner: "لافتة رقمية",
    catLogo: "شعار ورسومات",
    catBusinessCard: "بطاقة عمل",
    catFlyer: "نشرة إعلانية",
    useTemplate: "استخدم القالب",
    previewTemplate: "معاينة",

    createNewDesign: "إنشاء تصميم جديد",
    createNewDesignDesc: "ابدأ من لوحة فارغة بأبعاد قياسية أو مخصصة.",
    presetSizes: "المقاسات الشائعة",
    customSize: "مقاس مخصص",
    widthLabel: "العرض (px)",
    heightLabel: "الارتفاع (px)",
    startDesigning: "فتح محرر اللوحة",
    uploadDesignTitle: "رفع تصميم خاص",
    uploadDesignDesc: "ارفع صوراً أو ملفات تصميم للمتابعة في المحرر.",
    dragDropOrBrowse: "اسحب الملف هنا أو انقر للاختيار",
    supportsFormats: "يدعم PNG و JPG و WEBP و SVG (حتى 10 ميجابايت)",
    uploadFileBtn: "اختر ملفاً",

    canvasEditor: "استوديو محرر اللوحة",
    saveDesign: "حفظ التصميم",
    exportDesign: "تصدير التصميم",
    exportPng: "تحميل PNG",
    exportJpg: "تحميل JPEG",
    exportSvg: "تحميل SVG متجه",
    addText: "إضافة نص",
    addShape: "إضافة شكل",
    addIcon: "إضافة أيقونة",
    addImage: "رفع صورة",
    canvasBackground: "لون الخلفية",
    layers: "طبقات العناصر",
    deleteElement: "حذف العنصر",
    duplicateElement: "تكرار",
    bringForward: "إلى الأمام",
    sendBackward: "إلى الخلف",
    fontSize: "حجم الخط",
    textColor: "لون النص",
    shapeFill: "لون الشكل",
    opacity: "الشفافية",
    alignment: "المحاذاة",
    designSavedSuccess: "تم حفظ التصميم بنجاح في تصاميمي!",
    designExportedSuccess: "تم تصدير التصميم وتحميله بنجاح!",
    autoSaveStatus: "حفظ تلقائي",
    autoSaveActive: "الحفظ التلقائي نشط (30 ث)",
    autoSaving: "جارٍ الحفظ التلقائي...",
    autoSavedAt: "تم الحفظ تلقائيًا في",
    autoSaveDraftFound: "تم العثور على مسودة محفوظة تلقائيًا من الجلسة السابقة.",
    restoreDraft: "استعادة المسودة",
    dismissDraft: "تجاهل",
    draftRestored: "تمت استعادة المسودة بنجاح من الحفظ التلقائي!",
    autoSaveIntervalNotice: "يتم الحفظ التلقائي في التخزين المحلي والسحابي كل 30 ثانية لحماية عملك.",

    aiAssistant: "مساعد التصميم بالذكاء الاصطناعي Gemini",
    aiAssistantDesc: "اكتب فكرتك وسيقوم الذكاء الاصطناعي بإنشاء التخطيط والألوان والخطوط.",
    aiPromptPlaceholder: "مثال: ملصق مهرجان قهوة دافئ وأنيق بألوان ترابية...",
    generateWithAi: "تصميم بالذكاء الاصطناعي",
    generatingAiDesign: "يقوم Gemini بتركيب عملك الفني الآن...",
    aiPreset1: "ملصق عروض نهاية الأسبوع",
    aiPreset2: "لافتة مؤتمر التقنية والأعمال",
    aiPreset3: "بطاقة تهنئة حديثة",
    aiPreset4: "ترويج لمطعم ومأكولات شهية",
    aiCopyGenerator: "منشئ النصوص الدعائية",
    aiGenerateTaglines: "توليد شعارات جذابة",
    aiApplyToCanvas: "تطبيق على اللوحة",
    aiDesignReady: "تم توليد تصميم الذكاء الاصطناعي وإدراجه في اللوحة!",

    myDesignsTitle: "مجموعة تصاميمي",
    myDesignsDesc: "إدارة الأعمال التي قمت بتصميمها، وإعادة تعديلها أو تصديرها.",
    noDesignsYet: "ليس لديك أي مشاريع تصميم محفوظة حتى الآن.",
    createFirstDesign: "ابدأ تصميمك الأول",
    editDesign: "متابعة التعديل",
    deleteDesign: "حذف التصميم",
    lastEdited: "آخر تعديل",
  },

  es: {
    appTitle: "Grafika Studio AI",
    appTagline: "Plataforma de Diseño Gráfico Inteligente y Creativo",
    navTemplates: "Plantillas de Diseño",
    navCreate: "Crear Diseño",
    navMyDesigns: "Mis Diseños",
    navUpload: "Subir Diseño",
    navAdminPortal: "Portal del Admin Principal",
    adminBadge: "Administrador Principal",
    userBadge: "Usuario Creativo",

    loginAsAdmin: "Iniciar como Admin Principal",
    loginAsUser: "Iniciar como Usuario",
    switchRole: "Cambiar Cuenta",
    adminOnlyNotice: "Solo la cuenta del administrador principal está autorizada para acceder a este portal.",
    adminLoginTitle: "Autenticación de Admin Principal",
    adminLoginDesc: "Ingrese las credenciales del admin principal para gestionar el sistema.",
    emailLabel: "Correo Electrónico",
    passwordLabel: "Contraseña",
    loginBtn: "Iniciar Sesión",
    loginSuccess: "Sesión iniciada con éxito como",
    loginErrorAdminOnly: "Acceso denegado: ¡Solo la cuenta oficial del administrador principal puede ingresar aquí!",
    logoutBtn: "Cerrar Sesión",
    logoutConfirmTitle: "Confirmar Cierre de Sesión",
    logoutConfirmMsg: "¿Está seguro de que desea cerrar sesión en su cuenta?",
    cancel: "Cancelar",
    confirm: "Sí, Cerrar Sesión",

    settingsMenu: "Configuración",
    personalInfo: "Información Personal",
    languageSelect: "Idioma",
    accountSettings: "Configuración de Cuenta",
    logout: "Cerrar Sesión",

    personalInfoTitle: "Información Personal",
    personalInfoDesc: "Administre su perfil, información de contacto e identidad de diseño.",
    fullName: "Nombre Completo",
    phoneNumber: "Número de Teléfono",
    bioLabel: "Biografía Breve",
    memberSince: "Miembro Desde",
    saveChanges: "Guardar Cambios",
    changesSavedNotice: "¡Información personal actualizada con éxito!",

    accountTitle: "Configuración de Cuenta",
    accountDesc: "Administre preferencias de cuenta, almacenamiento y seguridad.",
    currentPlan: "Plan Actual",
    storageUsed: "Almacenamiento Usado",
    security: "Seguridad de la Cuenta",
    changePassword: "Cambiar Contraseña",
    preferences: "Preferencias de Diseño",
    darkCanvasMode: "Modo Lienzo Oscuro",
    highResExport: "Exportación Ultra HD",

    languageTitle: "Seleccionar Idioma del Sistema",
    languageDesc: "Cambie el idioma de la interfaz. Todos los textos se adaptarán automáticamente.",
    currentLanguage: "Idioma Actual",

    notifications: "Notificaciones",
    allNotifications: "Todas las Notificaciones",
    activityTab: "Actividad de Diseño",
    systemTab: "Actualizaciones del Sistema",
    markAllAsRead: "Marcar Todo como Leído",
    clearAll: "Limpiar Todo",
    noNotifications: "No hay notificaciones nuevas aún.",
    newActivityNotif: "Nueva Actividad de Diseño",
    newSystemNotif: "Actualización del Sistema",

    adminPortalTitle: "Panel del Administrador Principal",
    adminPortalDesc: "Suba nuevas plantillas, gestione recursos públicos y transmita actualizaciones.",
    uploadTemplateBtn: "Subir Nueva Plantilla",
    manageTemplates: "Gestionar Colección de Plantillas",
    systemBroadcastTitle: "Enviar Anuncio del Sistema",
    broadcastPlaceholder: "Escriba un mensaje de actualización para todos los usuarios...",
    sendBroadcast: "Transmitir Notificación",
    templateTitleLabel: "Título de la Plantilla",
    templateCategoryLabel: "Categoría de Plantilla",
    templateDimensionsLabel: "Dimensiones (px)",
    templateTagsLabel: "Etiquetas (separadas por comas)",
    templateBgColorLabel: "Color de Fondo",
    uploadPreviewImage: "Subir Imagen de Portada / Diseño",
    publishTemplateBtn: "Publicar Plantilla",
    templatePublishedSuccess: "¡Nueva plantilla publicada con éxito y disponible para los usuarios!",
    deleteTemplate: "Eliminar Plantilla",
    templateCount: "Total de Plantillas Activas",

    exploreTemplates: "Explorar Plantillas de Diseño",
    exploreTemplatesDesc: "Elija plantillas profesionales seleccionadas directamente por el Admin Principal.",
    searchTemplatesPlaceholder: "Buscar carteles, logotipos, banners, publicaciones...",
    catAll: "Todas las Categorías",
    catSocialPost: "Post para Redes",
    catStory: "Historias y Reels",
    catPoster: "Póster de Evento",
    catBanner: "Banner Digital",
    catLogo: "Logotipo y Vector",
    catBusinessCard: "Tarjeta de Presentación",
    catFlyer: "Folleto Publicitario",
    useTemplate: "Usar Plantilla",
    previewTemplate: "Vista Previa",

    createNewDesign: "Crear Nuevo Diseño",
    createNewDesignDesc: "Comience en un lienzo en blanco con tamaños estándar o medidas personalizadas.",
    presetSizes: "Tamaños Populares",
    customSize: "Tamaño Personalizado",
    widthLabel: "Ancho (px)",
    heightLabel: "Alto (px)",
    startDesigning: "Abrir Editor de Lienzo",
    uploadDesignTitle: "Subir su Propio Diseño",
    uploadDesignDesc: "Suba archivos de imagen o diseño para continuar editando en el lienzo.",
    dragDropOrBrowse: "Arrastre y suelte el archivo aquí o haga clic para buscar",
    supportsFormats: "Admite PNG, JPG, WEBP y SVG (Máx. 10MB)",
    uploadFileBtn: "Seleccionar Archivo",

    canvasEditor: "Editor de Estudio de Lienzo",
    saveDesign: "Guardar Diseño",
    exportDesign: "Exportar Diseño",
    exportPng: "Descargar PNG",
    exportJpg: "Descargar JPEG",
    exportSvg: "Descargar Vector SVG",
    addText: "Agregar Texto",
    addShape: "Agregar Forma",
    addIcon: "Agregar Ícono",
    addImage: "Subir Imagen",
    canvasBackground: "Fondo del Lienzo",
    layers: "Capas de Elementos",
    deleteElement: "Eliminar Elemento",
    duplicateElement: "Duplicar",
    bringForward: "Traer al Frente",
    sendBackward: "Enviar al Fondo",
    fontSize: "Tamaño de Fuente",
    textColor: "Color de Texto",
    shapeFill: "Color de Forma",
    opacity: "Opacidad",
    alignment: "Alineación",
    designSavedSuccess: "¡Diseño guardado exitosamente en Mis Diseños!",
    designExportedSuccess: "¡Diseño exportado y descargado con éxito!",
    autoSaveStatus: "Guardado automático",
    autoSaveActive: "Guardado automático activo (30s)",
    autoSaving: "Guardando automáticamente...",
    autoSavedAt: "Guardado automáticamente a las",
    autoSaveDraftFound: "Se encontró un borrador guardado automáticamente de la sesión anterior.",
    restoreDraft: "Restaurar Borrador",
    dismissDraft: "Descartar",
    draftRestored: "¡Borrador restaurado con éxito desde el autoguardado!",
    autoSaveIntervalNotice: "El guardado automático en almacenamiento local y nube se ejecuta cada 30 segundos para proteger su trabajo.",

    aiAssistant: "Asistente de Diseño Gemini AI",
    aiAssistantDesc: "Escriba su idea; la IA generará diseño, colores, tipografía y elementos gráficos.",
    aiPromptPlaceholder: "Ejemplo: Cartel vintage para festival de café con tonos cálidos...",
    generateWithAi: "Diseñar con IA",
    generatingAiDesign: "Gemini está componiendo su obra gráfica...",
    aiPreset1: "Póster de Venta Flash de Fin de Semana",
    aiPreset2: "Banner para Conferencia Tecnológica",
    aiPreset3: "Tarjeta de Felicitación Moderna",
    aiPreset4: "Promoción Gastronómica para Redes",
    aiCopyGenerator: "Generador de Copywriting con IA",
    aiGenerateTaglines: "Generar Eslogan Atractivo",
    aiApplyToCanvas: "Aplicar al Lienzo",
    aiDesignReady: "¡Diseño generado por IA cargado en el lienzo!",

    myDesignsTitle: "Colección Mis Diseños",
    myDesignsDesc: "Administre las obras gráficas creadas, edítelas o expórtelas cuando desee.",
    noDesignsYet: "Aún no tiene proyectos de diseño guardados.",
    createFirstDesign: "Crear Su Primer Diseño",
    editDesign: "Continuar Editando",
    deleteDesign: "Eliminar Diseño",
    lastEdited: "Última edición",
  },
};
