import { NextPage } from "next";
import styles from '../styles/Header.module.scss'

const Header: NextPage = ({ }) => {

	return (
		<div className={styles.HeaderContainer}>
			<div className={styles.NavContainer}>
				<a>Home</a>
				<a>Work</a>
				<a>About</a>
			</div>
		</div>
	)
}

export default Header