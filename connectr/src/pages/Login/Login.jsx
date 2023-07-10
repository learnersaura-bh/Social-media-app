// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router";
// export const Login = () => {
//   const loginHandler = async () => {
//     const cred = { username: "adarshbalika" , password: "adarshBalika123" };
//     try {
//       const response = await fetch("/api/auth/login", {
//         method: "POST",
//         body: JSON.stringify(cred),
//       });
//  console.log("status:" ,response.status);
// const data = await response.json();
// console.log("data:" , data);
// const {encodedToken} = data;
// console.log("encoded token:" , encodedToken );
// localStorage.setItem("token" , encodedToken)

//     } catch (e) {
//       console.log(e);
//     }
//   };
//   const location = useLocation()
//   const navigate = useNavigate()
//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   });

//   const [errors, setErrors] = useState({
//     email: "",
//     password: ""
//   });

//   const handleChange = (e) => {
//     const fieldName = e.target.name;
//     const fieldValue = e.target.value;
//     setFormData({ ...formData, [fieldName]: fieldValue });
//   };

//   const validateForm = () => {
//     let isValid = true;
//     const updatedErrors = {
//       email: "",
//       password: ""
//     };

//     // Validate Email
//     if (!formData.email) {
//       updatedErrors.email = "Email is required";
//       isValid = false;
//     }

//     // Validate Password
//     if (!formData.password) {
//       updatedErrors.password = "Password is required";
//       isValid = false;
//     }

//     setErrors(updatedErrors);
//     return isValid;
//   };

//   const submitHandler = async () => {
//     // e.preventDefault();

//     // if (validateForm()) {
//       try {
//         const cred = {
//           email: formData.email,
//           password: formData.password
//         };

//         const response = await fetch("/api/auth/login", {
//           method: "POST",
//           body: JSON.stringify(cred)
//         });

//         // const data  = await response.json();

// const {encodedToken} = await response.json()
// console.log(encodedToken);
//         if (encodedToken) {
//           // Login successful
//           console.log("Logged in");
//           console.log(encodedToken);
//           localStorage.setItem("token" , encodedToken)
//           setFormData({
//             email: "",
//             password: ""
//           });
//           toast.success("Logged In successfully" , {autoClose : 1000});
//           navigate(location?.state?.from?.pathname || "/products" )
//         } else {
//           // Login failed
//           console.log("Login failed");
//         }
//       } catch (e) {
//         console.error(e);
//       }
//     // }
    
    
//   };
//  const loginAsTestUser = async() => {
//   setFormData({email: "adarshbalika@gmail.com",
//             password: "adarshbalika"}) 
//             try {
//               const cred = {
//                 email: "adarshbalika@gmail.com",
//                 password: "adarshbalika"
//               };
      
//               const response = await fetch("/api/auth/login", {
//                 method: "POST",
//                 body: JSON.stringify(cred)
//               });
      
//               // const data  = await response.json();
      
//       const {encodedToken} = await response.json()
//       console.log(encodedToken);
//               if (encodedToken) {
//                 // Login successful
//                 console.log("Logged in");
//                 console.log(encodedToken);
//                 localStorage.setItem("token" , encodedToken)
//                 setFormData({
//                   email: "",
//                   password: ""
//                 });
//                 toast.success("Logged In successfully" , {autoClose : 1000});
//                 navigate(location?.state?.from?.pathname || "/products" )
//               } else {
//                 // Login failed
//                 console.log("Login failed");
//               }
//             } catch (e) {
//               console.error(e);
//             } 
//  }
//   return (
//     <div className="login-container">
//        <div className="login-page">
//         <h2>Login</h2>
//         <div className="label-input">
//           <label htmlFor="email">Email</label>
//           <input type="email" placeholder="Enter e-mail" id="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           required />
//         </div>
//         <div className="label-input">
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             placeholder="Enter your password"
//             id="password"
//             name="password"
//           value={formData.password}
//           onChange={handleChange}
//           />
//           {errors.password && <span>{errors.password}</span>}
//         </div>
//         <div className="login-buttons">
//           <button type="submit" onClick={submitHandler}>Login</button>
//           <button type="submit" onClick={loginAsTestUser} >Login as Test User</button>
//           <strong style={{color: "green" , cursor: "pointer"}} onClick={() => navigate("/signup")}>Create New Account  </strong>
//         </div>
//       </div>
//     </div>
//   );
// };
import { useState } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import "./Login.css"
export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const { foundUser, encodedToken } = await response.json();
        localStorage.setItem("token", encodedToken);
        localStorage.setItem("user", JSON.stringify(foundUser));
        setUsername("")
        setPassword("")
        navigate("/")
      } else {
        const { errors } = await response.json();
        setErrorMessage(errors[0]);
      }
    } catch (error) {
      setErrorMessage("An error occurred while logging in.");
    }
  };

  const handleGuestLogin = async () => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "adarshbalika",
          password: "adarshBalika123",
        }),
      });

      if (response.ok) {
        const { foundUser, encodedToken } = await response.json();
        localStorage.setItem("token", encodedToken);
        localStorage.setItem("user", JSON.stringify(foundUser));
        navigate("/")
        // Perform actions for guest login
      } else {
        const { errors } = await response.json();
        setErrorMessage(errors[0]);
      }
    } catch (error) {
      setErrorMessage("An error occurred while logging in.");
    }
  };

  

  return (
    <div className="login-container">
    <h2 className="login-heading">Login</h2>
    {errorMessage && <p className="error-message">{errorMessage}</p>}
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
    <button className="login-button" onClick={handleLogin}>
      Login
    </button>
    <button className="guest-login-button" onClick={handleGuestLogin}>
      Login as Guest
    </button>
    <NavLink className="signup-link" to="/signup">
      Sign Up
    </NavLink>
  </div>
  );
};
