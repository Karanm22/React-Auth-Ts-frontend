import React from 'react'
import {useNavigate} from "react-router-dom"



 const PasswordResetSuccess: React.FC= () => {
    const navigate= useNavigate();
        return (<>
        <div className="content-container">
            <h1>Success!</h1>
            <p>Your password has been reset, now please login with your new password.</p>
            <button onClick={()=>navigate("/login")}>Go to home page</button>
        </div>
        </>);
}
export default PasswordResetSuccess