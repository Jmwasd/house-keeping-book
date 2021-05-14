import React, { useReducer } from "react";
import axios from "axios";
import styled from "styled-components";

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
    case "ALERT_BOX":
      return {
        ...state,
        alert: action.result,
        inputs: {
          email: "",
          password: "",
        },
      };
    case "TOGGLE_BUTTON":
      return {
        ...state,
        toggle: action.text,
        inputs: {
          email: "",
          nickname: "",
          password: "",
          verifyPassword: "",
        },
        alert: "",
      };
    default:
      return state;
  }
}

const initialState = {
  inputs: {
    email: "",
    nickname: "",
    password: "",
    verifyPassword: "",
  },
  alert: "",
  toggle: "Login",
};

function Login({ history }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { inputs, alert, toggle } = state;

  const onChange = (e) => {
    const { name, value } = e.target;

    dispatch({ type: "INPUT_USER", name, value });
  };

  const loginFn = () => {
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
          dispatch({ type: "ALERT_BOX", result });
        } else {
          history.replace("/", result);
        }
      });
  };

  const signup = () => {
    if (inputs.password !== inputs.verifyPassword) {
      const result = "same password please try again";
      dispatch({ type: "ALERT_BOX", result });
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
          if (result === "not found user") {
            dispatch({ type: "ALERT_BOX", result });
          } else {
            history.replace("/", result);
          }
        });
    }
  };

  const onToggle = (e) => {
    const text = e.target.innerText;
    dispatch({ type: "TOGGLE_BUTTON", text });
  };

  return (
    <Wrap>
      <Wrap2>
        <HeadWrap>
          <LoginBtn toggle={toggle} onClick={onToggle}>
            Login
          </LoginBtn>
          <Signup toggle={toggle} onClick={onToggle}>
            Sign up
          </Signup>
        </HeadWrap>
        {toggle === "Login" ? (
          <BodyWrap>
            <InputBox
              name="email"
              onChange={onChange}
              placeholder="email"
              value={inputs.email}
            />
            <InputBox
              type="password"
              name="password"
              onChange={onChange}
              placeholder="password"
              value={inputs.password}
            />
            {alert === "" ? null : <div>{alert}</div>}
            <BottonBox onClick={loginFn}>로그인</BottonBox>
          </BodyWrap>
        ) : (
          <BodyWrap>
            <InputBox
              name="email"
              placeholder="email"
              value={inputs.email}
              onChange={onChange}
            />
            <InputBox
              name="nickname"
              placeholder="nickname"
              value={inputs.nickname}
              onChange={onChange}
            />
            <InputBox
              type="password"
              name="password"
              placeholder="password"
              value={inputs.password}
              onChange={onChange}
            />
            <InputBox
              type="password"
              name="verifyPassword"
              placeholder="verifyPassword"
              value={inputs.verifyPassword}
              onChange={onChange}
            />
            {alert === "" ? null : <div>{alert}</div>}
            <BottonBox onClick={signup}>회원가입</BottonBox>
          </BodyWrap>
        )}
      </Wrap2>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Wrap2 = styled.div`
  box-shadow: 8px 8px 0px 0px;
`;

const HeadWrap = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const BodyWrap = styled.div`
  border-left: 2px solid black;
  border-right: 2px solid black;
  border-bottom: 2px solid black;
  width: 280px;
  height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginBtn = styled.button`
  width: 100%;
  height: 100%;
  background-color: white;
  font-size: 20px;
  border-bottom: none;
  ${(props) =>
    props.toggle === "Sign up" &&
    `
    background-color: black;
    color : white;
  `};
`;

const Signup = styled.button`
  width: 100%;
  height: 100%;
  background-color: white;
  border: none;
  font-size: 20px;
  border-right: 2px solid black;
  border-top: 2px solid black;
  ${(props) =>
    props.toggle === "Login" &&
    `
  background-color: black;
  color : white;
  `};
`;

const InputBox = styled.input`
  width: 80%;
  border-radius: 10px solid black;
  margin-bottom: 10px;
  font-size: 15px;
  font: bold 100% "Lucida Sans Unicode", sans-serif;
  line-height: 2;
`;

const BottonBox = styled.button`
  width: 80px;
  height: 30px;
  font-size: 15px;
  font: bold 100% "Lucida Sans Unicode", sans-serif;
  border: none;
  margin-top: 5px;
  box-shadow: 0 10px 10px -3px rgba(0, 0, 0, 0.25);
  background-color: black;
  color: white;
  &:hover {
    color: green;
  }
`;

export default Login;
