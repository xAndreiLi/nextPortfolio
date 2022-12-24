import styles from '../styles/StringSvg.module.scss'
import { GetStaticProps, NextPage } from 'next'
import { useRef } from 'react'

// M 0,50 C 1,50 50,80 100,50;
// M 0,50 C 1,50 50,65 100,50;
// M 0,50 H 100;
// M 0,50 C 1,50 50,35 100,50;
// M 0,50 C 1,50 50,20 100,50;
// M 0,50 C 1,50 50,0 100,50;
// M 0,50 C 1,50 50,20 100,50;
// M 0,50 C 1,50 50,35 100,50;
// M 0,50 H 100;

interface props {
    ind: number
    waveRef: string
}

export const StringButton: NextPage<props> = (props) => {
    const { ind, waveRef } = props

    const waveOn = useRef(null)
    const hoverAnim = useRef<SVGAnimateElement>(null)
    const returnAnim = useRef<SVGAnimateElement>(null)

    const gap = 18
    const curve = (amp:number) => {
        return `M ${(ind)*gap},0 C ${(ind)*gap},0 ${amp+(ind*gap)},50 ${ind*gap},100; `
    }

    const curveAnim = (start:number, end:number) => {
        var values = ''
        var times = ''
        const interval = (end-start)/5
        for (let i = 0; i <= 5; i++) {
            values += curve(start+(interval*i))
            times += (i/5).toFixed(3) + '; '
        }
        return [values, times]
    }

    const waveAnim = () => {
        var values = curve(2) + curve(1) + curve(0)
        for (let i = 12; i>0; i--) {
            values += curveAnim(0,-i)[0]
            values += curveAnim(-i,0)[0]
            values += curveAnim(0,i)[0]
            values += curveAnim(i,0)[0]
        }
        var times = ''
        const count = values.split(';').length-1
        for (let i = 0; i < count; i++) {
            times += (i/(count-1)).toFixed(3) + '; '
        }
        return [values, times]
    }
    
    return (
        <g>
            <path className={styles.stringPath}
                vectorEffect="non-scaling-stroke" d={curve(0)}>
                <animate attributeName='d' dur="100ms" ref={hoverAnim}
                    values={curveAnim(0,3)[0]}
                    calcMode="spline" fill='freeze'
                    keyTimes={curveAnim(0,3)[1]}
                    begin={`indefinite`}
                    end={`string${ind}.mouseleave; string${ind}.mousedown`}
                />

                <animate attributeName='d' dur="100ms" ref={returnAnim}
                    values={curveAnim(3,0)[0]}
                    calcMode="spline" fill='freeze'
                    keyTimes={curveAnim(3,0)[1]}
                    begin={`indefinite`}
                    end={`string${ind}.mouseenter`}
                />

                <animate attributeName='d' dur='1000ms' ref={waveRef}
                    id={`string${ind}wave`}
                    values={waveAnim()[0]}
                    calcMode="spline" fill='freeze'
                    keyTimes={waveAnim()[1]}
                    begin={`string${ind}.mousedown`}
                />
            </path>
            <rect x={(ind*gap)-2} width="16" height="100" fill='none' id={`string${ind}`} pointerEvents="all"
                onMouseDown={() => {
                    waveOn.current = true
                    setTimeout(()=>{
                        waveOn.current = false
                    }, 600)
                }}
                onMouseEnter={() => {
                    if (!waveOn.current) hoverAnim.current.beginElement()
                }} 
                onMouseLeave={() => {
                    if (!waveOn.current) returnAnim.current.beginElement()
                }}
                />
        </g>
    )
}
