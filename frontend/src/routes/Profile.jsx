import Container from "../components/Container"
import '../styles/Styles.css';
import "../themes/main_theme"
import Cookies from "universal-cookie"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Profile = ()=>{

    const cookies = new Cookies()
    const navigate = useNavigate()
    const jwt = cookies.get("jwt")

    useEffect(()=>{
        if(!jwt) navigate("/login")
    }, [jwt, navigate])

    return (
        <Container center>
            
        </Container>
    )
}

export default Profile