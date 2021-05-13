import React from "react";

function Main({ history }) {
  const { state } = history.location;
  const onClick = () => {
    history.push("/login");
  };
  return (
    <>
      <div>수입 : {state.income}</div>
      <div>지출 : {state.expenditure}</div>
      <button onClick={onClick}>로그아웃</button>
    </>
  );
}

export default Main;
