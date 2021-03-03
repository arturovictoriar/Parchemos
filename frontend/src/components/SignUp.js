// import libraries
import React from 'react';
import sha256 from 'crypto-js/sha256';
import enc from 'crypto-js/enc-base64'
const {socketHostPort} = require('../config/socket.config');

/**
 * Sign in component
 * @param {object} param0 parent state
 */
const SignIn = ({ setIsLogIn }) => {
    let inputNick;
    let inputPassword1;
    let inputPassword2;

    /**
     * create a new user in the server
     * @param {object} e event
     */
    const createUser = async (e) => {
        if (inputPassword1.value !== inputPassword2.value) {
            alert("You must write the same password");
            e.preventDefault();
            return;
        }
        const name = inputNick.value;
        const pw = sha256(inputPassword1.value).toString(enc);

        if (name.length < 6) {
            alert("The name should be at least 6 characters long");
            return;
        }

        if (inputPassword1.value.length < 6) {
            alert("The password should be at least 6 characters long");
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, pw })
        };
        // Ask to the server to create a new user with the given data
        let network_error = false;
        const created = await fetch(`${socketHostPort}/SignIn`, requestOptions).then(
			response => {
				return response.json()
            }).catch(() => {
                network_error = true;
            });
        if (!created || network_error) {
            alert("Sign in service disabled");
            return;
        };
        // if the user was created, alert to the user
        if (created.ok) {
            alert(created.message);
        }
        // else, alert to the user it was impossible to create a new user
        else {
            alert(created.message);
        }
        e.preventDefault();
    }

    return (
        <div className="inner-container">
            <div className="header">
                Sign up
            </div>
            <div className="box">
                {/* Input nick name */}
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
                {/* Input password */}
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        className="login-input"
                        placeholder="Password"
                        type="password"
                        ref={(node) => {
                            inputPassword1 = node
                        }}
                    />
                </div>
                {/* Input repeat password */}
                <div className="input-group">
                    <label htmlFor="password">Repeat password</label>
                    <input
                        className="login-input"
                        placeholder="Repeat password"
                        type="password"
                        ref={(node) => {
                            inputPassword2 = node
                        }}
                    />
                </div>
                {/* Button to signin */}
                <button onClick={createUser} className="login-btn">Sign In</button>
            </div>
        </div>
    )
}

// export the sign in component
export default SignIn;
