import { useState } from "react";

const useToken = () => {
  const [token, setTokenInternal] = useState(() => {
    return localStorage.getItem("token");
  });

  const setToken=(newToken: any) =>{
    localStorage.setItem("token", newToken)
    setTokenInternal(newToken);
  };
  return [token, setToken] as const ;
};
export default useToken;
