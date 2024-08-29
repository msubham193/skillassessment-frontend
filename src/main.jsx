import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from 'recoil';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
 <RecoilRoot>
 <App />
 </RecoilRoot>
  </BrowserRouter>
  </React.StrictMode>,
)

export const server="https://d31os5ub6ca4xs.cloudfront.net/api/v1";


// http://13.200.180.172:8000/api/v1
// http://localhost:8000/api/v1

// https://d31os5ub6ca4xs.cloudfront.net/api/v1