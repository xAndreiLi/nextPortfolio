import { GetStaticProps, NextPage } from 'next'
import styles from '../styles/Home.module.scss'

import HeadSvg from './headSvg'
import BodySvg from './bodySvg'
import TuningPegSvg from './tuningPegSvg'
import { StringSvg } from './stringSvg'


export const Home: NextPage = () => {

  const pegLabelsLeft = [
    "Work", "Experience", "Blog",
  ]
  const pegLabelsRight = [
    "Sort New", "Sectioned", "Sound On"
  ]

  const tuningPegsLeft = pegLabelsLeft.map((label, index) => {
    return (
      <TuningPegSvg key={index} label={label} index={index} style={{
        "transform":"translateX(30%)",
      }}/>
    )
  })

  const tuningPegsRight = pegLabelsRight.map((label, index) => {
    return (
      <TuningPegSvg key={index+3} label={label} flip={"true"} index={index+3} style={{
        "transform":"scaleX(-1) translateX(29%)",
      }}/>
    )
  })

  return (
    <div className={styles.main}>
      <div className={styles.guitar}>
        <div className={styles.headBoard}>
          <div className={styles.column}>{tuningPegsLeft}</div>
          <HeadSvg className={styles.headSvg}/>
          <div className={styles.column}>{tuningPegsRight}</div>
        </div>
        <div className={styles.fretBoard}>
          <StringSvg/>
          <div className={styles.soundHole}/>
        </div>
        <BodySvg className={styles.bodySvg}/>
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