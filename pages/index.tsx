import { GetStaticProps, NextPage } from 'next'
import { Provider } from 'react-redux'

import Home from '../components/home/home'
import store from '../util/store'
import { Header } from '../components/header'

export const Root: NextPage = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  )
}

export default Root
