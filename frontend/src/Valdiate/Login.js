import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Validate.css";

function Login(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [errorUserName, setErrorUserName] = useState("");
    const [errorPassword, setErrorPassword] = useState("");

    const [userColor, setUserColor] = useState("");
    const [passwordColor, setPasswordColor] = useState("");

    const navigate = useNavigate();  // To redirect after successful login

    async function handleLogin(e){
        e.preventDefault();

        // Perform backend validation
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                email: username,  // Using username as email in this example
                password
            })
        });

        const content = await response.json();

        if (response.ok) {
            // Assuming the backend returns a success message and user data
            // Redirect to another page on success
            navigate('/product');
        } else {
            // Handle error response from backend
            setErrorUserName(content.message || "Invalid username or password");
            setUserColor("red");
            setPasswordColor("red");
        }
    }

    return (
        <>
        <body className="v_body">
            <div className="card">
                <div className="card-image"></div>

                <form onSubmit={handleLogin}>
                    <input 
                        type="text" 
                        placeholder="Username or Email" 
                        style={{borderColor:userColor}} 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <p className="error">{errorUserName}</p>

                    <input 
                        type="password" 
                        placeholder="Password" 
                        style={{borderColor:passwordColor}} 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <p className="error">{errorPassword}</p>

                    <button className="loginButton" type="submit">Login</button>
                </form>
            </div>
        </body>
        </>
    );
}

export default Login;

