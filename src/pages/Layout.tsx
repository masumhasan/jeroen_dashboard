import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import ShowSvg from "@/components/shared/ShowSvg";
import SideBarLogo from "@/assets/images/SideBarLogo.svg";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setSidebarVisible(false);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Mobile backdrop */}
      {isMobile && sidebarVisible && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => setSidebarVisible(false)}
        />
      )}

      <Sidebar
        sidebarVisible={sidebarVisible}
        setsidebarVisible={setSidebarVisible}
        isMobile={isMobile}
      />

      <main
        className="flex-1 transition-all duration-300 min-w-0 overflow-x-hidden"
        style={{ marginLeft: isMobile ? 0 : sidebarVisible ? "288px" : "80px" }}
      >
        {/* Mobile top bar */}
        {isMobile && (
          <div
            className="sticky top-0 z-30 flex items-center gap-3 px-4 h-14 border-b"
            style={{ background: "#ffffff", borderColor: "rgba(0,0,0,0.07)" }}
          >
            <button
              onClick={() => setSidebarVisible(true)}
              className="p-2 rounded-lg transition-colors"
              style={{ color: "#1a1a1a" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(137,149,127,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <Menu size={22} />
            </button>
            <ShowSvg icon={SideBarLogo} height={32} width={120} alt="Logo" />
          </div>
        )}

        {children}
      </main>
    </div>
  );
};

export default Layout;
