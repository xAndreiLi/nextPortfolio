import { GetStaticProps, NextPage } from 'next'
import {
  MutableRefObject, RefObject, useCallback, useContext,
  useEffect, useRef, useState
} from 'react'

import styles from '../styles/Section.module.scss'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { setScroll, selectScroll } from '../app/scrollSlice'
import { setViewWidth, setViewHeight, selectView } from '../app/viewSlice'
import { StringSvgType } from './stringSvg'
import type { Button } from '../data/sections'
import { HomeContext } from './home'

import { StringButton } from './stringButton'

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

  const view = useAppSelector(selectView)
  const scroll = useAppSelector(selectScroll)
  const dispatch = useAppDispatch()

  let btnClass = ''
  if (variant == 'intro') {
    btnClass = styles.introSlide
  }

  // Button JSX
  const buttonElems = buttons?.map((button, index) => {
    return (
      <StringButton key={index}
        button={button}
        index={index}
      />
    )
  })

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <h1>{name}</h1>
        {children}
      </div>
      <div className={styles.fret}>
        <div className={btnClass}>
          {buttonElems}
        </div>
      </div>
    </div>
  )
}