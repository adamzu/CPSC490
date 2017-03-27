const ImageUploader = require('ImageUploader.react');
const ImagePreview = require('ImagePreview.react');
const React = require('react');

class ImageCaptioner extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="captioner-container">
        {
          this.props.droppedImage === ''
            ? <ImageUploader onDropAccepted={this.props.onDropAccepted}/>
            : <ImagePreview
                loading={this.props.loading}
                onResetImage={this.props.onResetImage}
                src={this.props.processedImage}
              />
        }
      </div>
    );
  }
}
module.exports = ImageCaptioner

ImageCaptioner.propTypes = {
  droppedImage: React.PropTypes.object.isRequired,
  loading: React.PropTypes.bool.isRequired,
  processedImage: React.PropTypes.string.isRequired,
  onDropAccepted: React.PropTypes.func.isRequired,
  onResetImage: React.PropTypes.func.isRequired,
}
