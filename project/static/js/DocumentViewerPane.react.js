const React = require('react');
const Spinner = require('Spinner.react');

import ReactPDF from 'react-pdf';

class DocumentViewerPane extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ReactPDF
        file={this.props.file}
        loading={<div className="spinner"><Spinner /></div>}
        onClick={this.onClick}
        onDocumentError={this.props.onDocumentError}
        onDocumentLoad={this.props.onDocumentLoad}
        pageIndex={this.props.currentPageIndex}
        width={this.props.width}
      />
    );
  }
}
module.exports = DocumentViewerPane;

DocumentViewerPane.propTypes = {
  file: React.PropTypes.string.isRequired,
  onDocumentError: React.PropTypes.func.isRequired,
  onDocumentLoad: React.PropTypes.func.isRequired,
  currentPageIndex: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
}
