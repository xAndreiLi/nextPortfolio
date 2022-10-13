import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { GetStaticProps } from 'next'

export default function Home() { 
  return (
    <Layout>
      Hi :)
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {

    }
  }
}