import * as React from "react"
import { SVGProps, Ref, forwardRef } from "react"
import styles from '../styles/Home.module.scss'


const HeadSvg = (
	props: SVGProps<SVGSVGElement>,
	ref: Ref<SVGSVGElement>
) => (
	<svg
		width={320}
		height={567}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		ref={ref}
		{...props}
	>
		<text x="160" y="130"
			className={styles.nameText}
		>
			Andrei Li
		</text>
		<path
			d="M290.18 489.824 255.851 561.5H63.194l-33.397-72.108A95 95 0 0 1 21 449.466V106.384c0-5.024-.689-10.026-2.047-14.864L6.46 47.01a1.003 1.003 0 0 1 .709-1.24 595.491 595.491 0 0 1 305.709.011c.54.144.859.7.713 1.236l-12.163 44.728a55.006 55.006 0 0 0-1.927 14.432v342.611a95.005 95.005 0 0 1-9.32 41.036Z"
			stroke="#fff"
			strokeWidth={10}
		/>
		<path
			d="M92 562 74 442M119 562 74 325M146 562 74 208M174 562l72-350M201 562l45-233M228 562l18-116"
			stroke="#fff"
			strokeWidth={3}
		/>
	</svg>
)

const ForwardRef = forwardRef(HeadSvg)
export default ForwardRef
