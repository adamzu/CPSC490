const React = require('react');

import { Nav, Navbar, NavItem } from 'react-bootstrap';

class Toolbar extends React.Component {

  constructor(props) {
    super(props)
    // this.onDrop = this.onDrop.bind(this);
    this.state = {
      
    }
  }

  render() {
    return (
      <Navbar fixedTop={true}>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Image Caption Generation</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="#">Home</NavItem>
          <NavItem eventKey={2} href="#">Abstract</NavItem>
          <NavItem eventKey={3} href="#">Proposal</NavItem>
          <NavItem eventKey={4} href="#">Report</NavItem>
        </Nav>
      </Navbar>
    );
  }
}
module.exports = Toolbar