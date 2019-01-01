import React from 'react'
import {Container, Grid, Header, Form, Input, Button} from 'semantic-ui-react'
import {loginUser} from '../../api'
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email:'',
      password:''
    }
    this._fieldChanged = this._fieldChanged.bind(this)
    this._loginUser = this._loginUser.bind(this)
  }

  _fieldChanged = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  _loginUser = () =>{
    let credentials = this.state
    loginUser(credentials).then(response=>{
        this.props.history.push('/home')
     },error=>{
      console.log('error',error.data);
     })
  }

  render() {
      const {email,password} = this.state
    return(
      // Start Login Container
      <div className="login-container" style={{marginTop:"10%"}}>                
      <Grid centered>
        <Grid.Column mobile={16} tablet={9} computer={9}>
          <Container>            
            <Header as="h2" textAlign='center'>Login</Header>
            <Form>
              <Form.Field 
                control={Input}
                label='E-Mail Address'
                id="email" 
                type="email" 
                name="email"
                value={email}
                required
                onChange={this._fieldChanged}
                placeholder='Type in your email'
              /> 
              <Form.Field
                  control={Input}
                  label='Password'  
                  id="password"
                  type="password"
                  value={password}
                  name="password"
                  onChange={this._fieldChanged}
                  required 
                  placeholder="Type in your password"
              />
              <Form.Field style={{textAlign: 'center'}}>
              <Form.Field
                control={Button}
                onClick={this._loginUser} 
                color='orange' 
                style={{textAlign: 'center'}}>Login</Form.Field>
              </Form.Field>
            </Form>             
          </Container>
        </Grid.Column>
      </Grid>
    </div>
    //End Login Container
    )
  }
}

export default Login