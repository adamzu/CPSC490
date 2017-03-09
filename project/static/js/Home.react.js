const React = require('react');
const Dropzone = require('react-dropzone');

const Home = React.createClass({
  render() {
    return (
      <div>
        <h1 className="home">Image Caption Generation</h1>
        <Dropzone />
      </div>
    );
  }
});
module.exports = Home
