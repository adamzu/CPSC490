const React = require('react');

import { Image } from 'react-bootstrap';

const SPINNER_PATH = '/static/images/spinner.gif'

class Spinner extends React.Component {

  render() {
    return (
      <Image circle className="spinner" src={SPINNER_PATH} />
    );
  }
}
module.exports = Spinner;
