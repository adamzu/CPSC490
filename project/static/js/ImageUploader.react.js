const Dropzone = require('react-dropzone');
const React = require('react');

import { Glyphicon } from 'react-bootstrap';

const ACCEPTED_MIME_TYPES = ['image/jpeg', 'image/png'];

class ImageUploader extends React.Component {

  render() {
    return (
      <Dropzone
        accept={ACCEPTED_MIME_TYPES.join(',')}
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

ImageUploader.propTypes = {
  onDropAccepted: React.PropTypes.func.isRequired,
}
