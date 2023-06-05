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
	const height = useMotionValue("31vh")
	const scroll = useTransform(scrollY, value => `calc(60vh - ${value}px)`)

	// Header Slide Animation
	const slideDuration = .65
	useMotionValueEvent(scrollY, 'change', (latestValue) => {
		if (latestValue == 0 && !isIntro){
			animate(y, "0vh", { ease: easeInOut, duration: slideDuration })
			animate(height, "31vh", { ease: easeInOut, duration: slideDuration })
		} else if (latestValue == 0) return;
		else if (isIntro){
			animate(y, "-65vh", { ease: easeOut, duration: slideDuration })
			animate(height, "60vh", { ease: easeOut, duration: slideDuration })
		}
	})


	return (
		<motion.div className={headerContainer} ref={headerRef}
			style={{y: y, height: isIntro ? height : scroll}}
		>
			<p>About</p>
			<p>Work</p>
			<p>Blog</p>
		</motion.div>
	)
}