import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const PleaseVerifyEmailPage = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    setTimeout(()=>{
        navigate("/")
    },5000)
  },[navigate])

  return (
    <div className="content-container">
      <h1>Thanks for Signing Up!</h1>
      <p>
        A verification email has been sent to the email address you provided,
        Please verifiy your email to unlock full site features.
      </p>
    </div>
  );
};

export default PleaseVerifyEmailPage;
