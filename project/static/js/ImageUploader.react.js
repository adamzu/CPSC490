const Dropzone = require('react-dropzone');
const ImageLinkAccepter = require('ImageLinkAccepter.react');
const React = require('react');

import { Glyphicon } from 'react-bootstrap';

const ACCEPTED_MIME_TYPES = ['image/jpeg', 'image/png'];

class ImageUploader extends React.Component {

  render() {
    return (
      <div>
        <Dropzone
          accept={ACCEPTED_MIME_TYPES.join(',')}
          activeClassName="active"
          className="dropzone"
          onDropAccepted={this.props.onDropAccepted}
        >
          <div className="placeholder">
            <Glyphicon glyph="cloud-upload" /><br />
            <strong>Drag and drop image here<br /></strong>
            or<br />
            <strong>Click to select a file to upload</strong>
          </div>
        </Dropzone>
        <ImageLinkAccepter
          imageLink={this.props.imageLink}
          onLinkChange={this.props.onLinkChange}
          onLinkSubmit={this.props.onLinkSubmit}
        />
      </div>
    );
  }
}
module.exports = ImageUploader

ImageUploader.propTypes = {
  imageLink: React.PropTypes.string.isRequired,
  onDropAccepted: React.PropTypes.func.isRequired,
  onLinkChange: React.PropTypes.func.isRequired,
  onLinkSubmit: React.PropTypes.func.isRequired,
}
