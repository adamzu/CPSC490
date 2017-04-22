const DocumentViewerControls = require('DocumentViewerControls.react');
const DocumentViewerPane = require('DocumentViewerPane.react');
const React = require('react');

class DocumentViewer extends React.Component {

  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.onDocumentError = this.onDocumentError.bind(this);
    this.onDocumentLoad = this.onDocumentLoad.bind(this);
    this.state = {
      currentPage: 1,
      currentPageIndex: 0,
      totalPages: 0,
      width: 0,
    };
  }

  componentDidMount() {
    let width = document.getElementById('pane').clientWidth;
    this.setState({
      width: width,
    });
  }

  onDocumentLoad({total}) {
    this.setState({
      currentPage: 1,
      currentPageIndex: 0,
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
      currentPage: eventKey,
      currentPageIndex: eventKey - 1,
    });
  }

  render() {
    return (
      <div className="viewer">
        {
          this.state.totalPages !== 0
            ?
              <div className="controls">
                <DocumentViewerControls
                  currentPage={this.state.currentPage}
                  handleSelect={this.handleSelect}
                  totalPages={this.state.totalPages}
                />
              </div>
            : null
        }
        <div className="pane" id="pane">
          <DocumentViewerPane
            currentPageIndex={this.state.currentPageIndex}
            file={this.props.file}
            onDocumentError={this.onDocumentError}
            onDocumentLoad={this.onDocumentLoad}
            width={this.state.width}
          />
        </div>
      </div>
    );
  }
}
module.exports = DocumentViewer;

DocumentViewer.propTypes = {
  file: React.PropTypes.string.isRequired,
}
