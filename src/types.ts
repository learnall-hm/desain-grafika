export type UserRole = "admin_utama" | "pengguna";

export type LanguageCode = "id" | "en" | "zh" | "ja" | "ar" | "es";

export type SubscriptionPlan = "free" | "monthly" | "yearly";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  phone: string;
  bio: string;
  joinedDate: string;
  designsCount: number;
  tier?: "free" | "premium";
  subscriptionPlan?: SubscriptionPlan;
  subscriptionExpiresAt?: string;
  isBelajarAccount?: boolean;
  belajarInstitution?: string;
}

export type ActiveView =
  | "templates"
  | "editor"
  | "my_designs"
  | "admin_portal"
  | "upload_design"
  | "login";

export type ElementType = "text" | "shape" | "image" | "badge" | "button" | "icon";
export type ShapeType = "rectangle" | "circle" | "triangle" | "star" | "pill";

export interface CanvasElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  width?: number;
  height?: number;
  rotation?: number;
  opacity?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  borderRadius?: number;
  textColor?: string;
  // Text specific
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  align?: "left" | "center" | "right";
  lineHeight?: number;
  // Shape specific
  shapeType?: ShapeType;
  // Image / Icon specific
  imageUrl?: string;
  iconName?: string;
  // State
  zIndex?: number;
  isLocked?: boolean;
}

export type DesignCategory =
  | "all"
  | "social_post"
  | "story"
  | "poster"
  | "banner"
  | "logo"
  | "business_card"
  | "flyer";

export interface DesignTemplate {
  id: string;
  title: string;
  category: DesignCategory;
  description: string;
  previewUrl: string;
  width: number;
  height: number;
  tags: string[];
  isFeatured?: boolean;
  isPremium?: boolean;
  createdBy: string;
  createdAt: string;
  background: {
    type: "solid" | "gradient" | "image";
    color: string;
    gradientColors?: [string, string];
    gradientDirection?: string;
  };
  elements: CanvasElement[];
}

export interface UserDesign {
  id: string;
  title: string;
  category: DesignCategory;
  width: number;
  height: number;
  previewUrl?: string;
  background: {
    type: "solid" | "gradient" | "image";
    color: string;
    gradientColors?: [string, string];
  };
  elements: CanvasElement[];
  createdAt: string;
  updatedAt: string;
}

export type NotificationType = "activity" | "system";

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  timestamp: string;
  badge?: string;
}

export interface AutoSaveDraft {
  design: UserDesign;
  savedAt: string;
  timestamp: number;
}
