import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import { GetStaticProps, NextPage } from 'next'
import { useRef, useState, useEffect } from 'react'
import { StringButton } from '../components/stringButton'
import { Section } from '../components/section'
import { StringSvg } from '../components/stringSvg'


export const Home: NextPage = () => {

  const mainRef = useRef(null);
  const scrollRef = useRef(null);
  useEffect(() => {
    const main = mainRef.current
    const scroll = scrollRef.current
    if (!scroll || !main) return;
    const onScroll = (e) => {
      if (e.deltaY == 0) return;
      e.preventDefault()
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
        <link href="https://fonts.googleapis.com/css2?family=Merriweather&display=swap" rel="stylesheet"></link>
      </Head>
      <StringSvg/>
      <div className={styles.scrollBox} ref={scrollRef}>
        <div className={styles.startSection}>
          <div 
            className={styles.soundHole}
            style={{
              boxShadow: "0 0 150px grey",
              backgroundImage: "radial-gradient(black 35%, grey 140%)"
            }}
          />
        </div>
        <Section buttons={(
          <div className={styles.fadeIn}>
            <a>home</a>
            <a>projects</a>
            <a>experience</a>
            <a href='https://github.com/xAndreiLi'>github</a>
            <a href='https://www.linkedin.com/in/andrei-li-67870b201/'>linkedin</a>
            <a href='mailto: liandrei2000@gmail.com'>email</a>
          </div>
        )}>
          <h1 className={styles.scrollIn}>Andrei Li</h1>
          <div className={styles.fadeIn}>
            <p>Developer - Musician - Designer</p>
          </div>
        </Section>
        <Section>
          <h1>Projects</h1>
        </Section>
        <Section>
          <h1>Experience</h1>
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

// <h1 className={styles.scrollIn}>Andrei Li</h1>
//             <div className={styles.fadeIn}>
//               <p>Developer - Musician - Designer</p>
//               <a href='https://github.com/xAndreiLi'>github</a>
//               <a href='https://www.linkedin.com/in/andrei-li-67870b201/'>linkedin</a>
//               <a href='mailto: liandrei2000@gmail.com'>email</a>
//             </div>