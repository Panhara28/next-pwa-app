import React from 'react';

const Container: React.FunctionComponent = (props) => {
  return (
    <div className="container">
      { props.children }
    </div>
  );
}

export default Container;