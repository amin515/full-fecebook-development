import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";


export const LogedInRoute = () => {
 const {loginState} = useSelector(state => state.auth);
 
 return loginState ? <Outlet /> : <Navigate to="/"/>
}