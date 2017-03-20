const React = require('react');

import { Pagination } from 'react-bootstrap';

class DocumentViewerControls extends React.Component {

  constructor(props) {
    super(props);
  }

  // TODO: make extra div with pagination
  render() {
    return (
      <Pagination
        activePage={this.props.currentPage}
        boundaryLinks
        bsSize="medium"
        ellipsis
        first
        items={this.props.totalPages}
        last
        maxButtons={5}
        next
        onSelect={this.props.handleSelect}
        prev
      />
    );
  }
}
module.exports = DocumentViewerControls;

DocumentViewerControls.propTypes = {
  currentPage: React.PropTypes.number.isRequired,
  handleSelect: React.PropTypes.func.isRequired,
  totalPages: React.PropTypes.number.isRequired,
}
