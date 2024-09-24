import { useState } from "react";
import "./Validate.css";

function SignUp(){

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

    function SignUp(e){
        e.preventDefault()

        var check=1
        if (username.length > 5){
            setErrorUserName("")
            setUserColor("green")
            check = 1;
        } else{
            setErrorUserName("Username must be 5 letters long")
            setUserColor("red")
            check = 0;
        }


        if (email.includes("@gmail.com")){
            setErrorEmail("")
            setEmailColor("green")
            check = 1;
        } else{
            setErrorEmail("Email must contain @gmail.com")
            setEmailColor("red")
            check = 0;
        }


        if (password.length > 8){
            setErrorPassword("")
            setPasswordColor("green")
            check = 1;
        } else{
            setErrorPassword("Password must be 8 letters long")
            setPasswordColor("red")
            check = 0;
        }


        if(password!=="" && password===confirmPassword){
            setErrorConfirmPassword("")
            setConfirmPasswordColor("green")
            check = 1;
        } else{
            setErrorConfirmPassword("Password does not match")
            setConfirmPasswordColor("red")
            check = 0;
        }

        if (check===1){
            window.location.href = '/product';
        }
    }

    return (
        <>
        <body className="v_body">
            <div className="v_card">
                <div className="card-image"></div>

                <form>
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
                    <p className="v_error">{errorEmail}</p>

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

                    <button className="submitButton" onClick={SignUp}>Submit</button>
                </form>
            </div>
        </body>
        </>
    );
}

export default SignUp;