import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import ColorModeProvider from "./context/ColorModeProvider";


// Amplify
import { Amplify } from "aws-amplify";
import awsconfig from './aws-exports'
Amplify.configure(awsconfig);


const root = createRoot(document.getElementById('root') as Element);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ColorModeProvider>
        <App />
      </ColorModeProvider>
    </BrowserRouter>
  </React.StrictMode>,

);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
