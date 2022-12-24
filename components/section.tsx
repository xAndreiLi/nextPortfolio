import styles from '../styles/Home.module.scss'
import { GetStaticProps, NextPage } from 'next'
import { JSXElementConstructor, useRef } from 'react'


interface props {
    children: any
}

export const Section: NextPage<props> = (props) => {
    const {children} = props

    return (
        <div className={styles.section}>
          <div className={styles.content}>
            {children}
          </div>
          <div className={styles.fret}/>
        </div>
    )
}