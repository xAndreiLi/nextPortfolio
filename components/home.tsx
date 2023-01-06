import Head from 'next/head'
import { GetStaticProps, NextPage } from 'next'
import {
  useRef, useState, useEffect, useLayoutEffect,
  createContext,
} from 'react'

import styles from '../styles/Home.module.scss'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { setScroll, selectScroll } from '../app/scrollSlice'
import { setViewWidth, setViewHeight, selectView } from '../app/viewSlice'

import { Section } from './section'
import { StringSvg, StringSvgType } from './stringSvg'
import { sectionData } from '../data/sections'

export const HomeContext = createContext(null)

export const Home: NextPage = () => {
  const mainRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const holeRef = useRef<HTMLInputElement>(null)
  const stringRef = useRef<StringSvgType>(null)

  const [visible, setVisible] = useState(0)


  const refData = {
    mainRef: mainRef, scrollRef: scrollRef,
    holeRef: holeRef, stringRef: stringRef
  }

  const scroll = useAppSelector(selectScroll)
  const view = useAppSelector(selectView)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const mainDiv = mainRef.current
    const scrollDiv = scrollRef.current
    if (!mainDiv || !scrollDiv) return;

    const onScroll = (e: WheelEvent) => {
      e.preventDefault()
      if (e.deltaY == 0) return;
      let scrollTo = scrollDiv.scrollLeft + e.deltaY * .2
      if (scrollTo < 0) scrollTo = 0;
      scrollDiv.scrollTo({
        left: scrollTo,
      })

      const vw = view.width / 100
      const vh = view.height / 100
      const startWidth = 42*vh
      const secWidth = 90*vw

      const currSec = Math.trunc(Math.abs(
        ((scrollTo-startWidth) / secWidth)))
      if (visible != currSec) {
        setVisible(currSec)
      }

      console.log(currSec)

      dispatch(setScroll(scrollTo))

    }

    mainDiv.addEventListener("wheel", onScroll)
    return () => mainDiv.removeEventListener("wheel", onScroll)
  }, [])

  useLayoutEffect(() => {
    const onResize = () => {
      dispatch(setViewWidth(window.innerWidth))
      dispatch(setViewHeight(window.innerHeight))
    }
    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
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
    <div className={styles.main} ref={mainRef}>
      <Head>
        <title>Andrei Li: Portfolio</title>
      </Head>
      <HomeContext.Provider value={refData}>
        <StringSvg
          ref={stringRef}
        />
        <div className={styles.scrollBox} ref={scrollRef}>
          <div className={styles.startSection}>
            <div className={styles.soundHole}>
              <input type="checkbox" ref={holeRef}
                onClick={() => {
                  setTimeout(() => { holeRef.current.checked = false }, 150)
                }}
              />
            </div>
          </div>
          {sections}
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