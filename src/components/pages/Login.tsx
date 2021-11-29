import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useToken from "../auth/useToken";
import { useQueryParams } from "../util/useQueryParams";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const [, setToken] = useToken();
  const [errorMessage, setErrorMessage] = useState("");
  const [emailValue, setEmailValue] = useState<string>();
  const [passwordValue, setPasswordValue] = useState<string | number>();
  const navigate = useNavigate();
  const [googleOauthUrl, setGoogleOauthUrl] = useState<string>("");

  const {token:oauthToken} = useQueryParams()
  useEffect(()=>{
    if(oauthToken){
      setToken(oauthToken);
      navigate("/")
    }
  },[oauthToken,setToken,navigate])
  useEffect(()=>{
    const loadOauthUrl=async()=>{
        try{
            const response = await axios.get("http://192.168.1.21:8080/auth/google/url")
            const {url} = response.data;
            setGoogleOauthUrl(url)
        }
        catch(err){
            console.log(err)
        }
    }
    loadOauthUrl()
  },[])
  const onLoginClick = async () => {
    const response = await axios.post("http://192.168.1.21:8080/api/login", {
      email: emailValue,
      password: passwordValue,
    });
    const {token}= response.data;
    setToken(token)
    navigate("/")
  };

  return (
    <>
      <div className="content-container">
        <h1>Log In</h1>
        {errorMessage && <div className="fail">{errorMessage}</div>}
        <input
          type="text"
          placeholder="test@gmail.com"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
        />
        <hr />
        <button onClick={onLoginClick} disabled={!emailValue || !passwordValue}>
          Log In
        </button>
        <button onClick={() => navigate("/forgot-password")}>
          Forgot your password?
        </button>
        <button onClick={() => navigate("/signup")}>
          Don't have an account ? Sign Up
        </button>
        <button disabled={!googleOauthUrl} onClick={()=>{window.location.href=googleOauthUrl}}>Log in with Google</button>

      </div>
    </>
  );
};
export default Login;
