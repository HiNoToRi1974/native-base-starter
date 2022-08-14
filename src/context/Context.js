import React, { createContext, useState } from "react";

const Context = createContext();

const Provider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  return (
    <Context.Provider
      value={{
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, Provider };
