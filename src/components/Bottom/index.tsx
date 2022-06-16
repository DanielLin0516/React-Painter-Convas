import React, { useState, useEffect, useRef } from 'react'
import style from './index.module.css'
import {
  RadiusSettingOutlined,
  EditOutlined,
  UndoOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import Icon from '@ant-design/icons'
import PubSub from 'pubsub-js'
function Bottom() {
  const [choose, setChoose] = useState<string>('paint')
  // const send = () => {
  //   PubSub.publish("choose", choose);
  // };
  const [color, setcolor] = useState<string>('333333')
  //橡皮图标
  const EraserSVG = () => (
    <svg
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="2248"
      width="16"
      height="16">
      <path
        d="M960.28 409.42a95.36 95.36 0 0 0-28-67.89l-209.35-209.3a96.18 96.18 0 0 0-135.76 0L91.23 628.17a96.1 96.1 0 0 0 0 135.76l127.49 127.49a95.38 95.38 0 0 0 67.88 28.12h346.91a32 32 0 0 0 0-64H554L932.24 477.3a95.34 95.34 0 0 0 28.04-67.88zM304.15 855.54H286.6a31.82 31.82 0 0 1-22.6-9.37L136.49 718.68a32.18 32.18 0 0 1 0-45.26l129.84-129.84 254.55 254.56-48 48a31.82 31.82 0 0 1-22.63 9.37zM887 432L566.14 752.89 311.58 498.33l320.84-320.84a32.18 32.18 0 0 1 45.26 0L887 386.79a32.17 32.17 0 0 1 0 45.21z"
        fill= {`#${color}`}
        p-id="2249"></path>
    </svg>
  )
  const EraserIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={EraserSVG} {...props} />
  )
  return (
    <div className={style.bottomContainer}>
      <EditOutlined
        className={choose === 'paint' ? style.edit_active : style.edit}
        onClick={() => {
          setcolor('333333')
          setChoose('paint')
          PubSub.publish('choose', 'paint')
        }}
      />
      <RadiusSettingOutlined
        className={choose === 'square' ? style.edit_active : style.edit}
        onClick={() => {
          setcolor('333333')
          setChoose('square')
          PubSub.publish('choose', 'square')
        }}
      />
      <EraserIcon
        className={choose === 'erase' ? style.edit_active : style.edit}
        onClick={() => {
          setcolor('ffffff')
          setChoose('erase')
          PubSub.publish('choose', 'erase')
        }}
      />
      <DeleteOutlined
        className={style.edit}
        onClick={() => {
          // setChoose(choose);
          PubSub.publish('choose', 'delete')
          PubSub.publish('choose', choose)
        }}
      />
      <UndoOutlined
        className={style.edit}
        onClick={() => {
          // setChoose(choose);
          PubSub.publish('choose', 'uptodo')
          PubSub.publish('choose', choose)
        }}
      />
    </div>
  )
}

export default Bottom
