import { GetStaticProps, NextPage } from 'next'
import { useRef, useEffect, useState } from 'react'
import { homeContainer, block, introText, blocks } from '../styles/home.css'
import { greatVibes, spaceGrotesk, dancingScript, inter } from '../pages/_app'
import { animate, easeInOut, easeOut, motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { Header } from './header'

export const Home: NextPage = ({ }) => {
  const { scrollY } = useScroll()
  const [isIntro, setIsIntro] = useState(true)

  const opacityIntro = useMotionValue(1)
  const opacityScroll = useTransform(opacityIntro, value => 1 - value)
  const slideIntro = useTransform(opacityIntro, value => value*-25)
  const slideScroll = useTransform(opacityScroll, value => value*-25)
  const fadeDuration = .6
  useMotionValueEvent(scrollY, 'change', (latestValue) => {
    if (latestValue == 0 && !isIntro) {
      animate(opacityIntro, 1, { ease: easeInOut, duration: fadeDuration })
      setIsIntro(true)
    } else if (latestValue == 0) return;
    else if (isIntro) {
      setIsIntro(false)
      animate(opacityIntro, 0, { ease: easeInOut, duration: fadeDuration })
    }
  })

  return (
    <div className={homeContainer}>
      <Header isIntro={isIntro} scrollY={scrollY} />
      <div className={block}>
        <motion.p className={introText} style={{
          marginTop: "30vh", opacity: opacityIntro,
          y: slideIntro
        }}>
          Hi,</motion.p>
        <motion.p className={introText} style={{
          marginBottom: "10vh", opacity: opacityIntro,
          y: slideIntro
        }}>
          {"I'm Andrei"}</motion.p>
        <motion.p className={introText} style={{
          opacity: opacityScroll, y: slideScroll
        }}>
          Exploring</motion.p>
        <motion.p className={introText} style={{
          opacity: opacityScroll, y: slideScroll
        }}>
          the space where</motion.p>
      </div>
      <div className={blocks.art} />

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