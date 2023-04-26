import Cookies from "universal-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Logout = () => {
    const cookies = new Cookies()
    const navigate = new useNavigate()
  
    useEffect(() => {
        cookies.remove("jwt")
        navigate("/login", { replace: true });  
    }, []);
  
    return "Loggin out..";
  };
  
export default Logout