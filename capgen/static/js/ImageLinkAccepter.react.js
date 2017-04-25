const React = require('react');
const Spinner = require('Spinner.react');

import { Button, FormControl, FormGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';


const VALID_LINK_REGEX = new RegExp(
  /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
);

class ImageLinkAccepter extends React.Component {

  isInvalidLink() {
    return this.props.imageLink.match(VALID_LINK_REGEX) === null;
  }

  getValidationState() {
      return this.props.isInvalidImageLink
        ? 'error'
        : null
  }

  render() {
    let urlInput = (
      <FormControl
        onChange={this.props.onLinkChange}
        placeholder="Type in a URL here"
        type="text"
        value={this.props.imageLink}
      />
    );
    return (
      <div className="accepter-container">
        or<br />
        <form id="url-form" onSubmit={this.props.onLinkSubmit}>
          <strong>Provide a direct link to an image on the web</strong><br/>
          <FormGroup
            className="accepter"
            validationState={this.getValidationState()}
          >
            {
              this.props.isInvalidImageLink
                ? <OverlayTrigger
                    defaultOverlayShown
                    overlay={<Tooltip id="url-error">Invalid image URL</Tooltip>}
                    placement="top"
                  >
                    {urlInput}
                  </OverlayTrigger>
                : urlInput
            }
            <FormControl.Feedback />
            <Button
              disabled={this.isInvalidLink() || this.props.isInvalidImageLink}
              type='submit'
            >
              Get Caption
            </Button>
          </FormGroup>
        </form>
      </div>
    );
  }
}
module.exports = ImageLinkAccepter

ImageLinkAccepter.propTypes = {
  imageLink: React.PropTypes.string.isRequired,
  isInvalidImageLink: React.PropTypes.bool.isRequired,
  onLinkChange: React.PropTypes.func.isRequired,
  onLinkSubmit: React.PropTypes.func.isRequired,
}
