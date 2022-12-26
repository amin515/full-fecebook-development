
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";


export const LoggedOutRoute = () => {
 const {loginState} = useSelector(state => state.auth);
 
 return loginState ? <Navigate to="/"/> : <Outlet /> 
}