const Dropzone = require('react-dropzone');
const React = require('react');

import { Button } from 'react-bootstrap';

class Uploader extends React.Component {

  constructor(props) {
    super(props)
    this.onDrop = this.onDrop.bind(this);
    this.state = {
      images: [],
    }
  }

  onDrop(images) {
    this.setState({
      images : images,
    });
  }

  render() {
    return (
      <div>
        <Dropzone
          accept="image/jpeg"
          multiple={false}
          onDrop={this.onDrop}
          ref={(dropzone) => {this.dropzone = dropzone}}>
        </Dropzone>
        {
          this.state.images.length > 0
            ? this.state.images.map((image) => {
              return (
                <img height="200px" width="200px" key={image} src={image.preview}/>
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
