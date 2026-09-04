import { Bell, Menu, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "../global.css";

interface HeaderProps {
  isLoggedIn: boolean;
  openSidebar: () => void;
}

function DashboardHeader({
  isLoggedIn,
  openSidebar,
}: HeaderProps) {
  void isLoggedIn;

  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    navigate(
      `/search?query=${encodeURIComponent(searchQuery)}`
    );
  };

  useEffect(() => {
    const header =
      document.getElementsByClassName(
        "dashboard-header"
      );

    const handleScroll = () => {
      const getScroll = window.scrollY;

      if (getScroll > 30) {
        header[0]?.classList.add("scrolled");
      } else {
        header[0]?.classList.remove("scrolled");
      }
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  return (
    <header className="dashboard-header">

     
      <button
        className="hamburger"
        onClick={openSidebar}
        aria-label="Open menu"
      >
        <Menu size={28} />
      </button>

    
      <div className="app-name">
        <span className="elite">
           ELITE
        </span>{" "}
        <span className="movie">
          MOVIE
        </span>
      </div>

    
      <div className="header-search">
        <Search
          className="search-icon"
          size={18}
          onClick={handleSearch}
        />

        <input
          type="search"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) =>
            setSearchQuery(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
      </div>

      
      <button className="notification-btn">
        <Bell size={22} />

        <span className="notification-dot"></span>
      </button>

    </header>
  );
}

export default DashboardHeader;