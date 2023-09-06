import { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import { useRef, useEffect, useState } from 'react'
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
} from 'framer-motion'

export const Home: NextPage = ({}) => {
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    console.log('Page scroll: ', latest)
  })

  const springOptions = { mass: 1.5, damping: 100, stiffness: 500 }

  const headerY = useSpring(useTransform(scrollY, [0, 350], [40, 15]), springOptions)
  const bodyY = useSpring(useTransform(scrollY, [700, 1750], [0, -88]), springOptions)
  const projectX = useSpring(
    useTransform(scrollY, [1972, 2008, 3000], [255, 0, 0]),
    springOptions
  )

  const project = (
    <div className={styles.projectBox}>
      <Image
        src='/../public/InTune_Logo_Icon.png'
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
        </motion.div>

        <motion.div
          className={styles.body}
          style={{
            y: useMotionTemplate`${bodyY}vh`,
          }}
        >
          <div style={{ height: '10vh' }} />
          <span className={styles.text} style={{ height: '40vh', width: '40vw' }}>
            Passionate and driven developer with a background in web design and machine
            learning.
          </span>
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
