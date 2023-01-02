import styles from '../styles/StringSvg.module.scss'
import { GetStaticProps, NextPage } from 'next'
import { useRef, forwardRef, MutableRefObject } from 'react'

interface Props {
    ind: number
}

interface AnimType {
    values: string
    times: string
    splines: string
}

export const StringButton = forwardRef<Props>((props) => {
    const { ind } = props

    const waveOn = useRef(null)
    const hoverRef = useRef<SVGAnimateElement>(null)
    const returnRef = useRef<SVGAnimateElement>(null)
    const waveRef = useRef<SVGAnimateElement>(null)

    const gap = 18  // Gap between all strings
    /**
     * Generates path d curve from center
     * @param amp   amplitude of curve
     * @returns     path d string
     */
    const curve = (amp: number): string => {
        return `M ${(ind) * gap},0 C ${(ind) * gap},0 ${amp + (ind * gap)},50 ${ind * gap},100`
    }

    /**
     * Generates curve sequence
     * @param start Start Amplitude
     * @param end   End Amplitude 
     * @returns     Animate attributes
     */
    const curveAnim = (start: number, end: number): AnimType => {
        let values = ''
        let times = ''
        let splines = '0 0 1 1; '
        const interval = (end - start) / 5
        for (let i = 0; i <= 5; i++) {
            values += curve(start + (interval * i)) + '; '
            times += (i / 5).toFixed(3) + '; '
        }
        values = values.slice(0, -2)
        times = times.slice(0, -2)
        splines = splines.repeat(5).slice(0, -2)
        return { values, times, splines }
    }

    /**
     * Generates string buzz sequence
     * @returns Animate attributes
     */
    const waveAnim = (): AnimType => {
        let values = curve(3) + curve(6) + curve(12) + curve(6)
        for (let i = 10; i > 0; i--) {
            values += curveAnim(0, -i).values
            values += curveAnim(-i, 0).values
            values += curveAnim(0, i).values
            values += curveAnim(i, 0).values
        }
        let times = ''
        let splines = '0 0 1 1; '
        const count = values.split(';').length
        for (let i = 0; i < count; i++) {
            times += (i / (count - 1)).toFixed(3) + '; '
        }
        times = times.slice(0, -2)
        splines = splines.repeat(count - 1).slice(0, -2)
        return { values, times, splines }
    }

    const hoverAnim: AnimType = curveAnim(0, 3)
    const returnAnim: AnimType = curveAnim(3, 0)
    const clickAnim: AnimType = waveAnim()

    return (
        <path className={styles.stringPath}
            vectorEffect="non-scaling-stroke" d={curve(0)}>
            <animate attributeName='d' dur="100ms" ref={hoverRef}
                values={hoverAnim.values}
                keyTimes={hoverAnim.times}
                keySplines={hoverAnim.splines}
                calcMode="spline" fill='freeze'
                begin={`indefinite`}
                end={`string${ind}.mouseleave; string${ind}.mousedown`}
            />

            <animate attributeName='d' dur="100ms" ref={returnRef}
                values={returnAnim.values}
                keyTimes={returnAnim.times}
                keySplines={returnAnim.splines}
                calcMode="spline" fill='freeze'
                begin={`indefinite`}
                end={`string${ind}.mouseenter`}
            />

            <animate attributeName='d' dur='400ms' ref={waveRef}
                id={`string${ind}wave`}
                values={clickAnim.values}
                keyTimes={clickAnim.times}
                keySplines={clickAnim.splines}
                calcMode="spline" fill='freeze'
                begin={`indefinite`}
            />
        </path>
    )
})
