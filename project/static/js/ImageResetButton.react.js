const React = require('react');

import { Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap';

class ImageResetButton extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <OverlayTrigger
        overlay={<Tooltip id="reset">Reset image</Tooltip>}
        placement="top"
      >
        <Glyphicon
          className="reset-button"
          glyph="remove-circle"
          onClick={this.props.onResetImage}
        />
      </OverlayTrigger>
    );
  }
}
module.exports = ImageResetButton;

ImageResetButton.propTypes = {
  onResetImage: React.PropTypes.func.isRequired,
}
