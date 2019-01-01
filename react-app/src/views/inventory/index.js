import React from 'react'
import {Container, Grid, Header, Divider} from 'semantic-ui-react'
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      videos:[]
    }
    this.targetUrl = process.env.REACT_APP_TARGET_URL
  }

  componentDidMount() {
   
  }

  render() {
    const {videos} = this.state
    return(
      <Container>
      <Header size='huge' style={{marginTop:'10px'}}>Products</Header>
      <Divider/>
      <Grid>
      Inventories
      </Grid>
      </Container>
      )
  }
}

export default Home