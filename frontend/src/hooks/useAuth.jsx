import { useState, useContext, createContext, useEffect } from "react";
import { authClient } from "../utils/authClient";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState(undefined);
  const [token, setToken] = useState(localStorage.getItem("access_token") || "");

  useEffect(() => {
    async function checkAuth() {
      authClient.defaults.headers.common['Authorization'] = "Bearer " + token;
      const response = await getProfile();
      setIsAuthenticated(response.success);
      setIsLoading(false);
      setProfile(response.data);
    }
    checkAuth();
  }, []);

  const getProfile = async () => {
    try {
      const response = await authClient.get("/profile");
      return { success: true, data: response.data.profile };
    } catch (error) {
      let errorMsgs = [];
      if (error.response) {
        console.log(`The request was made and the server responded with a status code which was not 2xx`, error.response);
        errorMsgs = error.response?.data?.errors;
      } else if (error.request) {
        console.log(`The request was made but ther server did not respond`, error.request);
        throw new Error("bad request");
      } else {
        console.log(`There was an error making the request`, error.message);
        throw new Error("bad request");
      }
      return { success: false, error: errorMsgs };
    }
  }

  const login = async (data) => {
    try {
      const response = await authClient.post("/login", data);
      const token = response?.data?.access_token;
      if (!token) throw new Error("no token");
      setToken(token);
      authClient.defaults.headers.common['Authorization'] = "Bearer " + token;
      localStorage.setItem("access_token", token);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      let errorMsgs = [];
      setToken("");
      authClient.defaults.headers.common['Authorization'] = "";
      localStorage.removeItem("access_token");
      setIsAuthenticated(false);
      if (error.response) {
        console.log(`The request was made and the server responded with a status code which was not 2xx`, error.response);
        errorMsgs = error.response?.data?.errors;
      } else if (error.request) {
        console.log(`The request was made but ther server did not respond`, error.request);
      } else {
        console.log(`There was an error making the request`, error.message);
      }
      return { success: false, error: errorMsgs };
    }
  }

  const register = async (data) => {
    try {
      await authClient.post("/register", data);
      return { success: true };
    } catch (error) {
      let errorMsgs = [];
      if (error.response) {
        console.log(`The request was made and the server responded with a status code which was not 2xx`, error.response);
        errorMsgs = error.response?.data?.errors;
      } else if (error.request) {
        console.log(`The request was made but ther server did not respond`, error.request);
        throw new Error("bad request");
      } else {
        console.log(`There was an error making the request`, error.message);
        throw new Error("bad request");
      }
      return { success: false, error: errorMsgs };
    }
  }

  const logout = () => {
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{isAuthenticated, isLoading, register, login, logout, profile}}>
      {children}
    </AuthContext.Provider>
  );
}
