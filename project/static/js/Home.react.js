const DocumentViewer = require('DocumentViewer.react');
const ImageCaptioner = require('ImageCaptioner.react');
const React = require('react');
const Toolbar = require('Toolbar.react');

const TABS = ['Home', 'Abstract', 'Proposal', 'Report'];

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      activeTabKey: 0,
    };
  }

  getContent() {
    let tab = TABS[this.state.activeTabKey];
    if (tab === 'Home') {
      return <ImageCaptioner />;
    }
    return <DocumentViewer file={tab} />;
  }

  handleSelect(eventKey) {
    this.setState({
      activeTabKey: eventKey,
    });
  }


  render() {
    return (
      <div>
        <Toolbar
          activeTabKey={this.state.activeTabKey}
          handleSelect={this.handleSelect}
          tabs={TABS}
        />
        <div className="content">
          {this.getContent(this.toolbar)}
        </div>
      </div>
    );
  }
}
module.exports = Home
