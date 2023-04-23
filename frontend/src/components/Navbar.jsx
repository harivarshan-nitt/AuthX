import { useNavigate } from "react-router-dom"
import is_logged_in from "../helpers/is_logged_in"
import { cool_300, cool_50, cool_600, cool_700, cool_900 } from "../themes/main_theme"
import Text from "./Text"

const Navbar = (props)=>{
    const navigate = useNavigate
    return (
        <div className="navbar" style={{
            height: "10vh",
            display: "flex",
            alignItems: "center",   
            backgroundColor: cool_900
        }}>
            <div className="text" style={{
                color: cool_50,
                fontSize: "32px",
                marginLeft: "20px"
            }}><Text size="32px" weight="bold">AuthX</Text></div>
            <div className="to_right" style={{
                marginLeft: "auto",
                marginRight: "30px"
            }}>
                {is_logged_in() ? 
                    <a href="/logout"><div className="nav-button" style={{
                        width: "90px",
                        height: "40px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "40px",
                        color: cool_50,
                        cursor: "pointer",
                        border: "1px solid "+cool_600
                    }}>Logout</div></a>
                    :
                    <a href="/login"><div className="nav-button" style={{
                        width: "90px",
                        height: "40px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "40px",
                        color: cool_50,
                        cursor: "pointer",
                        border: "1px solid "+cool_600
                    }}>Logout</div></a>
                }
            </div>
        </div>
    )
}

export default Navbar