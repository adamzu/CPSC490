const React = require('react');
const Dropzone = require('react-dropzone');

import { Button } from 'react-bootstrap';

const Home = React.createClass({
  render() {
    return (
      <div>
        <h1 className="home">Image Caption Generation</h1>
        <Dropzone />
        <Button> Get Caption </Button>
      </div>
    );
  }
});
module.exports = Home
