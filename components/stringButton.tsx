import { NextPage } from "next";
import { RefObject, useContext, useRef } from "react";
import { useAppSelector } from "../app/hooks";
import { selectView } from "../app/viewSlice";
import { Button } from "../data/sections";
import { StringPathType } from "./stringPath";
import { StringSvgType } from "./stringSvg";
import { HomeContext } from './home'


interface Props {
  button: Button
  index: number
}

export const StringButton: NextPage<Props> = (props) => {
  const { button, index } = props
  const { stringRef, scrollRef } = useContext(HomeContext)

  const spanRef = useRef<HTMLSpanElement>(null)
  const view = useAppSelector(selectView)

  const navigate = () => {
    const scroll = scrollRef?.current
    if (!scroll) return;
    const param = button.params[0]
    if (typeof param !== 'number') return;
    const scrollDist = param * view.width * .9
    console.log(scrollDist)
    scroll.style.left = `${-scrollDist}px`
  }

  // Imperative calls to StringSvg animations
  const onHover = () => {
    const span = spanRef.current
    const string = stringRef?.current?.stringRef(index)
    if (!span || !string) return;
    string.hover()
    span.style.transform = `translateY(1vh)`
  }
  const onLeave = () => {
    const span = spanRef.current
    const string = stringRef?.current?.stringRef(index)
    if (!span || !string) return;
    string.unhover()
    span.style.transform = `translateY(0vh)`
  }
  const onClick = () => {
    const span = spanRef.current
    const string = stringRef?.current?.stringRef(index)
    if (!span || !string) return;
    string.click()
    span.style.transform = `translateY(0vh)`
    if (button.func == 'navigate') navigate();
  }

  return (
    <div
      onMouseEnter={() => onHover()}
      onMouseLeave={() => onLeave()}
      onMouseDown={() => onClick()}
    >
      <span ref={spanRef}
      >
        {button.name}
      </span>
    </div>
  )
}