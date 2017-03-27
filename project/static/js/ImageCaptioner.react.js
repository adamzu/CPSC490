const ImageUploader = require('ImageUploader.react');
const ImagePreview = require('ImagePreview.react');
const React = require('react');

import request from 'superagent';

class ImageCaptioner extends React.Component {

  constructor(props) {
    super(props);
    this.onDropAccepted = this.onDropAccepted.bind(this);
    this.onResetImage = this.onResetImage.bind(this);
    this.onUploadResponse = this.onUploadResponse.bind(this);
    this.request = null;
    this.state = {
      droppedImage: '',
      loading: false,
      processedImage: '',
    }
  }

  onDropAccepted(droppedImages) {
    let droppedImage = droppedImages[0];
    this.setState({
      droppedImage: droppedImage,
      loading: true,
    });
    this.sendUploadRequest(droppedImage);
  }

  sendUploadRequest(droppedImage) {
    setTimeout(() => {
      this.request = request.post('/upload')
        .attach('image', droppedImage, droppedImage.name)
        .timeout({
          deadline: 60000,
          response: 5000,
        })
        .end(this.onUploadResponse);
    }, 100);
  }

  onResetImage() {
    this.setState({
      droppedImage: '',
      loading: false,
      processedImage: '',
    });
  }

  onUploadResponse(error, result) {
    if (error || !result.ok) {
      console.log(error);
    } else {
      console.log(result);
      this.setState({
        loading: false,
        processedImage: result.text,
      });
    }
  }

  componentWillUnmount() {
    if (this.request !== null) {
      this.request.abort();
      this.request = null;
    }
  }

  render() {
    return (
      <div className="captioner-container">
        {
          this.state.droppedImage === ''
            ? <ImageUploader onDropAccepted={this.onDropAccepted}/>
            : <ImagePreview
                loading={this.state.loading}
                onResetImage={this.onResetImage}
                src={this.state.processedImage}
              />
        }
      </div>
    );
  }
}
module.exports = ImageCaptioner
