import { useState } from 'react'
import { Outlet } from 'react-router';
import DashboardHeader from './dashboard.header';
import DashboardSidebar from './dashboard.sidebar'
import "../global.css"

function LandingLayout() {

    const [isLoggedIn] = useState<boolean>(false)

    const logOut = ()=>{

    }
    return (
        <>
            <DashboardHeader isLoggedIn={isLoggedIn} />
            <main className="content">
                <aside className="sidebar">
                    <DashboardSidebar logOut={logOut}/>
                </aside>
                <div className="container">
                    <Outlet />

                </div>
            </main>



        </>
    )
}

export default LandingLayout