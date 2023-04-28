import {
  useRef, useEffect, MutableRefObject,
  useImperativeHandle, forwardRef, useState,
  useContext,
  RefObject,
  ForwardedRef,
  useCallback,
  Ref
} from 'react'
import { motion, useAnimate } from 'framer-motion'

import variables from '../styles/var.module.scss'
import styles from '../styles/StringSvg.module.scss'
import { StringPath, StringPathType } from './stringPath'
import { greatVibes, spaceGrotesk, dancingScript } from '../pages/_app'

export interface StringSvgType {
  stringRefs: RefObject<StringPathType>[] | undefined
  stringRef: (ind: number) => StringPathType | null
  drag: (ind: number, xPos: number, yPos: number, direction: number) => void
  pluck: (ind: number, delay: number, xPos?: number, direction?: number) => void
  pluckSeq: (seq: Array<number>, interval: number, delay?: number) => void
  getBBox(): DOMRect | undefined
}

interface Props {

}

const StringSvgComp = (props: Props, ref: ForwardedRef<StringSvgType>) => {
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

  const drag = (ind: number, xPos: number, yPos: number, direction: number) => {
    const string = stringRefs.current[ind].current
    const stringMask = stringMaskRefs.current[ind].current
    if(!(string && stringMask)) return;
    string.hover(xPos, yPos, direction)
    stringMask.hover(xPos, yPos, direction)
  }

  const timeoutRef = useRef<Array<NodeJS.Timeout>>([])
  // const cooldownRef = useRef<Array<number>>([0, 0, 0, 0, 0, 0])
  // const cooldown = 10 // ms
  const pluck = (ind: number, delay: number, xPos: number = 50, direction: number = 1) => {
    // let canPlay = true
    const time = new Date().getTime()
    // if(time - cooldown < cooldownRef.current[ind]) canPlay = false
    // cooldownRef.current[ind] = time
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
    getBBox: () => svgRef.current?.getBBox(),
  }))

  const nameTextAttributes = {
    textLength: "40", lengthAdjust: "spacingAndGlyphs",
    fontSizeAdjust: ".85", y: "90", fontWeight: "700"
  }
  const nameText = "Andrei"

  const numFrets = 5
  const margin = 10
  const fretArray: number[] = []
  for(let i = 0; i < numFrets; i++){
    const step = 100 / numFrets
    fretArray.push(step*i + margin)
  }
  const frets = fretArray.map((val, ind) => {
    return <rect key={ind} x={val} y="0" rx="1" ry="1"
      width=".5" height="100" fill={variables.lightColor}/>
  })

  const stringMask = stringMaskRefs.current.map((val, ind) => {
    const type = "mask"
    return <StringPath key={ind} ind={ind} ref={val} type={type} />
  })
  const strings = stringRefs.current.map((val, ind) => {
    const type = "string"
    return <StringPath key={ind} ind={ind} ref={val} type={type} />
  })

  return (
    <motion.svg ref={svgRef}
      className={styles.stringSvg}
      style={dancingScript.style}
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
      <ellipse cx="80" cy="50" rx=".98" ry="6.8" fill={variables.backgroundColor}/>
      <ellipse cx="80" cy="50" rx=".75" ry="5.0" fill={variables.textColor}/>
      {strings}
      <text {...nameTextAttributes} x="30.15" y="91.5" fill={variables.backgroundColor}>
        {nameText}
      </text>
      <text {...nameTextAttributes} x="30" mask='url(#mask)' fill={variables.textColor} >
        {nameText}
      </text>
    </motion.svg>
  )
}

export const StringSvg = forwardRef<StringSvgType, Props>(StringSvgComp)