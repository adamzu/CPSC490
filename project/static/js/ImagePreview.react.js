const React = require('react');
const Spinner = require('Spinner.react');

import { Thumbnail } from 'react-bootstrap';

class ImagePreview extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {
          this.props.loading
            ? <Spinner />
            : <Thumbnail src={this.props.src}>
                <p>Caption</p>
              </Thumbnail>
        }
      </div>
    );
  }
}
module.exports = ImagePreview

ImagePreview.propTypes = {
  loading: React.PropTypes.bool.isRequired,
  src: React.PropTypes.string.isRequired,
}
