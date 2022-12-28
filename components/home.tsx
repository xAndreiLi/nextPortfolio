import Head from 'next/head'
import { GetStaticProps, NextPage } from 'next'
import { useRef, useState, useEffect } from 'react'

import styles from '../styles/Home.module.scss'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { setScroll, selectScroll } from '../app/scrollSlice'
import { setViewWidth, setViewHeight, selectView } from '../app/viewSlice'

import { Section } from './section'
import { StringSvg } from './stringSvg'


export const Home: NextPage = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const holeRef = useRef<HTMLInputElement>(null);

  const scroll = useAppSelector(selectScroll)
  const view = useAppSelector(selectView)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const mainDiv = mainRef.current
    const scrollDiv = scrollRef.current
    if (!scrollDiv || !mainDiv) return;

    dispatch(setViewWidth(window.innerWidth))
    dispatch(setViewHeight(window.innerHeight))

    const onScroll = (e: WheelEvent) => {
      e.preventDefault()
      if (e.deltaY == 0) return;
      let scrollTo = scrollDiv.scrollLeft + e.deltaY * .6
      if (scrollTo < 0) scrollTo = 0;
      dispatch(setScroll(scrollTo))
      scrollDiv.scrollTo({
        left: scrollTo,
      })
    }
    const onResize = () => {
      dispatch(setViewWidth(window.innerWidth))
      dispatch(setViewHeight(window.innerHeight))
    }
    mainDiv.addEventListener("wheel", onScroll)
    window.addEventListener("resize", onResize)
    return () => {
      mainDiv.removeEventListener("wheel", onScroll)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return (

    <div className={styles.main} ref={mainRef}>
      <Head>
        <title>Andrei Li: Portfolio</title>
      </Head>
      <StringSvg
        mainRef={mainRef}
        scrollRef={scrollRef}
        holeRef={holeRef}
      />
      <div className={styles.scrollBox} ref={scrollRef}>
        <div className={styles.startSection}>
          <div className={styles.soundHole}>
            <input type="checkbox" ref={holeRef}
              onClick={()=>{
                setTimeout(()=>{holeRef.current.checked = false}, 150)
              }}
            />
          </div>
        </div>
        <Section 
          buttons={['home', 'projects', 'experience', 'about', 'contact', 'blog']}
          ind={0}
          >
          <h1 className={styles.scrollIn}>Andrei Li</h1>
          <div className={styles.fadeIn}>
            <p>Designer | Researcher | Musician</p>
          </div>
        </Section>
        <Section 
          buttons={['home', 'intune', 'mashsong', 'typetrainer', 'ledcontrol', 'more']}
          ind={1}
          >
          <h1>Projects</h1>
        </Section>
        <Section>
          <h1>Experience</h1>
        </Section>
        <Section>
          <h1>About</h1>
        </Section>
        <Section>
          <h1>Contact</h1>
        </Section>
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