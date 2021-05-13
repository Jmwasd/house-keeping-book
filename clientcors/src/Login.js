import React, { useReducer, useState } from "react";
import axios from "axios";

function reducer(state, action) {
  switch (action.type) {
    case "INPUT_USER":
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value,
        },
      };
    case "DISPLAY_ALERT":
      return {
        ...state,
        alert: action.result,
        inputs: {
          email: "",
          password: "",
        },
      };
    default:
      return state;
  }
}

const initialState = {
  inputs: {
    email: "",
    password: "",
  },
  alert: "",
};

function Login({ history }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { inputs, alert } = state;

  const onChange = (e) => {
    const { name, value } = e.target;

    dispatch({ type: "INPUT_USER", name, value });
  };

  const onClick = () => {
    axios
      .post(
        "http://localhost:3000/api/login",
        {
          headers: { withCredentials: true },
        },
        {
          email: inputs.email,
          password: inputs.password,
        }
      )
      .then((result) => {
        if (result === "not found user") {
          dispatch({ type: "DISPLAY_ALERT", result });
        } else {
          history.replace("/", result);
        }
      });

    // let result = {
    //   id: 0,
    //   email: "",
    //   nickname: "",
    //   income: 55,
    //   expenditure: 55,
    // };
    // history.replace("/", result);
  };

  const signup = () => {
    history.push("/signup");
  };

  return (
    <>
      <input name="email" onChange={onChange} value={inputs.email}></input>
      <br />
      <input
        name="password"
        onChange={onChange}
        value={inputs.password}
      ></input>
      <br />
      {alert === "" ? null : <div>{alert}</div>}
      <button onClick={onClick}>로그인</button>
      <button onClick={signup}>회원가입</button>
    </>
  );
}

export default Login;
