import React from 'react';
const SignUp = () => {
    return (
        //
        <div className="signup-container">
            <form className="signupForm">
                <h2>Sign Up</h2>
                <label htmlFor="name"> Full Name:
                <input type="text" id="name" required/>
                </label>
                <label htmlFor="surname"> Surname:
                <input type="text" id="surname" required/>
                </label>
                <label htmlFor="email">Email:
                <input type="email" id="email"/>
                </label>
                <label htmlFor="cellphone number">Cellphone number:
                <input type="tel"/>
                </label>
            </form>
            <button>Sign Up</button>
            <p>Already registered? <a>Login</a></p>
        </div>
    )
}

export default SignUp