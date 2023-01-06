import { GetStaticProps, NextPage } from 'next'
import {
  useRef, useEffect, MutableRefObject,
  useImperativeHandle, forwardRef, useState,
  useContext,
  RefObject,
  ForwardedRef
} from 'react'

import styles from '../styles/StringSvg.module.scss'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { setScroll, selectScroll } from '../app/scrollSlice'
import { setViewWidth, setViewHeight, selectView } from '../app/viewSlice'

import { StringPath, StringPathType } from './stringPath'
import { HomeContext } from './home'

export interface StringSvgType {
  stringRefs: RefObject<StringPathType>[] | undefined
}

interface Props {

}

const StringSvgComp = (props: Props, ref: ForwardedRef<StringSvgType>) => {
  const { mainRef, scrollRef, holeRef } = useContext(HomeContext)

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
      if (!string || !holeRef?.current) return;
      string.click()
      holeRef.current.click()
      timeouts.shift()
    }, delay)
  }
  const pluckSeq = (seq: Array<number>, interval: number, delay?: number) => {
    const timeouts = timeoutRef.current
    let time = 0
    if (delay) time = delay
    seq.forEach((i) => {
      timeouts.push(pluck(i, time))
      time += interval
    });
  }


  useEffect(() => {
    const main = mainRef?.current
    const hole = holeRef?.current
    if (!main || !hole) return;

    const onScroll = (e: WheelEvent) => {
      const scroll = scrollRef?.current
      const timeouts = timeoutRef.current
      if ((e.deltaY == 0) || timeouts.length || !scroll) return;
  
      pluckSeq([0, 1, 2, 3, 4, 5, 4, 3, 2], 400)
      let currScroll = scrollRef.current.scrollLeft
      let timer = setInterval(() => {
        if (scroll.scrollLeft == currScroll) {
          clearInterval(timer)
          timeouts.forEach((t) => {
            clearTimeout(t)
          })
          timeouts.length = 0
        }
        currScroll = scroll.scrollLeft;
      }, 200)
    }

    pluckSeq([0, 1, 2, 3, 4, 5], 250, 2000)
    main.addEventListener("wheel", onScroll)
    return (() => {
      main.removeEventListener("wheel", onScroll)
    })
  }, [mainRef])

  useImperativeHandle(ref, () => ({
    get stringRefs() {
      if (stringRefs.current) return stringRefs.current
    },
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