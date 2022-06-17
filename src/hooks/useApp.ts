import { useContext } from "react";
import { AppContext } from "../context";

const useApp = () => {
  return useContext(AppContext);
};

export default useApp;
