import {
  useRef, useEffect, MutableRefObject,
  useImperativeHandle, forwardRef, useState,
  useContext,
  RefObject,
  ForwardedRef,
  useCallback,
  ForwardRefRenderFunction
} from 'react'
import { SVGMotionProps, motion, useAnimate } from 'framer-motion'

import variables from '../styles/var.module.scss'
import styles from '../styles/StringSvg.module.scss'
import { StringPath, StringPathType } from './stringPath'

export interface StringSvgType {
  stringRefs: RefObject<StringPathType>[] | undefined
  stringRef: (ind: number) => StringPathType | null
  drag: (ind: number, xPos: number, yPos: number) => void
  pluck: (ind: number, delay: number, xPos?: number, direction?: number) => void
  pluckSeq: (seq: Array<number>, interval: number, delay?: number) => void
  getBoundingClientRect(): DOMRect | undefined
}

interface Props {

}

const StringSvgComp: ForwardRefRenderFunction<StringSvgType, Props> = (props: Props, ref: ForwardedRef<StringSvgType>) => {
  const stringRefs = useRef([
    useRef<StringPathType>(null), useRef(null),
    useRef(null), useRef(null),
    useRef(null), useRef(null)
  ])

  const stringMaskRefs = useRef([
    useRef<StringPathType>(null), useRef(null),
    useRef(null), useRef(null),
    useRef(null), useRef(null)
  ])

  const svgRef = useRef<SVGSVGElement>(null)

  const drag = (ind: number, xPos: number, yPos: number) => {
    const string = stringRefs.current[ind].current
    const stringMask = stringMaskRefs.current[ind].current
    if(!(string && stringMask)) return;
    string.hover(xPos, yPos)
    stringMask.hover(xPos, yPos)
  }

  const timeoutRef = useRef<Array<NodeJS.Timeout>>([])
  const pluck = (ind: number, delay: number, xPos: number = 50, direction: number = 1) => {
    const timeouts = timeoutRef.current
    return setTimeout(() => {
      const string = stringRefs.current[ind].current
      const stringMask = stringMaskRefs.current[ind].current
      if (!(string && stringMask)) return null;
      string.click(xPos, direction)
      stringMask.click(xPos, direction)
      timeouts.shift()
    }, delay)
  }
  const pluckSeq = useCallback((seq: Array<number>, interval: number, delay: number = 0) => {
    const timeouts = timeoutRef.current
    let time = delay
    seq.forEach((i) => {
      timeouts.push(pluck(i, time))
      time += interval
    });
  }, [])

  pluckSeq([0, 1, 2, 3, 4, 5], 200, 200)

  useImperativeHandle(ref, () => ({
    get stringRefs() {
      if (stringRefs.current) return stringRefs.current
    },
    stringRef: (ind: number) => {
      const strings = stringRefs.current
      if (!strings) return null;
      const string = strings[ind].current
      return string
    },
    drag: drag,
    pluck: pluck,
    pluckSeq: pluckSeq,
    getBoundingClientRect: () => svgRef.current?.getBoundingClientRect(),
  }))
  
  const numFrets = 5, margin = 10
  const frets = []
  for(let i = 0; i < numFrets; i++){
    const step = 100 / numFrets
    frets.push(<rect key={i} x={step*i + margin} y="0" rx=".5" ry=".5"
    width=".4" height="100" fill={variables.darkColor}/>)
  }

  const stringMask = stringMaskRefs.current.map((val, ind) => {
    const type = "mask"
    return <StringPath key={ind} ind={ind} ref={val} type={type} />
  })
  const strings = stringRefs.current.map((val, ind) => {
    const type = "string"
    return <StringPath key={ind} ind={ind} ref={val} type={type} />
  })

  const nameText = "Andrei"
  const nameTextAttributes = {
    textLength: "37", lengthAdjust: "spacingAndGlyphs",
    fontSizeAdjust: ".85", y: "89", fontWeight: "700"
  }

  return (
    <svg ref={svgRef}
      className={styles.stringSvg}
      viewBox='0 0 100 100'
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio='none'
    >
      <defs>
        <mask id="mask" x="0" y="0"
          width="100" height="100"
          maskUnits="userSpaceOnUse">
          <rect x="0" y="0" width="100" height="100" fill='white' />
          {stringMask}
        </mask>
      </defs>
      {frets}
      <ellipse cx="80" cy="50.5" rx=".98" ry="6.8" fill={variables.darkColor}/>
      <ellipse cx="80" cy="50.5" rx=".75" ry="5.0" fill={variables.backgroundColor}/>
      <ellipse cx="20" cy="16" rx=".98" ry="6.8" fill={variables.darkColor}/>
      <ellipse cx="20" cy="16" rx=".75" ry="5.0" fill={variables.backgroundColor}/>
      <ellipse cx="20" cy="85" rx=".98" ry="6.8" fill={variables.darkColor}/>
      <ellipse cx="20" cy="85" rx=".75" ry="5.0" fill={variables.backgroundColor}/>
      {strings}
      {/* <text {...nameTextAttributes} x="32" fill={variables.backgroundColor}>
        {nameText}
      </text>
      <text {...nameTextAttributes} x="31.5" mask='url(#mask)' fill={variables.darkColor} >
        {nameText}
      </text> */}
    </svg>
  )
}

export const StringSvg = forwardRef<StringSvgType, Props>(StringSvgComp)