 import "./Login.css";
import { useNavigate,useLocation } from "react-router-dom";
function Login() {
   
  const location = useLocation();
const navigate = useNavigate();

const handleLogin = () => {

  localStorage.setItem("user", "loggedin");

  if (location.state) {
    navigate("/tripdetails", { state: location.state });
  } else {
    navigate("/");
  }
};
  return (
    <div className="auth-container">

      <div className="auth-card">

        <h2>LOGIN ✈</h2>

        <form>
          <input type="email" placeholder="Enter Email" required />

          <input type="password" placeholder="Enter Password" required />

          <button type="button" className="auth-btn"
            onClick={handleLogin}>
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