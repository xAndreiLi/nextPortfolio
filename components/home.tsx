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

  const onScroll: WheelEventHandler<HTMLDivElement> = (e: WheelEvent<HTMLDivElement>) => {
    const mainDiv = mainRef.current
    const scrollDiv = scrollRef.current
    if (!mainDiv || !scrollDiv) return;

    if (e.deltaY == 0) return;
    let scrollTo = scrollDiv.scrollLeft + e.deltaY
    if (scrollTo < 0) scrollTo = 0;
    scrollDiv.scrollTo({
      left: scrollTo,
    })

    // const vw = view.width / 100
    // const vh = view.height / 100
    // const startWidth = 42 * vh
    // const secWidth = 90 * vw

    // const currSec = Math.trunc(Math.abs(
    //   ((scrollTo - startWidth) / secWidth)))
    // if (visible != currSec) {
    //   setVisible(currSec)
    // }

    // console.log(currSec)

    dispatch(setScroll(scrollTo))

  }

  const preventVertical =
    (e: globalThis.WheelEvent): any => { e.preventDefault() }

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
    main.addEventListener("wheel", preventVertical)
    return () => main.removeEventListener('wheel', preventVertical)
  })

  const sections = sectionData.map((section, ind) => {
    let variant = ''
    if (ind == 0) variant = 'intro';
    return (
      <Section key={ind} ind={ind}
        name={section.name}
        buttons={section.buttons}
        visible={visible}
        variant={variant}
      >
        {section.content}
      </Section>
    )
  })

  return (
    <div className={styles.main} ref={mainRef}
      onWheel={onScroll}
    >
      <Head>
        <title>Andrei Li: Portfolio</title>
      </Head>
      <HomeContext.Provider value={refData}>
        <StringSvg
          ref={stringRef}
        />
        <div className={styles.about}>
          <span>About</span>
        </div>
        <SoundHole/>
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