const ImageCaption = require('ImageCaption.react');
const ImageResetButton = require('ImageResetButton.react');
const React = require('react');
const Spinner = require('Spinner.react');

import { Thumbnail } from 'react-bootstrap';

class ImagePreview extends React.Component {

  render() {
    return (
      <div className="image-preview-container">
        {
          this.props.loading
            ? <Spinner />
            : <div className="thumbnail-container">
                {
                  this.props.caption === ''
                    ? null
                    : <ImageResetButton onResetImage={this.props.onResetImage} />
                }
                <Thumbnail src={this.props.src}>
                  <ImageCaption caption={this.props.caption} />
                </Thumbnail>
              </div>
        }
      </div>
    );
  }
}
module.exports = ImagePreview

ImagePreview.propTypes = {
  caption: React.PropTypes.string.isRequired,
  loading: React.PropTypes.bool.isRequired,
  onResetImage: React.PropTypes.func.isRequired,
  src: React.PropTypes.string.isRequired,
}
