import React from 'react'
import ReactDom from 'react-dom'
import Layout from './index'
import {StoreProvider} from 'easy-peasy'
import {store} from '../ui/store'
ReactDom.render(
  <StoreProvider store={store}>
    <Layout />
  </StoreProvider>,
  document.querySelector('#root'),
)
