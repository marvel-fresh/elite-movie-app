import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { loginUser, startSession } from "@/data/login";


const LoginForm = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const login = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      alert("Please enter email and password");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage("");
      const response = await loginUser(email, password);
      if (!response || !response.success) {
        setErrorMessage(response?.message || "Login failed");
        return;
      }

      alert(response.message || "Login successful");
      const sessionPayload= {
        ...response?.user,
        password : ""
      }
      startSession(sessionPayload)
      navigate("/dashboard");
    }
    catch (error) {
      console.error("Login request failed:", error);
      setErrorMessage(
        "Login service is temporarily unavailable. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
     <div className="registration-page">
    <div className="form-data">
      <h2>Login</h2>
      {errorMessage ? <p className="auth-error" role="alert">{errorMessage}</p> : null}
      <form onSubmit={login}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <div>
          <button type="submit" className="btn" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Login"}
          </button>
        </div>
        
      </form>
      <div className="subtext"> New here? <Link to="/register">Join Us</Link></div>
    </div>
    </div>
  )
}

export default LoginForm;