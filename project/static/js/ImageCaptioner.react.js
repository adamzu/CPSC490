const ImageUploader = require('ImageUploader.react');
const ImagePreview = require('ImagePreview.react');
const React = require('react');

import request from 'superagent';

class ImageCaptioner extends React.Component {

  constructor(props) {
    super(props);
    this.onDropAccepted = this.onDropAccepted.bind(this);
    this.state = {
      image: null,
    }
  }

  onDropAccepted(images) {
    let image = images[0];
    this.setState({
      image: image,
    });
    request.post('/upload')
      .attach('image', image, image.name)
      .timeout({
        deadline: 60000,
        response: 5000,
      })
      // TODO: add abort
      .end((error, result) => {
        // TODO: replace with actual function that displays preview
        console.log(error);
        console.log(result);
      });
  }

  // TODO: move preview
  render() {
    return (
      <div className="captioner-container">
        <ImageUploader onDropAccepted={this.onDropAccepted}/>
        {
          this.state.image !== null
            ? <ImagePreview
                key={this.state.image.name}
                src={this.state.image.preview}
              />
            : null
        }
      </div>
    );
  }
}
module.exports = ImageCaptioner
