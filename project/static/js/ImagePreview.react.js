const ImageCaption = require('ImageCaption.react');
const React = require('react');
const Spinner = require('Spinner.react');

import { Button, Thumbnail } from 'react-bootstrap';

class ImagePreview extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      caption: '',
    }
  }

  render() {
    return (
      <div className="image-preview-container">
        {
          this.props.loading
            ? <Spinner />
            : <div className="thumbnail-container">
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
  src: React.PropTypes.string.isRequired,
}
