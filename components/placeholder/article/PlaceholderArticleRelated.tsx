import React, { ReactNode } from 'react';

const PalceholderArticleRelated: React.FunctionComponent = (props) => {
  let placeholders: ReactNode[] = [];

  for(let i = 0; i <= 3; i++) {
    placeholders.push(
      <div key={i} className="ph-item">
        <div className="ph-col-4">
          <div className="ph-picture" style={{height: "2.875rem" }}/>
        </div>

        <div className="ph-col-8">
          <div className="ph-row">
            <div className="ph-col-12 big"/>
            <div className="ph-col-2"/>
            <div className="ph-col-2 empty"/>
            <div className="ph-col-8"/>
          </div>
        </div>
      </div>
    );
  }

  return <>{placeholders}</>;
}

export default PalceholderArticleRelated;