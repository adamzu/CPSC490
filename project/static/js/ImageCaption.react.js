const React = require('react');
const Spinner = require('Spinner.react');

import request from 'superagent';

class ImageCaption extends React.Component {

  constructor(props) {
    super(props);
    this.onCaptionResponse = this.onCaptionResponse.bind(this);
    this.request = null;
    this.state = {
      caption: '',
    };
  }

  sendCaptionRequest() {
    setTimeout(() => {
      this.request = request.post('/caption')
        .timeout({
          deadline: 60000,
          response: 5000,
        })
        .end(this.onCaptionResponse);
    }, 100);
  }

  onCaptionResponse(error, result) {
    if (error || !result.ok) {
      console.log(error);
    } else {
      console.log(result);
      this.setState({
        caption: result.text,
      });
    }
  }

  componentDidMount() {
    this.sendCaptionRequest();
  }

  componentWillUnmount() {
    if (this.request !== null) {
      this.request.abort();
      this.request = null;
    }
  }

  render() {
    return (
      <div>
        {
          this.state.caption === ''
            ? <Spinner />
            : this.state.caption
        }
      </div>
    );
  }
}
module.exports = ImageCaption;
