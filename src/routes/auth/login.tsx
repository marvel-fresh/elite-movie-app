// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router";
// import { loginUser, startSession } from "@/data/login";


// const LoginForm = () => {

//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const login = async (e: React.SubmitEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (email.trim() === "" || password.trim() === "") {
//       alert("Please enter email and password");
//       return;
//     }

//     try {
//       const response = await loginUser(email, password);
//       if (!response || !response.success) {
//         alert(response?.message || "Login failed");
//         return;
//       }

//       alert(response.message || "Login successful");
//       const sessionPayload= {
//         ...response?.user,
//         password : ""
//       }
//       startSession(sessionPayload)
//       navigate("/dashboard");
//     }
//     catch(e){
//         console.log(e)
//     } 
//   };
  
//   return (
//      <div className="registration-page">
//     <div className="form-data">
//       <h2>Login</h2>
//       <form onSubmit={login}>
//         <div className="form-group">
//           <label>Email</label>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label>Password</label>
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
        
//         <div>
//           <button type="submit" className="btn">Login</button>
//         </div>
        
//       </form>
//       <div className="subtext"> New here? <Link to="/register">Join Us</Link></div>
//     </div>
//     </div>
//   )
// }

// export default LoginForm;