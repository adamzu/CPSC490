const ImageCaption = require('ImageCaption.react');
const React = require('react');
const Spinner = require('Spinner.react');

import { Glyphicon, OverlayTrigger, Tooltip, Thumbnail } from 'react-bootstrap';

class ImagePreview extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      caption: '',
    }
  }

  render() {
    // TODO: maybe store image at top level (ImageCaptioner)
    return (
      <div className="image-preview-container">
        {
          this.props.loading
            ? <Spinner />
            : <div className="thumbnail-container">
                <OverlayTrigger
                  overlay={<Tooltip id="reset">Reset image</Tooltip>}
                  placement="top"
                >
                  <Glyphicon
                    className="back-button"
                    glyph="remove-circle"
                    onClick={this.props.onResetImage}
                  />
                </OverlayTrigger>
                <Thumbnail src={this.props.src}>
                  <ImageCaption />
                </Thumbnail>
              </div>
        }
      </div>
    );
  }
}
module.exports = ImagePreview

ImagePreview.propTypes = {
  loading: React.PropTypes.bool.isRequired,
  onResetImage: React.PropTypes.func.isRequired,
  src: React.PropTypes.string.isRequired,
}
