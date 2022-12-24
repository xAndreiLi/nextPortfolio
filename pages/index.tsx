import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import { GetStaticProps, NextPage } from 'next'
import { useRef, useState, useEffect } from 'react'
import { StringButton } from '../components/stringButton'
import { Section } from '../components/section'


export const Home: NextPage = () => { 
  const stringRef = []
  for (let i = 0; i < 6; i++) {
    const ref = useRef<SVGAnimateElement>(null)
    stringRef.push(ref)
  }
  const strings = stringRef.map((val, ind) => {
    return <StringButton key={ind} ind={ind} waveRef={val}/>
  })

  const pluck = (ind: number, delay: number) => {
    setTimeout(() => {stringRef[ind].current.beginElement()}, delay)
  }
  const pluckSeq = (seq:Array<number>, interval:Array<number>) => {
    let time = 0
    seq.forEach((i, ind) => {
      pluck(i, time)
      time += interval[ind]
    });
  }

  const [letters, setLetters] = useState("");
  const introText = letters.split("").map((c, ind) => {
    return <span key={ind} className="fadeIn">{c}</span>
  })

  useEffect(() => {
    pluckSeq([5,4,3,2,1,0], [250,250,250,250,250,250])
  }, [strings])

  return (
    <div className={styles.main}>
      <Head>
        <title>Andrei Li: Portfolio</title>
        <link href="https://fonts.googleapis.com/css2?family=Merriweather&display=swap" rel="stylesheet"></link>
      </Head>
      <div 
        className={styles.soundHole}
        style={{
          boxShadow: "0 0 150px grey",
          backgroundImage: "radial-gradient(black 35%, grey 140%)"
        }}
      />
      <svg
        className={styles.stringSvg}
        viewBox='0 0 100 100'
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio='none'
      >
        {strings}
      </svg>
      <div className={styles.scrollBox}>
        <div className={styles.startSection}/>
        <Section>
          <h1 className={styles.scrollIn}>Andrei Li</h1>
          <div className={styles.fadeIn}>
            <p>Developer - Musician - Designer</p>
            <a href='https://github.com/xAndreiLi'>github</a>
            <a href='https://www.linkedin.com/in/andrei-li-67870b201/'>linkedin</a>
            <a href='mailto: liandrei2000@gmail.com'>email</a>
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