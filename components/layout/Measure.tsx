import React from 'react';

const Measure: React.FunctionComponent = (props) => {
  return (
    <div className="measure">
      {props.children}
    </div>
  );
}

export default Measure;