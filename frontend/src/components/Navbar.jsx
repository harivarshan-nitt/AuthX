import { cool_50, cool_900 } from "../themes/main_theme"
import Text from "./Text"

const Navbar = (props)=>{
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
        </div>
    )
}

export default Navbar