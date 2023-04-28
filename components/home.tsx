import { GetStaticProps, NextPage } from 'next'
import { useRef, useEffect } from 'react'

import styles from '../styles/Home.module.scss'
import { StringSvg, StringSvgType } from './stringSvg'
import { greatVibes, spaceGrotesk, dancingScript, inter } from '../pages/_app'

export const Home: NextPage = ({ }) => {
  const stringSvgRef = useRef<StringSvgType>(null)

  if (stringSvgRef.current) {
    const svgBox = stringSvgRef.current.getBBox()
    console.log(svgBox)
  }

  let winWidth = 1920, winHeight = 1080
  if (typeof window !== 'undefined') {
    winWidth = window.innerWidth
    winHeight = window.innerHeight
  }

  const stringTop = (Number(styles.stringTop) + Number(styles.containerHeight) / 2) * winHeight / 100
  const stringHeight = Number(styles.stringHeight) * winHeight / 100
  const rectHeight = stringHeight / 6
  const midpoint = rectHeight / 2
  const boundaries = [stringTop]
  for (let i = 1; i <= 6; i++) {
    boundaries.push(i * rectHeight + stringTop)
  }

  console.log(boundaries)

  const stringRects = []
  for (let i = 0; i < 6; i++) {
    const stringRect = (<div key={i}
      onMouseMove={(event) => {
        if (!stringSvgRef.current) return;
        const ind = i

        const xPos = event.clientX
        const yPos = event.clientY
        const xSvg = xPos * 100 / winWidth
        const ySvg = (yPos - stringTop) * 100 / stringHeight

        const offsetY = event.nativeEvent.offsetY
        let direction = 0 // none
        //Mouse Moving up & Below the midway point, don't drag
        if (event.movementY < 0 && offsetY > midpoint) return;
        else direction = -1 // up
        //Mouse Moving down & Above the midway point, don't drag
        if (event.movementY > 0 && offsetY < midpoint) return;
        else direction = 1 // down
        if (direction == 0) return;
        stringSvgRef.current.drag(ind, xSvg, ySvg, direction)
      }} onMouseOut={(event) => {
        if (!stringSvgRef.current) return;
        const xPos = event.clientX
        const xSvg = xPos * 100 / winWidth
        const ind = i
        stringSvgRef.current.pluck(ind, 0, xSvg, event.movementY > 0 ? 1 : -1)

        // const ySvg = (yPos - stringTop) * 100 / stringHeight
        // 
        // let direction = 0
        // if (event.movementY > 0) { // Going Down
        //   direction = 1
        //   for (let i = 0; i < boundaries.length; i++) {
        //     if (yPos > boundaries[i]) {
        //       ind = i
        //     } else break;
        //   }
        //   if (ind == null) return;
        //   stringSvgRef.current.pluck(ind+1, 0, xSvg, 1)
        // } else { // Going Up
        //   for (let i = boundaries.length - 2; i >= 0; i--) {
        //     if (yPos < boundaries[i]) {
        //       ind = i
        //     } else break;
        //   }
        //   if (ind == null) return;
        //   
        // }
        
      }} />)
    stringRects.push(stringRect)
  }

  return (
    <div className={styles.main + ' ' + inter.className}>
      <div className={styles.stringContainer}>
        <StringSvg ref={stringSvgRef} />
        {stringRects}
      </div>
      <div className={styles.about}>
        <p>
          li, andrei. Creating unique designs and projects.
          Enthralled by innovation, music, and art.
          Inspired to do what has not been done.
          Previously at Boeing, now graduating and seeking employment.
        </p>
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