import { GetStaticProps, NextPage } from 'next'
import { JSXElementConstructor, useRef } from 'react'

import styles from '../styles/Section.module.scss'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { setScroll, selectScroll } from '../app/scrollSlice'
import { setViewWidth, setViewHeight, selectView } from '../app/viewSlice'

interface props {
    children?: any
    buttons?: Array<string>
    ind?: number
}

export const Section: NextPage<props> = (props) => {
    const {children, buttons, ind} = props

    const scroll = useAppSelector(selectScroll)
    const view = useAppSelector(selectView)
    const dispatch = useAppDispatch()
    const vw = view.width / 100
    const offset = ind*vw*90

    let buttonElems = []
    if (buttons) {
        buttonElems = buttons.map((value, index) => {
            return(
                <a key={index}>{value}</a>
            )
        })
    }

    return (
        <div className={styles.section}>
          <div className={styles.content}>
            {children}
          </div>
          <div className={styles.fret}>
            <div style={{
              transition: '.5s ease-out',
              transform: `translateX(${scroll-offset}px)`
            }}>
                {buttonElems}
            </div>
          </div>
        </div>
    )
}