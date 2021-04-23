import React from 'react';

const PalceholderArticleList = (props: React.PropsWithChildren<{}>) => {
  let placeholders: JSX.Element[] = [];

  for(let i = 0; i <= 2; i++) {
    placeholders.push(
      <div key={i} className={"ph-item" + (i === 2 ? " d-none-mobile" : "")}>
        <div className="ph-col-4">
          <div className="ph-picture d-none-mobile"/>
          <div className="ph-picture small d-none d-block-mobile"/>
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