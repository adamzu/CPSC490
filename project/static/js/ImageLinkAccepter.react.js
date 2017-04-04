const React = require('react');
const Spinner = require('Spinner.react');

import { Button, Form, FormControl, FormGroup } from 'react-bootstrap';

class ImageLinkAccepter extends React.Component {

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
              disabled={this.props.imageLink === ''}
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
