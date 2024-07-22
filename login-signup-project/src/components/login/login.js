import React, { useState } from "react";
import './login.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const login = () => {

        const { email, password } = user;
        if (email && password) {
            axios.post("http://localhost:8000/login", user)
                .then((res) => {

                    if (res.data.userId) {
                        // window.location.href = "/homepage";
                        navigate(`/homepage?userId=${res.data.userId}`);
                    }
                })
                .catch((err) => console.error(err));
        } else {
            alert("Invalid details");
        }
    };
    const signup = () => {
        navigate("/signup")
    }
    return (
        <div className="login">
            <h1>Login</h1>
            <input type="text" placeholder="Enter your email or phone " name="email" value={user.email} onChange={handleChange}></input>
            <br></br>
            <br></br>
            <input type="password" placeholder="Enter your password" name="password" value={user.password} onChange={handleChange}></input>
            <br></br>
            <div className="button" onClick={login}>Login</div>
            <h2>or</h2>
            <div className="button" onClick={signup}>Signup</div>
        </div>
    );
};

export default Login;