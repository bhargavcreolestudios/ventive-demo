import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import DesktopContainer from './containers/DesktopContainer'
import MobileContainer from './containers/MobileContainer'
import './App.css'
import routes from './routes'

const ResponsiveContainer = ({ children }) =>{
  return(
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)
}

class App extends Component {
	constructor(props) {
    super(props)
    this.state = {}
    
  }
  render() {
    return (
    	<ResponsiveContainer>
    		{
	        routes.map((route,key)=>{
	          return(
	            <Route {...route} key={key}/>
	            )
	        })
	       }
    	</ResponsiveContainer>
    	);
  }
}

export default App;
