import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Home} from './pages/Home';
import { PageFullProduct } from './pages/PageFullProduct';
import { Registration } from './pages/Registration';
import { Login } from './pages/Login';
import { AddProduct } from './pages/AddProduct';
import { Profile } from './pages/Profile';
import {App} from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';



const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App/>
        </Provider>
      </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
