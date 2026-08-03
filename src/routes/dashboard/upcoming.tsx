
import { Link, } from "react-router";
import { useState } from 'react';
const TrendingMovies = () => {

    return (

<>


         <section className="hero-upComing"
       
 
  >
        <div className="hero-content">
        
          <h1>The avengers</h1>
          <p>
           season 1-25
          </p>

          <button className="hero-btn">details</button>

          <h1>The avengers</h1>
          <p>
           season 1-25
          </p>

          <button className="hero-btn">details</button>

        </div>
      </section>
      <footer>
                  <nav>
                     <div className="movie-card">
  <ul className="footer-links">
    <li>
      <Link to="/">About us</Link>
    </li>
    <li>
      <Link to="/trending">Contact Us</Link>
    </li>
    <li>
      <Link to="/upComing">Help</Link>
    </li>
    <li>
      <Link to="/latest">Send Feedback</Link>
    </li>
  </ul>






   </div>
</nav>

      </footer>
</>
    )
}
export default TrendingMovies