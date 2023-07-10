import { useState } from "react";
import {  useNavigate } from "react-router-dom";

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate()
  
    const handleSignup = async () => {
      try {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            username,
            password,
          }),
        });
  
        if (response.ok) {
          const { createdUser, encodedToken } = await response.json();
          localStorage.setItem("token", encodedToken);
          localStorage.setItem("user", JSON.stringify(createdUser));
          navigate("/")
          // Perform actions on successful signup
        } else {
          const { errors } = await response.json();
          setErrorMessage(errors[0]);
        }
      } catch (error) {
        setErrorMessage("An error occurred while signing up.");
      }
    };
  
    return (
      <div className="login-container">
  <h2 className="login-heading">Signup</h2>
  {errorMessage && <p className="error-message">{errorMessage}</p>}
  <div className="form-group">
    <label className="label" htmlFor="firstName">
      First Name:
    </label>
    <input
      className="input"
      type="text"
      id="firstName"
      value={firstName}
      onChange={(e) => setFirstName(e.target.value)}
    />
  </div>
  <div className="form-group">
    <label className="label" htmlFor="lastName">
      Last Name:
    </label>
    <input
      className="input"
      type="text"
      id="lastName"
      value={lastName}
      onChange={(e) => setLastName(e.target.value)}
    />
  </div>
  <div className="form-group">
    <label className="label" htmlFor="username">
      Username:
    </label>
    <input
      className="input"
      type="text"
      id="username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
  </div>
  <div className="form-group">
    <label className="label" htmlFor="password">
      Password:
    </label>
    <input
      className="input"
      type="password"
      id="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
  </div>
  <button className="login-button" onClick={handleSignup}>
    Signup
  </button>
</div>

    );
  };