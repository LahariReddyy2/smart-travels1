 import "./Register.css";

function Register() {
  return (
    <div className="auth-container">

      <div className="auth-card">

        <h2>SIGN UP ✈</h2>

        <form>

          <input type="text" placeholder="Enter your full name" required />

          <input type="email" placeholder="Enter your email" required />

          <input type="password" placeholder="Enter your password" required />

          <input type="password" placeholder="Confirm your password" required />

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