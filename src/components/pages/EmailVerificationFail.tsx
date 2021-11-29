import React from 'react'
import {useNavigate} from "react-router-dom"

interface EmailVerificationFailProps {

}

 const EmailVerificationFail: React.FC<EmailVerificationFailProps> = ({}) => {
    const navigate= useNavigate();
        return (<>
         <div className="content-container">
            <h1>Uh oh...</h1>
            <p>Something went wrong while trying to verify your email.</p>
            <button onClick={()=>navigate("/signup")}>Back to sign up</button>
        </div>
        </>);
}
export default EmailVerificationFail