import React, { useState, SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./Validate.css";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

   const validate = async (e: SyntheticEvent) => {
        e.preventDefault();

        const resp = await fetch('http://localhost:3001/admin-login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                username,
                password
            })
        });

        const content = await resp.json()
        setUsername(content.username);

        if(content.message === "success"){
          setErrorMessage("");
          setRedirect(true);
        setUsername(content.username);
        }
        setErrorMessage("Incorrect username or password!!");
    }
    const message = "Hello Admin"

    if (redirect) {
        navigate("/product");
    }
  return (
    <>
    <div className="v_body">

    <div className="v_card">
    <div className="v_card-image"></div>

    <form onSubmit={validate}>
    <input className="input_f"
    type="text" 
    placeholder="Username" 
    value={username} 
    onChange={(e) => setUsername(e.target.value)}
    />

    <input className="input_f"
    type="password" 
    placeholder="Password" 
    value={password} 
    onChange={(e) => setPassword(e.target.value)}
    />

    <p className="error_p">{errorMessage}</p>

    <button className="submit-btn" type="submit">Login</button>
    <a className="prompt_m">
    {message}
    </a>

    </form>
    </div>
    </div>
    </>
  );
}

export default AdminLogin;

