const React = require('react');
const Toolbar = require('Toolbar.react');
const Uploader = require('Uploader.react');

import { Button } from 'react-bootstrap';

const TABS = ['Home', 'Abstract', 'Proposal', 'Report'];

class Home extends React.Component {

  constructor(props) {
    super(props)
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      activeTabKey: 0,
    };
  }

  getContent() {
    let tab = TABS[this.state.activeTabKey];
    if (tab === 'Home') {
      return <Uploader />;
    }
    return <h1>TODO: {tab}</h1>;
  }

  handleSelect(eventKey) {
    this.setState({
      activeTabKey: eventKey,
    });
  }


  render() {
    return (
      <div>
        <Toolbar
          activeTabKey={this.state.activeTabKey}
          handleSelect={this.handleSelect}
          tabs={TABS}
        />
        <div className="content">
          {this.getContent(this.toolbar)}
        </div>
      </div>
    );
  }
}
module.exports = Home
