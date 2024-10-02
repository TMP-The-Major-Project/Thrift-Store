import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Validate.css";

function SignUp(){

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errorUserName, setErrorUserName] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

    const [userColor, setUserColor] = useState("");
    const [emailColor, setEmailColor] = useState("");
    const [passwordColor, setPasswordColor] = useState("");
    const [confirmPasswordColor, setConfirmPasswordColor] = useState("");

    const navigate = useNavigate(); // To redirect after successful signup

    async function handleSignUp(e){
        e.preventDefault();

        let valid = true;

        // Username validation
        if (username.length > 5) {
            setErrorUserName("");
            setUserColor("green");
        } else {
            setErrorUserName("Username must be 5 letters long");
            setUserColor("red");
            valid = false;
        }

        // Email validation
        if (email.includes("@gmail.com")) {
            setErrorEmail("");
            setEmailColor("green");
        } else {
            setErrorEmail("Email must contain @gmail.com");
            setEmailColor("red");
            valid = false;
        }

        // Password validation
        if (password.length > 8) {
            setErrorPassword("");
            setPasswordColor("green");
        } else {
            setErrorPassword("Password must be 8 characters long");
            setPasswordColor("red");
            valid = false;
        }

        // Confirm password validation
        if (password !== "" && password === confirmPassword) {
            setErrorConfirmPassword("");
            setConfirmPasswordColor("green");
        } else {
            setErrorConfirmPassword("Passwords do not match");
            setConfirmPasswordColor("red");
            valid = false;
        }

        if (valid) {
            // Call backend to register the user
            const response = await fetch('http://localhost:8080/signup', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: username,
                    email,
                    password
                })
            });

            if (response.ok) {
                // Registration successful, redirect to login page
                navigate('/login');
            } else {
                // Handle error from the backend
                const content = await response.json();
                console.error(content.message);
            }
        }
    }

    return (
        <>
        <body className="v_body">
            <div className="v_card">
                <div className="card-image"></div>

                <form onSubmit={handleSignUp}>
                    <input 
                        type="text" 
                        placeholder="Name" 
                        style={{borderColor:userColor}} 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <p className="error">{errorUserName}</p>

                    <input 
                        type="text" 
                        placeholder="Email" 
                        style={{borderColor:emailColor}} 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <p className="error">{errorEmail}</p>

                    <input 
                        type="password" 
                        placeholder="Password" 
                        style={{borderColor:passwordColor}} 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <p className="error">{errorPassword}</p>

                    <input 
                        type="password" 
                        placeholder="Confirm Password" 
                        style={{borderColor:confirmPasswordColor}} 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <p className="error">{errorConfirmPassword}</p>

                    <button className="submitButton" type="submit">Submit</button>
                </form>
            </div>
        </body>
        </>
    );
}

export default SignUp;
