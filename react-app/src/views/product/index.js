import React from 'react'
import {Container, Grid, Header, Divider} from 'semantic-ui-react'
import {getSingleProduct} from '../../api'
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      product_id:null,
      product:{}
    }
    this.targetUrl = process.env.REACT_APP_TARGET_URL
  }

  componentDidMount() {
   const {product_id} = this.props.location.state
   if (product_id) {
    getSingleProduct(product_id).then(response=>{
      this.setState({
        product: response.data.data
      })
    })
   }
  }

  render() {
    const {product} = this.state
    return(
      <Container>
      <Header size='huge' style={{marginTop:'10px'}}>Product Detail</Header>
      <Divider/>
      <Grid>

      </Grid>
      </Container>
      )
  }
}

export default Home