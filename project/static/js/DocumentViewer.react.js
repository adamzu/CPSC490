const DocumentViewerControls = require('DocumentViewerControls.react');
const React = require('react');

import { Pagination, Panel } from 'react-bootstrap';
import ReactPDF from 'react-pdf';

class DocumentViewer extends React.Component {

  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.onDocumentError = this.onDocumentError.bind(this);
    this.onDocumentLoad = this.onDocumentLoad.bind(this);
    this.state = {
      currentPageIndex: 0,
      currentPage: 1,
      totalPages: 0,
      width: 0,
    };
  }

  componentDidMount() {
    let width = document.getElementById('a').clientWidth;
    this.setState({
      width: width,
    });
  }

  onDocumentLoad({total}) {
    this.setState({
      totalPages: total,
    });
  }

  onDocumentError() {
    this.setState({
      totalPages: 0,
    });
  }

  handleSelect(eventKey) {
    this.setState({
      currentPageIndex: eventKey - 1,
      currentPage: eventKey,
    });
  }

  getDocumentPath() {
    return `/static/documents/${this.props.tab}.pdf`;
  }

  // TODO: make extra div with pagination
  // TODO: take spinner out into component
  render() {
    return (
      <div className="viewer-container" id="a">
        {
          this.state.totalPages !== 0
            ?
              <DocumentViewerControls
                currentPage={this.state.currentPage}
                handleSelect={this.handleSelect}
                totalPages={this.state.totalPages}
              />
            : null
        }
        <ReactPDF
          file={this.getDocumentPath()}
          loading={<img src="/static/images/spinner.gif" />}
          onDocumentError={this.onDocumentError}
          onDocumentLoad={this.onDocumentLoad}
          pageIndex={this.state.currentPageIndex}
          width={this.state.width}
        />
      </div>
    );
  }
}
module.exports = DocumentViewer;

DocumentViewer.propTypes = {
  tab: React.PropTypes.string.isRequired,
}
