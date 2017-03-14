const React = require('react');
const Toolbar = require('Toolbar.react');
const Uploader = require('Uploader.react');

import { Button } from 'react-bootstrap';

class Home extends React.Component {

  render() {
    return (
      <div>
        <Toolbar />
        <div className="content">
          <Uploader />
        </div>
      </div>
    );
  }
}
module.exports = Home
