import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import { GetStaticProps, NextPage } from 'next'
import { useRef, useState, useEffect } from 'react'
import { StringButton } from '../components/stringButton'
import { Section } from '../components/section'
import { StringSvg } from '../components/stringSvg'


export const Home: NextPage = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const holeRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const main = mainRef.current
    const scroll = scrollRef.current
    if (!scroll || !main) return;
    const onScroll = (e) => {
      e.preventDefault()
      if (e.deltaY == 0) return;
      scroll.scrollTo({
        left: scroll.scrollLeft + e.deltaY * .6,
      })
    }
    main.addEventListener("wheel", onScroll)
    return () => main.removeEventListener("wheel", onScroll);
  })

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
          <div 
            className={styles.soundHole}
          >
            <input type="checkbox" ref={holeRef}
              onClick={()=>{
                setTimeout(()=>{holeRef.current.checked = false}, 150)
              }}
            />
          </div>
        </div>
        <Section buttons={(
          <div className={styles.fadeIn}>
            <a>home</a>
            <a>projects</a>
            <a>experience</a>
            <a href='https://github.com/xAndreiLi'>about</a>
            <a href='https://www.linkedin.com/in/andrei-li-67870b201/'>contact</a>
            <a href='mailto: liandrei2000@gmail.com'>more</a>
          </div>
        )}>
          <h1 className={styles.scrollIn}>Andrei Li</h1>
          <div className={styles.fadeIn}>
            <p>Designer | Researcher | Musician</p>
          </div>
        </Section>
        <Section>
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