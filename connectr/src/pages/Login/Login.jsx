import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css";
import { useAuthContext } from "../../Contexts/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();
  const { loginHandler } = useAuthContext();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (username.trim() === "" || password.trim() === "") {
      setErrorMessage("Username and password are required.");
      return;
    }

    try {
      await loginHandler({ username, password });
      setUsername("");
      setPassword("");
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message || "An error occurred while logging in.");
    }
  };

  const handleGuestLogin = async () => {
    const guestUsername = "emilysmith";
    const guestPassword = "emily@123Smith";
    setUsername(guestUsername);
    setPassword(guestPassword);

    try {
      await loginHandler({ username: guestUsername, password: guestPassword });
      setUsername("");
      setPassword("");
      navigate("/");
    } catch (error) {
      setErrorMessage("An error occurred while logging in.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleLogin}>
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
            required
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="password">
            Password:
          </label>
          <div className="password-input">
            <input
              className="input"
              type={passwordVisible ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? (
                <FaEyeSlash title="Hide Password" />
              ) : (
                <FaEye title="Show Password" />
              )}
            </span>
          </div>
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <button className="guest-login-button" onClick={handleGuestLogin}>
        Login as Guest
      </button>
      <NavLink className="signup-link" to="/signup">
        Sign Up
      </NavLink>
    </div>
  );
};
