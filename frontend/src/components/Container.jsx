import { cool_900 } from '../themes/main_theme';

const Container = (props)=>{
    return (
        <div className="container" style={{backgroundColor: cool_900, width: props.width?props.width:"100vw", height: props.height?props.height:"90vh", display: props.center?"flex":"block", justifyContent: "center", alignItems: "center"}}>
            {props.children}
        </div>
    )
}

export default Container