import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store'

const toy = (
  <Provider store={store}>
    <App />
  </Provider>
)


ReactDOM.render(toy, document.getElementById('root'))
