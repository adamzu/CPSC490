const React = require('react');
const Spinner = require('Spinner.react');

import { Button, Form, FormControl, FormGroup } from 'react-bootstrap';


const VALID_LINK_REGEX = new RegExp(
  /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
);

class ImageLinkAccepter extends React.Component {

  isValidLink() {
    return this.props.imageLink.match(VALID_LINK_REGEX);
  }

  render() {
    return (
      <div className="accepter-container">
        or<br />
        <Form>
          <strong>Provide a direct link to an image on the web</strong><br/>
          <FormGroup className="accepter">
            <FormControl
              onChange={this.props.onLinkChange}
              placeholder="Type in a URL here"
              type="text"
              value={this.props.imageLink}
            />
            {/* TODO: add validation state */}
            <Button
              // TODO: add regex validation for disabling?
              disabled={this.isValidLink()}
              onClick={this.props.onLinkSubmit}
            >
              Get Caption
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
module.exports = ImageLinkAccepter

ImageLinkAccepter.propTypes = {
  imageLink: React.PropTypes.string.isRequired,
  onLinkChange: React.PropTypes.func.isRequired,
  onLinkSubmit: React.PropTypes.func.isRequired,
}
