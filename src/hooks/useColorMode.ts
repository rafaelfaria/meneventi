import { useContext } from "react";
import { ColorModeContext } from "../context";

const useColorMode = () => {
  return useContext(ColorModeContext);
};

export default useColorMode;
