import { GetStaticProps, NextPage } from 'next'
import { JSXElementConstructor, MutableRefObject, useCallback, useEffect, useRef } from 'react'

import styles from '../styles/Section.module.scss'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { setScroll, selectScroll } from '../app/scrollSlice'
import { setViewWidth, setViewHeight, selectView } from '../app/viewSlice'
import { StringSvgType } from './stringSvg'
import type { Button } from './home'


interface props {
    children?: any
    ind?: number
    wheelRef: MutableRefObject<number>
    stringRef: MutableRefObject<StringSvgType>
    mainRef?: MutableRefObject<HTMLDivElement>
    buttons?: Array<Button>
}

export const Section: NextPage<props> = (props) => {
    const { children, ind, wheelRef, mainRef, buttons, stringRef } = props

    const buttonRef = useRef<HTMLDivElement>(null)
    const animReqRef = useRef(null);

    const view = useAppSelector(selectView)
    const dispatch = useAppDispatch()

    // Imperative calls to StringSvg animations
    const onHover = (ind) => {
        stringRef.current.stringRefs[ind].current.hover()
    }
    const onLeave = (ind) => {
        stringRef.current.stringRefs[ind].current.unhover()
    }
    const onClick = (ind) => {
        stringRef.current.stringRefs[ind].current.wave()
    }

    // Button JSX and 
    const spanRefs: Array<MutableRefObject<HTMLSpanElement>> = []
    const buttonElems = buttons.map((button, index) => {
        const spanRef = useRef<HTMLSpanElement>(null)
        spanRefs.push(spanRef)
        return (
            <div key={index}
                onMouseEnter={() => onHover(index)}
                onMouseLeave={() => onLeave(index)}
                onMouseDown={() => {
                    onClick(index)
                    button.func(button.param)
                }}
            >
                <span ref={spanRef}>{button.name}</span>
            </div>
        )
    })


    // Smooth Scroll Effect
    useEffect(() => {
        const mainDiv = mainRef.current
        const buttonDiv = buttonRef.current

        const vw = view.width / 100
        const vh = view.height / 100
        const startWidth = 42 * vh
        const secWidth = 90 * vw

        const transX = () => {
            let offset = ind * vw * 90
            const scroll = wheelRef.current
            if (scroll < startWidth) return -offset;
            return scroll - startWidth - offset
        }

        let lastWheel = 0
        let isRunning = false
        const scrollAnim = () => {
            const wheel = wheelRef.current
            isRunning = true
            if (!lastWheel) lastWheel = wheel;
            else if (lastWheel == wheel) {
                isRunning = false
            }

            buttonDiv.style.transform = `translateX(${transX()}px)`
            spanRefs.forEach((spanRef, ind) => {
                const span = spanRef.current
                span.style.transform = `translateX(${0
                    }px)`
            })

            if (isRunning) requestAnimationFrame(() => scrollAnim())
        }

        const smoothScroll = () => {
            if (isRunning) return;
            animReqRef.current = requestAnimationFrame(() => scrollAnim())
        }
        mainDiv.addEventListener('wheel', smoothScroll)
        return (() => {
            cancelAnimationFrame(animReqRef.current)
            mainDiv.removeEventListener('wheel', smoothScroll)
        })
    }, [])

    return (
        <div className={styles.section}>
            <div className={styles.content}>
                {children}
            </div>
            <div className={styles.fret}>
                <div ref={buttonRef}>
                    {buttonElems}
                </div>
            </div>
        </div>
    )
}