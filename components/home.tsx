import { GetStaticProps, NextPage } from 'next'
import { useRef, useEffect, useState } from 'react'
import { homeContainer, block, introText, blocks } from '../styles/home.css'
import { greatVibes, spaceGrotesk, dancingScript, inter } from '../pages/_app'
import { animate, easeIn, easeInOut, easeOut, motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { Header } from './header'

export const Home: NextPage = ({ }) => {
  const { scrollY } = useScroll()
  const [isIntro, setIsIntro] = useState(true)

  const opacityIntro = useMotionValue(1)
  const opacityScroll = useMotionValue(0)
  const slideIntro = useTransform(opacityIntro, value => value*-25)
  const slideScroll = useTransform(opacityScroll, value => value*-25)
  const fadeDuration = .3
  useMotionValueEvent(scrollY, 'change', (latestValue) => {
    if (latestValue == 0 && !isIntro) {
      animate(opacityIntro, 1, { delay: .6, ease: easeIn, duration: fadeDuration })
      animate(opacityScroll, 0, { delay: 0, ease: easeIn, duration: fadeDuration })
      setIsIntro(true)
    } else if (latestValue == 0) return;
    else if (isIntro) {
      setIsIntro(false)
      animate(opacityIntro, 0, { ease: easeIn, duration: fadeDuration })
      animate(opacityScroll, 1, { delay: .5, ease: easeIn, duration: fadeDuration })
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