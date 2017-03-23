const React = require('react');
const Spinner = require('Spinner.react');

class ImageCaption extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      caption: '',
    };
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
