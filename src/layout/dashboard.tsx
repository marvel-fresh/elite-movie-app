// import { Outlet, useNavigate } from 'react-router';
// import DashboardSidebar from './dashboard.sidebar';

// import { useEffect } from 'react';
// import { checkSession, endSession } from '@/data/login';

// function DashboardLayout() {


//     const navigate = useNavigate()
//     useEffect(() => {
//         const check = checkSession()
//         if (!check) {
//             navigate("/login")
//         }

//     }, [navigate])


//     const logOut = () => {
//         endSession()
//         navigate("/login")

//     }

//     return (
//         <div className="flex">
//             <aside className="dashboard-sidebar">
//                 <DashboardSidebar logOut={logOut} />
//             </aside>
//             <main className="main-card">
//                 <Outlet />
//             </main>

//         </div>



//     )
// }

// export default DashboardLayout