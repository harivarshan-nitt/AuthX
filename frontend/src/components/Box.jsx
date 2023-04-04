const { cool_800 } = require("../themes/main_theme")

const Box = (props)=>{
    return (
        <div className="container" style={{
            width: props.width?props.width:"auto",
            height: props.height?props.height:"auto",
            backgroundColor: cool_800,
            borderRadius: "10px"
        }}>
            {props.children}
        </div>
    )
}

export default Box