import React from 'react';
import PropTypes from 'prop-types';

export default class ErrorContainerComponent extends React.PureComponent  {
  render() {
      return    <div className="card-panel teal valign-wrapper">
                    <span className="white-text"><i className="small material-icons valign">error</i>{this.props.message}</span>
                </div>;
  }
}

ErrorContainerComponent.propTypes = {
    message: PropTypes.string.isRequired
};