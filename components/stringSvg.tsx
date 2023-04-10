import {
  useRef, useEffect, MutableRefObject,
  useImperativeHandle, forwardRef, useState,
  useContext,
  RefObject,
  ForwardedRef,
  useCallback
} from 'react'

import styles from '../styles/StringSvg.module.scss'
import { StringPath, StringPathType } from './stringPath'

export interface StringSvgType {
  stringRefs: RefObject<StringPathType>[] | undefined
  stringRef: (ind: number) => StringPathType | null
  pluck: (ind: number, delay: number) => void
  pluckSeq: (seq: Array<number>, interval: number, delay?: number) => void
}

interface Props {

}

const StringSvgComp = (props: Props, ref: ForwardedRef<StringSvgType>) => {
  const stringRefs = useRef([
    useRef<StringPathType>(null), useRef(null),
    useRef(null), useRef(null),
    useRef(null), useRef(null)
  ])

  const strings = stringRefs.current.map((val, ind) => {
    return <StringPath key={ind} ind={ind} ref={val} />
  })

  const timeoutRef = useRef<Array<NodeJS.Timeout>>([])

  const pluck = (ind: number, delay: number) => {
    const timeouts = timeoutRef.current
    return setTimeout(() => {
      const string = stringRefs.current[ind].current
      if (!string) return;
      string.click()
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
    pluck: pluck,
    pluckSeq: pluckSeq
  }))

  return (
    <svg
      className={styles.stringSvg}
      viewBox='0 0 100 100'
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio='none'
    >
      {strings}
    </svg>
  )
}

export const StringSvg = forwardRef<StringSvgType, Props>(StringSvgComp)