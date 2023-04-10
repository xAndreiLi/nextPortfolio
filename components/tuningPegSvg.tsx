import * as React from "react"
import { SVGProps, Ref, forwardRef, useRef } from "react"
import styles from '../styles/Home.module.scss'

interface Props extends SVGProps<SVGSVGElement> {
	label: string;
	flip?: string;
	index: number;
}

const TuningPegSvg = (
	props: Props,
	ref: Ref<SVGSVGElement>) => {

	const { label, flip, index } = props
	let turned = false

	const turn1Ref = useRef<SVGAnimateElement>(null)
	const turn2Ref = useRef<SVGAnimateElement>(null)
	const unturn1Ref = useRef<SVGAnimateElement>(null)
	const unturn2Ref = useRef<SVGAnimateElement>(null)

	return (

		<svg
			viewBox="0 0 100 100"
			width={90}
			height={80}
			fill="none"
			overflow="visible"
			xmlns="http://www.w3.org/2000/svg"
			ref={ref}
			{...props}
		>
			<text x="0" y="65"
				className={styles.labelText}
				style={{
					"transform": `translateX(-10px) scaleX(${flip})`
				}}
				textAnchor={flip == "-1" ? "start" : "end"}
			>{label}</text>
			<g id={"tuningPeg"+index} style={{"pointerEvents":"all"}} onClick={()=>{
				if (!turned) {
					turned = true;
					turn1Ref.current?.beginElement()
					turn2Ref.current?.beginElement()
					return;
				}
				turned = false;
				unturn1Ref.current?.beginElement()
				unturn2Ref.current?.beginElement()
			}}>
				<rect x="50" y="38" width="50" height="25" rx="0" stroke="#fff" strokeWidth={5} />
				<rect x="0" y="10" width="50" height="80" rx="10" stroke="#fff" strokeWidth={5}>
					<animate
						id={"turn1"+index}
						ref={turn1Ref}
						attributeName="height"
						values="80; 55"
						dur="300ms"
						begin="indefinite"
						fill="freeze"
					/>
					<animate
						id={"turn2"+index}
						ref={turn2Ref}
						attributeName="y"
						values="10; 22.5"
						dur="300ms"
						begin="indefinite"
						fill="freeze"
					/>
					<animate
						id={"unturn1"+index}
						ref={unturn1Ref}
						attributeName="height"
						values="55; 80"
						dur="300ms"
						begin="indefinite"
						fill="freeze"
					/>
					<animate
						id={"unturn2"+index}
						ref={unturn2Ref}
						attributeName="y"
						values="22.5; 10"
						dur="300ms"
						begin="indefinite"
						fill="freeze"
					/>
				</rect>
			</g>

			<circle cx="165" cy="50" r="15" stroke="#fff" strokeWidth={5} />
			<circle cx="165" cy="50" r="7" fill="#fff" strokeWidth={5} />
		</svg>
	)
}

const ForwardRef = forwardRef(TuningPegSvg)
export default ForwardRef

/*
<path
				d="M47.841 26.816v2.5H83.5v15.966H47.84V68.01a7.5 7.5 0 0 1-7.5 7.5H10a7.5 7.5 0 0 1-7.5-7.5V10A7.5 7.5 0 0 1 10 2.5h30.341a7.5 7.5 0 0 1 7.5 7.5v16.816Z"
				stroke="#fff"
				strokeWidth={5}
				
			/>
*/