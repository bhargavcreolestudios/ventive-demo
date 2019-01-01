import React, { Component } from 'react'
import {
  Container,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar,
} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive as={Sidebar.Pushable} maxWidth={Responsive.onlyMobile.maxWidth}>

       
          <Segment
            inverted
            textAlign='left'
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size='large'>
                 <Menu.Item header as={Link} to='/home'>Ventive-demo</Menu.Item>
              </Menu>
            </Container>
          </Segment>

          {children}
        
      </Responsive>
    )
  }
}

export default MobileContainer

MobileContainer.propTypes = {
  children: PropTypes.node,
}