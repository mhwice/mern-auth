import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import { authClient } from "../utils/authClient";


export const loader = async () => {
  try {
    return await authClient.get("/user");
  } catch (error) {
    return redirect("/");
  }
}

const DashboardContext = createContext();

const DashboardLayout = () => {
  const { user } = useLoaderData();
  const navigate = useNavigate();
  const [isAuthError, setIsAuthError] = useState(false);

  const logoutUser = async () => {
    try {
      navigate("/");
      await authClient.get("/logout");
    } catch (error) {
      navigate("/");
    }
  }

  authClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
        setIsAuthError(true);
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    if (!isAuthError) return;
    logoutUser();
  }, [isAuthError]);

  return (
    <DashboardContext.Provider value={{user, logoutUser}}>
      <h1>hey</h1>
    </DashboardContext.Provider>
  );
}

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
