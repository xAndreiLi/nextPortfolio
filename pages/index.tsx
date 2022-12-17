import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import { GetStaticProps, NextPage } from 'next'
import { useRef } from 'react'
import { StringButton } from '../components/stringButton'


export const Home: NextPage = () => { 

  const buttonLabels = ["Projects", "Experience", "About", "Contact"]
  const waveDurList = ["48ms", "36ms", "24ms", "12ms"]
  const stringButtons = buttonLabels.map((val, ind) => {
    return <StringButton key={ind} ind={ind} text={val} waveDur={waveDurList[ind]}/>
  })

  return (
    <div className={styles.main}>
      {stringButtons}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {

    }
  }
}

export default Home 