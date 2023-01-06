import styles from '../styles/StringSvg.module.scss'
import { GetStaticProps, NextPage } from 'next'
import { useRef, MutableRefObject, forwardRef, useImperativeHandle, ForwardedRef } from 'react'

export interface StringPathType {
    hover: Function
    unhover: Function
    click: Function
}

interface Props {
    ind: number
}

interface AnimType {
    values: string
    times: string
    splines: string
}

const StringPathComp = (props: Props, ref: ForwardedRef<StringPathType>) => {
    const { ind } = props

    const waveOn = useRef(false)
    const isHovered = useRef(false)
    const hoverRef = useRef<SVGAnimateElement>(null)
    const returnRef = useRef<SVGAnimateElement>(null)
    const waveRef = useRef<SVGAnimateElement>(null)

    const gap = 18
    const curve = (amp: number) => {
        return `M ${(ind) * gap},0 C ${(ind) * gap},0 ${amp + (ind * gap)},50 ${ind * gap},100`
    }

    const curveAnim = (start: number, end: number): AnimType => {
        var values = ''
        var times = ''
        var splines = '0 0 1 1; '
        const interval = (end - start) / 5
        for (let i = 0; i <= 5; i++) {
            values += curve(start + (interval * i)) + "; "
            times += (i / 5).toFixed(3) + '; '
        }
        values = values.slice(0, -2)
        times = times.slice(0, -2)
        splines = splines.repeat(5).slice(0, -2)
        return {values, times, splines}
    }

    const waveAnim = (): AnimType => {
        var values = curve(3) + curve(6) + curve(12) + curve(6)
        for (let i = 10; i > 0; i--) {
            values += curveAnim(0, -i).values + '; '
            values += curveAnim(-i, 0).values + '; '
            values += curveAnim(0, i).values + '; '
            values += curveAnim(i, 0).values
        }
        var times = ''
        var splines = '0 0 1 1; '
        const count = values.split(';').length
        for (let i = 0; i < count; i++) {
            times += (i / (count - 1)).toFixed(3) + '; '
        }
        times = times.slice(0, -2)
        splines = splines.repeat(count - 1).slice(0, -2)
        return {values, times, splines}
    }

    useImperativeHandle(ref, () => ({
        hover: () => {
            const hoverAnim = hoverRef.current
            if (waveOn.current || !hoverAnim) return;
            hoverAnim.beginElement()
            isHovered.current = true
        },
        unhover: () => {
            const unhover = returnRef.current
            if (waveOn.current || !isHovered.current || !unhover) return;
            unhover.beginElement()
            isHovered.current = false
        },
        click: () => {
            const click = waveRef.current
            if (!click) return;
            waveOn.current = true
            isHovered.current = false
            click.beginElement()
            setTimeout(() => waveOn.current = false, 350)
        }
    }))

    const hoverAnim = curveAnim(0, 8)
    const returnAnim = curveAnim(8, 0)
    const clickAnim = waveAnim()

    return (
        <path className={styles.stringPath}
            vectorEffect="non-scaling-stroke" d={curve(0)}>
            <animate attributeName='d' dur="100ms" ref={hoverRef}
                values={hoverAnim.values}
                keyTimes={hoverAnim.times}
                keySplines={hoverAnim.splines}
                calcMode="spline" fill='freeze'
                begin={`indefinite`}
            />

            <animate attributeName='d' dur="100ms" ref={returnRef}
                values={returnAnim.values}
                keyTimes={returnAnim.times}
                keySplines={returnAnim.splines}
                calcMode="spline" fill='freeze'
                begin={`indefinite`}
            />

            <animate attributeName='d' dur='400ms' ref={waveRef}
                values={clickAnim.values}
                keyTimes={clickAnim.times}
                keySplines={clickAnim.splines}
                calcMode="spline" fill='freeze'
                begin={`indefinite`}
            />
        </path>
    )
}

export const StringPath = forwardRef<StringPathType, Props>(StringPathComp)
