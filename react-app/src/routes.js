import React from 'react'
import Home from './views/home'
import Login from './views/login'
const routes = [
    {
      path: '/',
      exact:true,
      render:(props)=>{
          return(<Login {...props}/>)
      }
    },
    {
      path: '/home',
      exact:true,
      render:(props)=>{
          return(<Home {...props}/>)
      }
    }
];

export default routes