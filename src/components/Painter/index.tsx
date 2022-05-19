import React, { useRef, useEffect, useState } from "react";
import style from "./index.module.css";
import { isPc } from "../../tools/isPC";
import { Colors, Size, LineSet, Dash } from "../../tools/LineSetting";
import { BarsOutlined, EditOutlined } from "@ant-design/icons";
function Painter() {
  const painter = useRef<SVGSVGElement | null>(null);
  //是否正在画画
  const [isDraw, setIsDraw] = useState<boolean>(false);
  //选择颜色弹窗
  const [isActive, setActive] = useState<boolean>(false);
  //选择的颜色以及线条
  const [colorline, setColorLine] = useState<LineSet>({
    idColor: 0,
    idSize: 0,
    idDash: 0,
  });
  //convas x坐标
  const [x, setX] = useState(0);
  //convas y坐标
  const [y, setY] = useState(0);
  const [path, setPath] = useState("M");
  //插入的画图路径dom节点

  //鼠标按下
  const mousedownHandler = (e: MouseEvent) => {
    setIsDraw(true);
    setPath(path + `${e.pageX},${e.pageY} Q`);
    const element = document.createElementNS("http://www.w3.org/2000/svg","path");
    element.setAttribute("d",`M 100, 100 Q 300,100 200,300 `)
    element.setAttribute("fill","transparent")
    element.setAttribute("stroke","black")
    element.setAttribute("stroke-width","3")
    painter.current?.append(element);
  };
  const touchdownHandler = (e:TouchEvent) => {
    setIsDraw(true);
    setPath(path + `${e.changedTouches[0].pageX},${e.changedTouches[0].pageY} Q`);
    const element = document.createElementNS("http://www.w3.org/2000/svg","path");
    element.setAttribute("d",`M 100, 100 Q 300,100 200,300 `)
    element.setAttribute("fill","transparent")
    element.setAttribute("stroke","black")
    element.setAttribute("stroke-width","3")
    painter.current?.append(element);
  }

  //鼠标滑动
  const mousemoveHandler = (e: MouseEvent) => {
    if (isDraw) {
      console.log(e);
    }
  };

  //鼠标松开
  const mouseupHandler = (e: MouseEvent) => {
    setIsDraw(false);
    setPath("M");

  };

  //画路线的组件

  useEffect(() => {
    if (!painter.current) return;
    if (isPc(window.navigator)) {
      painter.current.addEventListener("mousedown", mousedownHandler);
      painter.current.addEventListener("mousemove", mousemoveHandler);
      painter.current.addEventListener("mouseup", mouseupHandler);
    }else {
      painter.current.addEventListener("touchstart", touchdownHandler);
    }
    return () => {
      if (isPc(window.navigator)) {
        painter.current?.removeEventListener("mousedown", mousedownHandler);
        painter.current?.removeEventListener("mousemove", mousemoveHandler);
        painter.current?.removeEventListener("mouseup", mouseupHandler);
      }
    };
  }, [isDraw, path]);
  return (
    <div className={style.container}>
      <div className={style.Stylecontrol}>
        <div onClick={() => setActive(!isActive)}>
          <span style={{ marginRight: "0.5rem" }}>Styles</span>
          <div className={style.color}></div>
        </div>
        <div>2</div>
        <div>3</div>
      </div>
      {/* 弹窗 */}
      {isActive && (
        <div className={style.Modal}>
          {/* 选择颜色 */}
          <div className={style.First}>
            <span>Colors</span>
            <div className={style.colorChoose}>
              {Colors.map((item, index) => {
                return (
                  <div
                    style={{
                      backgroundColor: item.color,
                    }}
                    className={
                      colorline.idColor === index
                        ? style.isChoose
                        : style.button
                    }
                    key={index}
                    onClick={() =>
                      setColorLine({ ...colorline, idColor: index })
                    }
                  ></div>
                );
              })}
            </div>
          </div>
          {/* 选择线条大小 */}
          <div className={style.Second}>
            <span>Size</span>
            <div className={style.colorChoose}>
              {Size.map((item, index) => {
                return (
                  <div
                    className={
                      colorline.idSize === index ? style.isChoose : style.button
                    }
                    key={index}
                    onClick={() => {
                      setColorLine({ ...colorline, idSize: index });
                    }}
                  >
                    {item.size}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={style.Third}>
            <span>Dashed</span>
            <div className={style.colorChoose}>
              {Dash.map((item, index) => {
                return (
                  <div
                    className={
                      colorline.idDash === index ? style.isChoose : style.button
                    }
                    key={index}
                    onClick={() => {
                      setColorLine({ ...colorline, idDash: index });
                    }}
                  >
                    {item.dash}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      <svg className={style.paint} ref={painter}>
        {/* <path
          d="M 100, 100 Q 300,100 200,300 "
          fill="transparent"
          stroke="black"
          stroke-width="3"
        /> */}
      </svg>
    </div>
  );
}

export default Painter;
