import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

const useIsLogged = () => {
  const [isLogged, setIsLogged] = useState(false);

  const cookies = new Cookies();

  useEffect(() => {
    if (cookies.get("ACCESS-TOKEN")) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, []);

  return isLogged;
};

export default useIsLogged;
