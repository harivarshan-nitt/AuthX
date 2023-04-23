import Container from "../components/Container"
import '../styles/Styles.css';
import "../themes/main_theme"
import Cookies from "universal-cookie"
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Box from "../components/Box";
import { cool_400, cool_50 } from "../themes/main_theme";

const Authorize = ()=>{

    const cookies = new Cookies()
    const navigate = useNavigate()
    const jwt = cookies.get("jwt")
    const [searchParams, setSearchParams] = useSearchParams();
    const [permissions, SetPermissions] = useState()


    const GetPermissions = async()=>{
        let clientAppID = searchParams.clientAppID
        const req = {
            method: 'GET',            
            headers: {
                "Authorization": `Bearer ${jwt}`,
                "clientAppID": clientAppID,
                "Content-type": "application/json",
            },
        };
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/oauth/v2/permission`, req);
        const response = await res.json();
        console.log(response)
    }

    useEffect(()=>{
        if(!jwt) {
            navigate("/login")
            return
        }
        GetPermissions()
    }, [jwt])

    return (
        <Container center>
            <Box width="40vw" height="300px">
            </Box>
        </Container>
    )
}

export default Authorize