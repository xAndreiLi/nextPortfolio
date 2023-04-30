import { NextPage } from "next";
import styles from '../styles/Header.module.scss'

const Header: NextPage = ({ }) => {

	return (
		<div className={styles.HeaderContainer}>
			<a>Work</a>
			<a>Home</a>
			<a>About</a>
		</div>
	)
}

export default Header