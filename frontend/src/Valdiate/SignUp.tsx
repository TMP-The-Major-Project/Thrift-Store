import { Link } from "react-router-dom";
import React, { useState, SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./Validate.css";

function SignUp(){
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const message = " Login Here!"

  const [redirect, setRedirect] = useState(false);
  
  const navigate = useNavigate();

  
  const validate = async (e:SyntheticEvent) => {
    e.preventDefault();

    await fetch("http://localhost:3001/register", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username,
        email,
        password
      })
    });
    setRedirect(true);
  }
  
  if(redirect){
    navigate("/login");
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
    type="text"
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    />

    <input className="input_f"
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    />

    <button className="submit-btn" type="submit">
    Submit
    </button>
    <a className="prompt_m">
    Already an Insider?   
    <Link to="/login" className="login-link">
    {message}
    </Link>
    </a>
    </form>
    </div>
    </div>
    </>
  );
}

export default SignUp;

