import React from "react";

function Main({ history }) {
  const onClick = () => {
    console.log("hio");
    history.push("/login");
  };
  return (
    <div>
      <button onClick={onClick}>login page로 이동</button>
    </div>
  );
}

export default Main;
