import SignUpForm from "../components/SignUpForm"

import React, { useState, useGlobal } from "reactn";

const Signup = () => {
  return(
    <div>
      <h1>Sign up:</h1>
      <SignUpForm />
    </div>
  )
}

export default Signup;