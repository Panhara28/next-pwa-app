import React from 'react';

const Measure = (props: React.PropsWithChildren<{}>) => {
  return (
    <div className="measure">
      {props.children}
    </div>
  );
}

export default Measure;