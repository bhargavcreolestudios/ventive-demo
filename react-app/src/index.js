import React from 'react';
import { render } from 'react-dom'
import {Router} from 'react-router'
import App from './App'
import createBrowserHistory from "history/createBrowserHistory"
import 'semantic-ui-css/semantic.min.css'
const history = createBrowserHistory()
const target = document.querySelector('#root')
render(
      <Router history={history}>
       <App />
      </Router>,
  target
)
