import React, { ReactNode } from 'react';

const PalceholderArticleList: React.FunctionComponent = (props) => {
  let placeholders: ReactNode[] = [];

  for(let i = 0; i <= 2; i++) {
    placeholders.push(
      <div className="ph-item">
        <div className="ph-col-4">
          <div className="ph-picture"/>
        </div>

        <div className="ph-col-8">
          <div className="ph-row">
            <div className="ph-col-12 big"/>
            <div className="ph-col-4 big"/>
            <div className="ph-col-8 empty"/>
            <div className="ph-col-12"/>
            <div className="ph-col-12"/>
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

export default PalceholderArticleList;