import { GetStaticProps, NextPage } from 'next'
import { Provider } from 'react-redux'

import Home from '../components/home'
import store from '../app/store'

export const Root: NextPage = () => {

    return (
        <Provider store={store}>
            <Home/>
        </Provider>
    )
}

export default Root