// import { useState,  } from "react";
// import { Link, useNavigate } from "react-router";
// import { saveRegistration } from "@/data/registration";

// const RegistrationForm = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const register = async (e: React.SubmitEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setMessage("");

//     const result = await saveRegistration({ email, password });

//     setMessage(result.message);

//     if (result.success) {
//       navigate("/dashboard");
//     }
//   };

//   return (
//     <div className="registration-page">
//     <div className="form-data">
//       <h2>Register</h2>
//       <form onSubmit={register}>
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
//           <button type="submit" className="btn">Register</button>
//         </div>
//       </form>
//       {message ? <p className="subtext">{message}</p> : null}
//       <div className="subtext">Already have an account? <Link to="/login">Login</Link></div>
//     </div>
//     </div>
//   );
// };

// export default RegistrationForm;