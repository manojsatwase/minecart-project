import React from 'react'
import ReactDOM from 'react-dom/client'
import App, { appRouter } from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/slices/store.js'
import './styles/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
       <RouterProvider router={appRouter} />
    </Provider>
  </React.StrictMode>,
)
