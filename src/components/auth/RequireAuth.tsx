import  { ReactElement, ReactNode } from "react";
import {  Navigate } from "react-router-dom";
import useUser from "./useUser";

type ReqAuth ={
    children:ReactNode,
    redirectTo:string
}

export default function RequireAuth({ children, redirectTo } : ReqAuth) {
    let isAuthenticated = useUser();
    return isAuthenticated ? children as ReactElement<any>: <Navigate to={redirectTo} />;
  }
