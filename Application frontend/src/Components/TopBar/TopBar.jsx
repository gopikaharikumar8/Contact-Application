import React from "react";

let TopBar=()=>
{
    return(
        <React.Fragment>
            <nav className="navbar navbar-dark bg-dark navbar-expand-sm" >
            <div class="container-fluid"> 
             <a class="navbar-brand">
                 <i className="fa-sharp fa-solid fa-phone"/>  Contact <span className="text-warning">Application</span></a>
             </div>
            </nav>
        </React.Fragment>
    )
};

export default TopBar;