import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import '../src/style/index.css'
import ThemeProvider from './providers/ThemeProvider'
import CountryDataProvider from './providers/CountryDataProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <CountryDataProvider>
        <App />
      </CountryDataProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
