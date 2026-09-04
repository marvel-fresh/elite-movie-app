import { Link } from "react-router";

interface HeaderProps {
  isLoggedIn: boolean;
}


function Header({ isLoggedIn }: HeaderProps) {
  return (
    <div className="flex justify-between items-center">


      <h2 style={{ margin: 0 }}>Welcome to my class</h2>
      <div className="flex items-center ">
<Link      
        to="/login"
        className="btn-inverse"
      > 

        {isLoggedIn ? "Logout" : "Login"}
      </Link>

      <Link
        to={"/register"}
        className="btn"
      >
        Signup
      </Link>
        
      </div>
      
    </div>
    
    
  );
}

export default Header;