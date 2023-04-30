import { GetStaticProps, NextPage } from 'next'
import { useRef, useEffect } from 'react'

import styles from '../styles/Home.module.scss'
import { StringSvg, StringSvgType } from './stringSvg'
import { greatVibes, spaceGrotesk, dancingScript, inter } from '../pages/_app'

export const Home: NextPage = ({ }) => {
  const stringSvgRef = useRef<StringSvgType>(null)

  const stringRects = []
  for (let i = 0; i < 6; i++) {
    const stringRect = (<div key={i}
      onMouseMove={(event) => {
        const stringSvg = stringSvgRef.current
        const boundRect = stringSvg?.getBoundingClientRect()
        if (!(stringSvg && boundRect)) return;

        const rect = event.currentTarget

        const xPos = event.clientX, yPos = event.clientY
        const xSvg = xPos * 100 / window.innerWidth
        const ySvg = (yPos - boundRect.y) * 100 / boundRect.height

        const offsetY = event.nativeEvent.offsetY
        let direction = 0 // none
        //Mouse Moving up & Above the midway point, drag
        if (event.movementY < 0 && offsetY <= rect.clientHeight/2) direction = -1;
        //Mouse Moving down & Below the midway point, drag
        if (event.movementY > 0 && offsetY >= rect.clientHeight/2) direction = 1;
        if (direction == 0) return;
        stringSvg.drag(i, xSvg, ySvg)
      }} onMouseOut={(event) => {
        if (!stringSvgRef.current) return;
        const xPos = event.clientX
        const xSvg = xPos * 100 / window.innerWidth
        const direction = event.movementY > 0 ? 1 : -1
        stringSvgRef.current.pluck(i, 0, xSvg, direction)
      }} />)
    stringRects.push(stringRect)
  }

  return (
    <div className={styles.main + ' ' + inter.className}>
      
      <div className={styles.about}>
        <p>
          li, andrei. Creating unique designs and projects.
          Enthralled by innovation, music, and art.
          Inspired to do what has not been done.
          Previously at Boeing, now graduating and seeking employment.
        </p>
      </div>
      <div className={styles.stringContainer}>
        <StringSvg ref={stringSvgRef} />
        {stringRects}
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