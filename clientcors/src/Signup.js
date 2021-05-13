import axios from "axios";
import React, { useState } from "react";

function Signup({ history }) {
  const [inputs, setInputs] = useState({
    email: "",
    nickname: "",
    password: "",
    verifyPassword: "",
  });

  const [alert, setAlert] = useState("");
  const { email, nickname, password, verifyPassword } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const signup = () => {
    if (password !== verifyPassword) {
      setAlert("동일한 비밀번호를 입력하세요.");
    } else {
      axios
        .post(
          "http://localhost:3000/api/signup",
          {
            headers: { withCredentials: true },
          },
          {
            email: inputs.email,
            password: inputs.password,
          }
        )
        .then((result) => {
          if (result === "success sign up") {
            history.push("/login");
          } else {
            setAlert(result);
          }
        });
    }
  };

  return (
    <>
      <input
        name="email"
        placeholder="email"
        value={email}
        onChange={onChange}
      ></input>
      <br />
      <input
        name="nickname"
        placeholder="nickname"
        value={nickname}
        onChange={onChange}
      ></input>
      <br />
      <input
        name="password"
        placeholder="password"
        value={password}
        onChange={onChange}
      ></input>
      <br />
      <input
        name="verifyPassword"
        placeholder="verifyPassword"
        value={verifyPassword}
        onChange={onChange}
      ></input>
      <br />
      {alert === "" ? null : <div>{alert}</div>}
      <button onClick={signup}>회원가입</button>
    </>
  );
}
export default Signup;
