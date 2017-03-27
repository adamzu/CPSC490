const React = require('react');
const Spinner = require('Spinner.react');

import request from 'superagent';

class ImageCaption extends React.Component {

  componentDidMount() {
    if (this.props.caption === '') {
      this.props.sendCaptionRequest();
    }
  }

  render() {
    return (
      <div>
        {
          this.props.caption === ''
            ? <Spinner />
            : this.props.caption
        }
      </div>
    );
  }
}
module.exports = ImageCaption;
