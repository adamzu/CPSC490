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
    };
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

  // TODO: figure out what to do with scroll (alternative to panel?)
  // TODO: figure out what to do with pagination
  // TODO: take spinner out into component

  render() {
    return (
      <div className="viewer-container">
        {
          this.state.totalPages !== 0
            ? <Pagination
                activePage={this.state.currentPage}
                bsSize="medium"
                first
                items={this.state.totalPages}
                last
                next
                onSelect={this.handleSelect}
                prev
              />
            : null
        }
        <Panel
          className="viewer"
          header={this.props.tab}
        >
          <ReactPDF
            className="pdf"
            file={this.getDocumentPath()}
            loading={<img src="/static/images/spinner.gif" />}
            onDocumentError={this.onDocumentError}
            onDocumentLoad={this.onDocumentLoad}
            pageIndex={this.state.currentPageIndex}
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