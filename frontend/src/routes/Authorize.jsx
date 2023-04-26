import Container from "../components/Container"
import '../styles/Styles.css';
import "../themes/main_theme"
import Cookies from "universal-cookie"
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Box from "../components/Box";
import { cool_400, cool_50, cool_800, secondary } from "../themes/main_theme";

const Authorize = ()=>{

    const cookies = new Cookies()
    const navigate = useNavigate()
    const jwt = cookies.get("jwt")
    const [searchParams, setSearchParams] = useSearchParams();
    const [permissions, SetPermissions] = useState()
    const clientAppID = searchParams.get('clientAppID')

    const GetPermissions = async()=>{
        const req = {
            method: 'GET',            
            headers: {
                "Authorization": `Bearer ${jwt}`,
                "Content-type": "application/json",
            },
        };
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/oauth/v2/permission?clientAppID=${clientAppID}`, req);
        const response = await res.json();
        console.log(response.permissions)
        if(res.status == 200)
            SetPermissions(response.permissions)
    }

    useEffect(()=>{
        if (!jwt) navigate(`/login?${clientAppID?"clientAppID="+clientAppID:""}`)
        GetPermissions()
    }, [jwt])

    return (
        <Container center>
            <Box width="40vw" height="300px" center>
                {permissions ? 
                <div>
                <div className="text" style={{
                    color: cool_50
                }}>AuthX is requesting for the following permissions</div>
                <div className="permissions" style={{
                    textAlign: "center",
                    color: cool_50,
                    marginTop: "30px"
                }}>
                {permissions.map(permission => {
                    return <div className="text">{permission}</div>
                })}
                </div>
                <div className="b-container" style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "50px"
                }}>
                    <div className="button" style={{
                        color: cool_50,
                        width: "150px",
                        height: "40px",
                        padding: "5px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "40px",
                        backgroundColor: secondary,
                        color: cool_800,
                        cursor: "pointer"
                    }}>
                        AUTHORIZE
                    </div>
                </div>
                </div>
                :
                <div className="text" style={{
                    color: cool_50
                }}>LOADING...</div>                
                }
            </Box>
        </Container>
    )
}

export default Authorize