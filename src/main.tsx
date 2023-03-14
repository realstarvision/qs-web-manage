import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './store/index'
import { ThemeProvider, responsiveFontSizes } from '@mui/material/styles'
import Theme from './Theme'
import '@/i18n/config'
import 'virtual:svg-icons-register'
import './assets/index.css'
import './assets/styles/date.scss'
import 'leaflet/dist/leaflet.css'
// import { store } from '@/store'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

let theme = responsiveFontSizes(Theme)
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      {/* <HashRouter> */}
      <App />
      {/* </HashRouter> */}
    </MuiPickersUtilsProvider>
  </Provider>
)
