import { useState } from 'react'
import { Outlet } from 'react-router';
import DashboardHeader from './dashboard.header';

function LandingLayout() {
    
  const [isLoggedIn] = useState<boolean>(false)

    return (
        <>
        <DashboardHeader isLoggedIn={isLoggedIn}/>
    
            <Outlet />
      

        </>
    )
}

export default LandingLayout