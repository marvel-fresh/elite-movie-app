import React from 'react'
// import {  useState } from 'react';
import AuthLayout from './layout/auth';
import { BrowserRouter, Routes, Route } from 'react-router';

import LoginForm from './routes/auth/login';
// import RegistrationForm from './routes/auth/registration';






function App() {

    return (
       <BrowserRouter>
      {/* Your app content */}
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginForm />} />
          {/* <Route path="/register" element={<RegistrationForm />} /> */}
        </Route>
      </Routes>
      </BrowserRouter>
    );
}













export default App
  
  {/* // const [searchQuery, setSearchQuery] = useState<string>()

    // <header>
    //  <div className="header-search" >
    //       <input
    //         type="search"
    //         placeholder="Search results..."
    //         value={searchQuery}
    //         onChange={(e) => setSearchQuery(e.target.value)}
    //       />
    //       <button type="button" className="btn btn-brand" onClick={() => { alert('Search is not found') 
    //       }} 
    //        >
    //         Search
    //       </button>
    //     </div>
    //   </header> */}
      

