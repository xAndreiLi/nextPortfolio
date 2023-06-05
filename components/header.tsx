import { easeOut, motion, MotionValue, animate, useMotionValue, useMotionValueEvent, easeIn, useScroll, easeInOut, useTransform } from "framer-motion"
import { headerContainer } from "../styles/header.css"
import { NextPage } from "next/types"
import { useRef, useState } from "react"

interface Props {
	isIntro: boolean
	scrollY: MotionValue<number>
}

export const Header: NextPage<Props> = ({ isIntro, scrollY }) => {

	const headerRef = useRef(null)
	const y = useMotionValue("0vh")

	// Header Slide Animation
	const slideDuration = .7
	useMotionValueEvent(scrollY, 'change', (latestValue) => {
		if (latestValue == 0 && !isIntro){
			animate(y, "0vh", { ease: easeOut, duration: slideDuration })
			// animate(height, "31vh", { ease: easeInOut, duration: slideDuration })
		} else if (latestValue == 0) return;
		else if (isIntro){
			animate(y, "-60vh", { ease: easeIn, duration: slideDuration })
			// animate(height, "60vh", { ease: easeOut, duration: slideDuration })
		}
	})


	return (
		<motion.div className={headerContainer} ref={headerRef}
			style={{y: y, height: "10vh"}}
		>
			<p>About</p>
			<p>Work</p>
			<p>Blog</p>
		</motion.div>
	)
}