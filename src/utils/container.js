import React from 'react';
import PropTypes from 'prop-types';

export default class ContainerComponent extends React.PureComponent  {
  constructor(props) {
    super(props);//call parent constructor for properties
  }

  render() {
      return <div style={{display: (this.props.display ? "inline" : "none" )}}> 
                {this.props.children}
             </div>;
  }
}

ContainerComponent.propTypes = {
    display: PropTypes.bool
};
  
ContainerComponent.defaultProps = {
    display: true
};