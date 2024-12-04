import { createContext, useContext, useState, useEffect } from "react";

export const ApiConfigContext = createContext();

export const ApiConfigProvider = ({ children }) => {
  
  const [apiconfig, setApiconfig] = useState(() => {
    const storedConfig = localStorage.getItem("apiconfig");
    return storedConfig
      ? JSON.parse(storedConfig)
      : { apikey: "", baseUrl: "" };
  });

  useEffect(() => {
    localStorage.setItem("apiconfig", JSON.stringify(apiconfig));
  }, [apiconfig]);

  const clearLocalStorage = () => {
    setApiconfig({ apikey: "", baseUrl: "" });
    localStorage.removeItem("apiconfig");
  };

  return (
    <ApiConfigContext.Provider
      value={{ apiconfig, setApiconfig, clearLocalStorage }}
    >
      {children}
    </ApiConfigContext.Provider>
  );
};

export const useApiConfig = () => {
  const context = useContext(ApiConfigContext);
  if (!context) {
    throw new Error("useApiConfig must be used within an ApiConfigProvider");
  }
  return context;
};
