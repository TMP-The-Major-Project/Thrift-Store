import { useState } from "react";
import "./Validate.css";

function Login(){

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [errorUserName, setErrorUserName] = useState("")
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("")

    const [userColor, setUserColor] = useState("")
    const [emailColor, setEmailColor] = useState("")
    const [passwordColor, setPasswordColor] = useState("")
    const [confirmPasswordColor, setConfirmPasswordColor] = useState("")

    function Login(e){
        e.preventDefault()

        // if (username.length > 5){
        //     setErrorUserName("")
        //     setUserColor("green")
        // } else{
        //     setErrorUserName("Username must be 5 letters long")
        //     setUserColor("red")
        // }


        // if(password!=="" && password===confirmPassword){
        //     setErrorConfirmPassword("")
        //     setConfirmPasswordColor("green")
        // } else{
        //     setErrorConfirmPassword("Password does not match")
        //     setConfirmPasswordColor("red")
        // }


    }

    return (
        <>
            <div className="card">
                <div className="card-image"></div>

                <form>
                    <input 
                        type="text" 
                        placeholder="Username" 
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


                    <button className="loginButton" onClick={Login}>Login</button>
                </form>
            </div>
        </>
    );
}

export default Login;