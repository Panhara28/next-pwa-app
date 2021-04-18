import React from 'react';

const Loading = ({ loading }: { loading: boolean }) => {
  return (
    <div className={`loadingio-wrapper ${(loading ? "show" : "")}`}> 
      <div className="loadingio-spinner-double-ring">
        <div className="loading-io">
          <div/>
          <div/>
          <div>
            <div/>
          </div>
          <div>
            <div/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;