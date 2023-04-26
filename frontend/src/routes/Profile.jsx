import Container from "../components/Container"
import '../styles/Styles.css';
import "../themes/main_theme"
import Cookies from "universal-cookie"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Box from "../components/Box";
import { cool_400, cool_50 } from "../themes/main_theme";

const Profile = ()=>{

    const cookies = new Cookies()
    const navigate = useNavigate()
    const jwt = cookies.get("jwt")

    const [userData, UpdateUserData] = useState(null)

    const GetData = async()=>{
        const req = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${jwt}`
            }            
        }
        const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/employee", req)
        const json = await res.json()
        UpdateUserData(json.data)

        console.log(json.data)
    }

    useEffect(()=>{
        if(!jwt) {
            navigate("/login")
            return
        }
        GetData()        
    }, [jwt])

    return (
        <Container center>
            <Box width="40vw" height="300px">
            {!userData ? 
            <div className="loading"></div>    
            :
            <div className="userdata">
                <div className="name" style={{
                    color: cool_50,
                    fontSize: "30px",
                    textAlign: "center",
                    marginTop: "20px"
                }}>{userData.name}</div>
                <div className="id" style={{
                    textAlign: "center",
                    color: cool_400,
                    fontSize: "10px"
                }}>EmployeeID: {userData.id}</div>
                <div className="email" style={{
                    marginTop: "30px",
                    textAlign: "center",
                    color: cool_50,
                }}>{userData.email}</div>
                <div className="permittedApps">
                    {userData.allowedApps.forEach(app => {
                        return (
                            <div className="app" style={{
                                padding: "10px",
                                height: "40px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <div className="app-name">{app.name}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
            }
            </Box>
        </Container>
    )
}

export default Profile