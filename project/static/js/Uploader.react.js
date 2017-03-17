const Dropzone = require('react-dropzone');
const ImagePreview = require('ImagePreview.react');
const React = require('react');

import { Button, Glyphicon } from 'react-bootstrap';

class Uploader extends React.Component {

  constructor(props) {
    super(props)
    this.onDrop = this.onDrop.bind(this);
    this.state = {
      images: [],
    }
  }

  onDrop(image) {
    this.setState((state) => {
      state.images = state.images.concat(image);
      return state;
    });
  }

  render() {
    return (
      <div>
        <Dropzone
          accept="image/jpeg"
          onDrop={this.onDrop}
          ref={(dropzone) => {this.dropzone = dropzone}}>
          <div>
            <Glyphicon glyph="upload" />
            Drag and drop image here (or click to browse)...
          </div>
        </Dropzone>
        {
          this.state.images.length > 0
            ? this.state.images.map((image) => {
              return (
                <ImagePreview src={image.preview} key={image.name}/>
              );
            })
            : null
        }
        <Button>Get Caption</Button>
      </div>
    );
  }
}
module.exports = Uploader
