const Dropzone = require('react-dropzone');
const ImagePreview = require('ImagePreview.react');
const React = require('react');

import { Button, Glyphicon } from 'react-bootstrap';

class Uploader extends React.Component {

  constructor(props) {
    super(props)
    this.onDrop = this.onDrop.bind(this);
    this.state = {
      image: "",
    }
  }

  onDrop(image) {
    this.setState({
      image: image[0],
    });
  }

  // TODO: take out button and move preview to its own component

  render() {
    return (
      <div className="dropzone">
        <Dropzone
          accept="image/*"
          onDrop={this.onDrop}
          ref={(dropzone) => {this.dropzone = dropzone}}
        >
          <div className="placeholder">
            <Glyphicon glyph="cloud-upload" /><br />
            Drag and drop image here <br />
            or <br />
            Click to select a file to upload
          </div>
        </Dropzone>
        {
          this.state.image !== ""
            ? <ImagePreview src={this.state.image.preview} key={this.state.image.name}/>
            : null
        }
      </div>
    );
  }
}
module.exports = Uploader
