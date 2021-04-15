import React from 'react';

const Loading = ({ loading }: { loading: boolean }) => {
  return (
    <div className={`loadingio-wrapper ${(loading ? "show" : "")}`}> 
      <div className="loadingio-spinner-ripple">
        <div className="loadingio">
          <div/><div/>
        </div>
      </div>
    </div>
  );
}

export default Loading;