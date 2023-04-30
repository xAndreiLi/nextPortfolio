import { NextPage } from "next";
import { ReactNode, useRef, useState, useEffect, ReactElement, createElement } from "react";
import styles from '../styles/TextWrap.module.scss'

declare namespace JSX {
	interface IntrinsicElements {
		a: {
			props: {
				children: string, href: string
			}
		};
	}
}


interface Props {
	children: ReactNode[]
	className: string
}

const TextWrap: NextPage<Props> = (props: Props) => {
	const { children, className } = props
	const [wordBuf, setWordBuf] = useState('')
	const pRef = useRef<HTMLParagraphElement>(null)
	const wordsRef = useRef([''])

	const elements: ReactNode[] = []
	const numElements = children ? children.length : 0
	for (let i = 0; i < numElements; i++) {
		const child = children[i]
		if (typeof child === 'string') {
			const p = <p key={elements.length} >{child.slice(0, -1)}</p>
			elements.push(p)
			const span = <span key={elements.length} >{child.at(-1)}</span>
			elements.push(span)
		} else {
			const elem = child as ReactElement
			const newElem = <a {...elem.props} key={elements.length}></a>
			elements.push(newElem)
		}
	}

	// useEffect(() => {
	// 	const numElements = children ? children.length : 0
	// 	if(elements.current.length > 0) return;
	// 	for (let i = 0; i < numElements; i++) {
	// 		const child = children[i]
	// 		if (typeof child === 'string') {
	// 			wordsRef.current = child.split(' ')
	// 			const p = <p key={elements.current.length} ref={pRef} ></p>
	// 			elements.current.push(p)
	// 			//setWordBuf(wordsRef.current[0])
	// 		} else {
	// 			const elem = child as ReactElement
	// 			const newElem = <a {...elem.props} key={elements.current.length}></a>
	// 			elements.current.push(newElem)
	// 		}
	// 	}
	// }, [children])

	// useEffect(() => {

	// }, [])



	return (
		<div className={styles.WrapContainer + " " + className}>
			{elements}
		</div>
	)
}

export default TextWrap