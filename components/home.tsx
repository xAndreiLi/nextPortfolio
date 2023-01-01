import Head from 'next/head'
import { GetStaticProps, NextPage } from 'next'
import { useRef, useState, useEffect, MutableRefObject, useLayoutEffect } from 'react'

import styles from '../styles/Home.module.scss'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { setScroll, selectScroll } from '../app/scrollSlice'
import { setViewWidth, setViewHeight, selectView } from '../app/viewSlice'

import { Section } from './section'
import { StringSvg, StringSvgType } from './stringSvg'

export interface Button {
  name: string;
  func: Function;
  param: unknown;
}

export const Home: NextPage = () => {
  const mainRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const holeRef = useRef<HTMLInputElement>(null)
  const stringRef = useRef<StringSvgType>(null)
  const wheelRef = useRef(0)

  const scroll = useAppSelector(selectScroll)
  const view = useAppSelector(selectView)
  const dispatch = useAppDispatch()

  const onResize = () => {
    console.log(window.innerHeight)
    dispatch(setViewWidth(window.innerWidth))
    dispatch(setViewHeight(window.innerHeight))
  }

  const onScroll = (e: WheelEvent) => {
    const scrollDiv = scrollRef.current
    e.preventDefault()
    if (e.deltaY == 0) return;
    const maxSpeed = 50
    let scrollDist = e.deltaY
    if (scrollDist > maxSpeed) scrollDist = maxSpeed
    if (scrollDist < -maxSpeed) scrollDist = -maxSpeed
    let scrollTo = scrollDiv.scrollLeft + scrollDist * .2
    if (scrollTo < 0) scrollTo = 0;
    scrollDiv.scrollTo({
      left: scrollTo
    })
    wheelRef.current = scrollTo
    dispatch(setScroll(scrollTo))
  }

  useEffect(() => {
    const main = mainRef.current
    if(!main) return;
    main.addEventListener("wheel", onScroll)
    return () => {
      main.removeEventListener('wheel', onScroll)
    }
  }, [])

  useLayoutEffect(() => {
    console.log(window.innerHeight)
    onResize()
    console.log(view)
  }, [])

  useLayoutEffect(() => {
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  const navigate = (ind) => {
    const vw = view.width / 100
    const vh = view.height / 100
    let offset
    ind ? offset = vh * 40 : offset = 0
    const dist = (vw * 90 * ind) + offset
    wheelRef.current = dist
    scrollRef.current.scrollTo({
      left: dist,
      behavior: 'smooth'
    })
  }

  const display = (content) => {

  }

  const sectionHeaders = ["Projects", "Experience", "About", "Contact"]
  const sectionButtons = [
    ['intune', 'mashsong', 'typetrainer', 'ledcontrol'],
    ['asu', 'boeing', 'data viz', 'nlp'],
    ['who i am', 'where im from', 'passions', 'dreams'],
    ['github', 'linkedin', 'email', 'leave a message']
  ]
  const sectionFunctions = [
    [display, display, display, display],
    [display, display, display, display],
    [display, display, display, display],
    [display, display, display, display],
  ]
  const sectionParams = [
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
  ]

  const sections = sectionHeaders.map((val, ind) => {
    const buttons = []
    const buttonNames = ['home', ...sectionButtons[ind], 'next']
    const buttonFunctions = [navigate, ...sectionFunctions[ind], navigate]
    const buttonParams = [0, ...sectionParams[ind], ind + 2]
    buttonNames.forEach((value, index) => {
      const button: Button = {
        name: value,
        func: buttonFunctions[index],
        param: buttonParams[index],
      }
      buttons.push(button)
    })

    return (
      <Section key={ind}
        ind={ind + 1} wheelRef={wheelRef}
        mainRef={mainRef} 
        stringRef={stringRef}
        buttons={buttons}
      >
        <h1>{val}</h1>
      </Section>
    )
  })


  const homeHeaders = ['home', 'projects', 'experience',
    'about', 'contact', 'blog'];

  const homeButtons = []
  homeHeaders.forEach((val, ind) => {
    const button: Button = {
      name: val,
      func: navigate,
      param: ind,
    }
    homeButtons.push(button)
  })


  return (
    <div className={styles.main} ref={mainRef}>
      <Head>
        <title>Andrei Li: Portfolio</title>
      </Head>
      <StringSvg
        ref={stringRef}
        mainRef={mainRef}
        scrollRef={scrollRef}
        holeRef={holeRef}
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
        <Section ind={0}
          wheelRef={wheelRef}
          stringRef={stringRef}
          mainRef={mainRef}
          buttons={homeButtons}
        >
          <h1 className={styles.scrollIn}>Andrei Li</h1>
          <div className={styles.fadeIn}>
            <p>Designer | Researcher | Musician</p>
          </div>
        </Section>
        {sections}
      </div>
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