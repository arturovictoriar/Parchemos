// import libraries
import React from 'react';
import { useHistory } from "react-router-dom";
import sha256 from 'crypto-js/sha256';
import enc from 'crypto-js/enc-base64';
// import modules


/**
 * Log in component
 * @param {object} param0 parent state
 */
const LogIn = ({ setIsLogIn, setUser }) => {
    const history = useHistory();
    let inputNick;
    let inputPassword;

    /**
     * Check in the API is the given user can get in the chat server
     * @param {object} e event
     */
    const checkUser = async (e) => {
        const name = inputNick.value;
        const pw = sha256(inputPassword.value).toString(enc);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, pw })
        };
        // Look for permission in the API
        let network_error = false;
        const permission = await fetch('http://localhost:5000/logIn', requestOptions).then(
			response => {
				return response.json()
            }).catch(() => {
                network_error = true;
            });
        if (!permission || network_error) {
            alert("Log in service disabled");
            return;
        }
        // if the user have the permission, allow it to get in the chat server
        if (permission.ok) {
            setUser(name);
            history.push('/hall');
            return;
        }
        e.preventDefault();
        alert(permission.message);
    }

    return (
        <div className="inner-container">
            <div className="header">
                Log in
            </div>
            <div className="box">
                {/* Input nick name*/}
                <div className="input-group">
                    <label htmlFor="nickname">Nick name</label>
                    <input
                        className="login-input"
                        placeholder="Nick name"
                        type="text"
                        ref={(node) => {
                            inputNick = node
                        }}
                    />
                </div>
                {/* Input user password */}
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        className="login-input"
                        placeholder="Password"
                        type="password"
                        ref={(node) => {
                            inputPassword = node
                        }}
                    />
                </div>
                {/* Button to login */}
                <button onClick={checkUser} className="login-btn">Log in</button>
            </div>
        </div>
    )
}

// expot the LogIn component
export default LogIn;
