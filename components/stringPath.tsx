import { motion, useMotionTemplate, useMotionValue, animate } from 'framer-motion'

import styles from '../styles/StringSvg.module.scss'
import variables from '../styles/var.module.scss'
import { GetStaticProps, NextPage } from 'next'
import { useRef, forwardRef, useImperativeHandle, ForwardedRef, useCallback } from 'react'


export interface StringPathType {
    hover(xPos: number, yPos: number): void
    click(xPos: number, direction?: number): void
    pathRef(): SVGPathElement | null
}

interface Props {
    ind: number
    type: string
}

const StringPathComp = (props: Props, ref: ForwardedRef<StringPathType>) => {
    const { ind, type } = props

    const pathRef = useRef<SVGPathElement>(null)
    const xPosVal = useMotionValue(50)

    const gap = 17
    const pos = gap * ind + 7.5
    const posVal = useMotionValue(pos)

    const dragRef = useRef(false)
    const hover = useCallback((xPos: number, yPos: number) => {
        // const margin = 1
        // if ((yPos >= pos && yPos <= pos + margin) ||
        //     (yPos <= pos && yPos >= pos - margin)) dragRef.current = true
        // if (dragRef.current) {
        //     posVal.jump(yPos)
        //     xPosVal.jump(xPos)
        // }
        posVal.jump(yPos)
        xPosVal.jump(xPos)
    }, [posVal, xPosVal])

    const pulseX1 = useMotionValue(0)
    const pulseX2 = useMotionValue(0)
    const click = useCallback((xPos: number, direction: number = 1) => {
        dragRef.current = false
        xPosVal.set(xPos)
        posVal.set(pos + (10 * direction))
        pulseX1.set(xPos)
        pulseX2.set(xPos)
        animate(posVal, pos, {
            type: "inertia", min: pos - 0.1, max: pos + 0.1,
            velocity: 90000, power: 1,
            bounceStiffness: 4000, bounceDamping: 5,
        })
        animate(pulseX1, -100, {
            duration: 1, ease: "circIn"
        })
        animate(pulseX2, 200, {
            duration: 1, ease: "circIn"
        })
    }, [pos, posVal, xPosVal, pulseX1, pulseX2])

    useImperativeHandle(ref, () => ({
        hover: hover,
        click: click,
        pathRef: () => pathRef.current
    }), [pathRef, click, hover])

    const amp = useMotionTemplate`M 0,${pos} C 0,${pos} ${xPosVal},${posVal} 100,${pos}`
    const pulseXTemp1 = useMotionTemplate`${pulseX1}%`
    const pulseXTemp2 = useMotionTemplate`${pulseX2}%`

    const stringColor = variables.textColor

    return (
        <>
            <defs>
                <motion.linearGradient id={`pulse${ind}`}
                    //gradientUnits="userSpaceOnUse"
                    gradientTransform="rotate(0)"
                    x1={pulseXTemp1} x2={pulseXTemp2}
                    y1='0%' y2='0%'
                >
                    <stop stopColor={variables.lightColor} offset="0%" />
                    <stop stopColor={variables.accentColor} offset="1%" />
                    <stop stopColor={variables.accentColor2} offset="20%" />
                    <stop stopColor={stringColor} offset="30%" />
                    <stop stopColor={stringColor} offset="70%" />
                    <stop stopColor={variables.accentColor2} offset="80%" />
                    <stop stopColor={variables.accentColor} offset="99%" />
                    <stop stopColor={variables.lightColor} offset="100%" />
                </motion.linearGradient>
            </defs>
            <motion.path ref={pathRef}
                className={type == "string" ?
                    styles.stringPath : styles.stringMask}
                stroke={type == "string" ? `url(#pulse${ind})` : 'black'}
                vectorEffect="non-scaling-stroke" d={amp} />
        </>
    )
}

export const StringPath = forwardRef<StringPathType, Props>(StringPathComp)
