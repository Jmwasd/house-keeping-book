import React, { useState } from "react";
import axios from "axios";

function Login({ history }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const onClick = () => {
    axios
      .post(
        "http://localhost:3000",
        {
          headers: { withCredentials: true },
        },
        {
          email: email,
          password: password,
        }
      )
      .then((result) => {
        if (result === true) {
          history.push("/");
        } else {
          console.log("fail");
        }
      });
  };

  return (
    <>
      <input name="email" onChange={onChange} value={email}></input>
      <input name="password" onChange={onChange} value={password}></input>
      <button onClick={onClick}>로그인</button>
    </>
  );
}

export default Login;
