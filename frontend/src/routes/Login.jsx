import Container from "../components/Container"
import Box from '../components/Box';
import '../styles/Styles.css';
import "../themes/main_theme"
import Cookies from "universal-cookie"
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDebugValue, useEffect } from "react";
import Form from "../components/Forms";
import {cool_50} from "../themes/main_theme"

const Register = ()=>{

    const cookies = new Cookies()
    const navigate = useNavigate()
    const jwt = cookies.get("jwt")
    const [searchParams, setSearchParams] = useSearchParams();

    const handleLogin = async (formData)=>{
        const clientAppID = searchParams.get("clientAppID")
        console.log({...formData, clientAppID: clientAppID});
        const req = {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({...formData, clientAppID: clientAppID}),
        };
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/oauth/v2/login`, req);
        const response = await res.json();
        console.log(response)
        if(res.status == 200){
            cookies.set("jwt", response.token)
            console.log(response)
            window.open(response.redirect)
        }

        return null
    }
    useEffect(()=>{
        if(jwt){
            const clientAppID = searchParams.get("clientAppID")
            console.log(jwt)
            if(!clientAppID)
                navigate("/")
            else
                navigate(`/authorize?clientAppID=${clientAppID}`)
        } 

    }, [])

    useEffect(()=>{
        if(jwt){
            const clientAppID = searchParams.get("clientAppID")
            if(!clientAppID)
                navigate("/")
            else
                navigate(`/authorize?clientAppID=${clientAppID}`)
        } 
    }, [jwt])

    const fields = [
        { name: 'email', label: 'Email', type: 'email',  placeholder: "email..." },
        { name: 'password', label: 'Password', type: 'password',  placeholder: "password..."},
    ]

    return (
        <Container center>
            <Box width="auto">
                <Form fields={fields} onSubmit={(formData)=>handleLogin(formData)}/>
                <div style={{
                    marginTop: "50px",
                    marginBottom: "30px",
                    width: "100%",
                    textAlign: "center",
                }}><a href="/register" style={{color: cool_50}}>Register Instead</a></div>
            </Box>
        </Container>
    )
}

export default Register