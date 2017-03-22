const Dropzone = require('react-dropzone');
const React = require('react');

import { Glyphicon } from 'react-bootstrap';

class ImageUploader extends React.Component {

  render() {
    return (
      <Dropzone
        accept="image/*"
        activeClassName="active"
        className="dropzone"
        onDropAccepted={this.props.onDropAccepted}
      >
        <div className="placeholder">
          <Glyphicon glyph="cloud-upload" /><br />
          Drag and drop image here<br />
          or<br />
          Click to select a file to upload
        </div>
      </Dropzone>
    );
  }
}
module.exports = ImageUploader
