import { Home, TrendingUp, MoveIcon, TvIcon, Save, HistoryIcon, Settings, type LucideIcon, Flame, PlayIcon, Clapperboard, Bookmark } from 'lucide-react';
import { NavLink } from 'react-router'

interface SidebarLinkProps {
  label: string
  icon: LucideIcon
  to: string
}

const sidebarLinks: SidebarLinkProps[] = [
  { label: 'Home', icon: Home, to: '/' },
  { label: 'Trending', icon: Flame, to: '/trending' },
  { label: 'Popular', icon: TrendingUp, to: '/popular' },
  { label: 'Movie', icon: Clapperboard, to: '/movie' },
  { label: 'Tv Shows', icon: TvIcon, to: '/tvshows' },
  { label: 'WatchLists', icon: Bookmark, to: '/watchlists' },
  { label: 'History', icon: HistoryIcon, to: '/history' },
  { label: 'Settings', icon: Settings, to: '/settings' },
]


function DashboardSidebar({ logOut }: { logOut: () => void }) {


  return (
    <>
      <nav className="sidebar-nav">
        
          {sidebarLinks.map(({icon:Icon, label, to}, i) => (
           
              <NavLink
              key={i}
                to={to}
                className={({ isActive }) =>
                  `sidebar-btn ${isActive ? 'active-link' : ''}`}
              >
                <div className="active-bar"/>

                <Icon size={20}/>
                <span>
                  {label}
                  </span>
              </NavLink>
           
          ))}
        


        <button
          className={`sidebar-btn btn-logout`}
          onClick={logOut}
        >
          Logout
        </button>
      </nav>
    </>
  )
}

export default DashboardSidebar