import { NavLink } from 'react-router'

const sidebarLinks = [
  { label: 'Elite', to: '/dashboard/elite' },
  { label: 'Latest', to: '/dashboard/latest' },
  { label: 'Trending', to: '/dashboard/trending' },
  { label: 'Upcoming', to: '/dashboard/upcoming' },

]


function DashboardSidebar({logOut}:{logOut:()=>void }) {


  return (
    <>
      <nav className="">
        <h4>Dashboard Menu</h4>
        <div>
          {sidebarLinks.map((item) => (
            <div key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) => 
                    `sidebar-btn ${isActive ? 'active-link' : ''}`}
              >
                {item.label}
              </NavLink>
            </div>
          ))}
        </div>

         
          

        <div className="sidebar-section">
          <h4>Reports</h4>
          <div>
            <div>
              <NavLink
                to="/dashboard/reports"
                className={({isActive }) =>
                    `sidebar-btn ${isActive ? 'active-link' : ''}`
            }
              >
                Reports
              </NavLink>
            </div>
          </div>
        </div>

              <NavLink
                to="/dashboard/profile"
                className={({isActive})=>
                    `sidebar-btn ${isActive ? 'active-link' : ''}`
            }
              >
                Profile
              </NavLink>
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