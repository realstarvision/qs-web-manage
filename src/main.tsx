import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './App'
import { ThemeProvider, responsiveFontSizes } from '@mui/material/styles'
import Theme from './Theme'
import '@/i18n/config'
import 'virtual:svg-icons-register'
import './assets/index.css'

let theme = responsiveFontSizes(Theme)
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
  // </React.StrictMode>
)
