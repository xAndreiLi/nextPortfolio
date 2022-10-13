import Head from 'next/head'
import Link from 'next/link'
import styles from './layout.module.css'

export const siteTitle = 'Andrei Li: Portfolio'

export default function Layout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<div className={styles.container}>
			<Head>
				<title>{ siteTitle }</title>
			</Head>
			<div className={styles.sidebar}>
				<Link href="../pages/index"><a>Home</a></Link>
				<Link href="../pages/index"><a>About</a></Link>
				<Link href="../pages/index"><a>Experience</a></Link>
				<Link href="../pages/index"><a className={styles.projectButton}>Projects</a></Link>
				<hr />
				<Link href="../pages/index"><a>MashSong</a></Link>
				<Link href="../pages/index"><a>LED Light Control</a></Link>
			</div>
			<main className={styles.main}>{children}</main>
			<div className={styles.rightbar}></div>
		</div>
	)
}