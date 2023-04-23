import Cookies from "universal-cookie"

const is_logged_in = ()=>{
    const cookies = new Cookies()
    const jwt = cookies.get("jwt")

    return jwt != null
}

export default is_logged_in