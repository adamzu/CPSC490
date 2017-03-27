const ImageUploader = require('ImageUploader.react');
const ImagePreview = require('ImagePreview.react');
const React = require('react');

class ImageCaptioner extends React.Component {

  render() {
    return (
      <div className="captioner-container">
        {
          this.props.droppedImage === null
            ? <ImageUploader onDropAccepted={this.props.onDropAccepted}/>
            : <ImagePreview
                caption={this.props.caption}
                loading={this.props.loading}
                onResetImage={this.props.onResetImage}
                sendCaptionRequest={this.props.sendCaptionRequest}
                src={this.props.processedImage}
              />
        }
      </div>
    );
  }
}
module.exports = ImageCaptioner

ImageCaptioner.propTypes = {
  caption: React.PropTypes.string.isRequired,
  droppedImage: React.PropTypes.object,
  loading: React.PropTypes.bool.isRequired,
  processedImage: React.PropTypes.string.isRequired,
  onDropAccepted: React.PropTypes.func.isRequired,
  onResetImage: React.PropTypes.func.isRequired,
}
