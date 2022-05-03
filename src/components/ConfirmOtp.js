import React from "react";

const ConfirmOtp = ({
  otp,
  handleChangeOtp,
  inputFocus,
  handleSubmitOtp,
  error,
}) => {
  return (
    <form className="w-100 mb-5 mt-5 ">
      <div className="d-flex mb-4">
        {otp.map((data, index) => {
          return (
            <input
              className="form-control text-center me-3"
              name="otp"
              maxLength="1"
              key={index}
              value={data}
              autoComplete="off"
              tabIndex={index + 1}
              onChange={(e) => handleChangeOtp(e.target, index)}
              onFocus={(e) => e.target.select()}
              onKeyUp={(e) => inputFocus(e)}
              style={{ caretColor: "transparent" }}
            />
          );
        })}
      </div>
      {error ? <p className="error-msg">{error}</p> : null}
      <button
        disabled={otp.join("").length !== 4}
        className="btn btn-outline-light btn-lg px-5"
        onClick={handleSubmitOtp}
      >
        Verify OTP
      </button>
    </form>
  );
};

export default ConfirmOtp;
