import {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from "react";
import { loginUser } from "../actions/actions";
import { DataReducer, initialState } from "../Reducers/DataReducer";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DataReducer, initialState);

  const [loginDetails, setLoginDetails] = useState(() => {
    const savedLoginDetails = localStorage.getItem("loginDetails");
    return savedLoginDetails ? JSON.parse(savedLoginDetails) : null;
  });
  const loginHandler = async ({ username, password }) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.errors ? errorData.errors[0] : "Login failed"
        );
      }

      const { foundUser, encodedToken } = await response.json();
      console.log(foundUser.followers, "loeggedddd");
      setLoginDetails({ foundUser, encodedToken });
      dispatch(loginUser(foundUser));
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logoutHandler = () => {
    setLoginDetails(null);
    localStorage.removeItem("loginDetails");
  };

  const signupHandler = async (userDetails) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.errors ? errorData.errors[0] : "Signup failed"
        );
      }

      const { createdUser, encodedToken } = await response.json();
      setLoginDetails({ foundUser: createdUser, encodedToken });
      dispatch(loginUser(createdUser));
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (loginDetails) {
      localStorage.setItem("loginDetails", JSON.stringify(loginDetails));
    } else {
      localStorage.removeItem("loginDetails");
    }
  }, [loginDetails, loginDetails?.encodedToken]);

  return (
    <AuthContext.Provider
      value={{
        loginDetails,
        setLoginDetails,
        loginHandler,
        logoutHandler,
        signupHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
