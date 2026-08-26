import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router';
import DashboardPage from './routes/dashboard';
import LandingLayout from './layout/landing.main';
// import Latest from './routes/dashboard/latest';
import UpComingMovies from './routes/dashboard/upcoming';
import TrendingMovies from './routes/dashboard/trending';
import TrendingPage from './routes/dashboard/trending';
import TrendingDetails from './routes/dashboard/trending.$id';
import NowPlaying from './routes/dashboard/nowPlaying.$id';
import Person from './routes/dashboard/person.$id';
// import PersonDetails from './routes/dashboard/personDetails'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LandingLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="trending" element={<TrendingMovies />} />
          <Route path="/trending" element={<TrendingPage />} />
          <Route path="/trending/:id" element={<TrendingDetails />} />
          {/* <Route path="/person/:id" element={<PersonDetails />} /> */}
          <Route path="/now-playing/:id" element={<NowPlaying />} />
          {/* <Route path="latest" element={<Latest />} /> */}
          <Route path="UpComing" element={<UpComingMovies />} />
          <Route path="/person/:id" element={<Person />} />
        </Route>

        {/* <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
        </Route> */}
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* <Route index element={<LatestMovies />} />
        <Route path="/dashboard/latest" element={<LatestMovies />} /> */}


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


