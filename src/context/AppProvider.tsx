import React from "react";
import { AppContext } from ".";
import { createApp } from "../lib/factories/AppFactoryAmplify";

type Props = {
  children: React.ReactNode;
};


const AppProvider: React.FC<Props> = ({ children }) => {
  const app = createApp();

  return (
    <AppContext.Provider value={app}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
