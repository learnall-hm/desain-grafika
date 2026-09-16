import React, { useState, useRef, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { Bell, CheckCheck, Trash2, Sparkles, AlertCircle, Palette, ArrowRight } from "lucide-react";
import { NotificationType } from "../types";

export const NotificationPanel: React.FC = () => {
  const {
    t,
    notifications,
    unreadNotifsCount,
    markAllNotificationsAsRead,
    clearNotifications,
  } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | NotificationType>("all");
  const panelRef = useRef<HTMLDivElement>(null);

  // Close when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredNotifs = notifications.filter((notif) => {
    if (activeTab === "all") return true;
    return notif.type === activeTab;
  });

  return (
    <div className="relative" ref={panelRef} id="notification-container">
      <button
        id="notification-bell-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t("notifications")}
        className="relative p-2 text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg shadow-xs transition-colors focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
      >
        <Bell className="w-4 h-4" />
        {unreadNotifsCount > 0 && (
          <span
            id="notification-unread-badge"
            className="absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-xs animate-pulse"
          >
            {unreadNotifsCount > 9 ? "9+" : unreadNotifsCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          id="notification-dropdown-panel"
          className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Header */}
          <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-slate-800 text-sm">{t("notifications")}</h3>
              {unreadNotifsCount > 0 && (
                <span className="text-[11px] px-2 py-0.5 font-semibold bg-indigo-100 text-indigo-700 rounded-full">
                  {unreadNotifsCount} baru
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <button
                id="notif-mark-read-btn"
                onClick={markAllNotificationsAsRead}
                title={t("markAllAsRead")}
                className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-white rounded-md transition-colors text-xs flex items-center gap-1"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-xs">{t("markAllAsRead")}</span>
              </button>
              <button
                id="notif-clear-btn"
                onClick={clearNotifications}
                title={t("clearAll")}
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-white rounded-md transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex border-b border-slate-100 px-3 pt-2 gap-1 bg-white">
            <button
              id="notif-tab-all"
              onClick={() => setActiveTab("all")}
              className={`pb-2 px-2.5 text-xs font-medium border-b-2 transition-colors ${
                activeTab === "all"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              {t("allNotifications")} ({notifications.length})
            </button>
            <button
              id="notif-tab-activity"
              onClick={() => setActiveTab("activity")}
              className={`pb-2 px-2.5 text-xs font-medium border-b-2 transition-colors ${
                activeTab === "activity"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              {t("activityTab")}
            </button>
            <button
              id="notif-tab-system"
              onClick={() => setActiveTab("system")}
              className={`pb-2 px-2.5 text-xs font-medium border-b-2 transition-colors ${
                activeTab === "system"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              {t("systemTab")}
            </button>
          </div>

          {/* Notification List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
            {filteredNotifs.length === 0 ? (
              <div className="py-10 px-4 text-center">
                <Bell className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                <p className="text-xs text-slate-500">{t("noNotifications")}</p>
              </div>
            ) : (
              filteredNotifs.map((item) => (
                <div
                  key={item.id}
                  className={`p-3.5 hover:bg-slate-50 transition-colors flex gap-3 ${
                    !item.read ? "bg-indigo-50/40" : ""
                  }`}
                >
                  <div className="shrink-0 mt-0.5">
                    {item.type === "system" ? (
                      <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                        <AlertCircle className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                        <Palette className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <h4 className="text-xs font-semibold text-slate-800 truncate">
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 shrink-0">
                        {item.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {item.message}
                    </p>
                    {item.badge && (
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-sm bg-slate-100 text-slate-600">
                          {item.badge}
                        </span>
                        {!item.read && (
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-500">
              Notifikasi terintegrasi otomatis untuk aktivitas desain & pembaruan sistem.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
