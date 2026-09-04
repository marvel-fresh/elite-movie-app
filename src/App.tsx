import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router';
import DashboardPage from './routes/dashboard';
import LandingLayout from './layout/landing.main';
import TV from './routes/dashboard/tv.$id';
import AuthLayout from './layout/auth';
import LoginForm from './routes/auth/login';
import RegistrationForm from './routes/auth/registration';
import TrendingMovies from './routes/dashboard/trending';
import TrendingPage from './routes/dashboard/trending';
import PopularPage from './routes/dashboard/popular';
import Movie from './routes/dashboard/movie.$id';
import Person from './routes/dashboard/person.$id';
import SearchPage from './layout/searchpage'
import Settings from './routes/dashboard/settings'
import Watchlist from './routes/dashboard/watchlist'
import Discover from "./routes/dashboard/discover";
<Route
  path="/settings"
  element={<Settings />}
/>
// import PersonDetails from './routes/dashboard/personDetails'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LandingLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="trending" element={<TrendingMovies />} />
          <Route path="/trending" element={<TrendingPage />} />
          <Route path="/popular" element={<PopularPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/watchlists" element={<Watchlist />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/person/:id" element={<Person />} />
          <Route path="/tv/:id" element={<TV />} />
        </Route>
        

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
        </Route>
        <Route path="/dashboard" element={<DashboardPage />} />

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


