const React = require('react');

import { Thumbnail } from 'react-bootstrap';

class ImagePreview extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Thumbnail src={this.props.src}>
          <p>Caption</p>
        </Thumbnail>
      </div>
    );
  }
}
module.exports = ImagePreview
