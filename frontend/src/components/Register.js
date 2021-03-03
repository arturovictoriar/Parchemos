// import libraries
import React, { useState } from 'react';
// import modules
import LogIn from './LogIn';
import SignUp from './SignUp';
import '../styles/Register.css';
import logo from "../utils/parche.png"

/**
 * User register component, store the login and the signin component
 */
const Register = ({setUser}) => {
    const [isLogIn, setIsLogIn] = useState(true);

    /**
     * Set a flag to change from login to signin
     * @param {object} e event
     */
    const changeToSignIn = (e) => {
        setIsLogIn(false);
    }

    /**
     * Set a flag to change from signin to login
     * @param {object} e event
     */
    const changeToLogIn = (e) => {
        setIsLogIn(true);
    }

    return (
        <div className="root-container">
            <div className="register__icon">
                <div className="register__center">
                    <div className="header">
                        <h1 >Are you bored?</h1>
                        <h1>Let's parchemos for while!</h1>
                    </div>
                    <img src={logo} alt="Logo" />
                </div>
            </div>
            <div className="register__logsign">
                <div className="register__center">
                    <div className="box-controller">
                        {/* Choose Login */}
                        <div
                            className={"controller " + (isLogIn
                                ? "selected-controller"
                                : "")}
                            onClick={changeToLogIn}>
                            Log in
                </div>
                        {/* Choose Signin */}
                        <div
                            className={"controller " + (!isLogIn
                                ? "selected-controller"
                                : "")}
                            onClick={changeToSignIn}>
                            Sign up
                </div>
                    </div>
                    {/* Show login or signin */}
                    <div className="box-container">
                        {isLogIn ?
                            <LogIn setIsLogIn={setIsLogIn} setUser={setUser}/> :
                            <SignUp setIsLogIn={setIsLogIn} />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

// export the register component
export default Register;
