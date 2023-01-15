import Head from 'next/head'
import { GetStaticProps, NextPage } from 'next'
import {
  useRef, useState, useEffect, useLayoutEffect,
  createContext,
  WheelEventHandler, WheelEvent, RefObject,
} from 'react'

import styles from '../styles/Home.module.scss'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { setScroll, selectScroll } from '../app/scrollSlice'
import { setViewWidth, setViewHeight, selectView } from '../app/viewSlice'

import { Section } from './section'
import { StringSvgType, StringSvg } from './stringSvg'
import { sectionData } from '../data/sections'
import { SoundHole } from './soundHole'
import { IntroAnim } from './introAnim'

interface refDataType {
  mainRef?: RefObject<HTMLDivElement>
  scrollRef?: RefObject<HTMLDivElement>
  holeRef?: RefObject<HTMLInputElement>
  stringRef?: RefObject<StringSvgType>
}

export const HomeContext = createContext<refDataType>({})

export const Home: NextPage = () => {
  const mainRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const holeRef = useRef<HTMLInputElement>(null)
  const stringRef = useRef<StringSvgType>(null)

  const [visible, setVisible] = useState(0)

  const refData: refDataType = {
    mainRef, scrollRef,
    holeRef, stringRef
  }

  const scroll = useAppSelector(selectScroll)
  const view = useAppSelector(selectView)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const onResize = () => {
      dispatch(setViewWidth(window.innerWidth))
      dispatch(setViewHeight(window.innerHeight))
    }
    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  })

  useEffect(() => {
    const main = mainRef.current
    if (!main) return;
    const preventVertical =
      (e: globalThis.WheelEvent): any => { e.preventDefault() }
    main.addEventListener("wheel", preventVertical)
    return () => main.removeEventListener('wheel', preventVertical)
  })

  return (
    <div className={styles.main} ref={mainRef}>
      <Head>
        <title>Andrei Li: Portfolio</title>
      </Head>
      <IntroAnim/>
      <HomeContext.Provider value={refData}>
        <StringSvg
          ref={stringRef}
        />
        <div className={styles.about}>
          <span>About</span>
        </div>
        <div className={styles.work}>
          <span className={styles.workSpan}>Work</span>
          <div className={styles.workContainer}>

          </div>
        </div>
        <div className={styles.blog}>
          <span>Blog</span>
        </div>
      </HomeContext.Provider>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {

    }
  }
}

export default Home 