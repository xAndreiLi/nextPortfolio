import styles from '../styles/StringSvg.module.scss'
import { GetStaticProps, NextPage } from 'next'
import { Component, useRef, MutableRefObject, RefObject, useEffect, useImperativeHandle, forwardRef } from 'react'

interface Props {
  ind: number
}

export interface StringType {
  hover: Function
  unhover: Function
  wave: Function
}

export const StringPath = forwardRef<StringType, Props>((props, ref) => {
  const { ind } = props

  const waveOn = useRef(false)
  const hoverRef = useRef<SVGAnimateElement>(null)
  const returnRef = useRef<SVGAnimateElement>(null)
  const waveRef = useRef<SVGAnimateElement>(null)

  const gap = 18
  const curve = (amp: number) => {
    return `M ${(ind) * gap},0 C ${(ind) * gap},0 ${amp + (ind * gap)},50 ${ind * gap},100`
  }

  const curveAnim = (start: number, end: number) => {
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
    return [values, times, splines]
  }

  const waveAnim = () => {
    var values = curve(3) + curve(6) + curve(12) + curve(6)
    for (let i = 10; i > 0; i--) {
      values += curveAnim(0, -i)[0]
      values += curveAnim(-i, 0)[0]
      values += curveAnim(0, i)[0]
      values += curveAnim(i, 0)[0]
    }
    var times = ''
    var splines = '0 0 1 1; '
    const count = values.split(';').length
    for (let i = 0; i < count; i++) {
      times += (i / (count - 1)).toFixed(3) + '; '
    }
    times = times.slice(0, -2)
    splines = splines.repeat(count - 1).slice(0, -2)
    return [values, times, splines]
  }

  useImperativeHandle(ref, () => ({
    hover: () => {
      if (!waveOn.current) {hoverRef.current.beginElement()}
    },
    unhover: () => {
      if (!waveOn.current) {returnRef.current.beginElement()}
    },
    wave: () => {
      waveOn.current = true
      waveRef.current.beginElement()
      setTimeout(() => {waveOn.current = false},400)
    },
  }))

  return (
    <path className={styles.stringPath}
      vectorEffect="non-scaling-stroke" d={curve(0)}>
      <animate attributeName='d' dur="100ms" ref={hoverRef}
        values={curveAnim(0, 3)[0]}
        keyTimes={curveAnim(0, 3)[1]}
        keySplines={curveAnim(0, 3)[2]}
        calcMode="spline" fill='freeze'
        begin={`indefinite`}
      />

      <animate attributeName='d' dur="100ms" ref={returnRef}
        values={curveAnim(3, 0)[0]}
        keyTimes={curveAnim(3, 0)[1]}
        keySplines={curveAnim(3, 0)[2]}
        calcMode="spline" fill='freeze'
        begin={`indefinite`}
      />

      <animate attributeName='d' dur='400ms' ref={waveRef}
        id={`string${ind}wave`}
        values={waveAnim()[0]}
        keyTimes={waveAnim()[1]}
        keySplines={waveAnim()[2]}
        calcMode="spline" fill='freeze'
        begin={`indefinite`}
      />
    </path>
  )
})
