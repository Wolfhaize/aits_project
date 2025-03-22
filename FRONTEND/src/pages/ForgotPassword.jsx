// pages/ForgotPassword.js

import axios from "axios";
import { toast } from "react-toastify";
// import "./ForgotPassword.css"; // Import external CSS file


const ForgotPassword = () => {
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const email = ev.target.email.value;
    const formData = { email: email };
    const res = await axios.post('http://localhost:8000/api/forgotPassword' , formData);
    const data = res.data;
    if (data.success === true) toast.success(data.message);
    else toast.error(data.message);
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h5 className="forgot-password-title">Forgot Password</h5>
        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="forgot-password-label">Email</label>
            <input id="email" type="email" name="email" placeholder="Enter your email" required className="forgot-password-input" />
          </div>
          <button type="submit" className="forgot-password-button">Submit</button>
          <p className="forgot-password-text">
            Remember your password? <a href="login" className="forgot-password-link">Login Here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;