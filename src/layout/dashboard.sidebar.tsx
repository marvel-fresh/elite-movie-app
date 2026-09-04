import {
  Home,
  TrendingUp,
  TvIcon,
  HistoryIcon,
  Settings,
  type LucideIcon,
  Flame,
  Clapperboard,
  Bookmark,
  Disc3Icon,
} from "lucide-react";

import { NavLink } from "react-router";

interface SidebarLinkProps {
  label: string;
  icon: LucideIcon;
  to: string;
}

interface DashboardSidebarProps {
  logOut: () => void;
  isOpen: boolean;
  closeSidebar: () => void;
}

const sidebarLinks: SidebarLinkProps[] = [
  { label: "Home", icon: Home, to: "/" },
   { label: "Discover", icon: Disc3Icon, to: "/discover" },
  { label: "Trending", icon: Flame, to: "/trending" },
  { label: "Popular", icon: TrendingUp, to: "/popular" },
  { label: "WatchLists", icon: Bookmark, to: "/watchlists" },
  { label: "History", icon: HistoryIcon, to: "/history" },
  { label: "Settings", icon: Settings, to: "/settings" },
 
];

function DashboardSidebar({
  logOut,
  isOpen,
  closeSidebar,
}: DashboardSidebarProps) {
  return (
    <nav
      className={`sidebar-nav ${
        isOpen ? "sidebar-open" : ""
      }`}
    >

      
      {/* <button
        className="sidebar-close"
        onClick={closeSidebar}
        aria-label="Close menu"
      >
        <X size={24} />
      </button> */}

      {sidebarLinks.map(({ icon: Icon, label, to }) => (
        <NavLink
          key={to}
          to={to}
          onClick={closeSidebar}
          className={({ isActive }) =>
            `sidebar-btn ${
              isActive ? "active-link" : ""
            }`
          }
        >
          <div className="active-bar" />

          <Icon size={20} />

          <span>{label}</span>
        </NavLink>
      ))}

      
    </nav>
  );
}

export default DashboardSidebar;