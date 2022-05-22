import React, { useState, useEffect } from "react";
import style from "./index.module.css";
import {
  RadiusSettingOutlined,
  EditOutlined,
  UndoOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import PubSub from "pubsub-js";
function Bottom() {
  const [choose, setChoose] = useState<string>("paint");
  // const send = () => {
  //   PubSub.publish("choose", choose);
  // };

  return (
    <div className={style.bottomContainer}>
      <EditOutlined
        className={choose === "paint" ? style.edit_active : style.edit}
        onClick={() => {
          setChoose("paint");
          PubSub.publish("choose", "paint");
        }}
      />
      <RadiusSettingOutlined
        className={choose === "square" ? style.edit_active : style.edit}
        onClick={() => {
          setChoose("square");
          PubSub.publish("choose", "square");
        }}
      />
      <DeleteOutlined
        className={style.edit}
        onClick={() => {
          // setChoose(choose);
          PubSub.publish("choose", "delete");
          PubSub.publish("choose", choose);
        }}
      />
      <UndoOutlined
        className={style.edit}
        onClick={() => {
          // setChoose(choose);
          PubSub.publish("choose", "uptodo");
          PubSub.publish("choose", choose);
        }}
      />
    </div>
  );
}

export default Bottom;
