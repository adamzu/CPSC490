const React = require('react');
const Spinner = require('Spinner.react');

class ImageCaption extends React.Component {

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

ImageCaption.propTypes = {
  caption: React.PropTypes.string.isRequired,
}
