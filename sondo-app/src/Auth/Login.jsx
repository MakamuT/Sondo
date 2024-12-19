import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import "./style.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in successfully");
            window.location.href = '/profile';
            toast.success("Logged in successful", {
                position: "top-center",
            });
        } catch(error) {
            console.log(error.message);
            toast.error(error.message, {
                position: 'bottom-center',
            });
        }
    };

    return(
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>

            <div className="container">
                <label>Email address</label>
                <input 
                    type="email"
                    className="form"
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                /><br/>
            
                <label>password</label>
                <input
                    type='password'
                    className='form'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <button type='submit' className="btn">Submit</button>
            </div>
            <p>Don't have an account click here to <Link to="/register" className='link'>Register</Link></p>
            </form>
    )
}
export default Login;