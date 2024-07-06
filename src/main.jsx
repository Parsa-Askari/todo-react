import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BtnContextProvider , ShowModalProvider}  from './contexts/context';
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ShowModalProvider>
      <BtnContextProvider>
          <App />
      </BtnContextProvider>
    </ShowModalProvider>
  </React.StrictMode>,

)
