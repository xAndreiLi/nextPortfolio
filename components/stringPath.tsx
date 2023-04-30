import { motion, useMotionTemplate, useMotionValue, animate } from 'framer-motion'

import styles from '../styles/StringSvg.module.scss'
import { GetStaticProps, NextPage } from 'next'
import { useRef, forwardRef, useImperativeHandle, ForwardedRef, useCallback } from 'react'


export interface StringPathType{
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

    const hover = useCallback((xPos: number, yPos: number) => {
        posVal.jump(yPos)
        xPosVal.jump(xPos)
    }, [posVal, xPosVal])

    const click = useCallback((xPos: number, direction: number = 1) => {
        xPosVal.set(xPos)
        posVal.set(pos+(10*direction))
        animate(posVal, pos, {
            type: "inertia", min: pos-2, max: pos+2,
            velocity: 90000, power: 1,
            bounceStiffness: 4000, bounceDamping: 5, 
        })
    }, [pos, posVal, xPosVal])

    useImperativeHandle(ref, () => ({
        hover: hover,
        click: click,
        pathRef: () => pathRef.current
    }), [pathRef, click, hover])
    
    const amp = useMotionTemplate`M 0,${pos} C 0,${pos} ${xPosVal},${posVal} 100,${pos}`

    return (
        <motion.path ref={pathRef}
            className={type == "string" ? 
                styles.stringPath : styles.stringMask }
            vectorEffect="non-scaling-stroke" d={amp} />
    )
}

export const StringPath = forwardRef<StringPathType, Props>(StringPathComp)
