import React, { useRef, useEffect, useState } from "react";
import style from "./index.module.css";
import { isPc } from "../../tools/isPC";
import { Colors, Size, LineSet, Dash } from "../../tools/LineSetting";
import { drawLine, drawSquare } from "../../tools/LineStyle";
import {
  BarsOutlined,
  CloudSyncOutlined,
  EditOutlined,
} from "@ant-design/icons";
function Painter() {
  const painter = useRef<HTMLCanvasElement | null>(null);
  const [choose, setChoose] = useState("paint");
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
  //canvas imgdata数组
  const [imageData, setImageData] = useState<ImageData[]>([]);
  //PC按下鼠标记录起始坐标，并将状态改变
  const mousedownHandler = (e: MouseEvent) => {
    setIsDraw((isDraw) => !isDraw);
    setX((x) => e.pageX);
    setY((y) => e.pageY);
  };
  //手机端触碰
  const touchstartHandler = (e: TouchEvent) => {
    setIsDraw((isDraw) => !isDraw);
    setX((x) => e.changedTouches[0].pageX);
    setY((y) => e.changedTouches[0].pageY);
  };
  //PC松开鼠标
  const mouseupHandler = (e: MouseEvent) => {
    const ctx = painter.current?.getContext("2d");
    if (!ctx || !painter.current) return;
    if (isDraw) {
      setIsDraw((isDraw) => !isDraw);
      setX((x) => 0);
      setY((y) => 0);
      setImageData([
        ...imageData,
        ctx.getImageData(
          0,
          0,
          painter.current.offsetWidth,
          painter.current.offsetHeight
        ),
      ]);
      if (choose === "square") {
        // drawSquare(ctx, x, y, e.pageX, e.pageY,Colors[colorline.idColor],Size[colorline.idSize],colorline)
      }
    }
  };
  //手机端离开屏幕
  const touchendHandler = (e: TouchEvent) => {
    const ctx = painter.current?.getContext("2d");
    if (!ctx || !painter.current) return;
    if (isDraw) {
      setIsDraw((isDraw) => !isDraw);
      setX((x) => 0);
      setY((y) => 0);
      setImageData([
        ...imageData,
        ctx.getImageData(
          0,
          0,
          painter.current.offsetWidth,
          painter.current.offsetHeight
        ),
      ]);
      if (choose === "square") {
        // drawSquare(ctx, x, y, e.changedTouches[0].pageX, e.changedTouches[0].pageY,Colors[colorline.idColor],Size[colorline.idSize],colorline)
      }
    }
  };
  //PC在鼠标移动时候判断是否正在画画并且调用划线事件传入起点位置以及此时变化的x，y值进行更新
  const mousemoveHandler = (e: MouseEvent) => {
    const ctx = painter.current?.getContext("2d");
    if (!ctx || !painter.current) return;
    if (isDraw) {
      //判断是要画线还是画矩形
      if (choose === "paint") {
        drawLine(
          ctx,
          x,
          y,
          e.pageX,
          e.pageY,
          Colors[colorline.idColor],
          Size[colorline.idSize],
          colorline
        );
        setX((x) => e.pageX);
        setY((y) => e.pageY);
      } else if (choose === "square") {
        drawSquare(
          ctx,
          x,
          y,
          e.pageX,
          e.pageY,
          Colors[colorline.idColor],
          Size[colorline.idSize],
          colorline,
          painter.current,
          imageData[imageData.length - 1]
        );
      }
    }
  };
  //手机端手势移动过程
  const touchmoveHandler = (e: TouchEvent) => {
    const ctx = painter.current?.getContext("2d");
    if (!ctx || !painter.current) return;
    if (isDraw) {
      if (choose === "paint") {
        drawLine(
          ctx,
          x,
          y,
          e.changedTouches[0].pageX,
          e.changedTouches[0].pageY,
          Colors[colorline.idColor],
          Size[colorline.idSize],
          colorline
        );
        setX((x) => e.changedTouches[0].pageX);
        setY((y) => e.changedTouches[0].pageY);
      } else if (choose === "square") {
        drawSquare(
          ctx,
          x,
          y,
          e.changedTouches[0].pageX,
          e.changedTouches[0].pageY,
          Colors[colorline.idColor],
          Size[colorline.idSize],
          colorline,
          painter.current,
          imageData[imageData.length - 1]
        );
      }
    }
  };

  //自适应屏幕
  function resize_canvas() {
    if (!painter.current) return;
    if (painter.current.width < window.innerWidth) {
      painter.current.width = window.innerWidth;
    }
    if (painter.current.height < window.innerHeight) {
      painter.current.height = window.innerHeight;
    }
  }
  useEffect(() => {
    const ctx = painter.current?.getContext("2d");
    if (!painter.current || !ctx) return;
    //自适应屏幕
    resize_canvas();
    //对于撤销栈保存一个空白的栈底不然没法撤销
    if (imageData.length === 0) {
      setImageData([
        ...imageData,
        ctx.getImageData(
          0,
          0,
          painter.current.offsetWidth,
          painter.current.offsetHeight
        ),
      ]);
    }
    if (isPc(window.navigator)) {
      painter.current.addEventListener("mousedown", mousedownHandler);
      painter.current.addEventListener("mouseup", mouseupHandler);
      painter.current.addEventListener("mousemove", mousemoveHandler);
    } else {
      painter.current.addEventListener("touchstart", touchstartHandler);
      painter.current.addEventListener("touchend", touchendHandler);
      painter.current.addEventListener("touchmove", touchmoveHandler);
    }
    //接收选择的是否是线条还是矩形
    PubSub.subscribe("choose", (msg, data) => {
      setChoose(data);
      const ctx = painter.current?.getContext("2d");
      if (!painter.current || !ctx) return;
      if (data === "delete") {
        ctx?.clearRect(
          0,
          0,
          painter.current?.offsetWidth,
          painter.current?.offsetHeight
        );
        setImageData([
          ...imageData,
          ctx.getImageData(
            0,
            0,
            painter.current.offsetWidth,
            painter.current.offsetHeight
          ),
        ]);
      } else if (data === "uptodo") {
        if (imageData.length === 1) alert("没有东西可以撤销啦！！");
        else {
          imageData.pop();
          setImageData([...imageData]);
          ctx.putImageData(
            imageData[imageData.length - 1],
            0,
            0,
            0,
            0,
            painter.current.offsetWidth,
            painter.current.offsetHeight
          );
        }
      }
    });
    return () => {
      if (isPc(window.navigator)) {
        painter.current?.removeEventListener("mousedown", mousedownHandler);
        painter.current?.removeEventListener("mouseup", mouseupHandler);
        painter.current?.removeEventListener("mousemove", mousemoveHandler);
      } else {
        painter.current?.removeEventListener("touchstart", touchstartHandler);
        painter.current?.removeEventListener("touchend", touchendHandler);
        painter.current?.removeEventListener("touchmove", touchmoveHandler);
      }
      PubSub.unsubscribe("choose");
    };
  }, [isDraw, x, y]);
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
      <canvas className={style.paint} ref={painter}></canvas>
    </div>
  );
}
  
export default Painter;
