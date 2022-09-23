import React from "react";
import SpinnerImg from '../../assets/img/loading.gif';
let Spinner=() => {
    return(
        <React.Fragment>
            <div>
                <img src={SpinnerImg} alt="" className="d-block m-auto" style={{width:'200px'}}/>
            </div>
        </React.Fragment>
    )
}
export default Spinner;