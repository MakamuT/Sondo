import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase';
import { setDoc, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './style.css';


function Register() {
    const [email, setEmail] = useState("");
    const [ password, setPassword ] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phone, setPhone] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try{
            await createUserWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            console.log(user);
            if (user) {
                await setDoc(doc(db, "Users", user.uid),{
                    email: user.email,
                    name: name,
                    surname: surname
                });
            }
            console.log("User registered successfully");
            window.location.href = "/login";
            toast.success("User registered successfully", {
                position: "top-center",
            });
        } catch (error) {
            console.error("Error registering user: ", error);
            toast.error("Error registering user", {
                position: "bottom-center",
            });
        }
    }

    return (
        <form onSubmit={handleRegister}>
            <h1>Register</h1>
            <div className="container">
                <label>Name</label>
                <input 
                    type="text"
                    className="form"
                    placeholder='Enter Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                /><br/>
                <label>Surname</label>
                <input
                    type="text"
                    className='form'
                    placeholder='Enter Surname'
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                /><br/>
                <label>Email address</label>
                <input 
                    type="email"
                    className="form"
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                /><br/>
                <label>Phone</label>
                <input
                    type='text'
                    className='form'
                    placeholder='Enter Phone'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                /><br/>
                <label>password  </label>
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
            <p>Already have an account click here to <Link to='/login' className='link'>Login</Link></p>
            </div>
        </form>
    )
}
export default Register;