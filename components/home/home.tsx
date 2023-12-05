import { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import { useRef, useEffect, useState, Dispatch, SetStateAction } from 'react'
import { Canvas } from '@react-three/fiber'
import * as styles from '../../styles/utils.css'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useSpring,
  cubicBezier,
  circOut,
  circIn,
  circInOut,
  easeInOut,
  useMotionTemplate,
  Variants,
} from 'framer-motion'

export const Home: NextPage = ({ }) => {
  const { scrollY } = useScroll()

  const springOptions = { mass: 1.5, damping: 100, stiffness: 500 }

  const headerRange = { start: 0, end: 350 }
  const bodyRange = { start: 1650, end: 2000 }

  const introY = useSpring(useTransform(scrollY, [headerRange.start, headerRange.end], [0, 40]), springOptions)
  const headerY = useSpring(useTransform(scrollY, [headerRange.start, headerRange.end], [40, 15]), springOptions)
  const bodyY = useSpring(useTransform(scrollY, [bodyRange.start, bodyRange.end], [0, -88]), springOptions)
  const projectX = useSpring(
    useTransform(scrollY, [1972, 2008, 3000], [255, 0, 0]),
    springOptions
  )

  const bodyText = [
    "Passionate and driven dev",
    "eloper with a background in ",
    "web design and machine learning. "
  ]
  const bodyState: Array<string> = []
  const setBody: Array<Dispatch<SetStateAction<string>>> = []
  for (let i = 0; i < bodyText.length; i++) {
    const [state, setState] = useState("hidden")
    bodyState.push(state)
    setBody.push(setState)
  }

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > bodyRange.end) return;
    let index = 0
    for (let i = headerRange.end + 50; i < bodyRange.start; i += (bodyRange.start - (headerRange.end + 50)) / bodyText.length) {
      console.log(latest)
      if (latest <= i) {
        if (bodyState[index] == "visible") setBody[index]("hidden")
      } else {
        if (bodyState[index] == "hidden") setBody[index]("visible")
      }

      index++
    }
  })

  const phraseVariants: Variants = {
    hidden: { 
      opacity: 1,
      transition: {
        delay: 0.1,
        staggerChildren: 0.01,
        staggerDirection: -1,
      }, 
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.1,
        staggerChildren: 0.01,
      },
    }
  }

  const letter: Variants = {
    hidden: { opacity: .3 },
    visible: { opacity: 1 }
  }


  const project = (
    <div className={styles.projectBox}>
      <Image
        src='/InTune_Logo_Icon.png'
        alt='InTune Logo'
        width={225}
        height={269}
        style={{
          position: 'absolute',
          top: '-15%',
          left: '-10%',
          transform: 'scale(.3)',
        }}
      />
      <span className={styles.text}>InTune</span>
    </div>
  )

  return (
    <div>
      <div className={styles.scrollBox} />
      <div className={styles.mainView}>
        <motion.div
          className={styles.header}
          style={{
            height: useMotionTemplate`${headerY}vh`,
          }}
        >
          <div className={styles.button}>
            <span>andrei.li</span>
          </div>
          <motion.div className={styles.intro}
            style={{
              y: useMotionTemplate`${introY}vh`
            }}
          >
            <span className={styles.introText}>Hi! My name</span>
            <Image
              src={'/treeCrop.png'}
              alt='Intro Picture'
              width={175}
              height={175}
              style={{

              }}
            />
            <span className={styles.introText} style={{
              textAlign: 'left'
            }}>is Andrei Li</span>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.body}
          style={{
            y: useMotionTemplate`${bodyY}vh`,
          }}
        >
          <div style={{ height: '10vh' }} />
          <p className={styles.text} style={{ height: '40vh', width: '40vw' }}>
            {bodyText.map((phrase, index) => {
              return (
                <motion.span key={"phrase" + index} variants={phraseVariants} initial="hidden" animate={bodyState[index]}>
                  {phrase.split("").map((char, index) => {
                    return (
                      <motion.span key={"char" + index} variants={letter}>
                        {char}
                      </motion.span>
                    )
                  })}
                </motion.span>
              )
            })}
          </p>
          <span className={styles.heading}>PROJECTS</span>
          <motion.div
            className={styles.projectContainer}
            style={{ x: useMotionTemplate`${projectX}vh` }}
          >
            {project}
            {project}
            {project}
            {project}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  }
}

export default Home
