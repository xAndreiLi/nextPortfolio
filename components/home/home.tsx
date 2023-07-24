import { GetStaticProps, NextPage } from 'next'
import { useRef, useEffect, useState } from 'react'
import * as styles from '../../styles/utils.css'
import { greatVibes, spaceGrotesk, dancingScript, inter } from '../../pages/_app'
import {
  animate,
  easeIn,
  easeInOut,
  easeOut,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion'
import { Header } from '../header'
import backImg from '../../public/portBG.png'

export const Home: NextPage = ({}) => {
  const { scrollYProgress } = useScroll()

  const backLayerY = useTransform(scrollYProgress, [0, 1], [0, 0.5])
  const midLayerY = useTransform(scrollYProgress, [0, 1], [0, 0.75])
  const frontLayerY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div className={styles.container}>
      <motion.div
        className='layer-back'
        style={{
          y: backLayerY,
          background: `url(${backImg.src}) no-repeat center center/cover`,
          height: '100%',
        }}
      ></motion.div>
      <motion.div className='layer-mid' style={{ y: midLayerY }}></motion.div>
      <motion.div className='layer-front' style={{ y: frontLayerY }}></motion.div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  }
}

export default Home
