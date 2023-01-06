import { GetStaticProps, NextPage } from 'next'
import {
  MutableRefObject, useContext,
  useEffect, useRef, useState
} from 'react'

import styles from '../styles/Section.module.scss'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { setScroll, selectScroll } from '../app/scrollSlice'
import { setViewWidth, setViewHeight, selectView } from '../app/viewSlice'
import { StringSvgType } from './stringSvg'
import type { Button } from '../data/sections'
import { HomeContext } from './home'

interface props {
  children?: any
  ind: number
  name?: string
  buttons?: Array<Button>
  visible: number
  variant?: string
}

export const Section: NextPage<props> = (props) => {
  const { children, ind, name, buttons, visible, variant } = props
  const { stringRef, scrollRef, mainRef } = useContext(HomeContext)

  const buttonRef = useRef<HTMLDivElement>(null)

  const view = useAppSelector(selectView)
  const scroll = useAppSelector(selectScroll)
  const dispatch = useAppDispatch()

  let btnClass = ''
  if (variant == 'intro') {
    btnClass = styles.introSlide
  }

  // Imperative calls to StringSvg animations
  const onHover = (ind, slide) => {
    const span = spanRefs[ind].current
    stringRef.current.stringRefs[ind].current.hover()
    span.style.transition = '150ms linear'
    spanRefs[ind].current.style.transform = `
      translate(${slide}px, 1vh)`
  }
  const onLeave = (ind, slide) => {
    const span = spanRefs[ind].current
    stringRef.current.stringRefs[ind].current.unhover()
    span.style.transition = transValues[ind] + 'ms linear'
    spanRefs[ind].current.style.transform = `
      translate(${slide}px, 0vh)`
  }
  const onClick = (ind, slide) => {
    const span = spanRefs[ind].current
    stringRef.current.stringRefs[ind].current.click()
    span.style.transition = transValues[ind] + 'ms linear'
    span.style.transform = `
      translate(${slide}px, 0vh)`
  }

  useEffect(() => {
    if (ind) return;
    buttonRef.current.className = styles.introSlide
  }, [mainRef])


  const spanRefs: Array<MutableRefObject<HTMLSpanElement>> = []
  const transValues = [200, 150, 100, 100, 150, 200]

  // Button JSX
  const buttonElems = buttons.map((button, index) => {
    const spanRef = useRef<HTMLSpanElement>(null)
    spanRefs.push(spanRef)

    const vw = view.width / 100
    const vh = view.height / 100
    let offset = (30 * vh) + (90 * vw * ind)

    let slide = scroll - offset
    slide < 0 ? slide = 0 : slide = slide
    let disp = 'none'

    return (
      <div key={index} style={{
        // display: disp
      }}
        onMouseEnter={() => onHover(index, slide)}
        onMouseLeave={() => onLeave(index, slide)}
        onMouseDown={() => {
          onClick(index, slide)
          //button.func(button.param)
        }}
      >
        <span ref={spanRef} style={{
          transition: `${transValues[index]}ms linear`,
          transform: `translateX(${slide}px)`
        }}
        >{button.name}</span>
      </div>
    )
  })

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <h1>{name}</h1>
        {children}
      </div>
      <div className={styles.fret}>
        <div ref={buttonRef}>
          {buttonElems}
        </div>
      </div>
    </div>
  )
}