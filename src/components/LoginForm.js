import React from "react";

const LoginForm = ({ handleNumberChange, state, error, handleLoginClick }) => {
  return (
    <>
      <div className="row form-outline form-white mb-4">
        <label className="form-label" htmlFor="phone">
          Mobile Number
        </label>
        <input
          type="number"
          max={10}
          id="phone"
          onChange={handleNumberChange}
          value={state.number}
          className="form-control form-control-lg"
        />
        {error ? <p className="error-msg">{error}</p> : null}
      </div>
      <button
        disabled={error !== null || !state.number.length > 0}
        className="btn btn-outline-light btn-lg px-5"
        onClick={handleLoginClick}
      >
        Login
      </button>
    </>
  );
};

export default LoginForm;
