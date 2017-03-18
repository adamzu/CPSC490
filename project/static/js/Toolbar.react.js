const React = require('react');
const TABS = ['Home', 'Abstract', 'Proposal', 'Report'];

import { Nav, Navbar, NavItem } from 'react-bootstrap';

class Toolbar extends React.Component {

  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this);
    this.state = {
      activeTab: TABS[0],
    };
  }

  isActiveTab(key) {
    return this.state.activeTab === key;
  }

  onClick(event) {
    let tab = event.target.innerHTML;
    this.setState({
      activeTab: tab,
    });
  }

  // TODO: add active conditional based on which tab selected

  render() {
    return (
      <Navbar fixedTop inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Image Caption Generation</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          {TABS.map((tab, index) => {
            return (
              <NavItem
                active={this.isActiveTab(tab)}
                eventKey={index}
                key={index}
                onClick={this.onClick}
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
