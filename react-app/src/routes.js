import React from 'react'
import Home from './views/home'
import Login from './views/login'
import Inventory from './views/inventory'
import Product from './views/product'

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
    },
    {
      path: '/product',
      exact:true,
      render:(props)=>{
          return(<Product {...props}/>)
      }
    },
    {
      path: '/inventory',
      exact:true,
      render:(props)=>{
          return(<Inventory {...props}/>)
      }
    },
];

export default routes