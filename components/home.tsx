import { GetStaticProps, NextPage } from 'next'
import { useRef, useEffect } from 'react'

import styles from '../styles/Home.module.scss'
import HeadSvg from './headSvg'
import BodySvg from './bodySvg'
import TuningPegSvg from './tuningPegSvg'
import { StringSvg, StringSvgType } from './stringSvg'


export const Home: NextPage = () => {

  const stringRef = useRef<StringSvgType>(null)

  useEffect(() => {
    stringRef.current?.pluckSeq([0, 1, 2, 3, 4, 5], 200)
  }, [stringRef])

  const pegLabelsLeft = [
    "Work", "Experience", "Blog",
  ]
  const pegLabelsRight = [
    "Sort New", "Sectioned", "Sound On"
  ]

  const tuningPegsLeft = pegLabelsLeft.map((label, index) => {
    return (
      <TuningPegSvg key={index} label={label} flip={"1"} index={index} style={{
        "transform": "translateX(30%)",
      }} />
    )
  })

  const tuningPegsRight = pegLabelsRight.map((label, index) => {
    return (
      <TuningPegSvg key={index + 3} label={label} flip={"-1"} index={index + 3} style={{
        "transform": "scaleX(-1) translateX(30%)",
      }} />
    )
  })

  return (
    <div className={styles.main}>
      <div className={styles.guitar}>
        <div className={styles.headBoard}>
          <div className={styles.column}>{tuningPegsLeft}</div>
          <HeadSvg className={styles.headSvg} />
          <div className={styles.column}>{tuningPegsRight}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.contentLeft}>
            <div className={styles.content}>
              <div className={styles.nameText}>InTune</div>
              <div className={styles.fret} />
              <div className={styles.dateText}>Aug 2022</div>
            </div>
            <div className={styles.content}>
              <div className={styles.fret} />
              <p className={styles.contentText}>
                Python package for splitting
                songs into stems and blending them together.
                Built with Spleeter and Soundboard.
              </p>
            </div>
          </div>
          <div className={styles.fretBoard}>
            <StringSvg ref={stringRef} />
            <div className={styles.soundHole} />
          </div>
          <div className={styles.contentRight}>
            <div className={styles.content}>
              <p className={styles.contentText}>
                Social Media App built on React Native for sharing music with friends.
              </p>
            </div>
            <div className={styles.content}>
              <div className={styles.nameText}>MashSong</div>
              <div className={styles.dateText}>Sep 2022</div>
            </div>
          </div>
        </div>
        <BodySvg className={styles.bodySvg} />
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