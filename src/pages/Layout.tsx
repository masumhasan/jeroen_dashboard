import { useState } from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  return (
    <div className="flex min-h-screen ">
      <Sidebar
        sidebarVisible={sidebarVisible}
        setsidebarVisible={setSidebarVisible}
      />
      <main
        style={{ marginLeft: sidebarVisible ? "288px" : "80px" }}
        className="flex-1 transition-all duration-300"
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
