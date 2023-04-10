import { NextPage } from 'next'
import { useContext } from 'react'
import styles from '../styles/SoundHole.module.scss'
import { HomeContext } from './home'

interface Props {

}

export const SoundHole: NextPage = () => {

	const { holeRef } = useContext(HomeContext)

	return (
		<div className={styles.soundHole}>
			<span>Work</span>
		</div>
	)
}