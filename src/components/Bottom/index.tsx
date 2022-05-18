import React from 'react';
import style from './index.module.css'
import { BarsOutlined, EditOutlined } from "@ant-design/icons";
function Bottom() {
  return (
    <div className={style.bottomContainer}>
      <EditOutlined></EditOutlined>
    </div>
  );
}

export default Bottom;
