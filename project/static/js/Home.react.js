const DocumentViewer = require('DocumentViewer.react');
const ImageCaptioner = require('ImageCaptioner.react');
const React = require('react');
const Toolbar = require('Toolbar.react');

import request from 'superagent';

const TABS = ['Home', 'Abstract', 'Proposal', 'Report'];

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.onDropAccepted = this.onDropAccepted.bind(this);
    this.onResetImage = this.onResetImage.bind(this);
    this.onCaptionResponse = this.onCaptionResponse.bind(this);
    this.onUploadResponse = this.onUploadResponse.bind(this);
    this.request = null;
    this.state = {
      activeTabKey: 0,
      caption: '',
      droppedImage: null,
      loading: false,
      processedImage: '',
    };
  }

  getContent() {
    let tab = TABS[this.state.activeTabKey];
    if (tab === 'Home') {
      return (
        <ImageCaptioner
          caption={this.state.caption}
          droppedImage={this.state.droppedImage}
          loading={this.state.loading}
          onDropAccepted={this.onDropAccepted}
          onResetImage={this.onResetImage}
          processedImage={this.state.processedImage}
        />
      );
    }
    return <DocumentViewer file={tab} />;
  }

  handleSelect(eventKey) {
    this.setState({
      activeTabKey: eventKey,
    });
  }

  onDropAccepted(droppedImages) {
    let droppedImage = droppedImages[0];
    this.setState({
      droppedImage: droppedImage,
      loading: true,
    });
    this.sendUploadRequest(droppedImage);
  }

  sendUploadRequest(droppedImage) {
    setTimeout(() => {
      this.request = request.post('/upload')
        .attach('image', droppedImage, droppedImage.name)
        .timeout({
          deadline: 60000,
          response: 5000,
        })
        .end(this.onUploadResponse);
    }, 100);
  }

  onUploadResponse(error, result) {
    if (error || !result.ok) {
      console.log(error);
    } else {
      this.setState({
        loading: false,
        processedImage: result.text,
      });
      this.sendCaptionRequest();
    }
  }

  onResetImage() {
    this.setState({
      caption: '',
      droppedImage: null,
      loading: false,
      processedImage: '',
    });
  }

  sendCaptionRequest() {
    setTimeout(() => {
      this.request = request.post('/caption')
        .timeout({
          deadline: 60000,
          response: 5000,
        })
        .end(this.onCaptionResponse);
    }, 100);
  }

  onCaptionResponse(error, result) {
    if (error || !result.ok) {
      console.log(error);
    } else {
      this.setState({
        caption: result.text,
      });
    }
  }

  componentWillUnmount() {
    if (this.request !== null) {
      this.request.abort();
      this.request = null;
    }
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
