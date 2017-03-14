const React = require('react');
const Toolbar = require('Toolbar.react');
const Uploader = require('Uploader.react');

import { Button } from 'react-bootstrap';

class Home extends React.Component {

  render() {
    return (
      <div>
        <Toolbar />
        <h1 className="home">Image Caption Generation</h1>
        <Uploader />
      </div>
    );
  }
}
module.exports = Home
