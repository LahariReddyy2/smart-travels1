 import "./Login.css";
import { useNavigate,useLocation } from "react-router-dom";
import { useState } from "react";

 function Login({ setIsLoggedIn })  {
   
  const location = useLocation();
  const navigate = useNavigate();

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error, setError] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault()

    const data = {
      email,
      password
    }

    const res = await fetch("http://localhost:5000/api/auth/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    })

    const result = await res.json()

    if(result.message === "Login successful"){

  localStorage.setItem("user", JSON.stringify(result.user));
  localStorage.setItem("userEmail", result.user.email);
  setIsLoggedIn(true);

  if (location.state) {
    navigate("/tripdetails", { state: location.state });
  } else {
    navigate("/");
  }

} else {
  setError(result.message)
}

  }

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h2>LOGIN ✈</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter Email"
            required
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            required
            onChange={(e)=>setPassword(e.target.value)}
          />
          {error && <p style={{color:"red"}}>{error}</p>}  
          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>

        <p style={{marginTop:"10px"}}>
          Not Registered? 
          <span 
            style={{color:"blue", cursor:"pointer"}} 
            onClick={()=>navigate("/register")}
          >
            Register
          </span>
        </p>

      </div>

    </div>
  );
}

export default Login;