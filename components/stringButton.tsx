import styles from '../styles/Home.module.scss'
import { GetStaticProps, NextPage } from 'next'
import { useRef } from 'react'
import { text } from 'stream/consumers'

interface props {
    ind: number
    text: string
    waveDur: string
}

export const StringButton: NextPage<props> = (props) => {
    const { ind, text, waveDur } = props

    const waveOn = useRef(null)
    const returnAnim = useRef<SVGAnimateElement>(null)
    const spline = "0.5 0 0 0.5;"

    return (
        <div className={styles.row}>
            <p>{text}</p>
            <svg
                viewBox='0 0 100 100'
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio='none'
            >
                <path vectorEffect="non-scaling-stroke" d="
                    M 0,50 H 100">
                    <animate attributeName='d' dur="20ms"
                        values='
                            M 0,50 H 100;
                            M 0,50 C 1,50 50,60 100,50;
                            M 0,50 C 1,50 50,70 100,50;
                            M 0,50 C 1,50 50,80 100,50;'
                        calcMode="spline" fill='freeze'
                        keyTimes="0; 0.33; 0.66; 1"
                        begin={`string${ind}.mouseenter`}
                        end={`string${ind}.mouseleave; string${ind}.mousedown`}
                    />

                    <animate attributeName='d' dur="20ms" ref={returnAnim}
                        values='
                M 0,50 C 1,50 2,80 100,50;
                M 0,50 C 1,50 2,70 100,50;
                M 0,50 C 1,50 2,60 100,50;
                M 0,50 H 100;'
                        calcMode="spline" fill='freeze'
                        keyTimes="0; 0.33; 0.66; 1"
                        begin={`string${ind}wave.repeat(159)`}
                        end={`string${ind}.mouseenter`}
                    />

                    <animate attributeName='d' dur={waveDur} id={`string${ind}wave`}
                        values='
                M 0,50 C 1,50 50,80 100,50;
                M 0,50 C 1,50 50,65 100,50;
                M 0,50 H 100;
                M 0,50 C 1,50 50,35 100,50;
                M 0,50 C 1,50 50,20 100,50;
                M 0,50 C 1,50 50,0 100,50;
                M 0,50 C 1,50 50,20 100,50;
                M 0,50 C 1,50 50,35 100,50;
                M 0,50 H 100;'
                        calcMode="spline" fill='freeze' repeatDur="2s"
                        keyTimes="0; 0.125; 0.25; 0.375; 0.5; 0.625; 0.75; 0.875; 1"
                        keySplines={spline.repeat(8)}
                        begin={`string${ind}.mousedown`} onAnimationEnd={() => {
                            waveOn.current = false
                        }}
                    />
                </path>
                <rect x="-10" width="110" height="100" fill='none' id={`string${ind}`} pointerEvents="all"
                    onMouseDown={() => {
                        waveOn.current = true
                    }}
                    onMouseLeave={() => {
                        if (!waveOn.current) returnAnim.current.beginElement()
                    }} />
            </svg>
        </div>
    )
}
