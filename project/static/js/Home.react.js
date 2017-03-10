const React = require('react');
const Dropzone = require('react-dropzone');

import { Button } from 'react-bootstrap';

class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      images: [],
    }
  }

  onDrop(image) {
    this.setState({
      files: image
    });
  }

  render() {
    return (
      <div>
        <h1 className="home">Image Caption Generation</h1>
        <Dropzone
          accept="image/jpg"
          onDrop={this.onDrop}
          ref="dropzone">
          {/* <img src=""/> */}
        </Dropzone>
        <Button> Get Caption </Button>
      </div>
    );
  }
}
module.exports = Home
