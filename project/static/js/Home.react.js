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
    this.onLinkUploadResponse = this.onLinkUploadResponse.bind(this);
    this.onResetImage = this.onResetImage.bind(this);
    this.onUploadResponse = this.onUploadResponse.bind(this);
    this.request = null;
    this.state = {
      activeTabKey: 0,
      caption: '',
      image: null,
      imageLink: '',
      isInvalidImageLink: false,
      loading: false,
      processedImage: '',
    };
  }

  handleSelect(eventKey) {
    this.setState({
      activeTabKey: eventKey,
    });
  }

  onDropAccepted(droppedImages) {
    let droppedImage = droppedImages[0];
    this.setState({
      image: droppedImage,
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
      this.setState({
        image: null,
        loading: false,
      });
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
      image: null,
      imageLink: '',
      isInvalidImageLink: false,
      loading: false,
      processedImage: ''
    });
  }

  onLinkChange(event) {
    let link = event.target.value;
    this.setState({
      imageLink: link,
      isInvalidImageLink: false,
    });
  }

  onLinkSubmit() {
    this.setState({
      image: {},
      loading: true,
    });
    this.sendLinkUploadRequest(this.state.imageLink.trim());
  }

  sendLinkUploadRequest(link) {
    setTimeout(() => {
      this.request = request.post('/upload')
        .send({image_url: link})
        .timeout({
          deadline: 60000,
        })
        .end(this.onLinkUploadResponse);
    }, 100);
  }

  onLinkUploadResponse(error, result) {
    if (error || !result.ok) {
      console.log(error);
      this.setState({
        image: null,
        loading: false,
        isInvalidImageLink: true,
      });
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

  getContent() {
    let tab = TABS[this.state.activeTabKey];
    if (tab === 'Home') {
      return (
        <ImageCaptioner
          caption={this.state.caption}
          image={this.state.image}
          imageLink={this.state.imageLink}
          isInvalidImageLink={this.state.isInvalidImageLink}
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
