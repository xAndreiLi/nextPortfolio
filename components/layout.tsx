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
				<Link href="/"><a>Home</a></Link>
				<Link href="/"><a>About</a></Link>
				<Link href="/"><a>Experience</a></Link>
				<Link href="/"><a className={styles.projectButton}>Projects</a></Link>
				<hr />
				<Link href="/"><a>MashSong</a></Link>
				<Link href="/"><a>LED Light Control</a></Link>
			</div>
			<main className={styles.main}>{children}</main>
			<div className={styles.rightbar}></div>
		</div>
	)
}