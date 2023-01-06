import { GetStaticProps, NextPage } from 'next'
import { useRef, useEffect, MutableRefObject, 
  useImperativeHandle, forwardRef, useState,
  useContext
} from 'react'

import styles from '../styles/StringSvg.module.scss'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { setScroll, selectScroll } from '../app/scrollSlice'
import { setViewWidth, setViewHeight, selectView } from '../app/viewSlice'

import { StringPath, StringPathType } from './stringPath'
import { HomeContext } from './home'

export interface StringSvgType {
  stringRefs: MutableRefObject<StringPathType>[]
}

interface Props {

}

export const StringSvg = forwardRef<StringSvgType, Props>((props, ref) => {
  const { mainRef, scrollRef, holeRef } = useContext(HomeContext)

  const stringRefs = useRef([
    useRef(null), useRef(null),
    useRef(null), useRef(null),
    useRef(null), useRef(null)
  ])

  const strings = stringRefs.current.map((val, ind) => {
    return <StringPath key={ind} ind={ind} ref={val} />
  })

  let timeouts = useRef([]).current

  const pluck = (ind: number, delay: number) => {
    return setTimeout(() => {
      const string = stringRefs.current[ind].current
      if (!string) return;
      string.click()
      holeRef.current.click()
      timeouts.shift()
    }, delay)
  }
  const pluckSeq = (seq: Array<number>, interval: number, delay?: number) => {
    let time = 0
    if (delay) time = delay
    seq.forEach((i) => {
      timeouts.push(pluck(i, time))
      time += interval
    });
  }

  const onScroll = (e: WheelEvent) => {
    if ((e.deltaY == 0) || (timeouts.length)) return;

    pluckSeq([0, 1, 2, 3, 4, 5, 4, 3, 2], 400)
    let currScroll = scrollRef.current.scrollLeft
    let timer = setInterval(() => {
      if (scrollRef.current.scrollLeft == currScroll) {
        clearInterval(timer)
        timer = null
        timeouts.forEach((t) => {
          clearTimeout(t)
        })
        timeouts = []
      }
      currScroll = scrollRef.current.scrollLeft;
    }, 500)
  }

  useEffect(() => {
    if (!mainRef.current || !holeRef.current) return;
    pluckSeq([0, 1, 2, 3, 4, 5], 250, 2000)
    mainRef.current.addEventListener("wheel", onScroll)
    return (() => {
      mainRef.current.removeEventListener("wheel", onScroll)
    })
  }, [mainRef])

  useImperativeHandle(ref, () => ({
    get stringRefs() {
      return stringRefs.current
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
})