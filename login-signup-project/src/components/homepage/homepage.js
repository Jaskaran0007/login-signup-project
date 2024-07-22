import React, { useState, useEffect } from 'react';
import './homepage.css';
import { useNavigate, useLocation } from 'react-router-dom';
const Homepage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userId = location.search.split('=')[1];
    const logout = () => {
        navigate("/login");
    }
    const [user, setUser] = useState([]);

    useEffect(() => {
        fetch('/loggedusers?userId=${userId}')
            .then(response => response.json())
            .then(data => setUser(data));
    }, [userId]);


    return (

        <div className="homepage"><h1>Hellow Homepage</h1>
            <div className="button" onClick={logout}>Logout</div>
            {<table>
                <tbody>
                    <tr>
                        <td>{user.phone}</td>
                        <td>{user.email}</td>
                    </tr>
                </tbody>
            </table>}
        </div>
    )
}
export default Homepage;