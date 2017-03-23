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
            loading: false,
            processedImage: result.text,
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
          this.state.droppedImage === ''
            ? <ImageUploader onDropAccepted={this.onDropAccepted}/>
            : <ImagePreview
                loading={this.state.loading}
                src={this.state.processedImage}
              />
            // : <this.state.processedImage === null
            //   ? <Spinner />
            //   : <ImagePreview
            //       src={this.state.processedImage}
            //     />
        }
      </div>
    );
  }
}
module.exports = ImageCaptioner
