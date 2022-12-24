import styles from '../styles/StringSvg.module.scss'
import { GetStaticProps, NextPage } from 'next'
import { useRef, useEffect } from 'react'
import { StringButton } from './stringButton'


export const StringSvg: NextPage = () => {
    const stringRef = []
    for (let i = 0; i < 6; i++) {
        const ref = useRef<SVGAnimateElement>(null)
        stringRef.push(ref)
    }
    const strings = stringRef.map((val, ind) => {
        return <StringButton key={ind} ind={ind} waveRef={val}/>
    })

    const pluck = (ind: number, delay: number) => {
        setTimeout(() => {stringRef[ind].current.beginElement()}, delay)
    }
    const pluckSeq = (seq:Array<number>, interval:Array<number>) => {
        let time = 0
        seq.forEach((i, ind) => {
        pluck(i, time)
        time += interval[ind]
        });
    }

    useEffect(() => {
        pluckSeq([5,4,3,2,1,0], [250,250,250,250,250,250])
    })

    return (
        <svg
        className={styles.stringSvg}
        viewBox='0 0 100 100'
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio='none'
      >
        {strings}
      </svg>
    )
}