import React, { useState, useGlobal } from "reactn";
import { Redirect } from "react-router-dom";
import client from "../api/client";


const SignupForm = (props) => {
    const initialState = {
    email: "",
    password: "",
    passwordConfirm: ""
  }
  const [formState, setFormState] = useState(initialState);
  

  const handleChange = e => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    await client.post(
      "/auth/sign-up",
      formState
    );

    setFormState(initialState);
  };

  return (
    <form onSubmit={handleSubmit}>
      {(
        (props.redirect) && (
          <Redirect push to={props.redirect} />
        )
      )}
      <div>
        <input
          type="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          placeholder="E-mail"
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          value={formState.password}
          onChange={handleChange}
          placeholder="Password..."
        />
      </div>
      <div>
          <input 
            type="password"
            name="passwordConfirm"
            value={formState.passwordConfirm}
            onChange={handleChange}
            placeholder="Confirm Password"
          />
      </div>
      <div>
        <button>Sign up</button>
      </div>
    </form>
  );
};

export default SignupForm;