import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import "./style.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};

        // Email validation
        if (!email) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        // Password validation
        if (!password) {
            newErrors.password = "Password is required.";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Logged in successfully!", { position: "top-center" });
            navigate('/home');
        } catch {
            toast.error("Login failed. Please check your credentials.", { position: 'bottom-center' });
        } finally {
            setIsSubmitting(false); // Re-enable the button
        }
    };

    return (
        <div>
            <div className="container">
                <h1>Login</h1><br />
                <form onSubmit={handleSubmit}>
                    <label>Email address</label>
                    <br />
                    <input
                        type="email"
                        className="form"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                    <br />

                    <label>Password</label>
                    <br />
                    <input
                        type="password"
                        className="form"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                    <br />

                    <button type="submit" className="btn" disabled={isSubmitting}>
                        {isSubmitting ? "Loading..." : "Submit"}
                    </button>
                    <p>
                        Don't have an account? Click here to{" "}
                        <Link to="/register" className="link">
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
