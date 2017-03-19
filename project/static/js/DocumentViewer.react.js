const React = require('react');

import { Panel } from 'react-bootstrap';
import ReactPDF from 'react-pdf';

class DocumentViewer extends React.Component {

  constructor(props) {
    super(props)
  }

  getDocumentPath() {
    return `/static/documents/${this.props.tab}.pdf`;
  }

  render() {
    return (
      <div className="viewer-container">
        <Panel
          className="viewer"
          header={this.props.tab}
        >
          <ReactPDF
            className="pdf"
            file={this.getDocumentPath()}
            scale={1.0}
          />
        </Panel>
      </div>
    );
  }
}
module.exports = DocumentViewer;

DocumentViewer.propTypes = {
  tab: React.PropTypes.string.isRequired,
}
