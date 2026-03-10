 import { useState } from "react";
import "./Register.css";

function Register() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [mobile, setMobile] = useState("")   // ✅ ADD THIS LINE
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleRegister = async (e) => {

    e.preventDefault()

    if(password !== confirmPassword){
      alert("Passwords do not match")
      return
    }

    const data = {
      name,
      email,
      mobile,   // ✅ ADD MOBILE HERE
      password
    }

    try{

      const res = await fetch("http://localhost:5000/api/auth/register",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
      })

      const result = await res.json()

      alert(result.message)

    }catch(error){
      console.log(error)
      alert("Something went wrong")
    }

  }

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h2>SIGN UP ✈</h2>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" className="auth-btn">
            Register
          </button>

          <p className="login-link">
            Already have an account? <a href="/login">Login</a>
          </p>

        </form>

      </div>

    </div>
  );
}

export default Register;