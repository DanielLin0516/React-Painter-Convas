import React from "react";
import style from "./index.module.css";
import { BarsOutlined, EditOutlined } from "@ant-design/icons";
function Header() {
  return (
    <div className={style.headercontainer}>
      <BarsOutlined className={style.menu}></BarsOutlined>
      <EditOutlined className={style.edit}/>
      <div>Page 1</div>
    </div>
  );
}

export default Header;
