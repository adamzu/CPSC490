const React = require('react');

import { Nav, Navbar, NavItem } from 'react-bootstrap';

const TABS = ['Home', 'Abstract', 'Proposal', 'Report'];

class Toolbar extends React.Component {

  constructor(props) {
    super(props)
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      activeKey: 0,
    };
  }

  isActiveTab(key) {
    return this.state.activeKey === key;
  }

  handleSelect(eventKey) {
    this.setState({
      activeKey: eventKey,
    });
  }

  render() {
    return (
      <Navbar fixedTop inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href=""> Image Caption Generation</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav onSelect={this.handleSelect}>
          {TABS.map((tab, index) => {
            return (
              <NavItem
                active={this.isActiveTab(index)}
                eventKey={index}
                key={index}
              >
                {tab}
              </NavItem>
            );
          })}
        </Nav>
      </Navbar>
    );
  }
}
module.exports = Toolbar
