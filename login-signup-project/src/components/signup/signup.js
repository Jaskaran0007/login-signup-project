import React, { useState } from "react";
import './signup.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        phone: "",
        password: "",
        reenterpassword: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const signup = () => {

        const { email, phone, password, reenterpassword } = user;
        if (email && phone && password && (password === reenterpassword)) {
            axios.post("http://localhost:8000/signup", user)
                .then((res) => {
                    if (res.data === "User signup successfully") {
                        // window.location.href = "/login";
                        navigate("/login");
                    }
                })
                .catch((err) => console.error(err));
        } else {
            alert("Invalid details");
        }
    };
    const login = () => {
        navigate('/login');
    }
    return (
        <div className="signup">
            {console.log(user)}

            <h1>Signup</h1>
            <input type="text" placeholder="Enter your email " name="email" value={user.email} onChange={handleChange}></input>
            <br></br>
            <br></br>
            <input type="text" placeholder="Enter your phone " name="phone" value={user.phone} onChange={handleChange}></input>
            <br></br>
            <br></br>
            <input type="password" placeholder="Create password" name="password" value={user.password} onChange={handleChange}></input>
            <br></br>
            <br></br>
            <input type="password" placeholder="Re-enter password" name="reenterpassword" value={user.reenterpassword} onChange={handleChange}></input>
            <div className="button" onClick={signup} >Signup</div>
            <div><h2>or</h2></div>
            <div className="button" onClick={login}>Login</div>
        </div>
    );
};

export default Signup;