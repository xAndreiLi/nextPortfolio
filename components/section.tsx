import styles from '../styles/Section.module.scss'
import { GetStaticProps, NextPage } from 'next'
import { JSXElementConstructor, useRef } from 'react'


interface props {
    children?: any
    buttons?: any
}

export const Section: NextPage<props> = (props) => {
    const {children, buttons} = props

    return (
        <div className={styles.section}>
          <div className={styles.content}>
            {children}
          </div>
          <div className={styles.fret}>
            {buttons}
          </div>
        </div>
    )
}