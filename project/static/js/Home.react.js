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
    this.onCaptionResponse = this.onCaptionResponse.bind(this);
    this.onDropAccepted = this.onDropAccepted.bind(this);
    this.onLinkChange=this.onLinkChange.bind(this);
    this.onLinkSubmit=this.onLinkSubmit.bind(this);
    this.onResetImage = this.onResetImage.bind(this);
    this.onUploadResponse = this.onUploadResponse.bind(this);
    this.request = null;
    // TODO: add stuff for ImageLinkAccepter
    this.state = {
      activeTabKey: 0,
      caption: '',
      droppedImage: null,
      imageLink: '',
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
          imageLink={this.state.imageLink}
          loading={this.state.loading}
          onDropAccepted={this.onDropAccepted}
          onResetImage={this.onResetImage}
          onLinkChange={this.onLinkChange}
          onLinkSubmit={this.onLinkSubmit}
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

  onLinkChange(event) {
    let link = event.target.value;
    this.setState({
      imageLink: link,
    });
  }

  onLinkSubmit() {
    // TODO: disable button, spinner, send request
    console.log(this.state.imageLink.trim());
    // sendLinkUploadRequest();
  }

  sendLinkUploadRequest() {
    setTimeout(() => {
      this.request = request.post('/upload')
        .timeout({
          deadline: 60000,
        })
        .end(this.onLinkUploadResponse);
    }, 100);
  }

  onLinkUploadResponse(error, result) {
    if (error || !result.ok) {
      console.log(error);
      // TODO: enable button, remove spinner, add error, show form invalid
    } else {
      this.setState({
        loading: false,
        processedImage: result.text,
      });
      this.sendCaptionRequest();
    }
  }

  sendCaptionRequest() {
    setTimeout(() => {
      this.request = request.post('/caption')
        .timeout({
          deadline: 60000,
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
          {this.getContent()}
        </div>
      </div>
    );
  }
}
module.exports = Home
