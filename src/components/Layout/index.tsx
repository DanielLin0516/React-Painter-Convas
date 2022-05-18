import React from "react";
import Header from "../Header";
import Bottom from "../Bottom";
import Painter from "../Painter";

export default function Layout() {
  return (
    <div>
      <Header></Header>
      <Painter></Painter>
      <Bottom></Bottom>
    </div>
  );
}
