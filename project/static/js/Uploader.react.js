const Dropzone = require('react-dropzone');
const ImagePreview = require('ImagePreview.react');
const React = require('react');

import { Button, Glyphicon } from 'react-bootstrap';
import request from 'superagent';

class Uploader extends React.Component {

  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
    this.state = {
      image: null,
    }
  }

  onDrop(images) {
    // TODO: use superagent to send to Flask and handle image manipulation there
    let image = images[0];
    this.setState({
      image: image,
    });
    request.post('/upload')
      .attach('image', image, image.name)
      .end((error, result) => {
        // TODO: replace with actual function that displays preview
        console.log(error);
        console.log(result);
      });
  }

  // TODO: move preview
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
            Drag and drop image here<br />
            or<br />
            Click to select a file to upload
          </div>
        </Dropzone>
        {
          this.state.image !== null
            ? <ImagePreview
                key={this.state.image.name}
                src={this.state.image.preview}
              />
            : null
        }
      </div>
    );
  }
}
module.exports = Uploader
