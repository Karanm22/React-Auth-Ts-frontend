import React,{useState} from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios"
import PasswordResetSuccess from './PasswordResetSuccess';
import PasswordResetFail from './PasswordResetFail';


 const PasswordReset: React.FC= () => {
     const [passwordValue,setPasswordValue]=useState("")
     const [confirmPasswordValue,setConfirmPasswordValue]=useState("")
     const [isSuccess,setIsSuccess]=useState(false)
     const [isFailure,setIsFailure]=useState(false)
     const {passwordResetCode} = useParams()

     const onResetClicked=async()=>{
        try{
            await axios.put(`http://192.168.1.21:8080/api/users/${passwordResetCode}/reset-password`,{newPassword:passwordValue})
            setIsSuccess(true)
        }
        catch{
            setIsFailure(true)
        }
     }
     if(isSuccess) return <PasswordResetSuccess />

     if(isFailure) return <PasswordResetFail />

        return (<>
            <div className="content-container">
                <h1>Reset Password</h1>
                <p>Please enter a new password</p>
                <input value={passwordValue} placeholder="Password" onChange={e=>setPasswordValue(e.target.value)} />
                <input value={confirmPasswordValue} placeholder="Confirm Password" onChange={e=>setConfirmPasswordValue(e.target.value)} />
                <button onClick={onResetClicked} disabled={!passwordValue || !confirmPasswordValue || passwordValue!==confirmPasswordValue}>
                    Reset Password
                </button>
            </div>
        </>);
}
export default PasswordReset