import React from 'react'
import { NextPage } from 'next'
import styles from '../styles/IntroSvg.module.scss'
import { introName } from '../data/introName.js'

export const IntroAnim: NextPage = () => {

	//const nameSvg = require('../data/introName.svg')

	return (
		<div className={styles.introContainer}>
			<svg className={styles.nameText}>
				<text x='50%' y='50%'>
					Andrei Li
				</text>
			</svg>
		</div>
	)
}