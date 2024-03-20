import React from 'react'
import ReactDOM from 'react-dom/client'
import { appRouter } from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import './styles/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {Provider as AlertProvider,positions,transitions} from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  transition: transitions.SCALE,
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
     <AlertProvider  template={AlertTemplate} {...options} >
       <RouterProvider router={appRouter} />
      </AlertProvider>
    </Provider>
  </React.StrictMode>,
)
