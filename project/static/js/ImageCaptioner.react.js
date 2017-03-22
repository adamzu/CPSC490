const ImageUploader = require('ImageUploader.react');
const ImagePreview = require('ImagePreview.react');
const React = require('react');
const Spinner = require('Spinner.react');

import request from 'superagent';

class ImageCaptioner extends React.Component {

  constructor(props) {
    super(props);
    this.onDropAccepted = this.onDropAccepted.bind(this);
    this.request = null;
    this.state = {
      droppedImage: null,
      processedImage: null,
    }
  }

  onDropAccepted(droppedImages) {
    let droppedImage = droppedImages[0];
    this.setState({
      droppedImage: droppedImage,
    });
    this.request = request.post('/upload')
      .attach('image', droppedImage, droppedImage.name)
      .timeout({
        deadline: 60000,
        response: 5000,
      })
      // TODO: fix setState issue
      .end((error, result) => {
        if (error || !result.ok) {
          console.log(error);
        } else {
          console.log(result);
          this.setState({
            processedImage: result.text
          });
        }
      });
  }

  componentDidMount() {

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
          this.state.droppedImage === null
            ? <ImageUploader onDropAccepted={this.onDropAccepted}/>
            : this.state.processedImage === null
              ? <Spinner />
              : <ImagePreview
                  src={this.state.processedImage}
                />
        }
      </div>
    );
  }
}
module.exports = ImageCaptioner
