const React = require('react');

import { Nav, Navbar, NavItem } from 'react-bootstrap';

class Toolbar extends React.Component {

  isActiveTab(key) {
    return this.props.activeTabKey === key;
  }

  render() {
    return (
      <Navbar fixedTop inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href=""> Image Caption Generation</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav onSelect={this.props.handleSelect}>
            {this.props.tabs.map((tab, index) => {
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
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
module.exports = Toolbar

Toolbar.propTypes = {
  activeTabKey: React.PropTypes.number.isRequired,
  handleSelect: React.PropTypes.func.isRequired,
  tabs: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
}
