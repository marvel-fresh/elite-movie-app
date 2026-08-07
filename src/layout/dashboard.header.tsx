import { useEffect, useState } from "react";
import { Link } from "react-router";

interface HeaderProps {
    isLoggedIn: boolean;
}


function DashboardHeader({ isLoggedIn }: HeaderProps) {

useEffect(()=>{
const header = document.getElementsByClassName('dashboard-header');

    window.addEventListener('scroll', () => {
    const getScroll = window.scrollY
  if (getScroll > 30) {
    header[0]?.classList.add("scrolled")
    console.log("User passed the threshold!");
  }
  else{
    header[0]?.classList.remove("scrolled")

  }
    })
},[])




    const [searchQuery, setSearchQuery] = useState<string>("")
    return (

        <header className="dashboard-header">

            <h3 className="app-name"> 🎬Elite Movies</h3>
            <nav>
                <ul className="nav-links">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/trending">Trending</Link>
                    </li>
                    <li>
                        <Link to="/upComing">UpComing</Link>
                    </li>
                    <li>
                        <Link to="/latest">Latest</Link>
                    </li>
                </ul>
            </nav>

            <div className="header-search" >
                <input
                    type="search"
                    placeholder="Search results..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="button" className="btn btn-brand" onClick={() => {
                    alert('Search is not found')
                }}
                >
                    🔍
                </button>

            </div>


        </header>

    );
}

export default DashboardHeader;