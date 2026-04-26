import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Settings,
  Info,
  Shield,
  FileText,
  LogOut,
  Menu,
  Inbox,
  ChevronRight,
  UserCircle,
  Utensils,
  Tags,
} from "lucide-react";
import ShowSvg from "@/components/shared/ShowSvg";
import SideBarLogo from "@/assets/images/SideBarLogo.svg";
import { useNavigate, useLocation } from "react-router-dom";
import useLogout from "@/services/hooks/useLogout";

interface SidebarProps {
  sidebarVisible?: boolean;
  setsidebarVisible?: (val: boolean) => void;
}

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  path?: string;
  collapsed?: boolean;
  active?: boolean;
  onClick?: () => void;
}

interface SubNavItemProps {
  icon: React.ElementType;
  label: string;
  path?: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem = ({
  icon: Icon,
  label,
  path,
  collapsed,
  active,
  onClick,
}: NavItemProps) => {
  const navigate = useNavigate();

  return (
    <li>
      <button
        onClick={() => {
          if (path) navigate(path);
          onClick?.();
        }}
        title={collapsed ? label : undefined}
        className="group w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 text-left relative overflow-hidden"
        style={
          active
            ? {
                background: "#89957F",
                boxShadow: "0 4px 18px rgba(137,149,127,0.35)",
                color: "#ffffff",
              }
            : {
                color: "#1a1a1a",
              }
        }
        onMouseEnter={(e) => {
          if (!active) {
            e.currentTarget.style.background = "rgba(137,149,127,0.12)";
            e.currentTarget.style.color = "#1a1a1a";
          }
        }}
        onMouseLeave={(e) => {
          if (!active) {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#1a1a1a";
          }
        }}
      >
        {/* Active left glow bar */}
        {active && (
          <span
            className="absolute left-0 top-2 bottom-2 w-0.75 rounded-r-full"
            style={{ background: "rgba(255,255,255,0.55)" }}
          />
        )}

        <Icon
          size={22}
          className="shrink-0 transition-colors"
          style={{ color: active ? "#ffffff" : "inherit" }}
        />
        {!collapsed && (
          <span className="text-base font-semibold tracking-wide truncate">
            {label}
          </span>
        )}
      </button>
    </li>
  );
};

const SubNavItem = ({
  icon: Icon,
  label,
  path,
  active,
  onClick,
}: SubNavItemProps) => {
  const navigate = useNavigate();

  return (
    <li>
      <button
        onClick={() => {
          if (path) navigate(path);
          onClick?.();
        }}
        className="group w-full flex items-center gap-4 px-4 py-2.5 rounded-xl transition-all duration-200 text-left relative overflow-hidden"
        style={
          active
            ? {
                background: "#89957F",
                boxShadow: "0 3px 12px rgba(137,149,127,0.3)",
                color: "#ffffff",
              }
            : { color: "#1a1a1a" }
        }
        onMouseEnter={(e) => {
          if (!active) {
            e.currentTarget.style.background = "rgba(137,149,127,0.12)";
            e.currentTarget.style.color = "#1a1a1a";
          }
        }}
        onMouseLeave={(e) => {
          if (!active) {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#1a1a1a";
          }
        }}
      >
        <Icon
          size={18}
          className="shrink-0"
          style={{ color: active ? "#ffffff" : "inherit" }}
        />
        <span className="text-sm font-medium tracking-wide truncate">
          {label}
        </span>
      </button>
    </li>
  );
};

export default function Sidebar({
  sidebarVisible = true,
  setsidebarVisible,
}: SidebarProps) {
  const collapsed = !sidebarVisible;
  const navigate = useNavigate();
  const location = useLocation();
  const { handleLogout, isLoading: isLoggingOut } = useLogout();

  const [settingsOpen, setSettingsOpen] = useState(false);

  const toggle = () => {
    const next = !sidebarVisible;
    setsidebarVisible?.(next);
    if (!next) setSettingsOpen(false);
  };

  const onLogout = async () => {
    const ok = await handleLogout();
    if (ok) navigate("/dashboard/login");
  };

  const mainNav = [
    { label: "Overview", icon: LayoutDashboard, path: "/dashboard/overview" },
    {
      label: "User Management",
      icon: Users,
      path: "/dashboard/user-management",
    },
    {
      label: "Recipe Management",
      icon: Utensils,
      path: "/dashboard/recipe-management",
    },
    {
      label: "Topic Management",
      icon: Tags,
      path: "/dashboard/topic-management",
    },
    { label: "Inbox", icon: Inbox, path: "/dashboard/inbox" },
  ];

  const settingsNav = [
    {
      label: "Edit Profile",
      icon: UserCircle,
      path: "/dashboard/edit-profile",
    },
    { label: "About Us", icon: Info, path: "/dashboard/about-us" },
    {
      label: "Privacy Policy",
      icon: Shield,
      path: "/dashboard/privacy-policy",
    },
    {
      label: "Terms & Conditions",
      icon: FileText,
      path: "/dashboard/terms-conditions",
    },
  ];

  const isSettingsChildActive = settingsNav.some(
    (s) => s.path === location.pathname,
  );
  const isSettingsHighlighted = settingsOpen || isSettingsChildActive;

  return (
    <>
      <aside
        style={{
          width: collapsed ? "80px" : "288px",
          background: "#ffffff",
          borderRight: "1px solid rgba(0,0,0,0.08)",
        }}
        className="fixed top-0 left-0 h-screen flex flex-col transition-all duration-300 z-50 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-6 min-h-20 relative z-10">
          {!collapsed && (
            <ShowSvg
              icon={SideBarLogo}
              height={48}
              width={160}
              alt="App Logo"
            />
          )}
          <button
            onClick={toggle}
            className={`rounded-lg p-2 transition-all duration-200 ${collapsed ? "mx-auto" : ""}`}
            style={{ color: "#1a1a1a" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#89957F";
              e.currentTarget.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#1a1a1a";
            }}
          >
            <Menu size={22} />
          </button>
        </div>

        {/* Divider */}
        <div
          className="mx-5 mb-4 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)",
          }}
        />

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 no-scrollbar relative z-10">
          {!collapsed && (
            <p
              className="text-[10px] font-bold tracking-[0.18em] uppercase px-2 mb-3"
              style={{ color: "#888888" }}
            >
              Menu
            </p>
          )}
          <ul className="space-y-1">
            {mainNav.map(({ label, icon, path }) => (
              <NavItem
                key={label}
                icon={icon}
                label={label}
                path={path}
                collapsed={collapsed}
                active={location.pathname === path}
              />
            ))}
          </ul>

