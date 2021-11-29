import React,{useState,useEffect} from "react";
import {  useNavigate } from "react-router-dom";
import useToken from "../auth/useToken";
import useUser from "../auth/useUser";
import axios from "axios";


interface UserInfoProps {}

const UserInfo: React.FC<UserInfoProps> = () => {
    const user = useUser()
    const [token,setToken]= useToken()
    const {id,email,isVerified,info} = user;
    let navigate = useNavigate();

    const [favoriteFoodValue,setFavoriteFoodValue] = useState(info.favouriteFood || "")
    const [hairColorValue,setHairColorValue] = useState(info.hairColor ||'')
    const [bioValue,setBioValue] = useState(info.bio ||'')

    const [showSuccessMessage,setShowSuccessMessage] = useState(false)
    const [showErrorMessage,setShowErrorMessage] = useState(false)

    useEffect(()=>{
        if(showErrorMessage || showSuccessMessage){
            setTimeout(()=>{
                setShowErrorMessage(false);
                setShowSuccessMessage(false);
            },3000)
        }
    },[showSuccessMessage,showErrorMessage])


    const saveChanges=async()=>{
        try{
            const response = await axios.put(`http://192.168.1.21:8080/api/users/${id}`,{
                favouriteFood:favoriteFoodValue,
                hairColor:hairColorValue,
                bio:bioValue
            },
                {headers:{Authorization:`Bearer ${token}`}}
            );
            const {token:newToken} = response.data;
            setToken(newToken)
            setShowSuccessMessage(true);
        }catch(error){
            setShowErrorMessage(true);
        }
    };

    const logout=()=>{
        localStorage.removeItem('token');
        navigate('/login')
    };

    const resetValues=()=>{
        setFavoriteFoodValue(info.favoriteFood);
        setHairColorValue(info.hairColor);
        setBioValue(info.bio)

    };

  return (
    <>
      <div className="content-container">
        <h1>Info for {email}</h1>
        {!isVerified && <div className="fail"> You won't be able to make any changes until you verify your email.</div>}
        {showSuccessMessage && <div className="success">Successfully </div>}
        {showSuccessMessage && <div className="fail">Uh oh... something went wrong</div>}
        <label>
            Favorite Food :
            <input onChange={e=>setFavoriteFoodValue(e.target.value)} value={favoriteFoodValue} />
        </label>
        <label>
            Hair Color :
            <input onChange={e=>setHairColorValue(e.target.value)} value={hairColorValue} />
        </label>
        <label>
            Bio :
            <input onChange={e=>setBioValue(e.target.value)} value={bioValue} />
        </label>
        <hr />
        <button onClick={saveChanges} >
          Save Changes
        </button>
        <button onClick={resetValues}>
          Reset Values
        </button>
        <button onClick={logout} >
          Log Out
        </button>
      </div>
    </>
  );
};
export default UserInfo;
