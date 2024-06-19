import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Contexts/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { signupHandler } = useAuthContext();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      username.trim() === "" ||
      password.trim() === ""
    ) {
      setErrorMessage("All fields are required.");
      return;
    }
    const profileAvatar = `https://api.dicebear.com/9.x/personas/svg?seed=${username}`;
    try {
      await signupHandler({
        firstName,
        lastName,
        username,
        password,
        profileAvatar,
      });
      setFirstName("");
      setLastName("");
      setUsername("");
      setPassword("");
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message || "An error occurred while signing up.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Signup</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSignup}>
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
            required
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
            required
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
            required
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="password">
            Password:
          </label>
          <div className="password-input">
            <input
              className="input "
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
          Signup
        </button>
      </form>
    </div>
  );
};