          {/* Settings Accordion */}
          <div
            className="mt-5"
            onMouseEnter={() => !collapsed && setSettingsOpen(true)}
            onMouseLeave={() =>
              !collapsed && !isSettingsChildActive && setSettingsOpen(false)
            }
          >
            {collapsed ? (
              <ul className="space-y-1 mt-0.5">
                <NavItem
                  icon={Settings}
                  label="Settings"
                  collapsed={collapsed}
                  active={false}
                />
              </ul>
            ) : (
              <div>
                <button
                  className="group w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 relative overflow-hidden"
                  style={
                    isSettingsHighlighted
                      ? {
                          background: "#89957F",
                          boxShadow: "0 4px 18px rgba(137,149,127,0.35)",
                          color: "#ffffff",
                        }
                      : { color: "#1a1a1a" }
                  }
                  onMouseEnter={(e) => {
                    if (!isSettingsHighlighted) {
                      e.currentTarget.style.background =
                        "rgba(137,149,127,0.12)";
                      e.currentTarget.style.color = "#1a1a1a";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSettingsHighlighted) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#1a1a1a";
                    }
                  }}
                  onClick={() => setSettingsOpen(!settingsOpen)}
                >
                  {isSettingsHighlighted && (
                    <span
                      className="absolute left-0 top-2 bottom-2 w-0.75 rounded-r-full"
                      style={{ background: "rgba(255,255,255,0.55)" }}
                    />
                  )}
                  <Settings
                    size={22}
                    className="shrink-0 transition-colors"
                    style={{
                      color: isSettingsHighlighted ? "#ffffff" : "inherit",
                    }}
                  />
                  <span className="text-base font-semibold tracking-wide flex-1 text-left">
                    Settings
                  </span>
                  <ChevronRight
                    size={16}
                    className={`shrink-0 transition-transform duration-300 ${settingsOpen ? "rotate-90" : ""}`}
                    style={{
                      color: isSettingsHighlighted ? "#ffffff" : "inherit",
                    }}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    settingsOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div
                    className="ml-4 mt-1 pl-3 space-y-1"
                    style={{ borderLeft: "1px solid rgba(137,149,127,0.25)" }}
                  >
                    {settingsNav.map(({ label, icon, path }) => (
                      <SubNavItem
                        key={label}
                        icon={icon}
                        label={label}
                        path={path}
                        active={location.pathname === path}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Divider */}
        <div
          className="mx-5 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)",
          }}
        />

        {/* Footer */}
        <div className="px-3 py-5 relative z-10">
          <button
            onClick={onLogout}
            disabled={isLoggingOut}
            title={collapsed ? "Log out" : undefined}
            className={`group w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
              collapsed ? "justify-center" : ""
            }`}
            style={{ color: "rgba(0,0,0,0.35)" }}
            onMouseEnter={(e) => {
              if (!isLoggingOut) {
                e.currentTarget.style.background = "rgba(239,68,68,0.08)";
                e.currentTarget.style.color = "#ef4444";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "rgba(0,0,0,0.35)";
            }}
          >
            <LogOut size={22} className="shrink-0" />
            {!collapsed && (
              <span className="text-base font-semibold tracking-wide">
                {isLoggingOut ? "Logging out..." : "Log out"}
              </span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
