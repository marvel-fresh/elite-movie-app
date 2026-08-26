import { ArrowLeft, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

interface HeaderProps {
    isLoggedIn: boolean;
}

function DashboardHeader({ isLoggedIn }: HeaderProps) {
    void isLoggedIn;

    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        const header = document.getElementsByClassName("dashboard-header");

        const handleScroll = () => {
            const getScroll = window.scrollY;

            if (getScroll > 30) {
                header[0]?.classList.add("scrolled");
            } else {
                header[0]?.classList.remove("scrolled");
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Cleanup event listener
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header className="dashboard-header">

            <button
                onClick={() => navigate(-1)}
                className="back-btn"
            >
                <ArrowLeft size={20} />
                <span>Back</span>
            </button>

            <h3 className="app-name">🎬 Elite Movies</h3>

           

            <div className="header-search">
                <input
                    type="search"
                    placeholder="Search results..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <Search
                    className="search-icon"
                    size={18}
                />
            </div>

        </header>
    );
}

export default DashboardHeader;