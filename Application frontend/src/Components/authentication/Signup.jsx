import React from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';

let Signup=()=>
{
    const navigate = useNavigate();
    const RegisterButton = () => {
       navigate('/authentication/login');
    };
    return(
       
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                    <form>
                <h3>Register</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>Username</label>
                    <input type="username" className="form-control" placeholder="Enter Username" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block mt-2 ms-2" onClick={RegisterButton}>Register</button>
                <p className="forgot-password text-right">
                    Already registered <a href="login">log in?</a>
                </p>
            </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};

export default Signup;