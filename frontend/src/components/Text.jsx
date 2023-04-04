import React from 'react';
import { cool_50 } from '../themes/main_theme';

const Text = (props) => {
  return (
    <span style={{ 
      fontSize: props.size, 
      color: props.color,
      fontWeight: props.weight,
      fontStyle: props.style,
    }}>
      {props.children}
    </span>
  );
};

Text.defaultProps = {
    size: "16px",
    color: cool_50,
    fontWeight: "normal",
    fontStyle: "none"
}

export default Text;