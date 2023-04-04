import Container from "../components/Container"
import Box from '../components/Box';
import '../styles/Styles.css';
import "../themes/main_theme"
import Cookies from "universal-cookie"
import { useNavigate, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Form from "../components/Forms";
import {cool_50} from "../themes/main_theme"

const Register = ()=>{

    const cookies = new Cookies()
    const navigate = useNavigate()
    const jwt = cookies.get("jwt")

    const handleRegister = async (formData)=>{
        console.log(formData);
        const req = {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(formData),
        };
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/register`, req);
        const response = await res.json();

        console.log(response)

        window.location.replace(response.redirect)

        return null
    }

    useEffect(()=>{
        if(jwt) navigate("/")
    }, [jwt, navigate])

    const fields = [
        { name: 'name', label: 'Name', type: 'text', placeholder: "name..."},
        { name: 'email', label: 'Email', type: 'email',  placeholder: "email..." },
        { name: 'password', label: 'Password', type: 'password',  placeholder: "password..."},
        { name: 'repeat', label: 'Repeat', type: 'password',  placeholder: "repeat password..."},
    ]

    return (
        <Container center>
            <Box width="600px">
                <Form fields={fields} onSubmit={(formData)=>handleRegister(formData)}/>
                <div style={{
                    marginTop: "50px",
                    marginBottom: "30px",
                    width: "100%",
                    textAlign: "center",
                }}><a href="/login" style={{color: cool_50}}>Login Instead</a></div>
            </Box>
        </Container>
    )
}

export default Register