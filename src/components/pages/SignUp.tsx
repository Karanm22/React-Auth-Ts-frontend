import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "../auth/useToken"
import axios from "axios"

const SignUp: React.FC = () => {

    const [token,setToken]=useToken()
  const [errorMessage, setErrorMessage] = useState("");
  const [emailValue, setEmailValue] = useState<string>();
  const [passwordValue, setPasswordValue] = useState<string | number>();
  const [confirmPasswordValue, setConfirmPasswordValue] = useState<string | number>();



  const history = useNavigate();

  const onSignUpClick = async () => {
    const response = await axios.post("http://192.168.1.21:8080/api/signup",{
        email:emailValue,password:passwordValue
    })

    const {token}= response.data
    setToken(token)
    history("/please-verify")

  };
  return (
    <>
      <div className="content-container">
        <h1>Sign Up</h1>
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
        <input
          type="password"
          placeholder="password"
          value={confirmPasswordValue}
          onChange={(e) => setConfirmPasswordValue(e.target.value)}
        />
        <hr />
        <button
          onClick={onSignUpClick}
          disabled={!emailValue || !passwordValue || passwordValue !== confirmPasswordValue}
        >
          Sign Up
        </button>
        <button onClick={() => history("/")}>
          Already have an account ? Sign In
        </button>
      </div>
    </>
  );
};
export default SignUp;
