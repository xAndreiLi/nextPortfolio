import styles from '../styles/StringSvg.module.scss'
import { GetStaticProps, NextPage } from 'next'
import { useRef, MutableRefObject } from 'react'

interface props {
    ind: number
    waveRef: MutableRefObject<SVGAnimateElement>
    onClick: Function
}

export const StringButton: NextPage<props> = (props) => {
    const { ind, waveRef, onClick } = props

    const waveOn = useRef(null)
    const hoverAnim = useRef<SVGAnimateElement>(null)
    const returnAnim = useRef<SVGAnimateElement>(null)

    const gap = 18
    const curve = (amp:number) => {
        return `M ${(ind)*gap},0 C ${(ind)*gap},0 ${amp+(ind*gap)},50 ${ind*gap},100`
    }

    const curveAnim = (start:number, end:number) => {
        var values = ''
        var times = ''
        var splines = '0 0 1 1; '
        const interval = (end-start)/5
        for (let i = 0; i <= 5; i++) {
            values += curve(start+(interval*i)) + "; "
            times += (i/5).toFixed(3) + '; '
        }
        values = values.slice(0,-2)
        times = times.slice(0,-2)
        splines = splines.repeat(5).slice(0,-2)
        return [values, times, splines]
    }

    const waveAnim = () => {
        var values = curve(3) + curve(6) + curve(12) + curve(6)
        for (let i = 10; i>0; i--) {
            values += curveAnim(0,-i)[0]
            values += curveAnim(-i,0)[0]
            values += curveAnim(0,i)[0]
            values += curveAnim(i,0)[0]
        }
        var times = ''
        var splines = '0 0 1 1; '
        const count = values.split(';').length
        for (let i = 0; i < count; i++) {
            times += (i/(count-1)).toFixed(3) + '; '
        }
        times = times.slice(0,-2)
        splines = splines.repeat(count-1).slice(0,-2)
        return [values, times, splines]
    }
    
    return (
        <g>
            <path className={styles.stringPath}
                vectorEffect="non-scaling-stroke" d={curve(0)}>
                <animate attributeName='d' dur="100ms" ref={hoverAnim}
                    values={curveAnim(0,3)[0]}
                    keyTimes={curveAnim(0,3)[1]}
                    keySplines={curveAnim(0,3)[2]}
                    calcMode="spline" fill='freeze'
                    begin={`indefinite`}
                    end={`string${ind}.mouseleave; string${ind}.mousedown`}
                />

                <animate attributeName='d' dur="100ms" ref={returnAnim}
                    values={curveAnim(3,0)[0]}
                    keyTimes={curveAnim(3,0)[1]}
                    keySplines={curveAnim(3,0)[2]}
                    calcMode="spline" fill='freeze'
                    begin={`indefinite`}
                    end={`string${ind}.mouseenter`}
                />

                <animate attributeName='d' dur='400ms' ref={waveRef}
                    id={`string${ind}wave`}
                    values={waveAnim()[0]}
                    keyTimes={waveAnim()[1]}
                    keySplines={waveAnim()[2]}
                    calcMode="spline" fill='freeze'
                    begin={`string${ind}.mousedown`}
                />
            </path>
            <rect x={(ind*gap)-10} width="16" height="100" fill='none' id={`string${ind}`} pointerEvents="all"
                onMouseDown={() => {
                    onClick(ind)
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
