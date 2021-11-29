import React from 'react'
import {useNavigate} from "react-router-dom"


 const PasswordResetFail: React.FC= ({}) => {
    const navigate= useNavigate();

        return (<>
        <div className="content-container">
            <h1>Uh oh...</h1>
            <p>Something went wrong while trying to reset your password.</p>
            <button onClick={()=>navigate("/login")}>Back to login</button>
        </div>
        </>);
}
export default PasswordResetFail