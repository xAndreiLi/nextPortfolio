import { GetStaticProps, NextPage } from 'next'
import { useRef, useEffect } from 'react'

import styles from '../styles/Home.module.scss'
import { StringSvg, StringSvgType } from './stringSvg'
import TextWrap from './textWrap'
import { greatVibes, spaceGrotesk, dancingScript, inter } from '../pages/_app'

export const Home: NextPage = ({ }) => {
  const stringSvgRef = useRef<StringSvgType>(null)
  let dragging = false

  if(typeof window !== 'undefined'){
    window.addEventListener("mousedown", () => { dragging = true })
    window.addEventListener("mouseup", () => { dragging = false })
  }

  const stringRects = []
  for (let i = 0; i < 6; i++) {
    const stringRect = (<div key={i}
      onMouseMove={(event) => {
        const stringSvg = stringSvgRef.current
        const boundRect = stringSvg?.getBoundingClientRect()
        if (!(stringSvg && boundRect && dragging)) return;
        const xPos = event.clientX, yPos = event.clientY
        const xSvg = xPos * 100 / window.innerWidth
        const ySvg = (yPos - boundRect.y) * 100 / boundRect.height
        stringSvg.drag(i, xSvg, ySvg)
      }} onMouseOut={(event) => {
        if (!(stringSvgRef.current && dragging)) return;
        const xPos = event.clientX
        const xSvg = xPos * 100 / window.innerWidth
        const direction = event.movementY > 0 ? 1 : -1
        stringSvgRef.current.pluck(i, 0, xSvg, direction)
      }}onMouseUp={(event) => {
        if (!(stringSvgRef.current && dragging)) return;
        const xPos = event.clientX
        const xSvg = xPos * 100 / window.innerWidth
        const direction = event.movementY > 0 ? 1 : -1
        stringSvgRef.current.pluck(i, 0, xSvg, direction)
      }}/>)
    stringRects.push(stringRect)
  }

  return (
    <div className={styles.main + ' ' + inter.className}>

      <div className={styles.about}>

        <div className={styles.aboutText}>
          <p>
            {"//"} Welcome!
          </p>
          <span data-value="key">let </span> me
          <span data-value="syntax"> : </span> <a>Andrei</a> <span data-value="syntax"> = </span>
        </div>

      </div>
      <div className={styles.brackets}>
        <span>{"{"}</span>
        <div className={styles.stringContainer}>
          <StringSvg ref={stringSvgRef} />
          {stringRects}
        </div>
        <span>{"}"}</span>
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