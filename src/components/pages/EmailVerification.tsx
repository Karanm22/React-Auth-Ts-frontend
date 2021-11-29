import React,{useEffect,useState} from 'react'
import {useParams} from "react-router-dom";
import axios from "axios"
import useToken from "../auth/useToken"
import EmailVerificationFail from './EmailVerificationFail';
import EmailVerificationSuccess from './EmailVerificationSuccess';

  

 const EmailVerification: React.FC= ({}) => {

    const [isLoading,setIsLoading]=useState(true);
    const [isSuccess,setIsSuccess]=useState(false);
    const {verificationString}= useParams();
    const[token,setToken]= useToken();

    useEffect(()=>{
        const loadVerification=async()=>{
            console.log(verificationString)
            try{
                const response = await axios.put("http://192.168.1.21:8080/api/verify-email",{verificationString});
                const {token} =response.data;
                setToken(token);
                setIsSuccess(true);
                setIsLoading(false)
            }
            catch(e){
                setIsSuccess(false)
                setIsLoading(false)
            }
        }
        loadVerification()
    },[setToken,verificationString])

    if(isLoading) return <h1>Loading...</h1>
    if(!isSuccess) return <EmailVerificationFail />
    return <EmailVerificationSuccess />
}
export default EmailVerification