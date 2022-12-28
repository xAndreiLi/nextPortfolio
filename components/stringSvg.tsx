import { GetStaticProps, NextPage } from 'next'
import { useRef, useEffect, MutableRefObject } from 'react'

import styles from '../styles/StringSvg.module.scss'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { setScroll, selectScroll } from '../app/scrollSlice'
import { setViewWidth, setViewHeight, selectView } from '../app/viewSlice'

import { StringButton } from './stringButton'

interface props {
    mainRef: MutableRefObject<HTMLDivElement>
    scrollRef: MutableRefObject<HTMLDivElement>
    holeRef: MutableRefObject<HTMLInputElement>
}

export const StringSvg: NextPage<props> = (props) => {
    const { mainRef, scrollRef, holeRef } = props

    const scroll = useAppSelector(selectScroll)
    const view = useAppSelector(selectView)
    const dispatch = useAppDispatch()

    const stringRef: Array<MutableRefObject<SVGAnimateElement>> = []
    for (let i = 0; i < 6; i++) {
        const ref = useRef<SVGAnimateElement>()
        stringRef.push(ref)
    }

    const onClick = (ind?: number) => {
        holeRef.current.click()
        setTimeout(()=>{holeRef.current.checked = false}, 150)

        if (ind) {
            console.log(view)
            const vw = view.width / 100
            const scrollAmt = vw * 90 * ind
            dispatch(setScroll(scrollAmt))
            scrollRef.current.scrollTo({
                left: scrollAmt + (vw*15),
                behavior: "smooth"
            })
        } else if (ind == 0){
            dispatch(setScroll(0))
            scrollRef.current.scrollTo({
                left: 0,
                behavior: "smooth"
            })
        }
    }

    const strings = stringRef.map((val, ind) => {
        return <StringButton key={ind} ind={ind} waveRef={val} onClick={onClick}/>
    })

    let timeouts = useRef([]).current

    const pluck = (ind: number, delay: number) => {
        return setTimeout(() => {
            const string = stringRef[ind].current
            if (!string) return;
            string.beginElement()
            onClick()
            timeouts.shift()
        }, delay)
    }
    const pluckSeq = (seq:Array<number>, interval:number) => {
        let time = 0
        seq.forEach((i) => {
            timeouts.push(pluck(i, time))
            time += interval
        });
    }

    const onScroll = (e: WheelEvent) => {
        if ((e.deltaY == 0) || (timeouts.length)) return;
        pluckSeq([0,1,2,3,4,5,4,3,2], 400)
        let currScroll = scrollRef.current.scrollLeft
        let timer = setInterval(() => {
            if (scrollRef.current.scrollLeft == currScroll) {
                clearInterval(timer)
                timer = null
                timeouts.forEach((t) => {
                    clearTimeout(t)
                })
                timeouts = []
            }
            currScroll = scrollRef.current.scrollLeft;
        }, 500)
    }

    useEffect(() => {
        if(!mainRef.current || !holeRef.current) return;
        pluckSeq([0,1,2,3,4,5], 250)
        mainRef.current.addEventListener("wheel", onScroll)
    }, [mainRef])

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