import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import getOtp from "../../api/getOtp";
import loginwithOtp from "../../api/loginWithOtp";
import ConfirmOtp from "../../components/ConfirmOtp";
import LoginForm from "../../components/LoginForm";
import { loginUser } from "../../store/actions";
import "./index.css";

const Login = () => {
  const [state, setState] = useState({ number: "", otp: "" });
  const [error, setError] = useState(null);
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [otpFetched, setOtpFetched] = useState(false);

  // Using useDispatch hook
  const dispatch = useDispatch();

  const history = useHistory();

  const handleNumberChange = (event) => {
    let val = event.target.value;

    val.length <= 10 && setState({ number: val });

    if (val.length < 10) {
      setError("Number should have atleast 10 digits");
    } else if (!["6", "7", "8", "9"].includes(state.number[0])) {
      setError("Number should start with 6,7,8,9");
    } else {
      setError(null);
    }
  };

  const handleLoginClick = async () => {
    let result = await getOtp(state.number);
    if (result.status === 200) {
      console.log("Otp sent successfully");
      setOtpFetched(true);
      setError(null);
    } else console.error("Send OTP request failed");
  };

  const handleChangeOtp = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
  };

  const inputfocus = (elmnt) => {
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      const next = elmnt.target.tabIndex - 2;
      if (next > -1) {
        elmnt.target.form.elements[next].focus();
      }
    } else {
      const next = elmnt.target.tabIndex;
      if (next < 4) {
        elmnt.target.form.elements[next].focus();
      }
    }
  };

  const handleSubmitOtp = async (e) => {
    e.preventDefault();

    let data = otp.join("");
    if (data.length !== 4) {
      setError("Please enter 4 digit OTP");
      return;
    }
    let res = await loginwithOtp(state.number, data);
    if (res.status === 200) {
      console.log("Login Successful");
      dispatch(loginUser(res?.data?.Response?.access_token));
      history.replace("/");
    }
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-dark text-white"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-4 text-uppercase">Login</h2>

                  {/* Content */}
                  {!otpFetched ? (
                    <LoginForm
                      handleNumberChange={handleNumberChange}
                      error={error}
                      state={state}
                      handleLoginClick={handleLoginClick}
                    />
                  ) : (
                    <ConfirmOtp
                      handleChangeOtp={handleChangeOtp}
                      inputFocus={inputfocus}
                      error={error}
                      otp={otp}
                      handleSubmitOtp={handleSubmitOtp}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
