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
      currentPageIndex: 0,
      currentPage: 1,
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
      totalPages: total,
    });
  }

  // TODO: fix setState issue
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
            file={this.props.tab}
            onDocumentError={this.onDocumentError}
            onDocumentLoad={this.onDocumentLoad}
            currentPageIndex={this.state.currentPageIndex}
            width={this.state.width}
          />
        </div>
      </div>
    );
  }
}
module.exports = DocumentViewer;

DocumentViewer.propTypes = {
  tab: React.PropTypes.string.isRequired,
}
