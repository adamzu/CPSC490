const React = require('react');

import {
  Button,
  Form,
  FormControl,
  FormGroup,
} from 'react-bootstrap';

class ImageLinkAccepter extends React.Component {

  render() {
    return (
      <div className="accepter-container">
        or<br />
        <Form>
          <strong>Provide a direct link to an image on the web</strong><br/>
          <FormGroup className="accepter">
            <FormControl
              placeholder="Type in a URL here"
              type="text"
            />
            <Button>Get Caption</Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
module.exports = ImageLinkAccepter

ImageLinkAccepter.propTypes = {

}
