import { React } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import "./ResetPassword.css";


const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  let navigate = useNavigate();
  const id = searchParams.get("id");
  const token = searchParams.get("token");

  const handleResetPassword = async (ev) => {
    ev.preventDefault();
    const newpassword = ev.target.newpassword.value;
    const confirmpassword = ev.target.confirmpassword.value;
    if (newpassword !== confirmpassword)
      toast.error("Passwords do not match !");
    const formData = { id: id, token: token, password: newpassword };
    const res = await axios.post('http://localhost:8000/api/resetPassword', formData);
    const data = res.data;
    if (data.success === true) {
      toast.success(data.message);
      navigate("/login");
    } else toast.error(data.message);
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-box">
        <h5 className="reset-password-title">Reset Password</h5>
        <form className="reset-password-form" onSubmit={handleResetPassword}>
          <div>
            <label htmlFor="newpassword" className="reset-password-label">
              New Password
            </label>
            <input id="newpassword" name="newpassword" type="password" placeholder="New Password" required
              className="reset-password-input" />
          </div>
          <div>
            <label htmlFor="confirmpassword" className="reset-password-label">
              Confirm Password
            </label>
            <input id="confirmpassword" name="confirmpassword" type="password" placeholder="Confirm Password" required
              className="reset-password-input" />
          </div>
          <button type="submit" className="reset-password-button">
            Submit
          </button>
          <p className="reset-password-text">
            Not yet registered? <a href="signup" className="reset-password-link">Register Here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
