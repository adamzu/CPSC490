const ImageUploader = require('ImageUploader.react');
const ImagePreview = require('ImagePreview.react');
const React = require('react');

class ImageCaptioner extends React.Component {

  render() {
    return (
      <div className="captioner-container">
        {
          this.props.image === null
            ? <ImageUploader
              imageLink={this.props.imageLink}
              isInvalidImageLink={this.props.isInvalidImageLink}
              onDropAccepted={this.props.onDropAccepted}
              onLinkChange={this.props.onLinkChange}
              onLinkSubmit={this.props.onLinkSubmit}
            />
            : <ImagePreview
                caption={this.props.caption}
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
  caption: React.PropTypes.string.isRequired,
  image: React.PropTypes.object,
  imageLink: React.PropTypes.string.isRequired,
  isInvalidImageLink: React.PropTypes.bool.isRequired,
  loading: React.PropTypes.bool.isRequired,
  processedImage: React.PropTypes.string.isRequired,
  onDropAccepted: React.PropTypes.func.isRequired,
  onLinkChange: React.PropTypes.func.isRequired,
  onLinkSubmit: React.PropTypes.func.isRequired,
  onResetImage: React.PropTypes.func.isRequired,
}
